export interface IModalFrameState {
	visible: boolean;
	content?: string;
	autoClose?: number;
	spinShow?: boolean;
	afterClose?: () => void;
}

export interface IstoreState {
	count: number;
	modalFrameState: IModalFrameState;
}

export interface IstoreAction {
	inc: () => void;
}

export type IStore = IstoreState & IstoreAction;