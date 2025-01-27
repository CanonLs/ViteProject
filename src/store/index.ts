import { StoreApi, UseBoundStore } from "zustand";
import { createWithEqualityFn } from "zustand/traditional";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/vanilla/shallow";

/**
 * 全局状态管理Store的类型定义
 * @template S - Store的类型参数
 * @property {Object} use - 包含所有状态的选择器方法
 * @property {Function} getState - 获取完整状态的方法
 * @property {Function} setState - 更新状态的方法
 */


type WithSelectors<S> = S extends { getState: () => infer T }
    ? S & { use: { [K in keyof T]: () => T[K] } }
    : never

/**
 * 创建状态选择器
 * @template S - Store类型
 * @param {S} _store - Zustand store实例
 * @returns {WithSelectors<S>} 带有选择器的增强store实例
 */
const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
    _store: S,
) => {
    let store = _store as WithSelectors<typeof _store>
    store.use = {}
    for (let k of Object.keys(store.getState())) {
        ; (store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
    }

    return store
}

import { IStore } from "./types";
import { initValueFn } from "./initialState";


/**
 * 全局状态管理Store实例
 * 
 * @example
 * // 获取count状态
 * const count = myStore.use.count()
 * 
 * // 调用inc方法
 * const inc = myStore.use.inc()
 * inc()
 * 
 * // 获取嵌套状态
 * const nestedValue = myStore.use.a().b.c.d
 * 
 * // 获取modalFrame状态
 * const modalState = myStore.use.modalFrameState()
 */
const myStore = createSelectors(
    createWithEqualityFn<IStore>()(
        immer(
            devtools(
                persist(set => initValueFn(set), {
                    name: "LiuKuku",
                    storage: createJSONStorage(() => localStorage),
                    partialize: _state => ({
                        count: _state.count,
                        version: "0.0.1"
                    }),
                })
            )
        ),
        shallow
    ));
export default myStore;
