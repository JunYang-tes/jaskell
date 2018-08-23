/**
 * 
 * 
 map :: (a->b) -> [a] -> [b]
 map f [] = []
 map f (x:xs) = f x : map f xs

 */

import {fmap} from '../../functor.mjs'
import {Just} from '../../maybe.mjs'
const map = f => arr=>{
  if(arr.length) {
    let [head,...tial] = arr
    return [
      f(head),
      ...map(f)(tial)
    ]
  } else {
    return []
  }
}
// fmap:: (a->b)->f a->f b
// f a -> f b // f []

// f a-> f b
const inc = fmap(a=>a+1)
// f a-> f b
const sqr = fmap(a=>a*a)

console.log(
  inc([1,2,3])
)

console.log(
  sqr([1,2,3])
)

console.log(
  inc(Just(2))
)