import './list.mjs'
import {Just} from './maybe.mjs'
import {doBlock,bind} from './monad.mjs'
debugger;
/**
 * do {
 *   v1 <- [1,2]
 *   v2 <- [3,4]
 *   return [v1,v2]
 * }
 */
// console.log(
//   doBlock(
//     (v1,v2)=>[[v1,v2]],
//     [1,2],
//     [3,4]
//   )
// )
// console.log(
//   doBlock(
//     (v1,v2)=>[v1,v2],
//     [1,2],
//     [3,4]
//   )
// )
// console.log(
//   doBlock(
//     (v1,v2)=>Just(v1+v2),
//     Just(1),
//     Just(2)
//   ),
// )


// console.log(
//   /**
//    * do {
//    *   v1 <- return [1,2]
//    *   v2 <- return [3,4]
//    *   v3 <- return [5,6]
//    *   return [v1,v2,v3]
//    * }
//    */
//   doBlock(
//     (v1,v2,v3)=>{
//       return [v1+v2+v3]
//     },
//     [1,2],
//     [3,4],
//     [5,6]
//   )
// )
console.log(
  doBlock(
    (a, b, c, d) => Just([a, b, c, d]),
    Just(1),
    Just(2),
    Just(3),
    Just(4)
  )
)

console.log(
  doBlock(
    (a, b, c, d) => [[a, b, c, d]],
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8]
  )
)
// Just [1,2]
console.log(
  doBlock(
    // NOT allowed in haskells
    (v1,v2)=>{
      return [v1,v2]
    },
    Just(1),
    Just(2)
  )
)

const pairs=(xs,ys)=>doBlock(
  (x,y)=>[x,y],
  xs,
  ys
)
console.log(
  pairs([1,2],[3,4])
)