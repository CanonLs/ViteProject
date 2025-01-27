import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import styles from "./error.module.scss";

const Error = () => {
	const error = useRouteError();
	const navigate = useNavigate();

	const getErrorMessage = () => {
		if (isRouteErrorResponse(error)) {
			return `${error.status} ${error.statusText}`;
		}
		return "未知错误";
	};
	return (
		<div className={styles["error-page"]}>
			<div
				className={styles["error-content"]}>
				<h1>出错了！</h1>
				<p className={styles["error-message"]}>{getErrorMessage()}</p>
				<button onClick={() => navigate("/")} className={styles["back-button"]}>
					返回首页
				</button>
			</div>
		</div>
	);
};
export default Error;