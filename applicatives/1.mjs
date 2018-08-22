/**
 * fmap :: (a->b)->f a -> f b
 * fmap2 :: (a->b->c) -> f a -> f b -> f c
 * fmap3 :: (a->b->c->d) -> f a-> f b -> f c -> f b
 * ....
 * 
 * fmapn :: (a1->a2->.....->an) -> f a -> f a2 -> f a3.....-> f an
 * Just (a->b) <*> Just(1) 
 * Just(f)
 */
import {pure,ap} from '../applicatives.mjs'
import util from 'util'

function show(arr){
  let str=[]
  for(let a of arr){
    if(typeof a==='function') {
      str.push(a.toString())
    } else {
      str.push(util.inspect(a))
    }
  }
  console.log(
    `[${str.join(',')}]`
  )
}
show([a=>b=>c=>a+b+c])
show(
  ap(
    [a=>b=>c=>a+b+c]
  )([1])
)

show(
  ap(
    ap(
      [a => b => c => a + b + c]
    )([1])
  )([2])
)

// [f] <*> [1] <*> [2] <*> [3]
// pure :: Functor f => a -> f a
// pure f <*> ...
show(
  ap(
    ap(
      ap(
        [a => b => c => a + b + c]
      )([1])
    )([2])
  )([3])
)

console.log(
  pure(a=>b=>c=>a+b+c)
  .ap([1])
  .ap([2])
  .ap([3])
  .pure
)