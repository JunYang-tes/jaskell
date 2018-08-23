import {Nothing,Just} from '../maybe.mjs'
import {fmap} from '../functor.mjs'
import {bind} from '../monad.mjs'

console.log(
  fmap(a=>a+1)(Just(1))
)

console.log(
  fmap(a=>a+1)(Nothing)
)

console.log(
  bind(Just(1),v=>Just(`It's ${v}`))
)