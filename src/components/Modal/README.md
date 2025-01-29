# Modal 全局弹窗组件

基于 Semi UI 的 Modal 组件封装的全局弹窗组件，通过 Zustand 状态管理实现全局调用。

## 特性

- 全局状态管理，可在任意组件中调用
- 支持加载中状态显示
- 支持自定义内容（字符串或 JSX）
- 支持自动关闭
- 支持关闭回调

## 使用方法

### 基础用法

```tsx
const openBasicModal = () => {
    myStore.setState({
        modalFrameState: {
            visible: true,
            content: "基础弹窗示例"
        }
    });
};
```

### 自动关闭

```tsx
const openAutoCloseModal = () => {
    myStore.setState({
        modalFrameState: {
            visible: true,
            content: "2秒后自动关闭",
            autoClose: 2000
        }
    });
};
```

### 加载状态

```tsx
const openLoadingModal = () => {
    myStore.setState({
        modalFrameState: {
            visible: true,
            content: "加载中...",
            spinShow: true
        }
    });
    
    // 模拟异步操作
    setTimeout(() => {
        myStore.setState({
            modalFrameState: {
                spinShow: false,
                content: "加载完成！"
            }
        });
    }, 2000);
};
```

### 关闭回调

```tsx
const openModalWithCallback = () => {
    myStore.setState({
        modalFrameState: {
            visible: true,
            content: "操作完成后将执行回调",
            afterClose: () => {
                console.log("弹窗已关闭");
                // 执行其他操作
            }
        }
    });
};
```

## API

### modalFrameState

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示弹窗 | boolean | false |
| content | 弹窗内容 | string \| ReactNode | "提示" |
| spinShow | 是否显示加载状态 | boolean | false |
| autoClose | 自动关闭时间（毫秒） | number | - |
| afterClose | 弹窗关闭后的回调函数 | () => void | () => { console.log("Model Close") } |

## 注意事项

1. 当设置了 `autoClose` 或 `spinShow` 时，点击遮罩层不会关闭弹窗
2. 弹窗内容支持字符串和 JSX 元素
3. 建议在不需要弹窗时将 visible 设置为 false，避免不必要的渲染
4. 使用 `autoClose` 时，时间单位为毫秒