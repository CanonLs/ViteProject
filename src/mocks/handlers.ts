import { http, HttpResponse } from 'msw'


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
    http.post('/api/login', async ({ request }) => {
        const formData = await request.formData()
        const username = formData.get('username') as string
        const password = formData.get('password') as string

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