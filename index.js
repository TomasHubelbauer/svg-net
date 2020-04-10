window.addEventListener('load', () => {
  let x = 10;
  let y = 10;

  /** @typedef {{ title: string; instant: Date; }} {Node} */
  /** @typedef {{ source: Node; target: Node; }} {Edge} */

  /** @type {Node[]} */
  const nodes = window.nodes || [];

  /** @type {Edge[]} */
  const edges = window.edges || [];

  /** @type {SVGElement} */
  const canvasSvg = document.getElementById('canvasSvg');

  canvasSvg.addEventListener('mousemove', event => {
    if (event.buttons !== 1) {
      return;
    }

    pan(event.movementX, event.movementY);
  });

  canvasSvg.addEventListener('wheel', event => {
    scale(event.deltaY);
  });

  function render(/** @type {Node[]} */ nodes, /** @type {Edge[]} */ edges) {
    /** @type {Node[]} */
    const chain = [];
    do {
      /** @type {Node} */
      let node;

      // Continue the current chain until it runs out and then start a new one
      if (chain.length > 0) {
        node = chain.shift();
      }
      else {
        node = nodes.shift();
        x = 10;
        y += 20;
      }

      const nodeEdges = edges.filter(e => e.source === node || e.target === node);
      for (const edge of nodeEdges) {
        if (edge.source === node) {
          const index = nodes.indexOf(edge.target);
          chain.push(...nodes.splice(index, 1));
        }
        else if (edge.target === node) {
          // TODO
        }
        else {
          throw new Error(`Found an edge which does not contain the node.`);
        }
      }

      console.log(node.title, chain.length);

      const nodeText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      nodeText.textContent = node.title;
      nodeText.setAttribute('x', x);
      nodeText.setAttribute('y', y);
      canvasSvg.append(nodeText);

      x += ~~nodeText.getComputedTextLength() + 50;
    } while (nodes.length > 0);
  }

  function pan(/** @type {Number} */ x, /** @type {Number} */ y) {
    for (const element of canvasSvg.children) {
      switch (element.tagName) {
        case 'text': {
          element.setAttribute('x', Number(element.getAttribute('x')) + x);
          element.setAttribute('y', Number(element.getAttribute('y')) + y);
          break;
        }
        default: {
          throw new Error(`Unexpected element tag name '${element.tagName}'.`);
        }
      }
    }
  }

  function scale(/** @type {Number} */ delta) {
    for (const element of canvasSvg.children) {
      switch (element.tagName) {
        case 'text': {
          element.setAttribute('x', Number(element.getAttribute('x')) * delta);
          element.setAttribute('y', Number(element.getAttribute('y')) * delta);
          break;
        }
        default: {
          throw new Error(`Unexpected element tag name '${element.tagName}'.`);
        }
      }
    }
  }

  render([...nodes], [...edges]);
});
