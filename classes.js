export class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        let treeRoot = null;
        for (const value of array) {
            if (treeRoot === null) {
                treeRoot = new Node(value);
            } else {
                this.#traverseTreeAndInsert(treeRoot, value);
            }
        }
        return treeRoot;
    }

    #traverseTreeAndInsert(node, value) {
        if (node.value === value) {
            //to avoid duplicate values
            return;
        }
        if (value > node.value) {
            if (node.right === null) {
                //found right end
                node.right = new Node(value);
                return;
            }
            this.#traverseTreeAndInsert(node.right, value);
        }
        if (value < node.value) {
            if (node.left === null) {
                //found left end
                node.left = new Node(value);
                return;
            }
            this.#traverseTreeAndInsert(node.left, value);
        }
    }

    insert(value) {
        this.#traverseTreeAndInsert(this.root, value);
    }

    delete(value) {
        //https://en.wikipedia.org/wiki/Binary_search_tree
        this.root = traverseTreeAndDelete(this.root, value);

        function traverseTreeAndDelete(node, value) {
            if (node === null) {
                //found end of tree
                return null;
            }
            if (value > node.value) {
                //traverse right
                node.right = traverseTreeAndDelete(node.right, value);
            }
            if (value < node.value) {
                //traverse left
                node.left = traverseTreeAndDelete(node.left, value);
            }
            //value found, DELETE
            if (node.value === value) {
                if (node.right === null) {
                    //this still works because if left is also null - null is returned anyway.
                    return node.left;
                }
                if (node.left === null) {
                    return node.right;
                } else {
                    //has both left and right children - find inorder successor (the next biggest value in the right child branch)
                    //search the right half for the next biggest number and swap that value with the current node
                    const smallestSuccessor = findSmallestSuccessor(node.right);
                    node.value = smallestSuccessor;
                    //then search through the right half of the tree and delete that node (using this function recursively to handle any children)
                    node.right = traverseTreeAndDelete(
                        node.right,
                        smallestSuccessor,
                    );
                }
            }
            //because value is swapped - return this node
            return node;
        }

        function findSmallestSuccessor(node) {
            //recursively look through the left most branches of children as those values will always be the smallest
            //until you create the end of the tree - this number by definiation will be the lowest value in the right most part of the tree
            if (node.left === null) {
                return node.value;
            }
            return findSmallestSuccessor(node.left);
        }
    }

    findValue(value) {
        return traverseTreeAndReturn(this.root);

        function traverseTreeAndReturn(node) {
            if (node.left === null && node.right === null) {
                return null;
            }
            if (node.value === value) {
                return node;
            }
            if (value > node.value) {
                return traverseTreeAndReturn(node.right);
            }
            if (value < node.value) {
                return traverseTreeAndReturn(node.left);
            }
        }
    }

    levelOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("callback is not a function!");
        }
        levelOrderTraverseInteration(this.root);

        function levelOrderTraverseInteration(root) {
            if (root === null) {
                return;
            }
            const queue = [root];

            while (queue.length > 0) {
                const currentNode = queue.shift();
                if (currentNode !== null) {
                    queue.push(currentNode.left, currentNode.right);
                    callback(currentNode.value);
                }
            }
        }

        //levelOrderTraverseRecursion([this.root])

        function levelOrderTraverseRecursion(queue) {
            if (queue.length === 0) {
                return;
            }
            const currentNode = queue.shift();
            if (currentNode !== null) {
                queue.push(currentNode.left, currentNode.right);
                callback(currentNode.value);
            }
            levelOrderTraverseRecursion(queue);
        }
    }

    preOrderForEach(callback) {
        //root -> left tree -> right tree

        traverseTree(this.root);

        function traverseTree(node) {
            if (node === null) {
                return;
            }
            callback(node.value);
            traverseTree(node.left);
            traverseTree(node.right);
        }
    }

    inOrderForEach(callback) {
        //left tree -> root -> right tree
        traverseTree(this.root);

        function traverseTree(node) {
            if (node === null) {
                return;
            }
            traverseTree(node.left);
            callback(node.value);
            traverseTree(node.right);
        }
    }

    postOrderForEach(callback) {
        // right tree -> root -> left tree
        traverseTree(this.root);

        function traverseTree(node) {
            if (node === null) {
                return;
            }

            traverseTree(node.right);
            callback(node.value);
            traverseTree(node.left);
        }
    }

    height(value) {

        //find the node - no need to find it with new code
        const foundNode = this.findValue(value); 

        //check if null - if so return 
        if (foundNode === null) {
            return null
        }
        
        //return height
        return traverseForHeight(foundNode)

        function traverseForHeight(node, height = -1) {
            //height starts as -1 as starting node counts itself
            //if reached end - return the height
            if (node === null) {
                return height
            }

            //add to height from that node onwards
            height += 1;

            //check the height of the left tree and then the right tree
            const leftHeight = traverseForHeight(node.left, height)
            const rightHeight = traverseForHeight(node.right, height)
            
            //whichever has the highest value - return
            if(leftHeight > rightHeight) {
                return leftHeight
            }

            return rightHeight

        }
    }

    depth(value) {

        return traverseForDepth(this.root)

        function traverseForDepth(node, height = 0) {
            if (node === null) {
                return null
            }
            height += 1;

            if(node.value === value) {
                return height
            }
            if(value > node.value) {
                return traverseForDepth(node.right, height)
            }
            if(value < node.value) {
                return traverseForDepth(node.left, height)
            }
        }
    }

    isBalanced() {
        const FAILED = -1
        const ACCEPTABLE_HEIGHT = 1
        
        if (traverseForBalance(this.root) === -1) {
            return false
        }

        return true

        function traverseForBalance(node) {
            
            if (node === null) {
                return 0
            }
            //check left
            const leftHeight = traverseForBalance(node.left)
            //left half not balanced
            if (leftHeight === FAILED) return FAILED

            //check right
            const rightHeight = traverseForBalance(node.right)
            //right half not balanced
            if (rightHeight === FAILED) return FAILED

            //compare left and right 
            const heightDifference = Math.abs(leftHeight - rightHeight)

            if(heightDifference > ACCEPTABLE_HEIGHT) {
                return FAILED
            }

            //pick the highest height from left or right trees add 1 to height to include itself in the height
            return Math.max(leftHeight, leftHeight) + 1

        }

    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false,
            );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true,
            );
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
