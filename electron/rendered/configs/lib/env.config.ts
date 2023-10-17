/**
 * 环境枚举  
 * --DEV 开发  
 * --PROD 生产
 */
enum EnvironmentEnum {
  DEV = "development",
  PROD = "product",
}

type Environment<T> = {
  [EnvironmentEnum.DEV]: T;
  [EnvironmentEnum.PROD]: T;
};

/**
 * 两个环境的Config
 */
type EnvironmentConfig = Record<string, Environment<unknown>>;

/**
 * 过滤后Config
 */
type FilterConfig<T extends EnvironmentConfig> = {
  [P in keyof T]: T[P][EnvironmentEnum];
};

class BaseConfig<T extends EnvironmentConfig = EnvironmentConfig> {
  private config: T;

  constructor(config: T) {
    this.config = config;
  }

  /**
   * 根据环境选择参数(vite)
   */
  public getConfig() {
    const config = <FilterConfig<typeof this.config>>{};

    BaseConfig.getKeys(this.config).forEach((key) => {
      config[key] =
        this.config[key][
          import.meta.env.DEV ? EnvironmentEnum.DEV : EnvironmentEnum.PROD
        ];
    });
    return config;
  }

  /**
   * 获取Key
   */
  private static getKeys<T extends Object>(obj: T) {
    return Object.keys(obj) as Array<keyof T>;
  }
}


const config = {
  baseUrl: {
    [EnvironmentEnum.DEV]: "http://mail.qm520.com.cn/api",
    [EnvironmentEnum.PROD]: "http://mail.qm520.com.cn/api",
  },
  host: {
    [EnvironmentEnum.DEV]: "http://mail.qm520.com.cn/",
    [EnvironmentEnum.PROD]: "http://mail.qm520.com.cn/",
  }
};

export const settingConfig = new BaseConfig(config).getConfig();
