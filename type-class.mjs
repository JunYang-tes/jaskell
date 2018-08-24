import {currayN, call,Instance} from './utils.mjs'
export class TypeClass {
  /**
   * 
   * @param name 
   * @param superTypeclass 
   * @param methods [{
   *  name: string,
   *  argc: number,
   *  instanceIndex: number
   * }]
   */
  constructor(name,superTypeclass,methods){
    this.name = name,
    this.instances = new Instance()
    this.methods = methods
    this.superTypeclass = superTypeclass

    const methodGen = (description)=>{
      let {argc,instanceIndex} = description
      if(argc == undefined) {
        throw new Error(`argc is required`)
      }
      let imp
      if(instanceIndex == undefined) {
        argc++
        imp = (type,...args)=>{
          const impls = this.findByType(type)
          if(!impls) {
            throw new Error(`${type} is not a ${name}`)
          }
          return call(impls[description.name],...args)
        }
      } else {
        imp = (...args) => {
          const impls = this.find(args[instanceIndex])
          if (!impls) {
            throw new Error(`${args[instanceIndex]} is not a ${name}`)
          }
          return call(impls[description.name],...args)
        }
      }
      return currayN(
        imp,argc
      )
    }
    for(let d of methods) {
      this[`$${d.name}`] = methodGen(d)
    } 
  }

  instance(type,methods) {
    if(this.superTypeclass && !this.superTypeclass.findByType(type)){
      throw new Error(`${type} is not a ${this.superTypeclass.name}`)
    }

    this.instances.instance(
      type,
      methods
    )
  }
  find(obj) {
    return this.instances.find(obj)
  }
  findByType(type) {
    return this.instances.findByType(type)
  }

  static isInstanceOf(type,typeClass) {
    return typeClass.findByType(type)
  }

}