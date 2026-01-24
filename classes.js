
export class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        let treeRoot = null
        for (const value of array) {
            if (treeRoot === null) {
                treeRoot = new Node(value);
                console.log(treeRoot)
            } else {
                traverseTree(treeRoot, value)
            }
        }
        this.prettyPrint(treeRoot)
        return treeRoot

        function traverseTree(node, value) {
            if (node.value === value) {
                return
            }
            if (node.value > value) {
                if (node.right === null) {
                    node.right = new Node(value)
                    return
                }
                traverseTree(node.right, value)
            }
            if (node.value < value) {
                if (node.left === null) {
                    node.left = new Node(value)
                    return
                }
                traverseTree(node.left, value)
            }

        }

    }

    prettyPrint(node, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
}

class Node {
    constructor(value = null, leftChild = null, rightChild = null) {
        this.value = value;
        this.left = leftChild;
        this.right = rightChild;
    }
}