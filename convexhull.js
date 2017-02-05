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
});