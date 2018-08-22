import {Instance} from './utils.mjs'
const functors = new Instance()
export function regFunctor(type,f) {
  functors.instance(
    type,f
  )
}
export const fmap = f => fa => {
  const map = functors.find(fa)
  if(!map) {
    throw new Error(`is not a functor`)
  } else {
    return map(f)(fa)
  }
}

regFunctor(Array,
  f=>arr=>arr.map(f)
)