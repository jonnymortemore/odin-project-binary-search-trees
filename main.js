import { Tree } from "./classes.js";

const newTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
newTree.insert(10)
newTree.insert(22)
newTree.insert(24)
newTree.prettyPrint()
newTree.delete(7)
newTree.prettyPrint()
console.log(newTree.findValue(4))
console.log(newTree.height(8))