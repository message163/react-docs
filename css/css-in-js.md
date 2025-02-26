# css-in-js

`css-in-js` 是将 CSS 代码 跟 JS 代码 混合在一起，通过 JS 来动态的生成 CSS 样式，但是这样的话与我们的认知是背道而驰的，正常应该是 CSS JS HTML 分离的，但是由于 CSS 缺乏作用域，所以形成了 `css-in-js` 这种写法，注意 `css-in-js` 并不是一种技术，而是一种思想。


## 优缺点

### 优点：

- 可以让 CSS 拥有独立的作用域，阻止 CSS 泄露到组件外部，防止冲突。
- 可以动态的生成 CSS 样式，根据组件的状态来动态的生成 CSS 样式。
- CSS-in-JS 可以方便地实现主题切换功能，只需更改主题变量即可改变整个应用的样式。

### 缺点：

- css-in-js 是基于运行时，所以会损耗一些性能(电脑性能高可以忽略)
- 调试困难，CSS-in-JS 的样式难以调试，因为它们是动态生成的，而不是在 CSS 文件中定义的。


## 谁在用？

- 最常见的有 `Antd` 用它自研的 `css-in-js` 库

[Antd 官网](https://ant-design.antgroup.com/index-cn)

css-in-js 库有很多，比如 `styled-components`、`emotion`、等等，因为它只是思想，所以很多库都实现了它，但是这些库的实现方式都不一样，所以使用的时候需要根据实际情况选择合适的库，所以 `Antd` 选择了自研。

[Antd 的 css-in-js 库](https://ant-design.github.io/cssinjs/)

![alt text](./image/antd.png)


## 案例

我们以 `styled-components` 为例，来实现一个简单的 `css-in-js` 案例。

:::tip
[styled-components 官网](https://styled-components.com/)
:::

1. 安装 `styled-components`

```bash
npm install styled-components
```

2. 创建一个 `Button` 组件

```tsx
import React, {} from 'react';
import styled from 'styled-components';
const Button = styled.button<{primary?: boolean}>`
   ${props => props.primary ? 'background: #6160F2;' : 'background: red;'}
   padding: 10px 20px;
   border-radius: 5px;
   color: white;
   cursor: pointer;
   margin: 10px;
   &:hover {
     color: black;
   }
`;
const App: React.FC = () => {
  return (
    <>
        <Button primary>
            按钮
        </Button>
    </>
  );
}

export default App;
```