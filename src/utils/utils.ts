/**
 * 延迟函数
 * @param ms 延迟时间（毫秒）
 * @returns Promise
 */
export const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * 常用正则表达式模式
 */
export const RegexPatterns = {
  // 邮箱
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  // 手机号（中国大陆）
  PHONE_CN: /^1[3-9]\d{9}$/,
  // URL
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
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