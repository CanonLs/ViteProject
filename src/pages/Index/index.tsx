import { myStore } from '@/store'
import { useNavigate } from 'react-router-dom';

import Api from "@services/api";

import styles from "./index.module.scss";

// import indexTip from '@assets/images/indexTip.png'
// const fz = new URL('@assets/images/indexTip.png', import.meta.url).href;
// console.log(fz);


import { loadImages } from "@/utils/loadImage";
const urls = loadImages([`@assets/images/indexTip.png`, '../../assets/images/a_副本2/indexTipa.png', '../../assets/images/a/indexTipa.png']);
console.log(urls);

function Index() {


    const count = myStore.use.count()
    const inc = myStore.use.inc()

    const navigate = useNavigate();

    const clickModel = async () => {

        // navigate("/login", { replace: true });
        // return


        const users = await getUsers();
        console.log(users);

        myStore.setState({
            modalFrameState: {
                visible: true,
                content: "2秒后自动关闭",
                autoClose: 2000,
                spinShow: true,
                afterClose: () => {
                    console.log("afterClose")
                },
            }
        });
    }

    const getUsers = async () => {
        try {
            const response = await Api({
                url: 'api/users',
                method: 'GET',
                param: { page: 1 }
            });
            return response.data;
        } catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : '请求失败'
            };
        }
    };

    return (
        <>
            <div className={styles.Index}>
                <button className={styles.btn} onClick={inc}>
                    count is {count}
                </button>
                <button onClick={clickModel}>openModel</button>
                <div className={styles.sbImg}>
                    <img src={urls[0]} alt="" />
                </div>
            </div>
        </>
    )
}

export default Index

