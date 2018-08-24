  /**
   * [prototype]:{
   *    pure:fn
   *    ap: fn 
   * }
   * */
import {curray} from './utils.mjs'
import {functors,fmap} from './functor.mjs'
import {TypeClass} from './type-class.mjs'
export const applicatives=new TypeClass(
  'Applicative',
  functors,
  [{
    // pure::Applicative f=> a -> f a
    name:'pure',
    argc:1
  },{
    //(<*>)::Applicative f=> f (a->b) -> f a -> f b
    name:'ap',
    instanceIndex:1,
    argc:2
  }]
)

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
    return this
  }
}
export const ap = applicatives.$ap 
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
export const append =curray((ma,a)=>{
  return pure(arrCat)
    .ap(ma)
    .ap(a)
    .pure
})