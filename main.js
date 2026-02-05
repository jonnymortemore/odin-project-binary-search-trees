import { Tree } from "./classes.js";

const newTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
newTree.prettyPrint()
console.log(newTree.findValue(4))
console.log(newTree.height(8))
console.log(newTree.isBalanced())

console.log("Level Order")
newTree.levelOrderForEach((value) => console.log(value));
console.log("Pre Order")
newTree.preOrderForEach((value) => console.log(value));
console.log("In Order")
newTree.inOrderForEach((value) => console.log(value));
console.log("postOrder")
newTree.postOrderForEach((value) => console.log(value));

newTree.insert(150)
newTree.insert(300)
newTree.insert(1000)
newTree.insert(900)
newTree.prettyPrint()
console.log("rebalance")
newTree.rebalance()
newTree.prettyPrint()
console.log(newTree.isBalanced())

console.log("Level Order")
newTree.levelOrderForEach((value) => console.log(value));
console.log("Pre Order")
newTree.preOrderForEach((value) => console.log(value));
console.log("In Order")
newTree.inOrderForEach((value) => console.log(value));
console.log("postOrder")
newTree.postOrderForEach((value) => console.log(value));