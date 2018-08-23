import {Val} from './expr.mjs'
import {Nothing,Just} from '../../maybe.mjs'
import {pure} from '../../applicatives.mjs'
import {join} from '../../monad.mjs'
// num->num -> maybe num
const safediv = n=>m=> m ===0 ? Nothing : Just(n/m)

/**
 * How to make it work ?
 */
export function calc(expr) {
  if(expr instanceof Val) {
    return Just (expr.val)
  } else {
    // expr -> Just (Just Int)
    return join(
       pure(safediv)
      .ap(calc(expr.exp1))
      .ap(calc(expr.exp2))
      .pure
    )
  }
}