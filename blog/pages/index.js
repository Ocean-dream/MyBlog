import React, {useState} from 'react';
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Head from 'next/head'
import {Row, Col, List} from 'antd'
import Link from 'next/link'
import Header from './../components/Header'
import Author from './../components/Author'
import Advert from './../components/Addvert'
import Footer from './../components/Footer'
import '../public/style/pages/index.css' 
import '../public/style/pages/common.css'

import {CalendarOutlined, FolderOutlined, FireOutlined} from '@ant-design/icons'

const Home = (list) => {
  const [myList, setMyList] = useState(list.data)
  return (
    <div>
      <Header>
        <title>home</title>
      </Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left"  xs={24} sm={24} md={10} lg={10} xl={10} >
          <List 
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={myList}
            renderItem={(item) => (
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname: '/detailed', query:{id: item.id}}}><a>{item.title}</a></Link>
                </div>
                <div className="list-icon"> 
            <span><CalendarOutlined /> {item.addTime}</span>
                  <span><FolderOutlined /> {item.typeName}</span>
                  <span><FireOutlined /> {item.view_count}</span>
                </div>
                <div className="list-context">{item.introduce}</div>
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

Home.getInitialProps = () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList)
    .then(res => {
      resolve(res.data)
    })
  })
  return promise
}

export default Home
