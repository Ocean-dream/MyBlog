import Head from 'next/head'
import axios from 'axios'
import {Row, Col, Breadcrumb, Affix} from 'antd'
import Header from './../components/Header'
import Author from './../components/Author'
import Advert from './../components/Addvert'
import Footer from './../components/Footer'
import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import {CalendarOutlined, FolderOutlined, FireOutlined} from '@ant-design/icons'


import '../public/style/pages/detail.css'

const Detailed = () =>{
  
let markdown='# P01:课程介绍和环境搭建\n' +
'[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
'> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
 '**这是加粗的文字**\n\n' +
'*这是倾斜的文字*`\n\n' +
'***这是斜体加粗的文字***\n\n' +
'~~这是加删除线的文字~~ \n\n'+
'\`console.log(111)\` \n\n'+
'# p02:来个Hello World 初始Vue3.0\n' +
'> aaaaaaaaa\n' +
'>> bbbbbbbbb\n' +
'>>> cccccccccc\n'+
'***\n\n\n' +
'# p03:Vue3.0基础知识讲解\n' +
'> aaaaaaaaa\n' +
'>> bbbbbbbbb\n' +
'>>> cccccccccc\n\n'+
'# p04:Vue3.0基础知识讲解\n' +
'> aaaaaaaaa\n' +
'>> bbbbbbbbb\n' +
'>>> cccccccccc\n\n'+
'#5 p05:Vue3.0基础知识讲解\n' +
'> aaaaaaaaa\n' +
'>> bbbbbbbbb\n' +
'>>> cccccccccc\n\n'+
'# p06:Vue3.0基础知识讲解\n' +
'> aaaaaaaaa\n' +
'>> bbbbbbbbb\n' +
'>>> cccccccccc\n\n'+
'# p07:Vue3.0基础知识讲解\n' +
'> aaaaaaaaa\n' +
'>> bbbbbbbbb\n' +
'>>> cccccccccc\n\n'+
'``` var a=11; ```'
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
              <Breadcrumb.Item>视频教程</Breadcrumb.Item>
              <Breadcrumb.Item>xxx</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="detailed-title">
              今天中午吃点什么
          </div>
          <div className="list-icon center"> 
            <span><CalendarOutlined /> 2019-06-18</span>
            <span><FolderOutlined /> 视频教程</span>
            <span><FireOutlined /> 5864</span>
          </div>
          <div className="detailed-content">
            <ReactMarkdown 
              source={markdown}
              escapeHtml={false}
            />
          </div>
        </Col>
        <Col className="comm-right"  xs={0} sm={0} md={14} lg={8} xl={6}>
          <Author/>
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <MarkNav 
                className="article-menu"
                source={markdown}
                ordered={false}
              />
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
    axios('http://127.0.0.1:7002/default/getArticleById/' + id)
    .then(res => {
      console.log(res.data)
      resolve(res.data)
    })
  })
  return promise
}

export default Detailed
