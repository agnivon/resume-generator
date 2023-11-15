export function exclude<T, K extends keyof T>(user: T, keys: K[]): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(user as any).filter(([key]) => !keys.includes(key as K))
  ) as Omit<T, K>;
}
