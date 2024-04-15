export const isNumber = (val: number): val is number =>
  typeof val === 'number' && val === val
