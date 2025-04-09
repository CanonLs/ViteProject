import { createBrowserRouter, RouterProvider, createHashRouter, Navigate } from "react-router-dom";
// import { lazy, Suspense } from "react";
//frame-motion动画包裹组件
import RouteJumpAni from "@layout/routeJumpAni";

//引入组件
import Root from "@/App";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Error from "@/pages/Error";
import Login from "@/pages/Login";
//引入懒加载组件
// const About = lazy(() => import("../page/About"));

const routeConfiguration = [
	{
		path: "/",
		element: <Root />,
		errorElement: <Error />,
		children: [
			{
				path: "/",
				element: (
					<Index />
				),
			},
			{
				path: "/login",
				element: (
					<RouteJumpAni>
						<Login />
					</RouteJumpAni>
				),
			},
			{
				path: "/about",
				element: (
					<RouteJumpAni>
						<About />
					</RouteJumpAni>
				),
			}
		],
	},
	{
		path: "*", element: <Navigate to="/" replace={true} />
	},
];
const routerMode = import.meta.env.VITE_ROUTER_TYPE;

const Router = () => {
	return <RouterProvider router={
		routerMode == "HashRouter" ? createHashRouter(routeConfiguration) : createBrowserRouter(routeConfiguration)}
	/>;
};
export default Router;
