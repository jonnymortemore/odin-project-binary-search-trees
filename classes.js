
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
                this.#traverseTreeAndInsert(treeRoot, value)
            }
        }
        this.prettyPrint(treeRoot)
        return treeRoot

        

    }

    #traverseTreeAndInsert(node, value) {
        if (node.value === value) {
            //to avoid duplicate values
            return
        }
        if (value > node.value) {
            if (node.right === null) {
                //found right end
                node.right = new Node(value)
                return
            }
            this.#traverseTreeAndInsert(node.right, value)
        }
        if (value < node.value) {
            if (node.left === null) {
                //found left end
                node.left = new Node(value)
                return
            }
            this.#traverseTreeAndInsert(node.left, value)
        }

    }

    insert(value) {
        this.#traverseTreeAndInsert(this.root, value)
        this.prettyPrint(this.root)
    }

    delete(value) {
        //https://en.wikipedia.org/wiki/Binary_search_tree
        traverseTreeAndDelete(this.root, value);

        function traverseTreeAndDelete(node, value) {
            if (node === null) {
                //found end without finding value
                return
            }
            if(node.value === value) {
                //delete
                return
            }
            if (value > node.value ) {
                this.traverseTreeAndDelete(node.right, value)
            }
            if (value < node.value) {
                this.traverseTreeAndDelete(node.left, value)
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