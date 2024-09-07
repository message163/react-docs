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

## React.createElement

1. 用于生成虚拟 DOM 树，返回一个包含 type（元素类型）和 props（属性和子元素）的对象。
children 可以是文本或其他虚拟 DOM 对象。
React.createTextElement:

2. 用于处理文本节点，将字符串封装成虚拟 DOM 对象。
React.render:

3. 将虚拟 DOM 转化为实际 DOM 元素。
使用递归的方式渲染所有子元素。
最后将生成的 DOM 节点插入到指定的容器中

```js
const React = {
    createElement(type, props = {}, ...children) {
        return {
            type,
            props: {
                ...props,
                children: children.map(child =>
                    typeof child === 'object'
                        ? child // 如果子元素是对象（嵌套元素），返回对象
                        : this.createTextElement(child) // 否则将字符串转换为文本元素
                )
            }
        };
    },

    createTextElement(text) {
        return {
            type: 'TEXT_ELEMENT',
            props: {
                nodeValue: text,
                children: []
            }
        };
    },

    render(element, container) {
        // 创建对应的 DOM 元素
        const dom = element.type === 'TEXT_ELEMENT'
            ? document.createTextNode('') // 创建文本节点
            : document.createElement(element.type); // 创建元素节点
        
        // 给 DOM 元素设置属性
        Object.keys(element.props)
            .filter(key => key !== "children") // 过滤掉 'children'
            .forEach(name => {
                dom[name] = element.props[name]; // 设置属性（如 id 等）
            });

        // 递归渲染子元素
        element.props.children.forEach(child => 
            this.render(child, dom) // 递归调用 render，将子元素渲染到父元素上
        );

        // 将生成的 DOM 元素插入到容器中
        container.appendChild(dom);
    }
};

// 使用 React.createElement 创建虚拟 DOM
const element = React.createElement('div', { id: 1 }, 
    React.createElement('p', null, '黑神话悟空, ', '小满!')
);

// 使用 React.render 渲染到真实 DOM
const container = document.getElementById('root');
React.render(element, container);
```