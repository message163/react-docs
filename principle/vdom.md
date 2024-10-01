# 虚拟DOM (Virtual DOM)

Virtual DOM 就是用JavaScript对象去描述一个DOM结构，虚拟DOM不是直接操作浏览器的真实DOM，而是首先对 UI 的更新在虚拟 DOM 中进行，再将变更高效地同步到真实 DOM 中。

## 优点
1. 性能优化：直接操作真实 DOM 是比较昂贵的，尤其是当涉及到大量节点更新时。虚拟 DOM 通过减少不必要的 DOM 操作，主要体现在diff算法的复用操作，其实也提升不了多少性能。

2. 跨平台性：虚拟 DOM 是一个与平台无关的概念，它可以映射到不同的渲染目标，比如浏览器的 DOM 或者移动端`(React Native)`的原生 UI。

<img src='./image.png' width='100%' />


## 实现简易虚拟DOM

```jsx
const App = () => {
  return (<div id="2">
      <span>小满zs</span>
  </div>)
}
```

上面这段代码会通过babel或者swc转换成

```js
const App = () => {
  return React.createElement('div', { id: 2 }, 
    React.createElement('span', null, '小满zs')
  );
};
```
接着我们就来实现`React.createElement`


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
        // 文本是没有props children什么的 这样做只是为了结构统一方便遍历
        return {
            type: 'TEXT_ELEMENT',
            props: {
                nodeValue: text,
                children: []
            }
        };
    }
};
```

## React Fiber
Fiber 是 React 16 引入的一种新的协调引擎，用于解决和优化 React 应对复杂 UI 渲染时的性能问题

React源码解析英文版 https://pomb.us/build-your-own-react/

未使用fiber版本 https://claudiopro.github.io/react-fiber-vs-stack-demo/stack.html

已使用fiber版本 https://claudiopro.github.io/react-fiber-vs-stack-demo/fiber.html

## Fiber 的作用

为了解决React15在大组件更新时产生的卡顿现象，React团队提出了 Fiber 架构，并在 React16 发布，将 同步递归无法中断的更新 重构为 异步的可中断更新

它实现了4个具体目标

1. 可中断的渲染：Fiber 允许将大的渲染任务拆分成多个小的工作单元（Unit of Work），使得 React 可以在空闲时间执行这些小任务。当浏览器需要处理更高优先级的任务时（如用户输入、动画），可以暂停渲染，先处理这些任务，然后再恢复未完成的渲染工作。

2. 优先级调度：在 Fiber 架构下，React 可以根据不同任务的优先级决定何时更新哪些部分。React 会优先更新用户可感知的部分（如动画、用户输入），而低优先级的任务（如数据加载后的界面更新）可以延后执行。

3. 双缓存树（Fiber Tree）：Fiber 架构中有两棵 Fiber 树——current fiber tree（当前正在渲染的 Fiber 树）和 work in progress fiber tree（正在处理的 Fiber 树）。React 使用这两棵树来保存更新前后的状态，从而更高效地进行比较和更新。

4. 任务切片：在浏览器的空闲时间内（利用 requestIdleCallback思想），React 可以将渲染任务拆分成多个小片段，逐步完成 Fiber 树的构建，避免一次性完成所有渲染任务导致的阻塞。

## 双缓存

react内部有两颗树维护着两个状态：一个是`fiber tree`，一个是`work in progress fiber tree`

1. fiber tree:表示当前正在渲染的fiber树
2. work in progress fiber tree:表示更新过程中新生成的fiber树，也就是渲染的下一次UI状态

举个例子:

当我们用 canvas 绘制动画时，每一帧绘制前都会调用 ctx.clearRect 清除上一帧的画面，如果当前帧画面计算量比较大，导致清除上一帧画面到绘制当前帧画面之间有较长间隙，就会出现白屏。

为了解决这个问题，我们可以在内存中绘制当前帧动画，绘制完毕后直接用当前帧替换上一帧画面，由于省去了两帧替换间的计算时间，不会出现从白屏到出现画面的闪烁情况。


## 深入理解任务切片

要先理解切片得先理解浏览器一帧做些什么

### 浏览器一帧做些什么
1. 处理事件的回调click...事件
2. 处理计时器的回调
3. 开始帧
4. 执行requestAnimationFrame 动画的回调
5. 计算机页面布局计算 合并到主线程
6. 绘制
7. 如果此时还有空闲时间，执行requestIdleCallback

### 例如要更新10000条dom数据

我们可以分成三个小任务进行更新

并且把每一段任务插入`requestIdleCallback` 如图

![alt text](task.png)

## diff算法

比如有A B C D四个节点

那么首先react会把这个节点变成链表结构也就是

```txt
root
  |
child
  ↓
A -> B -> C -> D
```
然后我们更新了节点 A C B E

那么diff算法

1. {`A B C` D} 他会从map里面去找能够复用的节点也就是 `A C B` 进行复用
2. 如果{A B C D} 这个结构没有出现`E`那么说明是新增了创建新的fiber结构
3. 如果{A B C `D`} 旧节点存在 { A C B E} 新节点没有存在那么说明是删除了

![alt text](diff.png)

## 代码实现 vDom Fiber Diff 完整版

```js
//vdom
const React = {
    createElement(type, props = {}, ...children) {
        return {
            type,
            props: {
                ...props,
                children: children.map(child =>
                    typeof child === 'object'
                        ? child
                        : React.createTextElement(child)
                ),
            },
        };
    },

    createTextElement(text) {
        return {
            type: 'TEXT_ELEMENT',
            props: {
                nodeValue: text,
                children: [],
            },
        };
    },
};


// const vdom = React.createElement('div', { id: 1 }, React.createElement('span', null, '小满zs'));

// console.log(vdom)


//Fiber 是 React 16 引入的一种新的协调引擎
let nextUnitOfWork = null; // 下一个工作单元
let currentRoot = null; // 当前 Fiber 树的根
let wipRoot = null; // 正在工作的 Fiber 树
let deletions = null; // 存储需要删除的 Fiber

// Fiber 渲染入口
function render(element, container) {
    //wipRoot 表示“正在进行的工作根”，它是 Fiber 架构中渲染任务的起点
    wipRoot = {
        dom: container, //渲染目标的 DOM 容器
        props: {
            children: [element], //要渲染的元素（例如 React 元素）
        },
        alternate: currentRoot,
        //alternate 是 React Fiber 树中的一个关键概念，用于双缓冲机制（双缓冲 Fiber Tree）。currentRoot 是之前已经渲染过的 Fiber 树的根，wipRoot 是新一轮更新的根 Fiber 节点。
        //它们通过 alternate 属性相互关联
        //旧的fiber树
    };
    nextUnitOfWork = wipRoot;
    //nextUnitOfWork 是下一个要执行的工作单元（即 Fiber 节点）。在这里，将其设置为 wipRoot，表示渲染工作从根节点开始
    deletions = [];
    //专门用于存放在更新过程中需要删除的节点。在 Fiber 更新机制中，如果某些节点不再需要，就会将它们放入 deletions，
    //最后在 commitRoot 阶段将它们从 DOM 中删除
}

// 创建 Fiber 节点
function createFiber(element, parent) {
    return {
        type: element.type,
        props: element.props,
        parent,
        dom: null, // 关联的 DOM 节点
        child: null, // 子节点
        sibling: null, // 兄弟节点
        alternate: null, // 对应的前一次 Fiber 节点
        effectTag: null, // 'PLACEMENT', 'UPDATE', 'DELETION'
    };
}


// 创建 DOM 节点
function createDom(fiber) {
    const dom =
        fiber.type === 'TEXT_ELEMENT'
            ? document.createTextNode('')
            : document.createElement(fiber.type);

    updateDom(dom, {}, fiber.props);
    return dom;
}

// 更新 DOM 节点属性
function updateDom(dom, prevProps, nextProps) {
    // 移除旧属性
    Object.keys(prevProps)
        .filter(name => name !== 'children')
        .forEach(name => {
            dom[name] = '';
        });

    // 添加新属性
    Object.keys(nextProps)
        .filter(name => name !== 'children')
        .filter(name => prevProps[name] !== nextProps[name])
        .forEach(name => {
            dom[name] = nextProps[name];
        });
}

// Fiber 调度器
// 实现将耗时任务拆分成多个小的工作单元
function workLoop(deadline) {
    //deadline 表示浏览器空闲时间
    let shouldYield = false;
    //是一个标志，用来指示是否需要让出控制权给浏览器。如果时间快用完了，则设为 true，以便及时暂停任务，避免阻塞主线程

    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        //performUnitOfWork 是一个函数，它处理当前的工作单元，并返回下一个要执行的工作单元。每次循环会更新 nextUnitOfWork 为下一个工作单元
        shouldYield = deadline.timeRemaining() < 1;
        //使用 deadline.timeRemaining() 来检查剩余的空闲时间。如果时间少于 1 毫秒，就设置 shouldYield 为 true，表示没有空闲时间了，就让出控制权
    }

    if (!nextUnitOfWork && wipRoot) {
        //当没有下一个工作单元时（nextUnitOfWork 为 null），并且有一个待提交的“工作根”（wipRoot），就会调用 commitRoot() 将最终的结果应用到 DOM 中
        commitRoot();
    }

    requestIdleCallback(workLoop);
    //使用 requestIdleCallback 来安排下一个空闲时间段继续执行 workLoop，让任务在浏览器空闲时继续进行
}
//requestIdleCallback 浏览器绘制一帧16ms 空闲的时间去执行的函数 浏览器自动执行 
//浏览器一帧做些什么
//1.处理时间的回调click...事件
//2.处理计时器的回调
//3.开始帧
//4.执行requestAnimationFrame 动画的回调
//5.计算机页面布局计算 合并到主线程
//6.绘制
//7.如果此时还有空闲时间，执行requestIdleCallback
requestIdleCallback(workLoop);

// 执行一个工作单元
function performUnitOfWork(fiber) {
    // 如果没有 DOM 节点，为当前 Fiber 创建 DOM 节点
    if (!fiber.dom) {
        fiber.dom = createDom(fiber);
    }
    //确保每个 Fiber 节点都在内存中有一个对应的 DOM 节点准备好，以便后续在提交阶段更新到实际的 DOM 树中

    // 创建子节点的 Fiber
    // const vdom = React.createElement('div', { id: 1 }, React.createElement('span', null, '小满zs'));
    // 子节点在children中
    const elements = fiber.props.children;
    reconcileChildren(fiber, elements);

    // 返回下一个工作单元（child, sibling, or parent）
    if (fiber.child) {
        return fiber.child;
    }

    let nextFiber = fiber;
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.parent;
    }
    return null;
}

// Diff 算法: 将子节点与之前的 Fiber 树进行比较
function reconcileChildren(wipFiber, elements) {
    let index = 0;//
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child; // 旧的 Fiber 树
    let prevSibling = null;

    while (index < elements.length || oldFiber != null) {
        const element = elements[index];
        let newFiber = null;

        // 比较旧 Fiber 和新元素
        const sameType = oldFiber && element && element.type === oldFiber.type

        //如果是同类型的节点，复用
        if (sameType) {
            newFiber = {
                type: oldFiber.type,
                props: element.props,
                dom: oldFiber.dom,
                parent: wipFiber,
                alternate: oldFiber,
                effectTag: 'UPDATE',
            };

        }

        //如果新节点存在，但类型不同，新增fiber节点
        if (element && !sameType) {
            newFiber = createFiber(element, wipFiber);
            newFiber.effectTag = 'PLACEMENT';
        }

        //如果旧节点存在，但新节点不存在，删除旧节点
        if (oldFiber && !sameType) {
            oldFiber.effectTag = 'DELETION';
            deletions.push(oldFiber);
        }

        //移动旧fiber指针到下一个兄弟节点
        if (oldFiber) {
            oldFiber = oldFiber.sibling;
        }

        // 将新fiber节点插入到DOM树中
        if (index === 0) {
            //将第一个子节点设置为父节点的子节点
            wipFiber.child = newFiber;
        } else if (element) {
            //将后续子节点作为前一个兄弟节点的兄弟
            prevSibling.sibling = newFiber;
        }

        //更新兄弟节点
        prevSibling = newFiber;
        index++;
    }
}

// 提交更新到 DOM
function commitRoot() {
    deletions.forEach(commitWork); // 删除需要删除的 Fiber 节点
    commitWork(wipRoot.child);
    currentRoot = wipRoot;
    wipRoot = null;
}

// 提交单个 Fiber 节点
function commitWork(fiber) {
    if (!fiber) {
        return;
    }

    const domParent = fiber.parent.dom;

    if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {
        domParent.appendChild(fiber.dom);
    } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
        updateDom(fiber.dom, fiber.alternate.props, fiber.props);
    } else if (fiber.effectTag === 'DELETION') {
        domParent.removeChild(fiber.dom);
    }

    commitWork(fiber.child);
    commitWork(fiber.sibling);
}

//测试

// render(React.createElement('h1', null, 'hello world'), document.getElementById('root'));

// 测试用例diff

render(React.createElement('div', { id: 1 }, React.createElement('span', null, 'hello 11')), document.getElementById('root'));

render(React.createElement('div', { id: 1 }, React.createElement('span', null, 'hello 22')), document.getElementById('root'));
```