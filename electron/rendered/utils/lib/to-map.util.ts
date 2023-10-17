/**
 * 将数组转化为对象
 * @param array 
 * @param key 
 * @returns 
 */
export const toObject = <T extends Record<string, any>>(
  array: T[],
  key: keyof T
) => {
  const map = <Record<T[keyof T], T>>{};
  array.forEach((item) => {
    const mapKey = item[key];
    map[mapKey] = item;
  });

  return map;
};
