import { myStore } from '@/store'
import { openModal } from "@utils/modal";
import Api from "@services/api";

import styles from "./index.module.scss";

// import indexTip from '@assets/images/indexTip.png'
// const fz = new URL('@assets/images/indexTip.png', import.meta.url).href;
// console.log(fz);

import { loadImages } from "@/utils/loadImage";
const urls = loadImages([`@assets/images/indexTip.png`, '../../assets/images/a_副本2/indexTipa.png', '../../assets/images/a/indexTipa.png']);

function Index() {

    const count = myStore.use.count()
    const inc = myStore.use.inc()
    const clickModel = () => {
        console.log(getUsers());

        openModal({
            content: "加载中",
            afterClose: () => {
                console.log("afterClose")
            },
            // autoClose: 2000,
            spinShow: true
        })

    }

    const getUsers = async () => {
        try {
            const response = await Api({
                url: '/api/users',
                method: 'GET',
                param: { page: 1 }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
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

