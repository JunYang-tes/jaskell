/**
 * class Functor f where
 *   fmap:: (a->b) -> f a -> f b
 *
 * fmap f []
 * fmap f (Just 2)
 */

import {fmap} from '../../functor'
import {Just} from '../../maybe.mjs'
import {leaf,node} from '../../tree.mjs'

const tree = node(
  node(leaf('abc'),leaf('efg')),
  leaf('abc')
)
const length = str=>str.length

console.log(
  fmap(length)(tree)
)

console.log(
  fmap(length)(Just("hello,functor"))
)

console.log(
  fmap(length)(["hello","functor"])
)


const double = a=>a+a
console.log(
  fmap(double)(
    node(
      leaf(1),
      leaf(2)
    )
  )
)
console.log(
  fmap(double)(
    [1,2]
  )
)
console.log(
  fmap(double)(Just(1))
)