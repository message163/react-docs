# useId

useId 是 React 18 新增的一个 Hook，用于生成稳定的唯一标识符，主要用于解决 SSR 场景下的 ID 不一致问题，或者需要为组件生成唯一 ID 的场景。

## 使用场景

- 为组件生成唯一 ID
- 解决 SSR 场景下的 ID 不一致问题
- 无障碍交互唯一ID

## 用法

```ts
const id = useId()
// 返回值: :r0: 多次调用值递增
```

## 参数说明

### 入参

- 无入参

### 返回值

- 唯一标识符 例如`:r0:`



## 案例

### 1. 为组件生成唯一 ID

比如表单元素，label 需要和 input 绑定，如果使用 id 属性，需要手动生成唯一 ID，使用 useId 可以自动生成唯一 ID，这就非常方便。

```tsx
export const App = () => {
  const id = useId()
  return <>
  <label htmlFor={id}>Name</label>
  <input id={id} type="text" />
  </>
}
```

### 2. 解决 SSR 场景下的 ID 不一致问题

在服务端渲染（SSR）场景下，组件会在服务端和客户端分别渲染一次。如果使用随机生成的 ID，可能会导致两端渲染结果不一致，引发 hydration 错误。useId 可以确保生成确定性的 ID。

```tsx
// 一个常见的 SSR 场景：带有工具提示的导航栏组件
const NavItem = ({ text, tooltip }) => {
  // ❌ 错误做法：使用随机值或递增值
  const randomId = `tooltip-${Math.random()}`
  // 在 SSR 时服务端可能生成 tooltip-0.123
  // 在客户端可能生成 tooltip-0.456
  // 导致 hydration 不匹配

  return (
    <li>
      <a 
        aria-describedby={randomId}
        href="#"
      >
        {text}
      </a>
      <div id={randomId} role="tooltip">
        {tooltip}
      </div>
    </li>
  )
}

// ✅ 正确做法：使用 useId
const NavItemWithId = ({ text, tooltip }) => {
  const id = useId()
  const tooltipId = `${id}-tooltip`
  
  return (
    <li>
      <a 
        href="#"
        aria-describedby={tooltipId}
        className="nav-link"
      >
        {text}
      </a>
      <div 
        id={tooltipId}
        role="tooltip"
        className="tooltip"
      >
        {tooltip}
      </div>
    </li>
  )
}

// 使用示例
const Navigation = () => {
  return (
    <nav>
      <ul>
        <NavItemWithId 
          text="首页" 
          tooltip="返回首页"
        />
        <NavItemWithId 
          text="设置" 
          tooltip="系统设置"
        />
        <NavItemWithId 
          text="个人中心" 
          tooltip="查看个人信息"
        />
      </ul>
    </nav>
  )
}
```

### 3. 无障碍交互唯一ID

`aria-describedby` 是一个 ARIA 属性，用于为元素提供额外的描述性文本。它通过引用其他元素的 ID 来关联描述内容，帮助屏幕阅读器为用户提供更详细的信息。

当视障用户使用屏幕阅读器浏览网页时：
1. 读到输入框时会先读出输入框的标签
2. 然后会读出通过 `aria-describedby` 关联的描述文本
3. 用户就能知道这个输入框需要输入什么内容，有什么要求

```tsx
export const App = () => {
  const id = useId()
  return (
    <div>
      <input 
        type="text" 
        aria-describedby={id} 
      />
      <p id={id}>
        请输入有效的电子邮件地址，例如：xiaoman@example.com
      </p>
    </div>
  )
}
```

## 总结

### 基本介绍
useId 是 React 18 引入的新 Hook，用于生成稳定且唯一的标识符


### 使用特点
- 无需传入参数
- 返回确定性的唯一字符串（如`:r0:`）
- 同一组件多次调用会生成递增的 ID
- 适合在需要稳定 ID 的场景下使用，而不是用于视觉或样式目的

### 最佳实践
- 当需要多个相关 ID 时，应该使用同一个 useId 调用，并添加后缀
- 不要用于列表渲染的 key 属性
- 优先用于可访问性和 SSR 场景

