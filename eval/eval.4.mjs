import {Val} from './expr.mjs'
import {Nothing,Just} from '../maybe.mjs'
import {bind} from '../monad.mjs'
/**
 * 
 *  bind(
 *   Just(3),
 *   a=>Just(`${a}`)
 * ) === Just ('3')
 * return = pure
 * (>>=)::Functor f => f a -> (a -> f b) -> f b
 */
const safediv = n=>m=> m ===0 ? Nothing : Just(n/m)

export function calc(expr) {
  if(expr instanceof Val) {
    return Just (expr.val)
  } else {
  /**
   * do {
   *   exp1 <- calc(expr.exp1)
   *   exp2 <- calc(expr.exp2)
   *   return safediv exp1 exp2
   * }
   * 
   * 
   * 
   */
    return bind(
      calc(expr.exp1),
      // exp1:: number
      exp1=> bind(
        calc(expr.exp2),
        exp2=>safediv(exp1)(exp2)
      )
    )
  }
}

/**
 * mx >>= (
 *   \x -> my >>=  (\y -> just (x+y))
 * )
 * bind(
 *  Just(1),
 *  x=>{
 *     return bind(Just(2),
 *       y=>{
 *         return bind(Just(3),z=>Just(x+y+z))
 *       }
 *    )
 *  }
 * )
 * do {
 *   x <- Just(1)
 *   y <- Just(2)
 *   z <- Just(3)
 *   Just (x+y+z)
 * }
 * doBlock(
 *   (x,y,z)=>Just(x+y+z),
 *   Just(1),
 *   Just(2),
 *   Just(3),
 * )
 * 
 * 
 *
 * 
 * 
 */