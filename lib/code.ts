// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, {
  height: 500,
  width: 500,
});


// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async (msg: { type: string, count: number, nameFilter: string, typeFilter: string }) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'create-rectangles') {
    // This plugin creates rectangles on the screen.
    const numberOfRectangles = msg.count;

    const nodes: SceneNode[] = [];
    for (let i = 0; i < numberOfRectangles; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  if (msg.type === 'load-pages') {
    await figma.loadAllPagesAsync()
  }

  if (msg.type === 'filter-components') {
    const { nameFilter, typeFilter } = msg;
    const components: SceneNode[] = [];

    const traverse = (node: BaseNode) => {

      if (
        (node.type === 'COMPONENT' || node.type === 'INSTANCE') &&
        (!typeFilter || node.type === typeFilter) &&
        (!nameFilter || node.name.toLowerCase().includes(nameFilter.toLowerCase()))
      ) {
        console.log(node.name);
        components.push(node);
      }

      if ('children' in node) {
        node.children.forEach((child) => {
          traverse(child);
        });
      }
    }

    const figmaRootChildren = [...figma.root.children];

    for (let index = 0; index < figmaRootChildren.length; index++) {
      const child = figmaRootChildren[index];
      traverse(child);
    }

    figma.currentPage.selection = components
    figma.viewport.scrollAndZoomIntoView(components)

    figma.ui.postMessage({
      type: 'filter-result',
      count: components.length
    });
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
  }


};
