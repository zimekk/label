import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import { TRIANGULATION } from "./triangulation";

// https://github.com/tensorflow/tfjs-models/blob/master/face-landmarks-detection/demos/shared/util.js
const NUM_KEYPOINTS = 468;
const NUM_IRIS_KEYPOINTS = 5;
const GREEN = "#32EEDB";
const RED = "#FF2C35";

const LABEL_TO_COLOR = {
  lips: "#E0E0E0",
  leftEye: "#30FF30",
  leftEyebrow: "#30FF30",
  leftIris: "#30FF30",
  rightEye: "#FF3030",
  rightEyebrow: "#FF3030",
  rightIris: "#FF3030",
  faceOval: "#E0E0E0",
};

function distance(a, b) {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
}

function drawPath(ctx, points, closePath) {
  const region = new Path2D();
  region.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    region.lineTo(point[0], point[1]);
  }

  if (closePath) {
    region.closePath();
  }
  ctx.stroke(region);
}

export function drawResults(ctx, faces, triangulateMesh, boundingBox) {
  faces.forEach((face) => {
    const keypoints = face.keypoints.map((keypoint) => [
      keypoint.x,
      keypoint.y,
    ]);

    if (boundingBox) {
      ctx.strokeStyle = RED;
      ctx.lineWidth = 1;

      const box = face.box;
      drawPath(
        ctx,
        [
          [box.xMin, box.yMin],
          [box.xMax, box.yMin],
          [box.xMax, box.yMax],
          [box.xMin, box.yMax],
        ],
        true
      );
    }

    if (triangulateMesh) {
      ctx.strokeStyle = GREEN;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < TRIANGULATION.length / 3; i++) {
        const points = [
          TRIANGULATION[i * 3],
          TRIANGULATION[i * 3 + 1],
          TRIANGULATION[i * 3 + 2],
        ].map((index) => keypoints[index]);

        drawPath(ctx, points, true);
      }
    } else {
      ctx.fillStyle = GREEN;

      for (let i = 0; i < NUM_KEYPOINTS; i++) {
        const x = keypoints[i][0];
        const y = keypoints[i][1];

        ctx.beginPath();
        ctx.arc(x, y, 1 /* radius */, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    if (keypoints.length > NUM_KEYPOINTS) {
      ctx.strokeStyle = RED;
      ctx.lineWidth = 1;

      const leftCenter = keypoints[NUM_KEYPOINTS];
      const leftDiameterY = distance(
        keypoints[NUM_KEYPOINTS + 4],
        keypoints[NUM_KEYPOINTS + 2]
      );
      const leftDiameterX = distance(
        keypoints[NUM_KEYPOINTS + 3],
        keypoints[NUM_KEYPOINTS + 1]
      );

      ctx.beginPath();
      ctx.ellipse(
        leftCenter[0],
        leftCenter[1],
        leftDiameterX / 2,
        leftDiameterY / 2,
        0,
        0,
        2 * Math.PI
      );
      ctx.stroke();

      if (keypoints.length > NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS) {
        const rightCenter = keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS];
        const rightDiameterY = distance(
          keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 2],
          keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 4]
        );
        const rightDiameterX = distance(
          keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 3],
          keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 1]
        );

        ctx.beginPath();
        ctx.ellipse(
          rightCenter[0],
          rightCenter[1],
          rightDiameterX / 2,
          rightDiameterY / 2,
          0,
          0,
          2 * Math.PI
        );
        ctx.stroke();
      }
    }

    const contours = faceLandmarksDetection.util.getKeypointIndexByContour(
      faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh
    );

    for (const [label, contour] of Object.entries(contours)) {
      ctx.strokeStyle = LABEL_TO_COLOR[label];
      ctx.lineWidth = 3;
      const path = contour.map((index) => keypoints[index]);
      if (path.every((value) => value != undefined)) {
        drawPath(ctx, path, false);
      }
    }
  });
}
