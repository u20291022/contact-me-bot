import { ClassDecoratorType, ExceptionHandlerType } from "./decorators.d"

/**
 * @description
 * This decorator will log when constructor is called
 */
export const LogClassCreationD: ClassDecoratorType = (constructor, context) => {
  console.log(`[${constructor.name}] constructor was called!`)
}

/**
 * @param exceptionHandler
 * Function that calls in catch block
 * 
 * By default it will log exception with console.log
 * 
 * @description
 * It will be call methods with try {} catch(error: T) {} blocks 
 * 
 * This decorator will be applied to every class method
 */
export const ExceptionHandlerD: ExceptionHandlerType = (exceptionHandler?) => {
  return <ClassDecoratorType>function(constructor, context) {
    const propertyNames = Object.getOwnPropertyNames(constructor.prototype)

    propertyNames.forEach(propertyName => {
      const descriptor = Object.getOwnPropertyDescriptor(constructor.prototype, propertyName)
    
      // skip all properties that are not class methods
      if (propertyName === "constructor" || !descriptor || !(descriptor.value instanceof Function)) {
        return
      }

      // save origin function
      const origin: Function = descriptor.value

      // decorate method
      descriptor.value = function (...args: any[]) {
        try {
          return origin.call(this, ...args)
        }
        catch(exception) {
          console.log(`[${constructor.name}:${propertyName}] throwed exception!`)

          if (exceptionHandler) {
            return exceptionHandler(exception)
          }

          console.log(exception) // simply log exception if we dont have exception handler
        }
      }

      // set new decorated method
      Object.defineProperty(constructor.prototype, propertyName, descriptor)
    })
  }
}