import {append} from './applicatives.mjs'
  /**
   * return :: a=> F a
   * 
   * bind::Applicative m => m a -> (a-> m b) -> m b
   */
import {Instance} from './utils.mjs'
const monads = new Instance() 

export function regMonad(type,pure,bind) {
  monads.instance(type,{pure,bind})
}
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
export function bind(m,f){
  const b = monads.find(m)
  return b.bind(m)(f)
}
export const pure = type=>value => {
  const b = monads.findByType(type)
  return b.pure(value)
}
// M x -> M y -> (x->y-> M z)
export function combine(m1,m2,f){
  return bind(m1,v1=>{
    return bind(m2,v2=>{
      const {pure} = monads.find(m1)
      let ret
      if(f.length===1) {
        ret = f(v1)(v2)
      } else {
        ret = f(v1,v2)
      }
      if(ret.__proto__ === m1.__proto__) {
        return ret
      }
      return pure(ret)
    })
  })
}

export function doBlock(f, ...ms) {
  if (ms.length === 1) {
    return bind(ms[0], (...args) => {
      const { pure } = monads.find(ms[0])
      return pure(
        f(...args)
      )
    })
  } else if(ms.length === 2) {
    const [first,second] = ms
    return combine(
      first,second,f
    )
  } else {
    let [first,second,...rest] = ms
    let {pure} = monads.find(first)
    let tmp = combine(first,second,(v1,v2)=>pure([v1,v2]))
    for(let i=0;i<rest.length-1;i++){
      tmp = combine(tmp,rest[i],(arr,v)=>{
        return pure([
          ...arr,v
        ])
      })
    }
    return combine(
      tmp,rest[rest.length-1],
      (arr,v)=>{
        let arrs = [...arr,v]
        if(f.length===1) {
          let ret =f (arrs.shift())
          while(arrs.length) {
            ret = ret(arrs.shift())
          }
          return ret
        } else {
          return f(...arrs)
        }
      }
    )
  }
}

//mapM :: Monad m => (a-> m b) -> [a] -> m [b]
// export const mapM= f => xs => {
//   if(xs.length === 0) {
//     return []
//   }
//   const [x,...rest] = xs
//   return doBlock(
//     (y,ys)=> [y,...ys],
//     f(x),
//     mapM(f)(rest)
//   )
// }
export const mapM=(f,type)=>xs=>{
  const pure = typeof type ==='function' ? type : 
  monads.findByType(type).pure
  const mapM_ = xs=>{
    if(xs.length===0){
      return pure([])
    } else {
      const [x,...rest] = xs
      return doBlock(
        (y,ys)=>pure([y,...ys]),
        f(x),
        mapM_(rest)
      )
    }
  }
  return mapM_(xs)
}


// filterM :: Monad m => (a->m bool) -> [a] -> m [a]
export const filterM = (f, type) => xs => {
  const pure = typeof type ==='function' ? type : monads.findByType(type).pure

  const filterM_ = (f) => xs => {
    if (xs.length === 0) {
      return pure([])
    }
    let [head, ...tails] = xs
    return doBlock(
      (y, ys) => {
        return pure(y ? [head, ...ys] : ys)
      },
      f(head),
      filterM_(f)(tails)
    )
  }
  return filterM_(f)(xs)
}

//join :: Monad m => m (m a) -> m a
export const join = mmx=> bind(mmx,
  mx=>bind(mx,x=>{
    const {pure} = monads.find( mx )
    return pure(x)
  })
)