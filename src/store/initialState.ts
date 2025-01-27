import {  IStore } from "./types";

export const modalFrameState = {
	visible: false,
	content: "",
	spinShow: false,
	afterClose: () => {
		console.log("Model Close");
	},
};

export const initValueFn = (set: any): IStore => {
	return {
		count: 0,
		inc: () => set((state: { count: number }) => ({ count: state.count + 1 })),
		modalFrameState,
	};
};