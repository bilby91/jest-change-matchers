/* tslint:disable */

declare namespace jest {
  interface Matchers<R> {
    toChange: (
      target: () => Promise<any>,
    ) => Promise<{ message(): string, pass: boolean }>,
    toChangeBy: (
      target: () => Promise<number>,
      changeCount: number
    ) => Promise<{ message(): string, pass: boolean }>,
    toChangeFromTo: (
      target: () => Promise<any>,
      from: any,
      to: any
    ) => Promise<{ message(): string, pass: boolean }>,
  }
}