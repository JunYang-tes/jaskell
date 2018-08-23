const inc = (arr) => {
  if(arr.length) {
    let [head,...tail] = arr
    return [
      head +1,
      ...inc(tail)
    ]
  } else {
    return arr
  }
}

const sqr = (arr) =>{
  if(arr.length) {
    let [head,...tail] = arr
    return [
      head * head,
      ...sqr(tail)
    ]
  } else {
    return arr
  }
}

console.log(inc([1,2,3]))
console.log(sqr([1,2,3]))