export interface IRequestParams extends RequestInit {
  baseUrl?: string;
  url: string;
  query?: Record<string, unknown>;
  data?: Record<string, unknown> | FormData | string | unknown[];
}

/**
 * @description 模板接口
 * @param code 标识
 * @param msg 信息
 * @param params 未知
 * @param result 结果
 **/
export interface IAPI<T> {
  code: number;
  msg: string;
  params: unknown;
  result: T;
}

/**
 * @description 列表
 * @param data 数据
 * @param pageNum 当前页
 * @param pageSize 每页数量
 * @param totalCount 总数
 * @param totalPage 总页数
 **/
export interface IList<T> {
  data: T;
  pageNum: number;
  pageSize: number;
  totalCount: number;
  totalPage: number;
}
