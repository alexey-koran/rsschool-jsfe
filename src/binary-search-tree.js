const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.treeRoot) {
      this.treeRoot = newNode;

      return this;
    }

    let current = this.treeRoot;

    while (true) {
      const direction = data < current.data ? 'left' : 'right';

      if (!current[direction]) {
        current[direction] = newNode;

        break;
      }

      current = current[direction];
    }
  }

  has(data) {
    let current = this.treeRoot;

    while (current) {
      if (data === current.data) {
        return true;
      }

      current = data < current.data ? current.left : current.right;
    }

    return false;
  }

  find(data) {
    let current = this.treeRoot;

    while (current) {
      if (data === current.data) {
        return current;
      }

      current = data < current.data ? current.left : current.right;
    }

    return null;
  }

  remove(data) {
    this.treeRoot = this._removeNode(this.treeRoot, data);
  }

  _removeNode(node, data) {
    if (!node) return null;

    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
    } else if (data > node.data) {
      node.right = this._removeNode(node.right, data);
    } else {
      if (!node.left) {
        return node.right;
      }

      if (!node.right) {
        return node.left;
      }

      node.data = this._minNode(node.right).data;

      node.right = this._removeNode(node.right, node.data);
    }

    return node;
  }

  _minNode(node) {
    while (node.left) {
      node = node.left
    };

    return node;
  }

  min() {
    if (this.treeRoot) {
      return this._minNode(this.treeRoot).data;
    }

    return null;
  }

  max() {
    let node = this.treeRoot;

    while (node?.right) {
      node = node.right;
    }

    if (node) {
      return node.data;
    }

    return null;
  }
}

module.exports = {
  BinarySearchTree
};
