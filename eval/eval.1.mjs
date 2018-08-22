import {Val} from './expr.mjs'
// Exp -> Number
// Exp -> Maybe 
export function calc(expr) {
  if(expr instanceof Val) {
    return expr.val
  } else {
    return calc(expr.exp1) / calc(expr.exp2)
  }
}