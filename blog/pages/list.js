import React, {useState, useEffect} from 'react';
import Head from 'next/head'
import axios from 'axios'
import servicePath from '../config/apiUrl'
// import Router from 'next/router'
import Link from 'next/link'
import {Row, Col, List, Breadcrumb, Spin} from 'antd'
import Header from './../components/Header'
import Author from './../components/Author'
import Advert from './../components/Addvert'
import Footer from './../components/Footer'

import '../public/style/pages/common.css'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css'; 
import {CalendarOutlined, FolderOutlined, FireOutlined} from '@ant-design/icons'

const MyList = (list) => {
  // const [id, setId] = useState(2)
  const [myList, setMyList] = useState([])
  const [loading, setLoading] = useState(false)
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize:false,
    xhtml: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }

  }); 
  // 页面加载状态
  const goLoading = () => {
    setLoading(true)
  }
  useEffect(() => {
    setMyList(list.data)
  },[myList])
  return (
    <div>
      <Header>
        <title>home</title>
      </Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left"  xs={24} sm={24} md={10} lg={10} xl={10} >
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>生活</Breadcrumb.Item> 
            </Breadcrumb>
          </div>
          <div>
          </div>
          <List 
            header={<div>生活趣事</div>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={(item) => (
              <List.Item>
                <Spin spinning={loading}>
                  <div className="list-title" onClick={goLoading}>
                    <Link href={{pathname:'/detailed',query:{id: item.id}}}>
                      <a>
                      {item.title}
                      </a>
                    </Link>
                  </div>
                  <div className="list-icon"> 
            <span><CalendarOutlined /> {item.addTime}</span>
            <span><FolderOutlined /> {item.title}</span>
            <span><FireOutlined /> {item.view_count}</span>
                  </div>
                  <div className="list-context" dangerouslySetInnerHTML={{__html:marked(item.introduce)}}>
                    </div>
                </Spin>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right"  xs={0} sm={0} md={14} lg={8} xl={6}>
          <Author/>
          <Advert />
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}

MyList.getInitialProps = (context) => {
  let id = context.query.id
  const promise = new Promise(resolve => {
    axios(servicePath.getListById + id)
    .then(res => {
      resolve(res.data)
    })
  })
  return promise
}

export default MyList
