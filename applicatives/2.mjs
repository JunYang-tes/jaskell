import {Just} from '../maybe.mjs'
import {pure} from '../applicatives.mjs'
/**
 * ap(
 * pure (f) 
 * 
 * )(Just(1))
 * 
 * 
 */


console.log(

  pure(a=>b=>c=>a+b+c)
  .ap(Just(1))
  .ap(Just(2))
  .ap(Just(3))
  .pure
)