import Head from 'next/head'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import {Row, Col, Breadcrumb, Affix} from 'antd'
import Header from './../components/Header'
import Author from './../components/Author'
import Advert from './../components/Addvert'
import Footer from './../components/Footer'
// import ReactMarkdown from 'react-markdown'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
// import MarkNav from 'markdown-navbar'
// import 'markdown-navbar/dist/navbar.css'
import Tocify from './../components/tocify.tsx'
// import {CalendarOutlined, FolderOutlined, FireOutlined} from '@ant-design/icons'


import '../public/style/pages/detail.css'

const Detailed = (props) =>{
  const tocify = new Tocify()
  // 解析markdown格式
  const renderer = new marked.Renderer()
  renderer.heading = (text, level, raw) => {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor} class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  }
  marked.setOptions({
    renderer: renderer,
    gfm: true,     // 样式渲染方式
    pedantic: false,     // markdown格式容错
    sanitize: false, // 忽略原始标签
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: (code) => {
      return hljs.highlightAuto(code).value
    }
  })
  let html = marked(props.article_content )
  return (
    <div>
      <Header>
        <title>Detailed</title>
      </Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left"  xs={24} sm={24} md={10} lg={10} xl={10} >
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
              <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="detailed-title">
              {props.title}
          </div>
          <div className="list-icon center"> 
            <span><CalendarOutlined /> {props.addTime}</span>
            <span><FolderOutlined /> {props.typeName}</span>
            <span><FireOutlined /> {props.view_count}</span>
          </div>
          <div 
          className="detailed-content"
          dangerouslySetInnerHTML={{__html:html}}
          >
          </div>
        </Col>
        <Col className="comm-right"  xs={0} sm={0} md={14} lg={8} xl={6}>
          <Author/>
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              {tocify && tocify.render()}
              {/* <MarkNav 
                className="article-menu"
                source={html}
                ordered={false}
              /> */}
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}

Detailed.getInitialProps = (context) => {
  let id = context.query.id
  const promise = new Promise(resolve => {
    axios(servicePath.getArticleById + id)
    .then(res => {
      resolve(res.data.data[0])
    })
  })
  return promise
}

export default Detailed
