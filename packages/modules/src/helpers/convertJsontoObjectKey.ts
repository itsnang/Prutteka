export function convertJsonToObjectKey<T>(
  json: unknown,
  callback: (v: unknown, i: number) => T
) {
  return Object.keys(JSON.parse(JSON.stringify(json)) as []).map(callback);
}
