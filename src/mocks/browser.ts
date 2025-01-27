import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// 创建MSW worker实例
export const worker = setupWorker(...handlers)

// 启动MSW服务
if (import.meta.env.MODE === 'development') {
  worker.start({
    onUnhandledRequest: 'bypass', // 对未处理的请求直接放行
  })
}