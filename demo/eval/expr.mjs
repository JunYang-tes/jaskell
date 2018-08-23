class Expr {}
export class Val extends Expr {
  constructor(val) {
    super()
    this.val = val
  }
}
export class Div extends Expr {
  constructor(exp1,exp2) {
    super()
    this.exp1 = exp1
    this.exp2 = exp2
  }
}
export const val = n => new Val(n)
/**
 * div(
      val(1),val(2)
  * )
 */

export const div = (exp1,exp2) => new Div(exp1,exp2)

