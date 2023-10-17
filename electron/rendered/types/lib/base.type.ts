export type CustomTreeData<T> = T & {
  children?: CustomTreeData<T>[];
};
