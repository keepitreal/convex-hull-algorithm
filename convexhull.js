document.addEventListener('DOMContentLoaded', () => {
  function plot(x, y) {
    return createElement('circle', {
      cx: x,
      cy: y,
      r: 3,
      fill: 'black'
    });
  }

  function createPlots(num) {
    let plots = [];

    for (let i = 0; i < num; i++) {
      let x = Math.random() * boundingBox.width;
      let y = Math.random() * boundingBox.height;
      plots.push(plot(x, y));
    }

    return plots;
  }

  function renderPlots(plots, parent) {
    plots.forEach(plot =>parent.appendChild(plot))
  }

  function createElement(type, attrs) {
    let svgElement = document.createElementNS(svgNS, type);

    Object.keys(attrs).forEach(key => {
      svgElement.setAttributeNS(null, key, attrs[key]);
    });

    return svgElement;
  }

  function getCoordinatePair(plot) {
    return {
      x: parseInt(plot.attributes.cx.nodeValue, 10),
      y: parseInt(plot.attributes.cy.nodeValue, 10)
    };
  }

  function computeConvexHull(plots) {
    let UpperHull = [];
    let LowerHull = [];

    const orderedPlots = plots
      .sort((a, b) => {
        return getCoordinatePair(a).x - getCoordinatePair(b).x;
      });

    function makesRightTurn(plots, reverse) {
      const p = getCoordinatePair(plots[0]);
      const q = getCoordinatePair(plots[1]);
      const r = getCoordinatePair(plots[2]);

      const value = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

      if (value == 2) {
        return true;
      }

      return false;
    }

    // Put the points p[0] and p[1] in a list UpperHull, with p[0] at index 0
    UpperHull.push(orderedPlots[0]);
    UpperHull.push(orderedPlots[1]);

    // for: i = 2, i < n, i++
    for (let i = 2; i < orderedPlots.length; i++) {
      // do: append p[i] to UpperHull
      UpperHull.push(orderedPlots[i]);

      // while: UpperHull contains more than 2 points and the last 3 points
      //        in UpperHull do not make a right turn
      
      while(UpperHull.length > 2 && !makesRightTurn(UpperHull.slice(UpperHull.length - 3))) {
        // do: Delete the middle of the last three points from UpperHull
        UpperHull.splice(UpperHull.length - 2, 1);
      }
    }

    UpperHull.forEach(plot => {
      plot.style.fill = 'red';
    });
    
    // Put the points p[n] and p[n-1]  in LowerHull with p[n] at index 0
    // for: i = n - 2, i > 1, i--
      // do: append p[i] to LowerHull
        // while: LowerHull contains more than 2 points and the last three points
        //        in LowerHull do not make a right turn
          // do: Delete the middle of the last three points from LowerHull
          
    LowerHull.push(orderedPlots[orderedPlots.length - 1]);
    LowerHull.push(orderedPlots[orderedPlots.length - 2]);

    for (let j = orderedPlots.length - 3; j > 0; j--) {
      LowerHull.push(orderedPlots[j]);

      while(LowerHull.length > 2 && !makesRightTurn(LowerHull.slice(LowerHull.length - 3), true)) {
        // do: Delete the middle of the last three points from LowerHull
        LowerHull.splice(LowerHull.length - 2, 1);
      }
    }

    LowerHull.forEach(plot => {
      plot.style.fill = 'red';
    });
    // Remove the first and the last point from LowerHull to avoid duplication of points
    // Append Lowerfull to UpperHull and call the resulting list L
    // return L
  }

  const svgEl = document.getElementById('entry');
  const svgNS = 'http://www.w3.org/2000/svg';

  const boundingBox = {
    height: 300,
    width: 300
  };

  svgEl.style.height = `${boundingBox.height}px`;
  svgEl.style.width = `${boundingBox.width}px`;

  const plots = createPlots(15);

  renderPlots(plots, svgEl);
  computeConvexHull(plots);
});