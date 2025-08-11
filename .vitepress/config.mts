import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  title: "react docs",
  base: "/react-docs/",
  outDir: "./docs",
  description: "this is react docs for xiaoman",
  head: [
    ['link', { rel: 'icon', href: '/react.ico' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    search: {
      provider: 'local',
    },
    lastUpdated: {
      text: '更新时间',
    },
    outline: {
      label: '文章目录',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'React', link: '/react/basic/introduce' },
      { text: 'React Native', link: '/react-native/basic/introduce' },
      { text: '自媒体', link: '/self-media' }
    ],

    sidebar: {
      '/react/': [
        {
          text: '入门',
          items: [
            { text: 'React基本介绍', link: '/react/basic/introduce' },
            { text: 'React开发环境搭建', link: '/react/basic/development' },
            { text: 'tsx语法入门', link: '/react/basic/tsx' },
          ]
        },
        {
          text: '工具',
          items: [
            { text: 'Babel', link: '/react/tools/babel' },
            { text: 'Swc', link: '/react/tools/swc' },
          ]
        },
        {
          text: '原理',
          items: [
            { text: 'vdom fiber diff', link: '/react/principle/vdom' },
            { text: 'requestidlecallback', link: '/react/principle/requestidlecallback' }
          ]
        },
        {
          text: '组件',
          items: [
            { text: '认识组件', link: '/react/components/base' },
            { text: '组件通信', link: '/react/components/communication' },
            { text: '受控组件', link: '/react/components/controlled' },
            { text: '传送组件', link: '/react/components/createPortal' },
            { text: '异步组件', link: '/react/components/suspense' },
            { text: '组件实战', link: '/react/components/practice' },
            { text: '高阶组件', link: '/react/components/hoc' }
          ]
        },
        {
          text: 'css方案',
          items: [
            { text: 'css modules', link: '/react/css/css-modules' },
            { text: 'css in js', link: '/react/css/css-in-js' },
            { text: 'css 原子化', link: '/react/css/css-atomic' }
          ]
        },
        {
          text: 'Hooks',
          items: [
            {
              text: '数据驱动',
              items: [
                { text: 'useState', link: '/react/hooks/useState' },
                { text: 'useReducer', link: '/react/hooks/useReducer' },
                { text: 'useImmer', link: '/react/hooks/useImmer' },
                { text: 'useSyncExternalStore', link: '/react/hooks/useSyncExternalStore' },
                { text: 'useTransition', link: '/react/hooks/useTransition' },
                { text: 'useDeferredValue', link: '/react/hooks/useDeferredValue' }
              ]
            },
            {
              text: '副作用',
              items: [
                { text: 'useEffect', link: '/react/hooks/useEffect' },
                { text: 'useLayoutEffect', link: '/react/hooks/useLayoutEffect' },
                { text: 'useInsertionEffect', link: '/react/hooks/useInsertionEffect' }
              ]
            },
            {
              text: '状态传递',
              items: [
                { text: 'useRef', link: '/react/hooks/useRef' },
                { text: 'useImperativeHandle', link: '/react/hooks/useImperativeHandle' },
                { text: 'useContext', link: '/react/hooks/useContext' },
              ]
            },
            {
              text: '状态派生',
              items: [
                { text: 'useMemo', link: '/react/hooks/useMemo' },
                { text: 'useCallback', link: '/react/hooks/useCallback' }
              ],
            },
            {
              text: '工具Hooks',
              items: [
                { text: 'useDebugValue', link: '/react/hooks/useDebugValue' },
                { text: 'useId', link: '/react/hooks/useId' }
              ]
            },
            {
              text: '其他',
              items: [
                { text: '自定义hooks', link: '/react/hooks/custom' },
              ]
            }
          ]
        },
        {
          text: 'Router',
          items: [
            {
              text: '基本使用',
              items: [
                { text: '安装', link: '/react/router/install' },
                { text: '模式', link: '/react/router/mode' },
                { text: '路由', link: '/react/router/router' },
                { text: '传参', link: '/react/router/params' },
                { text: '懒加载', link: '/react/router/lazy' },
                { text: '操作', link: '/react/router/operation' },
                { text: '导航', link: '/react/router/nav' },
                { text: '边界处理', link: '/react/router/boundary' },
              ]
            },
            {
              text:'API',
              items:[
                { text: 'Await', link: '/react/router/apis/await' },
                { text: 'Link', link: '/react/router/apis/link' },
                { text: 'Meta', link: '/react/router/apis/meta' },
                { text: 'NavLink', link: '/react/router/apis/navlink' },
                { text: 'redirect', link: '/react/router/apis/redirect' },
                { text: 'ScrollRestoration ', link: '/react/router/apis/scrollRestoration' },
              ]
            },
            {
              text:'Hooks',
              items:[
                { text: 'useNavigate', link: '/react/router/hooks/useNavigate' },
                { text: 'useNavigation', link: '/react/router/hooks/useNavigation' },
                { text: 'useParams', link: '/react/router/hooks/useParams' },
                { text: 'useSearchParams', link: '/react/router/hooks/useSearchParams' },
                { text: 'useLocation', link: '/react/router/hooks/useLocation' },
                { text: 'useLoaderData', link: '/react/router/hooks/useLoaderData' },
                { text: 'useActionData', link: '/react/router/hooks/useActionData' },
                { text: 'useRouteError', link: '/react/router/hooks/useRouteError' },
                { text: 'useSubmit', link: '/react/router/hooks/useSubmit' },
              ]
            }
          ]
        },
        {
          text: 'Zustand',
          items: [
            { text: '安装', link: '/react/zustand/install' },
            { text: '状态处理', link: '/react/zustand/state' },
            { text: '状态简化', link: '/react/zustand/simplify' },
            { text: '中间件', link: '/react/zustand/middleware' },
            { text: '订阅', link: '/react/zustand/subscribe' },
          ]
        }
      ],
      '/react-native/': [
        {
           text:'入门',
           items:[
            { text: '简介', link: '/react-native/basic/introduce' },
            { text: '环境搭建', 
              items:[
                { text: 'Android环境搭建', link: '/react-native/basic/env-android' },
                { text: 'iOS环境搭建', link: '/react-native/basic/env-ios' },
              ]
            },
            { text: '目录结构', link: '/react-native/basic/structure' },
           ]
        },
        {
           text:'原理',
           items:[
            { text: '架构', link: '/react-native/principle/architecture' },
            { text: '渲染', link: '/react-native/principle/render' },
            { text: '通讯', link: '/react-native/principle/communication' },
           ]
        },
        {
           text:'界面和交互',
           items:[
            { text: '样式', link: '/react-native/ui/style' },
            { text: '布局', link: '/react-native/ui/layout' },
            { text: '图片', link: '/react-native/ui/image' },
            { text: '事件', link: '/react-native/ui/event' },
            { text: '动画', link: '/react-native/ui/animate' },
            { text: '网络', link: '/react-native/ui/network' },
           ]
        },
        {
          text:'组件',
          items:[
            { text: 'button', link: '/react-native/components/button' },
            { text: 'text', link: '/react-native/components/text' },
            { text: 'image', link: '/react-native/components/image' },
            { text: 'imageBackground', link: '/react-native/components/imageBackground' },
            { text: 'textInput', link: '/react-native/components/textInput' },
            { text: 'view', link: '/react-native/components/view' },
            { text: 'scrollView', link: '/react-native/components/scrollView' },
            { text: 'switch', link: '/react-native/components/switch' },
            { text: 'modal', link: '/react-native/components/modal' },
            { text: 'keyboardAvoidingView', link: '/react-native/components/keyboardAvoidingView' }
          ]
        },
        {
          text:'发布',
          items:[
            { text: '打包', link: '/react-native/build/build' },
            { text: 'iOS上架', link: '/react-native/build/publish-ios' },
            { text: 'Android上架', link: '/react-native/build/publish-android' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/message163/react-docs.git' }
    ],

    docFooter:{
       prev:'上一页',
       next:'下一页'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright ©2025-present xiaoman'
    }
  },
  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },
  rewrites: {
    'self-media/index.md': 'self-media.md'
  }
}))
