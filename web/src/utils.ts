
export const randomizeArray = <T>(items: T[]) => {
  return items.map((c) => ({val: c, sort: Math.random()}))
    .sort((x, y) => x.sort - y.sort)
    .map(({val}) => val)
}