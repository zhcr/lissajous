"use strict";
figma.showUI(__html__);
// Helper function to draw a line segment
function drawLine(x1, y1, x2, y2) {
    const nodes = [];
    const lineNode = figma.createLine();
    lineNode.x = x1;
    lineNode.y = y1;
    lineNode.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    lineNode.strokeWeight = 1;
    lineNode.vectorNetwork = {
        vertices: [
            { x: 0, y: 0 },
            { x: x2 - x1, y: y2 - y1 },
        ],
        segments: [{ start: 0, end: 1 }],
    };
    figma.currentPage.appendChild(lineNode);
    nodes.push(lineNode);
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
}
// Recursive function to draw H-fractal
function drawHFractal(x, y, length, depth) {
    if (depth === 0)
        return;
    const half = length / 2;
    // Draw H pattern
    drawLine(x - half, y - half, x - half, y + half); // left
    drawLine(x + half, y - half, x + half, y + half); // right
    drawLine(x - half, y, x + half, y); // center
    // Recurse on 4 sub-squares
    drawHFractal(x - half, y - half, length / 2, depth - 1);
    drawHFractal(x - half, y + half, length / 2, depth - 1);
    drawHFractal(x + half, y - half, length / 2, depth - 1);
    drawHFractal(x + half, y + half, length / 2, depth - 1);
}
// Set initial values
const startX = 300;
const startY = 300;
const initialLength = 200;
const initialDepth = 3;
// Draw the H-fractal
drawHFractal(startX, startY, initialLength, initialDepth);
figma.closePlugin();
