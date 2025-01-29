/// <reference types="vite/client" />

// export { };


// declare const window: Window & { WeixinJSBridge: any; WVJBCallbacks: any };
interface Window {
    TMap?: any;
    WeixinJSBridge: any;
}
declare module "react-howler";
