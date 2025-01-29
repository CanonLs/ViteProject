import { myStore } from "../store";
import { IModalFrameState } from "../store/types";

/**
 * 打开全局弹窗
 * @param options - 弹窗配置选项
 * @param options.visible - 是否显示弹窗，默认为 true
 * @param options.content - 弹窗内容，支持字符串或 ReactNode
 * @param options.autoClose - 自动关闭时间（毫秒），设置后弹窗将在指定时间后自动关闭
 * @param options.spinShow - 是否显示加载状态，设置为 true 时将显示加载动画
 * @param options.afterClose - 弹窗关闭后的回调函数
 */
export const openModal = (options: Partial<IModalFrameState>) => {
    myStore.setState({
        modalFrameState: {
            visible: true,
            ...options
        }
    });
};

/**
 * 关闭全局弹窗
 * @param options - 弹窗配置选项
 * @param options.visible - 是否显示弹窗，默认为 true
 * @param options.content - 弹窗内容，支持字符串或 ReactNode
 * @param options.autoClose - 自动关闭时间（毫秒），设置后弹窗将在指定时间后自动关闭
 * @param options.spinShow - 是否显示加载状态，设置为 true 时将显示加载动画
 * @param options.afterClose - 弹窗关闭后的回调函数
 */
export const closeModal = () => {
    myStore.setState({
        modalFrameState: {
            visible: false,
            content: "",
        }
    });
};
