import {bind,pure} from '../../monad.mjs'
import {Just,Maybe} from '../../maybe.mjs'
let x = 1
let f= a=>Just(a+1)
console.log(
  `#1 return x >>= f == f x \n`,
  bind(pure(Maybe)(x),f),
  f(x)
)
console.log(
  `# mx >>= return == mx\n`,
  bind(Just(1),pure(Maybe)),
  Just(1)
)

let g= a=>Just(2*a)
let mx = Just(1)
console.log(
  `#3 (mx>>=f) >>= g == mx >>= (\\x->(f x >>= g))\n`,
  bind(
    bind(
      mx,
      f
    ),
    g
  ),
  bind(
    mx,
    x=>bind(
      f(x),
      g
    )
  )
)
