# 虚拟DOM (Virtual DOM)

Virtual DOM 就是用JavaScript对象去描述一个DOM结构，虚拟DOM不是直接操作浏览器的真实DOM，而是首先对 UI 的更新在虚拟 DOM 中进行，再将变更高效地同步到真实 DOM 中。

## 优点
1. 性能优化：直接操作真实 DOM 是比较昂贵的，尤其是当涉及到大量节点更新时。虚拟 DOM 通过减少不必要的 DOM 操作，显著提高了性能。

2. 跨平台性：虚拟 DOM 是一个与平台无关的概念，它可以映射到不同的渲染目标，比如浏览器的 DOM 或者移动端的原生 UI。

<img src='./image.png' width='100%' />


## 实现简易虚拟DOM

```jsx
const App = () => {
    return (<div id='1'>小满</div>)
}
```

上面这段代码会通过babel或者swc转换成

```js
const App = () => {
    return React.createElement('div',{id:1},'小满')
}
```
接着我们就来实现`React.createElement`

<iframe 
  src="https://codesandbox.io/p/sandbox/delicate-sky-m9xwsz"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="React 简易示例"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>