import { Modal, Spin } from '@douyinfe/semi-ui';
import { myStore } from '@/store';
import { useEffect } from "react";
import "./index.scss"

const ModalFrame = () => {
    const { visible, afterClose, spinShow, autoClose, content } = myStore.use.modalFrameState();
    useEffect(() => {
        if (visible && autoClose) {
            setTimeout(() => closeModelFrame(), autoClose);
        }
    }, [visible]);
    const closeModelFrame = () => {
        myStore.setState({
            modalFrameState: {
                visible: false,
                content: "",
                spinShow: false,
                afterClose: afterClose
            }
        });
    };
    return (
        <Modal
            visible={visible}
            header={null}
            footer={null}
            onCancel={closeModelFrame}
            confirmLoading={false}
            closable={false}
            centered={true}
            afterClose={() => afterClose && afterClose()}
            maskClosable={!(autoClose || spinShow)}
        >
            <div className="modelContentBox">
                <div className="modelContent">{content || "提示"}</div>
                {spinShow && <Spin size="large"></Spin>}
            </div>
        </Modal>
    );
};

export default ModalFrame;