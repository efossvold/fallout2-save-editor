export const basename = (path: string): string => path.split('/').toReversed().at(0) ?? ''

export const dirname = (path: string): string => {
  const parts = path.split('/')
  parts.pop()
  return parts.join('/')
}
