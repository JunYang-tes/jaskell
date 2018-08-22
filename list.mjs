import {regApplicative} from './applicatives'
import {regMonad} from './monad.mjs'
regApplicative(
  Array,
  x=>[x],
  gs => xs =>{
    let ret =[]
    for(let f of gs){
      for(let x of xs) {
        ret.push(
          f(x)
        )
      }
    }
    return ret
  }
)

regMonad(
  Array,
  x=>[x],
  // [a] -> (a->[b]) -> [b]
  m=>f=>{
    let ret=[]
    for(let i of m) {
      ret.push(
        ...f(i)
      )
    }
    return ret
  }
)