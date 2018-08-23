// import {calc} from './eval.1.mjs'
// import {calc} from './eval.2.mjs'
import {calc} from './eval.3.mjs'
// import {calc} from './eval.4.mjs'
// import {calc} from './eval.5.mjs'
import {val,div} from './expr.mjs'
debugger;
console.log(
  calc(
    div(
      val(1),val(2)
    )
  )
)

console.log(
  calc(
    div(
      val(1),val(0)
    )
  )
)

console.log(
  calc(
    div(
      div(val(1),val(2)),
      val(2)
    )
  )
)