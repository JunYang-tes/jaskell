import {pure,map} from '../applicatives.mjs'
import {leaf,node} from '../tree.mjs'
const tree = node(
  node(leaf(1),leaf(2)),
  leaf(3)
)
// debugger;
// console.log(
//   map(a=>b=>a+b)
//   (tree)
//   .ap(tree)
//   .pure
// )


// console.log(
//   pure(a=>b=>a+b)
//   .ap(tree)
//   // .ap(tree)
//   .pure
// )

// (\a b c->a+b+c) <$> tree <*> tree <$> tree
// console.log(
//   map(a=>b=>c=>a+b+c)
//    (tree)
//   .ap(tree)
//   .ap(tree)
//   .pure
// )