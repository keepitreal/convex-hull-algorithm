document.addEventListener('DOMContentLoaded', () => {
  const svgEl = document.getElementById('entry');
  const svgNS = 'http://www.w3.org/2000/svg';

  const boundingBox = {
    height: 500,
    width: 500
  };

  svgEl.style.height = `${boundingBox.height}px`;
  svgEl.style.width = `${boundingBox.width}px`;

  const numPoints = 15;

  for (let i = 0; i < numPoints; i++) {
    let x = Math.random() * boundingBox.width;
    let y = Math.random() * boundingBox.height;
    plot(x, y);
  }

  function plot(x, y) {
    let circle = createElement('circle', {
      cx: x,
      cy: y,
      r: 3,
      fill: 'black'
    });

    svgEl.appendChild(circle);
  }

  function createElement(type, attrs) {
    let svgElement = document.createElementNS(svgNS, type);

    Object.keys(attrs).forEach(key => {
      svgElement.setAttributeNS(null, key, attrs[key]);
    });

    return svgElement;
  }

  function computeConvexHull() {
    // create 2 arrays, UpperHull and LowerHull.
    // Sort the points by x-coordinate (asc), resulting in a sequence p[0],...,p[n]
    // Put the points p[0] and p[1] in a list UpperHull, with p[0] at index 0
    // for: i = 2, i < n, i++
      // do: append p[i] to UpperHull
        // while: UpperHull contains more than 2 points and the last 3 points
        //        in UpperHull do not make a right turn
          // do: Delete the middle of the last three points from UpperHull
    // Put the points p[n] and p[n-1]  in LowerHull with p[n] at index 0
    // for: i = n - 2, i > 1, i--
      // do: append p[i] to LowerHull
  }
});