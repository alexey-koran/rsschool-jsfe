const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  #rootNode = null;

  root() {
    return this.#rootNode;
  }

  #findNode({ data, currentNode = this.#rootNode, parentNode = null }) {
    let current = currentNode, parent = parentNode;

    while (current) {
      if (data === current.data) {
        break;
      }

      parent = current;
      current = data < current.data ? current.left : current.right;
    }

    return { currentNode: current, parentNode: parent };
  }

  #removeEmptyNode({ isLeft, parentNode }) {
    if (parentNode === null) {
      this.#rootNode = null;
    } else if (isLeft) {
      parentNode.left = null;
    } else {
      parentNode.right = null;
    }
  }

  #removeOneChildNode({ isLeft, childNode, parentNode }) {
    if (parentNode === null) {
      this.#rootNode = childNode;
    } else if (isLeft) {
      parentNode.left = childNode;
    } else {
      parentNode.right = childNode;
    }
  }

  #removeBothChildNode({ currentNode }){
    const minRight = this.#getMin(currentNode.right).data;

    const { currentNode: minNode, parentNode: minParent } = this.#findNode({ data: minRight });

    this.#removeNode({ currentNode: minNode, parentNode: minParent });

    currentNode.data = minRight;
  }

  #removeNode({ currentNode, parentNode }) {
    if (!currentNode) {
      return;
    }

    const isLeft = parentNode?.left?.data === currentNode.data;

    if (currentNode.left === null && currentNode.right === null) {
      this.#removeEmptyNode({ isLeft, parentNode });
    } else if (currentNode.left !== null && currentNode.right !== null) {
      this.#removeBothChildNode({ currentNode });
    } else {
      this.#removeOneChildNode({ childNode: currentNode.left || currentNode.right, isLeft, parentNode });
    }

    return parentNode;
  }

  #addNode({ data, parentNode }) {
    const newNode = new Node(data);

    if (data < parentNode.data) {
      parentNode.left = newNode;
    } else if (data > parentNode.data) {
      parentNode.right = newNode;
    }

    return newNode;
  }

  add(data) {
    if (this.#rootNode === null) {
      this.#rootNode = new Node(data);
      return this.#rootNode;
    }

    const { currentNode, parentNode } = this.#findNode({ data });

    if (currentNode !== null) {
      return null;
    }

    return this.#addNode({ data, parentNode });
  }

  has(data) {
    return this.#findNode({ data }).currentNode !== null;
  }

  find(data) {
    return this.#findNode({ data }).currentNode ?? null;
  }

  remove(data) {
    const { currentNode, parentNode } = this.#findNode({ data });

    return this.#removeNode({ currentNode, parentNode });
  }

  #getMin(node) {
    while (node?.left) {
      node = node.left;
    }

    return node;
  }

  min() {
    if (this.#rootNode === null) {
      return null;
    }

    return this.#getMin(this.#rootNode).data;
  }

  #getMax(node) {
    while (node?.right) {
      node = node.right;
    }

    return node;
  }

  max() {
    if (this.#rootNode === null) {
      return null;
    }

    return this.#getMax(this.#rootNode).data;
  }
}

module.exports = {
  BinarySearchTree
};
