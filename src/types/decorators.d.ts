export type ClassDecoratorType = <ClassConstructorT extends { new (...args: any[]): {} }>(
  constructor: ClassConstructorT,
  context: ClassDecoratorContext
) => void

export type ExceptionHandlerParamType = <ExceptionT>(exception: ExceptionT) => any
export type ExceptionHandlerType = (exceptionHandler?: ExceptionHandlerParamType) => ClassDecoratorType