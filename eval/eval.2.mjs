import {Val} from './expr.mjs'
import {Nothing,Just} from '../maybe.mjs'
const safediv = n=>m=> m ===0 ? Nothing : Just(n/m)

export function calc(expr) {
  if(expr instanceof Val) {
    return Just (expr.val)
  } else {
    let exp1 = calc(expr.exp1)
    if(exp1 === Nothing) {
      return Nothing
    } else {
      let exp2 = calc(expr.exp2)
      if(exp2 === Nothing) {
        return Nothing
      } else {
        return safediv(exp1.value)(exp2.value)
      }
    }
  }
}