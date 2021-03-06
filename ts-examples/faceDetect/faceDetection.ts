import {
  getDataFilePath,
  drawBlueRect
} from '../utils';
import * as cv from '../../../';

const image = cv.imread(getDataFilePath('got.jpg'));
// const image = cv.imread('./faceDetect/images/cats.jpg')
const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
// const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALCATFACE)
// detect faces
const { objects, numDetections } = classifier.detectMultiScale(image.bgrToGray());
console.log('faceRects:', objects);
console.log('confidences:', numDetections);

if (!objects.length) {
  throw new Error('No faces detected!');
}

// draw detection
const numDetectionsTh = 10;
objects.forEach((rect, i) => {
  console.log( numDetections[i]);
  const thickness = numDetections[i] < numDetectionsTh ? 1 : 2;
  drawBlueRect(image, rect, thickness);
});

cv.imshowWait('face detection', image);
