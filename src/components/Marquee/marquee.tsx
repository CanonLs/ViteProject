import { useRef } from "react";

import styles from "./index.module.scss";
interface IProps {
	text: string;
}
const Marquee = ({ text }: IProps) => {
	const marqueeRef = useRef<any>(null);
	return (
		<div className={styles.marqueeContainer}>
			<div className={styles.marqueeContent} ref={marqueeRef}>
				<span>{text}</span>
			</div>
		</div>
	);
};
export default Marquee;
