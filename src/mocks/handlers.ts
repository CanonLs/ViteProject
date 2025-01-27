import { http, HttpResponse } from 'msw'

interface IDataType{
    username:string
    password:string
}
// 定义模拟的API处理程序
export const handlers = [
    // 示例：模拟GET请求
    http.get('/api/users', () => {
        return HttpResponse.json([
            { id: 1, name: '用户1' },
            { id: 2, name: '用户2' },
        ])
    }),

  // 示例：模拟POST请求
  http.post<never, IDataType>('/api/login', async ({ request }) => {
        const { username, password } = await request.json()

        if (username === 'admin' && password === '123456') {
            return HttpResponse.json({
                status: 'success',
                token: 'mock-jwt-token'
            })
        }

        return new HttpResponse(
            JSON.stringify({
                status: 'error',
                message: '用户名或密码错误'
            }),
            { status: 401 }
        )
    })
]