import '@/App.scss'
import myStore from '@/store'
import  styles  from './index.module.scss'

function Index() {

    const count = myStore.use.count()
    const inc = myStore.use.inc()
 
    return (
        <>
           
            <div className="card">
                <button className={styles.btn} onClick={inc}>
                    count is {count}
                </button>
            </div>
           
        </>
    )
}

export default Index