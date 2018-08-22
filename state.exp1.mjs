import {node,leaf} from './tree.mjs'
import {S,app} from './state.mjs'
import {pure} from './applicatives.mjs'
import {doBlock} from './monad.mjs'


const tree = node(
  node(leaf('a'),leaf('b')),
  leaf('c')
)

// rlabel :: Tree Char-> Int -> (Tree Int,Int)
function rlabel(tree,n) {
  if(tree.value) {
    return [leaf(n),n+1]
  } else {
    let [l,n1] = rlabel(tree.left,n)
    let [r,n2] = rlabel(tree.right,n1)
    return [
      node(l,r),n2
    ]
  }
}
console.log(
  tree,
)
// console.log(
//   rlabel(tree,0)[0]
// )

//fresh:: ST (n->[n,n])
const fresh = S(n => [n, n + 1])
// alabel :: Tree a -> ST (Int ->[Tree Int,Int])
/**
 * alabel (Leaf a) = leaf <$> fresh
 * alabel (Node l r) = node <$> alabel l <*> alabel r
 */
function alabel(tree) {
  if('value' in tree) {
    return pure(leaf)
      .ap(fresh)
      .pure
  } else {
    return pure(l=>r=>node(l,r))
      .ap(alabel(tree.left))
      .ap(alabel(tree.right))
      .pure
  }
}
/**
 * mlabel (Leaf _) = do n<- fresh
 *  return (Leaf n)
 * mlabel (Node l r) = do
 * l' <- mlabel l
 * r' <- mlabel r
 * return (Node l' r')
 */
// Tree a -> ST (n->[Tree ,n])
function mlabel(tree) {
  if('value' in tree) {
    return doBlock(
      leaf,
      fresh
    )
  } else {
    return doBlock(
      //
      // (l,r)=>node(l)(r),
      node,
      mlabel(tree.left),
      mlabel(tree.right)
    )
  }
}

// console.log(
//   'alabel',
//   app(alabel(tree))(0)
//   [0]
// )
// console.log(
//   app(alabel(leaf('A')))(0)
// )
// console.log(
//   app(alabel(
//     node(leaf('A'),leaf('B')))
//   )(0)
// )

console.log(
  mlabel(tree)
)

 const [ltree,state] = mlabel(tree).fn(2)// app(mlabel(tree))(0)
console.log(
  'mlabel',
  ltree
)
