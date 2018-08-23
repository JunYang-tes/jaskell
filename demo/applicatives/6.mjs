import {ap,pure,leaf,node} from '../../tree.mjs'
const tree = node(
  node(leaf(1),leaf(2)),
  node(leaf(3),leaf(4))
)
// pure id <*> x = x
console.log(
  "#1\n",
  ap(
    pure(i => i)
  )(tree)
)


// pure (g x) == pure g <*>  pure x
let g = a=>a+1
console.log(
  "#2\n",
  pure(g(1)),
  ap(
    pure(g)
  )(pure(1))
)


// x <*> pure y == pure(\g->g(y)) <*> x
let x = pure(g)
console.log(
  '#3\n',
  ap(x)(pure(1)),
  ap(
    pure(g=>g(1))
  )(x)
)

// x <*> (y <*> z) = (pure(.) <*> x <*> y) <*> z
x= pure(a=>a+1)
let y= pure(a=>a*2)
let z = pure(2)
const dot = f=>g=>a=>f(g(a))
console.log(
  '#4\n',
  ap(x)(
    ap(y)(z)
  ),
  ap(
    ap(
      ap(
        pure(dot)
      )(x)
    )(y)
  )(z)
)