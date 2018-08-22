import {Val} from './expr.mjs'
import {Nothing,Just} from '../maybe.mjs'
import {doBlock} from '../monad.mjs'
const safediv = n=>m=> m ===0 ? Nothing : Just(n/m)

export function calc(expr) {
  if(expr instanceof Val) {
    return Just (expr.val)
  } else {
    return doBlock(
      safediv,
      calc(expr.exp1),
      calc(expr.exp2)
    )
  }
}