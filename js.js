<canvas id="canvas"></canvas>
<script>
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    let mouseX = 0;
    let mouseY = 0;
    let lerpX;
    let lerpY;
    const trailSize = 10;
    const trail = Array(trailSize).fill(undefined);
    let hue = 0;
    let lerpSpeed = 0.05;
    let mouseMoved = false;

    const resizeCanvas = () => {
        let ratio = window.devicePixelRatio;
        if (ratio > 1) {
            lerpSpeed = 0.1;
        }
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        canvas.width = window.innerWidth * ratio;
        canvas.height = window.innerHeight * ratio;
        context.scale(ratio, ratio);
    }
    window.onresize = resizeCanvas;
    resizeCanvas();

    function drawTrail() {
        if(lerpX !== undefined && lerpY !== undefined) {
            lerpX = lerp(lerpX, mouseX, lerpSpeed);
            lerpY = lerp(lerpY, mouseY, lerpSpeed);

            lerpX = Math.min(Math.max(lerpX, 0), canvas.width);
            lerpY = Math.min(Math.max(lerpY, 0), canvas.height);

            trail.unshift([lerpX, lerpY]);
            trail.pop();

            trail.forEach((pos, index) => {
                if (pos !== undefined) {
                    const size = trailSize * ((trailSize - index) / trailSize);
                    const alpha = (trailSize - index) / trailSize;
                    context.beginPath();
                    context.arc(pos[0], pos[1], size, 0, 2 * Math.PI);
                    context.fillStyle = `hsla(${hue}, 100%, 50%, ${alpha})`;
                    context.fill();
                }
            });

            if (mouseMoved) {
                hue += 2;
                mouseMoved = false;
            }
        }
    }

    function lerp(start, end, speed) {
        return start * (1 - speed) + end * speed;
    }

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isMobile) {
        document.addEventListener('mousemove', e => {
            if(lerpX === undefined && lerpY === undefined) {
                lerpX = e.pageX;
                lerpY = e.pageY;
            }
            mouseX = e.pageX;
            mouseY = e.pageY;
            mouseMoved = true;
        });

        function animate() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawTrail();
            requestAnimationFrame(animate);
        }
        animate();

        function hideOverflowOnDesktop() {
            const body = document.querySelector('body');
            if (!isMobile) {
                body.classList.add('hide-overflow');
            }
        }

        hideOverflowOnDesktop();
        window.addEventListener('resize', hideOverflowOnDesktop);
    }
</script>