import { motion, MotionStyle } from "framer-motion";
import React from "react";

/**开启长图模式 */
const isLongPage: boolean = import.meta.env.VITE_LONGPAGE == "true" ? true : false;
/**页面跳转动画 */
const isRouteJumpAni: number = import.meta.env.VITE_ANIMATION == "true" ? 0.1 : 0;

type RouteJumpAniProps = {
	children: React.ReactNode;
	initial?: boolean;
};
let style: MotionStyle = {
	width: "100%",
	height: "100%",
	position: "absolute",
	top: 0,
	left: 0,
	overflow: isLongPage ? "scroll" : "hidden",
};

const RouteJumpAni = ({ children }: RouteJumpAniProps) => {
	const AniBoxName = (): string => {
		let name: string = "";
		if (React.isValidElement(children)) {
			if (typeof children.type === "string") {
				console.log(children.type);
			} else {
				name = children.type.name;
			}
		}
		return name;
	};
	const variants = {
		hidden: { opacity: 0 }, enter: { opacity: 1 }, exit: { opacity: 0 }
	};
	return (
		<motion.div className={AniBoxName() + "AniBox"} initial="hidden" animate="enter" exit="exit" variants={variants} transition={{ duration: isRouteJumpAni, ease: "linear" }} style={style}>
			{children}
		</motion.div>
	);
};
export default RouteJumpAni;
