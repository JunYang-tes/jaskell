
import './list.mjs'
import {Just} from './maybe.mjs'
import {doBlock,combine,mapM} from './monad.mjs'
// import {S} from './state.mjs'

// console.log(
//   combine(
//     Just(1),
//     Just(2),
//     (v1,v2)=>v1+v2
//   )
// )

// console.log(
//   combine(
//     Just(1),
//     Just(2),
//     (v1,v2)=>Just(v1+v2)
//   )
// )

// const tmp =  combine(
//     Just(1),
//     Just(2),
//     (v1,v2)=>[v1,v2]
// )
// const tmp1 = combine(
//   tmp,
//   Just(3),
//   (arr,v2)=> {
//     console.log(arr,v2)
//     return [
//       ...arr,
//       v2
//     ]
//   }
// )
// console.log(`tmp,tmp1`,tmp,tmp1)


// const s = S(n=>[n,n+1])
// const s1 = combine(
//   s,
//   s,
//   (f1,f2)=>{
//     console.log("f1,f2",f1,f2)
//     return [f1,f2]}
// )
// const s2 = combine(
//   s1,
//   s1,
//   (arr,f3)=>{
//     return [
//       ...arr,f3
//     ]
//   }
// )
function combine3(f, m1, m2, m3) {
  let tmp = combine(m1, m2, (v1, v2) => {
    return [v1, v2]
  })
  return combine(tmp, m3, (arr, v) => {
    let all = [...arr, v]
    return f(...all)
  })
}
// console.log(
//   combine3(
//     (a, b, c) => [a, b, c],
//     [1, 2],
//     [3, 4],
//     [5, 6]
//   )
// )
// console.log(
//   doBlock(
//     (a, b, c) =>(a + b + c),
//     Just(1),
//     Just(2),
//     Just(3)
//   )
// )
// console.log(
//   doBlock(
//     (a,b)=>([a+b]),
//     Just(1),Just(3)
//   )
// )


// [3,3]
// console.log(
//   combine3(
//     (a,b,c)=>a+b+c,
//     s,
//     s,
//     s
//   ).fn(1)
// )


// console.log(
//   combine3((a, b, c) => a + b + c,
//     Just(1),
//     Just(2),
//     Just(3)
//   )
// )
// console.log(
//   combine3(
//     (v1, v2, v2) => v1 + v2 + v3,
//     Just(1),
//     Just(2),
//     Just(3)
//   )
// )

// console.log("s1==",s1.fn(0))


// console.log(
//   doBlock(
//     a=>a+1,
//     [1,2],
//     []
//   )
// )
console.log(mapM(a=>Just(a+1))([1,2,3]))