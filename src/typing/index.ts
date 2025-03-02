export interface TUseHook<T> {
  (init?: any): T
}

export type ModelOptions = {
  global?: boolean // 是否是全局
};

export type ModelObj = Record<string, any>;
export type Model = TUseHook<any>;
export type ModelArray = ReadonlyArray<Model>;
export type ModelType = Model | ModelArray;
export type ComponentProps = Record<string, unknown>;
// 执行可执行元素
type Exec<T> = T extends (...args: any) => any ? ReturnType<T> : T;
// 处理元组, 将可执行函数元素转换为 返回值
export type ExecutedRes<T extends ModelArray> = T extends readonly [
  infer R,
  ...infer U
]
  ? R extends never
    ? []
    : readonly [Exec<R>, ...(U extends ModelArray ? ExecutedRes<U> : [])]
  : [];
// 合并属性
type Assign<T extends Record<any, any>, V extends Record<any, any>> = {
  [key in keyof (T & V)]: (T & V)[key]
};
// 元组转对象
export type TupleToObject<T extends readonly any[]> = T extends readonly [
  infer R,
  ...infer U
]
  ? R extends string | number
    ? Assign<Record<R, R>, TupleToObject<U>>
    : R extends Record<any, any>
    ? Assign<{ [k in keyof R]: R[k] }, TupleToObject<U>>
    : {}
  : {};