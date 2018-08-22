import {regFunctor,fmap} from './functor.mjs'
import {regApplicative} from './applicatives.mjs'
import {regMonad} from './monad.mjs'
import util from 'util'

export class Maybe {
  constructor(value) {
    this.value=value
  }
  inspect() {
    if(this.value!=null) {
      return `Just ${util.inspect(this.value)}`
    } else {
      return 'Nothing'
    }
  }
}
export const Nothing = new Maybe()
export function Just(value) {
  if(value==null) {
    return Nothing
  } else {
    return  new Maybe(value)
  }
}
/**
 * instance Functor Maybe where
  -- fmap :: (a->b) -> Maybe a -> Maybe b
 *   fmap _ Nothing = Nothing
 *   fmap g (Just x) = Just (g x)
 */
regFunctor(Maybe ,f=>maybe=> maybe === Nothing ? Nothing : Just(
  f(maybe.value)
))

regApplicative(Maybe,
  Just,
  // fn=>maybe=> fmap(fn.value)(maybe)
  // fmap
  fn => fmap(fn.value)
)

regMonad(Maybe,
  Just,

  mx => f => mx === Nothing 
  ? Nothing
  // f:: a-> f b
  : f(mx.value)
)