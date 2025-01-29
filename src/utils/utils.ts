// ============================= 基础工具函数 =============================

/**
 * 延迟函数
 * @param ms 延迟时间（毫秒）
 * @returns Promise
 */
export const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * 获取指定范围内的随机整数
 * @param min 最小值
 * @param max 最大值
 * @returns 随机整数
 */
export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// ============================= 字符处理工具 =============================

/**
 * 计算字符串长度（中文字符计2，其他字符计1）
 * @param str 要计算的字符串
 * @returns 字符串长度
 */
export const charSpacing = (str: string): number => {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char.match(/[\u4e00-\u9fa5]|[0-9]/)) {
      count += 2; // 中文字符长度为2
    } else {
      count += 1; // 英文字符长度为1
    }
  }
  return count;
};

// ============================= 设备检测工具 =============================

/**
 * 检测是否在微信环境中
 * @returns 是否是微信环境
 */
export const isWechat = (): boolean => {
  const ua = navigator.userAgent.toLowerCase();
  const isWXWork = ua.match(/wxwork/i) !== null;
  const isWeixin = !isWXWork && ua.match(/MicroMessenger/i) !== null;
  return isWeixin;
};

/**
 * 获取用户设备类型
 * @returns 设备类型 ('iOS' | 'Android' | 'PC')
 */
export const getUserAgent = (): string => {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return "iOS";
  } else if (/(Android)/i.test(navigator.userAgent)) {
    return "Android";
  }
  return "PC";
};

/**
 * 获取学习强国App版本号
 * @returns 版本号字符串
 */
export const getAppVersion = (): string => {
  const { userAgent } = window.navigator;
  let version = "";
  if (userAgent.indexOf("Device/XueXi") > -1 && userAgent.indexOf("XueXi/") > -1) {
    const matchArr = userAgent.match(/XueXi\/(\S+)/g);
    if (matchArr && matchArr.length > 1 && matchArr[matchArr.length - 1].match(/(2\.35\.)|(2\.34\.)/)) {
      version = matchArr[matchArr.length - 1].replace(/XueXi\//, "");
    } else {
      const matchArray = userAgent.match(/XueXi\/(.*)/);
      version = matchArray && matchArray[1] ? matchArray[1] : "";
      version = version.replace(/\/.*/, "").replace(/\s.*/, "");
    }
  }
  return version;
};

// ============================= 地图工具 =============================

/**
 * 加载腾讯地图GL版本
 * @param key 腾讯地图API密钥
 * @returns Promise
 */
export const TMapGL = (key: string): Promise<any> => {
  if (window.TMap) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://map.qq.com/api/gljs?v=1.exp&libraries=service&key=${key}`;
    script.onerror = err => reject(err);
    script.onload = e => resolve(e);
    document.head.appendChild(script);
  });
};

// ============================= 时间工具 =============================

/**
 * 将JS时间戳转换为PHP时间戳
 * @returns PHP格式的时间戳
 */
export const jstophpTimestamp = (): number => {
  const timestamp = new Date().getTime();
  return Math.floor(timestamp / 1000) + 2208988800;
};

// ============================= 正则表达式工具 =============================

/**
 * 常用正则表达式模式
 */
export const RegexPatterns = {
  // 邮箱
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  // 手机号（中国大陆）
  PHONE_CN: /^1[3-9]\d{9}$/,
  // URL
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  // 身份证号（中国大陆）
  ID_CARD_CN: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  // 邮政编码（中国大陆）
  POSTAL_CODE_CN: /^\d{6}$/,
  // 纯数字
  NUMBERS_ONLY: /^\d+$/,
  // 纯字母
  LETTERS_ONLY: /^[a-zA-Z]+$/,
  // 字母和数字
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  // 中文字符
  CHINESE_CHARS: /^[\u4e00-\u9fa5]+$/,
  // 密码（至少8位，包含大小写字母和数字）
  STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
};

/**
 * 正则表达式验证函数
 * @param value 要验证的值
 * @param pattern 正则表达式模式（可以是预定义的模式名称或自定义的正则表达式）
 * @returns 是否匹配
 * 
 * @example
 * // 使用预定义模式
 * validateRegex('test@example.com', 'EMAIL'); // true
 * validateRegex('13812345678', 'PHONE_CN'); // true
 * 
 * // 使用自定义正则表达式
 * validateRegex('123', /^\d+$/); // true
 */
export const Regex = (value: string, pattern: keyof typeof RegexPatterns | RegExp): boolean => {
  if (typeof pattern === 'string') {
    return RegexPatterns[pattern].test(value);
  }
  return pattern.test(value);
};