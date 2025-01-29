# css modules

## 什么是 css modules

因为 `React` 没有Vue的Scoped，但是React又是SPA(单页面应用)，所以需要一种方式来解决css的样式冲突问题，也就是把每个组件的样式做成单独的作用域，实现样式隔离，而css modules就是一种解决方案，但是我们需要借助一些工具来实现，比如`webpack`，`postcss`，`css-loader`，`vite`等。

## 如何在Vite中使用css modules

css modules，可以配合各种css预处理去使用，例如`less`，`sass`，`stylus`等。

```sh
npm install less -D # 安装less 任选其一
npm install sass -D # 安装sass 任选其一
npm install stylus -D # 安装stylus 任选其一
```

::: tip
在Vite中css Modules 是开箱即用的，只需要把文件名设置为`xxx.module.[css|less|sass|stylus]`，就可以使用css modules了。
:::

- src/components/Button/index.module.scss

```scss
.button {
  color: red;
}
```

- src/components/Button/index.tsx

```tsx
//使用方法，直接引入即可
import styles from './index.module.scss';

export default function Button() {
  return <button className={styles.button}>按钮</button>;
}
```
- 编译结果, 可以看到`button`类名被编译成了`button_pmkzx_6`，这就是css modules的实现原理，通过在类名前添加一个唯一的哈希值，来实现样式隔离。

```html
<button class="button_pmkzx_6">按钮</button>
```

## 修改css modules 规则

- 在vite.config.ts中配置css modules的规则

```ts
export default defineConfig({
  css: {
    modules: {
      localsConvention: 'dashes', // 修改css modules的类名规则 可以改成驼峰命名 或者 下划线命名
      generateScopedName: '[name]__[local]___[hash:base64:5]', // 修改css modules的类名规则
    },
  },
});
```

### 例子 例如设置为`(localsConvention:camelCaseOnly)`驼峰命名

- src/components/Button/index.module.scss

```scss
.button-red {
  color: red;
}
```

- src/components/Button/index.tsx

::: tip
设置为驼峰之后，使用的时候需要使用驼峰命名，例如`buttonRed`，而不是`button-red`。
:::

```tsx
import styles from './index.module.scss';

export default function Button() {
  return <button className={styles.buttonRed}>按钮</button>;
}
```
### 例子 例如设置为`(localsConvention:dashes)`原始命名也就是`-`连接的命名

- src/components/Button/index.module.scss

```scss
.button-red {
  color: red;
}
```

- src/components/Button/index.tsx

::: tip
设置为原始命名之后，使用的时候需要使用`-`连接的命名，例如`button-red`，而不是`buttonRed`。
:::

```tsx
import styles from './index.module.scss';

export default function Button() {
  return <button className={styles['button-red']}>按钮</button>;
}
```

::: info
如果想同时支持驼峰命名和`-`连接的命名，可以设置为`localsConvention:camelCase`，这样就可以同时支持驼峰命名和`-`连接的命名。
:::


### 例子 修改css modules的类名规则

- 在vite.config.ts中配置css modules的规则

```ts
export default defineConfig({
  css: {
    modules: {
        generateScopedName: '[local]_[hash:base64:5]' // 只保留类名和哈希值
        // 或者
        generateScopedName: '[hash:base64:8]' // 只使用哈希值
        // 或者
        generateScopedName: '[name]_[local]' // 只使用文件名和类名，没有哈希
        // 或者
        generateScopedName: '[local]--[hash:base64:4]' // 自定义分隔符
    },
  },
});
```

编译结果

```html
<button class="button_pmkzx_6">类名 + 哈希值</button>
<button class="pmkzx_6">哈希值</button>
<button class="index-module_button">文件名 + 类名</button>
<button class="button--pmkzx_6">类名 + 分隔符 + 哈希值</button>
```

## 维持类名

意思就是说在样式文件中的某些样式，不希望被编译成css modules，可以设置为`global`，例如：

```scss
.app{
    background: red;
    width: 200px;
    height: 200px;
    :global(.button){
        background: blue;
        width: 100px;
        height: 100px;
    }
}
```
```tsx
//在使用的时候，就可以直接使用原始的类名 button
import styles from './index.module.scss';
const App: React.FC = () => {
  return (
    <>
      <div className={styles.app}>
        <button className='button'>按钮</button>
      </div>
    </>
  );
}

```