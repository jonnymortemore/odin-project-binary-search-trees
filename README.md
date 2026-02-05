Requirements:

Build a balanced binary search tree. 

buildTree(array) - function that takes an array of data and turns it into a balanced binary tree full of Node objects appropriately placed. Returns the root node. 

includes(value) - function that accepts a value and returns true if the given value is in the tree. If the value isn’t in the tree, it should return false.

insert(value) - function that accepts a value and inserts a new node with that value into the tree. Be sure to insert in a way that preserves the “binary search” property.

deleteItem(value) - function that accepts a value and removes it from the tree. You’ll have to deal with multiple cases for this based on how many children the targeted node has. If the given value doesn’t exist in the tree, the function should do nothing. 

levelOrderForEach(callback) - function that accepts a callback function as its parameter. levelOrderForEach() should traverse the tree in breadth-first level order and call the callback on each value as it traverses, passing each node value as an argument.

inOrderForEach(callback) / preOrderForEach(callback) / postOrderForEach(callback) - functions that also accept a callback as a parameter. Each of these functions should traverse the tree in their respective depth-first order and pass each value to the provided callback. 

height(value) - function that returns the height of the node containing the given value. Height is defined as the number of edges in the longest path from that node to a leaf node. If the value is not found in the tree, the function should return undefined

depth(value) - function that returns the depth of the node containing the given value. Depth is defined as the number of edges in the path from that node to the root node. If the value is not found in the tree, the function should return undefined.

isBalanced() - function that checks if the tree is balanced. A binary tree is considered balanced if, for every node in the tree, the height difference between its left and right subtrees is no more than 1, and both the left and right subtrees are also balanced.

rebalance() -  function that rebalances an unbalanced tree. You’ll want to use a traversal method to provide a new array to the buildTree() function.

