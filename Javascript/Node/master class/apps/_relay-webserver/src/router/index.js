class RouterNode {
  constructor(subPath) {
    this.subPath = subPath;
    this.children = null;
    this.runners = null;
  }

  extrude(subPath, runners) {
    this.children = this.children ? [...(this.children)] : [];
    const childNode = new RouterNode(subPath);
    this.children.push(childNode);
    if(runners && runners.length) {
      const leafNode = childNode.extrude('');
      leafNode.runners = runners;
    }
    return childNode;
  }
}

export class RootRouter {
  constructor() {
    this.rootNode = new RouterNode();
  }
  extrude(subPath, runners) {
    return this.rootNode.extrude(subPath, runners);
  }

  cloneUrlObject(obj) {
    return {
      runnersAtLeaf: [...(obj.runnersAtLeaf || [])],
      traversedSubUrls: [...(obj.traversedSubUrls || [])],
      fullUrl: obj.fullUrl
    }
  }

  traverseTreePreOrder(currentNode, toLeafMemory, travCollection) {/*backtracking*/
    if (!currentNode) return;
    // choose
    toLeafMemory.traversedSubUrls.push(currentNode.subPath);
    if (!currentNode.children) {/*we're at at leaf*/
      toLeafMemory.runnersAtLeaf = currentNode.runners;
      toLeafMemory.fullUrl = toLeafMemory.traversedSubUrls.join('');
      return travCollection.push(this.cloneUrlObject(toLeafMemory));
    }
    for (let child of currentNode.children) {
      // explore
      this.traverseTreePreOrder(child, toLeafMemory, travCollection);
      // unchoose
      toLeafMemory.runners = null;
      toLeafMemory.traversedSubUrls.pop();
      toLeafMemory.fullUrl = '';
    }
    return travCollection;
  }

  generateRoutesRules(basePath) {
    const toLeafMemory = {
      traversedSubUrls: [],
      fullUrl: '',
      runnersAtLeaf: []
    }
    const { rootNode } = this;
    rootNode.subPath = basePath;
    return this.traverseTreePreOrder(rootNode, toLeafMemory, []);
  }
}

export default RootRouter;
