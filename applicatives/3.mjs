import {pure} from '../applicatives.mjs'
/**
 * pure (+) <*> [1,2] <*> [3,4]
 * //[1+,2+]
 * [1+3,1+4,2+3,2+4]
 */
console.log(
  pure(a=>b=>a+b)
  .ap([1,2])
  .ap([3,4])
  .pure
)