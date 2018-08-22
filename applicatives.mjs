  /**
   * [prototype]:{
   *    pure:fn
   *    ap: fn 
   * }
   * */
import {Instance} from './utils.mjs'
import {fmap} from './functor.mjs'
const applicatives=new Instance()

//模拟中缀表达式
class AP {
  constructor(f) {
    this.fn = f
  }
  ap(functor) {
    const {ap,pure} = applicatives.find(functor)
    if(!this.pure) {
      this.pure = pure(this.fn)
    }
    this.pure = ap(this.pure)(functor)
    return this;
  }
}
export const ap = (ff)=>fa=> {
  const {ap} = applicatives.find(fa)
  return ap(ff)(fa)
}
export function regApplicative(type,pure,ap){
  applicatives.instance(
    type,
    {
      pure,ap
    }
  )
}
export const pure = value=> new AP(value)
// (<$>):: 
export const map = (f)=>fa=> {
  const ap = new AP()
  ap.pure = fmap(f)(fa)
  return ap
}


regApplicative(
  Array,
  x=>[x],
  // [ a->b] ->[a]->[b]
  // gs:: [a->b]
  // xs:: [a]
  gs => xs =>{
    let ret =[]
    for(let f of gs){
      for(let x of xs) {
        ret.push(
          f(x)
        )
      }
    }
    //[b]
    return ret
  }
)


const arrCat = arr=>a=>[...arr,a]
// cat:: A [a] -> A a -> A [a]
export const append =(ma)=>a=>{
  debugger;
  return pure(arrCat)
    .ap(ma)
    .ap(a)
    .pure
}