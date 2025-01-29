/**
 * API请求模块
 * 提供统一的HTTP请求处理，支持GET和POST请求，包含防抖功能
 */

/**
 * 错误码映射函数
 * @param state 服务器返回的错误码
 * @returns 对应的错误描述信息
 */
const getErrorCode = (state: number): string => {
    switch (state) {
        case 0:
            return "正常";
        case 10012:
            return "参数异常";
        case 200:
            return "成功";
        case 201:
            return "您已经申请成功，请勿重复申请";
        case 202:
            return "该时段申请人数已满，请选择其它时段";
        case 204:
            return "已停止预约";
        case 10001:
            return "未授权";
        default:
            return "未知状态码";
    }
};

// API基础URL，从环境变量中获取
const baseUrl = import.meta.env.MODE == 'production' ? import.meta.env.VITE_API_BASE_URL : "";




/**
 * API请求参数接口
 * @interface Iapi
 * @property {string} url - 请求地址
 * @property {Record<string, any>} [param] - 请求参数
 * @property {'GET' | 'POST'} [method='GET'] - 请求方法
 */
interface Iapi {
    url: string;
    param?: Record<string, any>;
    method?: 'GET' | 'POST';
}

/**
 * API响应接口
 * @interface IApiResponse
 * @template T - 响应数据类型
 * @property {T} data - 响应数据
 * @property {string} code - 错误描述
 * @property {number} [error_code] - 错误码
 */
interface IApiResponse<T = any> {
    data: T;
    code: string;
    error_code?: number;
}

/**
 * 基础API请求函数
 * @param {Iapi} param0 - 请求配置参数
 * @returns {Promise<IApiResponse>} 请求响应
 * @throws {Error} 当请求失败时抛出错误
 */
const baseApiRequest = async ({ url, param, method = "GET" }: Iapi): Promise<IApiResponse> => {
    try {
        if (method === "POST") {
            const formData = new FormData();
            if (param) {
                for (const key in param) {
                    const value = param[key];
                    formData.append(key, String(value));
                }
            }

            const response = await fetch(baseUrl + url, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return { data, code: getErrorCode(data.error_code), error_code: data.error_code };
        } else {
            // GET请求
            const finalUrl = param ? `${baseUrl + url}?${new URLSearchParams(param)}` : baseUrl + url;
            const response = await fetch(finalUrl, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return { data, code: getErrorCode(data.error_code), error_code: data.error_code };
        }
    } catch (error) {
        console.error("请求失败:", error);
        throw error;
    }
};

/**
 * 防抖函数
 * @template T - 函数类型
 * @param {T} fn - 需要防抖的函数
 * @param {number} [wait=300] - 防抖等待时间（毫秒）
 * @returns {(...args: Parameters<T>) => Promise<ReturnType<T>>} 防抖处理后的函数
 */
const debounce = <T extends (...args: any[]) => any>(fn: T, wait: number = 300): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
    let timer: NodeJS.Timeout | null = null;
    return (...args: Parameters<T>) => {
        return new Promise((resolve) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                resolve(fn(...args));
            }, wait);
        });
    };
};

// 带防抖的GET请求
const debouncedGet = debounce(async (params: Iapi) => {
    return await baseApiRequest({ ...params, method: "GET" });
});

/**
 * 统一的API请求函数
 * @param {Iapi} params - 请求参数
 * @returns {Promise<IApiResponse>} 请求响应
 * 
 * @example
 * // GET请求示例
 * const getUsers = async () => {
 *   try {
 *     const response = await api({
 *       url: '/api/users',
 *       method: 'GET',
 *       param: { page: 1 }
 *     });
 *     console.log(response.data);
 *   } catch (error) {
 *     console.error(error);
 *   }
 * };
 * 
 * // POST请求示例
 * const login = async (username: string, password: string) => {
 *   try {
 *     const response = await api({
 *       url: '/api/login',
 *       method: 'POST',
 *       param: { username, password }
 *     });
 *     console.log(response.data);
 *   } catch (error) {
 *     console.error(error);
 *   }
 * };
 */
const api = async (params: Iapi): Promise<IApiResponse> => {
    if (params.method === "POST") {
        return await baseApiRequest(params);
    } else {
        return await debouncedGet(params);
    }
}

export default api;