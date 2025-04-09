import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./login.module.scss";
import Api from "@services/api";


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    console.log(`到达loginPage`, location);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // 简单的表单验证
        if (!formData.username || !formData.password) {
            setError("请填写所有字段");
            return;
        }


        const loginData = await login(formData.username, formData.password)
        if (loginData.status != 'success') false;

        // 模拟登录成功
        localStorage.setItem("token", "demo-token");
        localStorage.setItem("userRole", "admin");

        // 获取重定向地址或默认跳转到首页
        console.log(location, 'loginOk');

        let from = "/";
        if (location.state?.from?.pathname && location.state.from.pathname !== "/login") {
            console.log(from);

            from = location.state.from.pathname;
        }
        navigate(from, { replace: true });
    };

    const login = async (u: string, p: string) => {
        try {
            const response = await Api({
                url: 'api/login',
                method: 'POST',
                param: { username: u, password: p }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: error instanceof Error ? error.message : '请求失败'
            };
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h2>登录</h2>
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        name="username"
                        placeholder="用户名"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        name="password"
                        placeholder="密码"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className={styles.loginButton}>
                    登录
                </button>
            </form>
        </div>
    );
};

export default Login;