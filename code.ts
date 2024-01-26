/// <reference types="@figma/plugin-typings" />

figma.showUI(__html__, { width: 400, height: 400 });

// Helper function to draw Lissajous curve
function drawLissajousCurve(a: number, b: number, delta: number, numPoints: number, scale: number): VectorNode {
  const vectorNode = figma.createVector();

  let pathData = '';
  for (let i = 0; i < numPoints; i++) {
    const t = (i / numPoints) * 2 * Math.PI;
    const x = scale * Math.sin(a * t + delta);
    const y = scale * Math.sin(b * t);
    if (i === 0) {
      pathData += `M ${x} ${y} `;
    } else {
      pathData += `L ${x} ${y} `;
    }
  }
  pathData += 'Z';

  vectorNode.vectorPaths = [{ windingRule: 'EVENODD', data: pathData }];
  vectorNode.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
  vectorNode.strokeWeight = 1;

  figma.currentPage.appendChild(vectorNode);
  figma.currentPage.selection = [vectorNode];
  figma.viewport.scrollAndZoomIntoView([vectorNode]);

  return vectorNode;
}

// Listen for messages from the UI
figma.ui.onmessage = (msg) => {
  if (msg.type === 'draw-lissajous') {
    const { a, b, delta, numPoints, scale } = msg;
    drawLissajousCurve(a, b, delta, numPoints, scale);
  }
};

// Close the plugin
// figma.closePlugin();