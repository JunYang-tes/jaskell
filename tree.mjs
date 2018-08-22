import {regFunctor} from './functor'
import {regApplicative} from './applicatives.mjs'
class Tree {}
class Node extends Tree {
  constructor(left,right) {
    super()
    this.left = left
    this.right = right
  }
}
class Leaf extends Tree {
  constructor(value) {
    super()
    this.value = value
  }
}
export const node = (left,right) => new Node(left,right)
export const leaf = value=>new Leaf(value)


const map = f=>tree=> {
    if(tree instanceof Leaf) {
      return leaf(
        f(tree.value)
      )
    } else {
      return node(
        map(f)(tree.left),
        map(f)(tree.right)
      )
    }
  }

regFunctor(
  Tree,
  map
)

// ap:: Tree T => T (a->b) => T a => T b
export const ap =ff=>tree=>{
  if(tree instanceof Leaf) {
    return leaf(
      ff.value(tree.value)
    )
  } else {
    return node(
      ap(ff.left || ff)(tree.left),
      ap(ff.right || ff)(tree.right)
    )
  }
}
export const pure = leaf

regApplicative(
  Tree,
  f=>leaf(f),
  ap
)
