# 状态处理

在上一章我们讲了，Zustand会合并第一层的state，但是如果深层次应该如何处理呢

## 来吧演示

首先创建一个葫芦娃，葫芦娃有七个娃，每个娃都有自己的状态，我们可以通过updateGourd来更新葫芦娃的状态，这样就实现了一个深层次的demo

```ts
import { create } from 'zustand'

interface User {
    gourd: {
        oneChild: string,
        twoChild: string,
        threeChild: string,
        fourChild: string,
        fiveChild: string,
        sixChild: string,
        sevenChild: string,
    },
    updateGourd: () => void
}
const useUserStore = create<User>(((set) => ({
    //创建葫芦娃
    gourd: {
        oneChild: '大娃',
        twoChild: '二娃',
        threeChild: '三娃',
        fourChild: '四娃',
        fiveChild: '五娃',
        sixChild: '六娃',
        sevenChild: '七娃',
    },
    updateGourd: () => set((state) => ({
        gourd: {
            //...state.gourd, 先不进行状态合并  // [!code highlight] 
            oneChild: '大娃-超进化',
        }
    }))
})))

export default useUserStore;
```

我们会发现如果不进行状态合并，其他的状态是会丢失的，所以深层次的状态处理需要进行状态合并，但是如果代码过多，每次都需要合并状态也挺烦的，所以我们可以通过`immer`中间件处理这个问题

![state](./images/state.gif)


## 使用immer中间件

安装

```bash
npm install immer
```

**原始`immer`的用法**

需要导出produce，然后它的第一个参数是原始值，第二个参数是一个回调函数，回调函数中的参数是draft，也就是原始值的拷贝，然后我们就可以直接修改draft了，最后返回新的值

```ts
import { produce } from 'immer'

const data = {
  user: {
    name: '张三',
    age: 18
  }
}

const newData = produce(data, draft => {
  draft.user.age = 20
})

console.log(newData,data) 
//{ user: { name: '张三', age: 20 } } 
//{ user: { name: '张三', age: 18 } }
```

<hr />

**`immer`在`Zustand`中的使用方法**

引入注意是从`zustand/middleware/immer`引入，而不是`immer`

```ts
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
```

1. 首先从zustand中间件引入`immer`
2. 然后注意结构`create()(immer())`这里是两个括号而不是放在create里面了

```ts
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
interface User {
    gourd: {
        oneChild: string,
        twoChild: string,
        threeChild: string,
        fourChild: string,
        fiveChild: string,
        sixChild: string,
        sevenChild: string,
    },
    updateGourd: () => void
}
//注意结构发生了变化！！！
const useUserStore = create<User>()(immer(((set) => ({
    //创建葫芦娃
    gourd: {
        oneChild: '大娃',
        twoChild: '二娃',
        threeChild: '三娃',
        fourChild: '四娃',
        fiveChild: '五娃',
        sixChild: '六娃',
        sevenChild: '七娃',
    },
    updateGourd: () => set((state) => {
        state.gourd.oneChild = '大娃-超进化' //这儿不需要状态合并了需要修改什么值直接改就行了
        state.gourd.twoChild = '二娃-谁来了'
        state.gourd.threeChild = '三娃-我来了'
    })
}))))

export default useUserStore;
```



## immer原理剖析

为什么使用了immer中间件就可以直接修改状态了？

原始数据 → 创建代理 → 修改触发复制 → 生成新结构

```ts
const data = {
  user: {
    name: '张三',
    age: 18
  }
}

const produce = (base, recipe) => {
  const proxies = new WeakMap() // 存储原始对象与代理的映射
  let rootChanged = false       // 是否发生修改
  let rootCopy = null           // 根对象副本
  // 创建代理递归函数
  function createProxy(parent, obj) {
    if (typeof obj !== 'object' || obj === null) return obj
    
    // 已代理过直接返回
    if (proxies.has(obj)) return proxies.get(obj)
    // 创建代理
    const proxy = new Proxy({}, {
      get(_, key) {
        // 优先返回副本值
        if (parent?.copy) {
          //如果父级有副本，则返回副本的代理
          return createProxy(parent, parent.copy[key])
        }
        
        // 未修改时创建惰性代理
        if (!proxies.has(obj[key])) { 
          // 创建代理
          proxies.set(obj[key], createProxy({ base: obj, copy: null }, obj[key]))
        }
        // 返回代理
        return proxies.get(obj[key])
      },
      set(_, key, value) {
        // 首次修改时创建副本
        if (!parent.copy) {
          parent.copy = { ...parent.base } // 创建副本
          rootCopy = parent.copy // 记录根副本
          rootChanged = true // 标记根对象已修改
        }
        // 更新副本
        parent.copy[key] = value
        return true
      }
    })

    proxies.set(obj, proxy)
    return proxy
  }

  // 创建根代理
  const draft = createProxy({ base }, base)
  
  // 执行修改
  recipe(draft)
  
  // 返回结果
  return rootChanged ? rootCopy : base
}

const proxy = produce(data, (proxy) => {
  proxy.user.name = '李四'
  proxy.user.age = 20
})

console.log(proxy, data)
//{ user: { name: '李四', age: 20 } }
//{ user: { name: '张三', age: 18 } }
```