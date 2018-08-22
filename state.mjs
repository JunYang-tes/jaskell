import {regFunctor} from './functor'
import {regApplicative} from './applicatives.mjs'
import {regMonad} from './monad.mjs'
/**
 * type State = Int
 * type ST a = State -> (a,State)
 * Char -> ST Int Char -> State -> (Int,State)
 * 
 * newtype ST a = S (State -> (a,State))
 */
class ST {
  constructor(st) {
    // State -> (a,State)
    this.fn = st
  }
}
export const S=(fn)=>new ST(fn)

export const app = (st)=> x => st.fn(x)

regFunctor(
  ST,
  f=>st=> new ST(
    s=>{
      let [x,s1] = st.fn(s)
      // let [x,s1] = app(st)(s)
      return [f(x),s1]
    }
  )
)

regApplicative(
  ST,
  x=>S(s=>[x,s]),
  stf => stx => S(
    s=>{
      let [f,s1] = app(stf)(s)
      let [x,s2] = app(stx)(s1)
      return [f( x ),s2]
    }
  )
)

regMonad(ST,
  x=>S(s=>[x,s]),
  st => f => S(
    s=>{
      // st.fn(s)
      //f(x) ::ST
      let [x,s1] = app(st)(s)
      //[x,s2]
      return app(f(x))(s1)
    }
  )
)