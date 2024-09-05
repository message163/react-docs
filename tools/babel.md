# Babel

## 什么是Babel?

<img src='https://babeljs.io/img/babel.svg'>

Babel 是一个 JavaScript 编译器,提供了JavaScript的编译过程，能够将源代码转换为目标代码。

AST -> Transform -> Generate

官网 https://babeljs.io/

查看AST https://astexplorer.net/

Babel所有的包 https://babeljs.io/docs/babel-traverse

## 核心功能

1. 语法转换：将新版本的 JavaScript 语法转换为旧版本的语法
2. Polyfill：通过引入额外的代码，使新功能在旧浏览器中可用
3. JSX: 将JSX语法转换成普通的JavaScript语法
4. 插件: 为Babel提供自定义功能

## 案例

### 1. 语法转换：将新版本的 JavaScript 语法转换为旧版本的语法
```sh
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```
test.js 测试用例
```js
//语法
const a = (params = 2) => 1 + params;
const b = [1, 2, 3]
const c = [...b, 4, 5]
class Babel {

}
new Babel()
//API
const x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter((x) => x % 2 === 0)
const y = Object.assign({}, { name: 1 })
```
index.js 核心转换代码
```js
//记得设置package.json的type为module
import Babel from '@babel/core'
import presetEnv from '@babel/preset-env'
import fs from 'node:fs'
const file = fs.readFileSync('./test.js', 'utf8')
const result = Babel.transform(file, {
    presets: [presetEnv]
})
console.log(result.code)
```
编译之后的代码
```js
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var a = function a() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  return 1 + params;
};
var b = [1, 2, 3];
var c = [].concat(b, [4, 5]);
var Babel = /*#__PURE__*/_createClass(function Babel() {
  _classCallCheck(this, Babel);
});
new Babel();
```
如何支持新特性例如 Object.assign Array.prototype.find 等

```sh
npm i core-js -D
```
index.js 增强编译

```js
import Babel from '@babel/core'
import presetEnv from '@babel/preset-env'
import fs from 'node:fs'
const file = fs.readFileSync('./test.js', 'utf8')
const result = Babel.transform(file, {
    //usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加
    //corejs 3 是corejs的版本
    presets: [
        [presetEnv, { useBuiltIns: "usage", corejs: 3 }]
    ]
})
console.log(result.code)
```

转换之后的代码
```js
"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.to-string.js");
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; } 
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
//语法
var a = function a() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  return 1 + params;
};
var b = [1, 2, 3];
var c = [].concat(b, [4, 5]);
var Babel = /*#__PURE__*/_createClass(function Babel() {
  _classCallCheck(this, Babel);
});
new Babel();
//API
var x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(function (x) {
  return x % 2 === 0;
});
var y = Object.assign({}, {
  name: 1
});
```
### 2.jsx代码转换react

测试用例 test.jsx
```jsx
import react from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
    return <div>小满是谁？？？？？</div>
}

createRoot(document.getElementById('root')).render(<App />)
```

编写代码 只需要增加一个预设即可 @babel/preset-react

```sh
npm install @babel/preset-react -D
```

```js
import Babel from '@babel/core'
import presetEnv from '@babel/preset-env'
import fs from 'node:fs'
import react from '@babel/preset-react'
const file = fs.readFileSync('./test.jsx', 'utf8')
const result = Babel.transform(file, {
    presets: [
        [presetEnv, { useBuiltIns: "usage", corejs: 3 }],
        react
    ]
})
console.log(result.code)
```

转换的结果

>其实也就是调用了`React.createElement`去创建元素

```js
"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = require("react-dom/client");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var App = function App() {
  return /*#__PURE__*/React.createElement("div", null, "\u5C0F\u6EE1\u662F\u8C01\uFF1F\uFF1F\uFF1F\uFF1F\uFF1F");
};
(0, _client.createRoot)(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null)); 
```
### 3.编写Babel插件

```js
import Babel from '@babel/core'
import fs from 'node:fs'
const file = fs.readFileSync('./test.js', 'utf8')
//babel会注入一个types对象里面包含了各种ast节点的方法
const transformFunction = ({ types: t }) => {
    return {
        name: 'babel-transform-function',
        //visitor 是一个对象，它包含了一组方法，这些方法对应于 AST 中的不同节点类型。每当 Babel 遇到某种类型的节点时，都会调用 visitor 中对应的方法。
        visitor: {
            //匹配 箭头函数 当然也可以匹配别的东西 这儿只是案例
            ArrowFunctionExpression(path) {
                const node = path.node
                const arrowFunction = t.functionExpression(
                    null, //node.id 是一个 Identifier 节点，表示函数名
                    node.params, //node.params 是一个数组，表示函数的参数
                    // BlockStatement 是 JavaScript 抽象语法树（AST）中的一种节点类型，表示一个由大括号 {} 包围的语句块。它是函数体、循环体、条件分支（如 if 语句）等代码块的基础结构
                    t.blockStatement([t.returnStatement(node.body)]),  //node.body 是函数的主体，通常是一个 BlockStatement 节点
                    node.async //node.async 是一个布尔值，表示函数是否是异步的 (async 函数)
                )
                path.replaceWith(arrowFunction) //替换当前节点
            }
        }
    }
}
const result = Babel.transform(file, {
    plugins: [
        transformFunction
    ]
})
console.log(result.code)
```

转换之后的结果

```js
//语法
const a = function (params = 2) {
  return 1 + params;
};
const b = [1, 2, 3];
const c = [...b, 4, 5];
class Babel {}
new Babel();
//API
const x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(function (x) {
  return x % 2 === 0;
});
const y = Object.assign({}, {
  name: 1
});
```