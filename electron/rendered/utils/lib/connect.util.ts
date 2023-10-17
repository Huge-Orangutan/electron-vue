import { settingConfig } from "@/configs";
import { IAPI, IRequestParams } from "@/types";
import { download } from "..";

class Connect {
  private baseUrl;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public request = async <T>(params: IRequestParams): Promise<T> => {
    const { url, data, query, baseUrl, headers, method } = params;

    const options: RequestInit = {
      method: method ? method.toUpperCase() : "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        ...headers,
      },
      body:
        !(data instanceof Object) || data instanceof FormData
          ? data
          : JSON.stringify(data),
    };

    // 如果是GET请求fetch要删除body
    if (method === "GET") delete options.body;

    // 如果是表单数据时删除Content-Type
    if (data instanceof FormData)
      delete options.headers!["Content-Type" as keyof typeof options.headers];

    let requestUrl =
      (baseUrl || this.baseUrl) + url + Connect.mapQueryToPath(query);

    const response = await fetch(requestUrl, options);

    return await Connect.handleResponse(response);
  };

  /**
   * @description 路径参数对象转字符串
   */
  static mapQueryToPath = (queryMap: Record<string, any> | undefined) => {
    if (!queryMap) return "";

    let queryPath = "?";

    for (const key in queryMap) {
      queryPath += key + "=" + queryMap[key] + "&";
    }
    queryPath = queryPath.substring(0, queryPath.length - 1);

    return queryPath.length > 1 ? queryPath : "";
  };

  /**
   * @description 处理fetch返回的response
   */
  static async handleResponse(response: Response): Promise<any> {
    switch (response.status) {
      case 200:
        const responseJson = await response.json();
        const { code } = responseJson;
        if (code === 1) {
          return responseJson;
        } else if ([403, 401000000].includes(code)) {
          if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
            location.reload();
          }
        } 
        break;
      case 201:
        download(response);
        break;
      default:
        throw Error("网络异常，请稍后再试");
    }
  }
}

const connect = new Connect(settingConfig.baseUrl);

/**
 * @description 后端返回信息
 */
export const request = connect.request;

/**
 * @description 后端返回统一模板
 */
export const apiRequest = <T>(params: IRequestParams) => request<IAPI<T>>(params);
