import { clone } from 'rambda';

export function cleanNullProps(
  obj: Record<string, unknown>
): Record<string, unknown> {
  if (typeof obj !== 'object') return obj;

  const tmp = clone(obj);
  Object.keys(tmp).forEach(
    (k) =>
      (tmp[k] &&
        typeof tmp[k] === 'object' &&
        cleanNullProps(tmp[k] as Record<string, unknown>)) ||
      (!tmp[k] && tmp[k] !== undefined && delete tmp[k])
  );
  return tmp;
}
