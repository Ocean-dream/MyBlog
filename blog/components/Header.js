import React, {useEffect, useState}from 'react';
import '../public/style/components/header.css'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import {Row, Col, Menu} from 'antd'
import servicePath from '../config/apiUrl'
import {HomeOutlined, YoutubeOutlined, SmileOutlined} from '@ant-design/icons'

const Header =  () => {
  const [navArr, setNavArr] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo)
      .then(res => {
        return res.data.data
      })
      setNavArr(result)
    }
    fetchData()
  },[])
  const handleClick = (e) => {
    if (e.key == 1) {
      Router.push('/index')
    } else {
      Router.push('/list?id=' + e.key)
    }
  }
  return (
    <div className="header">
      <Row type="flex" justify="space-around">
        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
          <span className="header-logo">孟海洋</span>
          <span className="header-text">每天进步一点点</span>
        </Col>
        <Col  xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal" onClick = {handleClick}>
            {navArr.map((item) => {
              return (
              <Menu.Item key={item.id}>
                    <HomeOutlined />
                    {item.typeName}
              </Menu.Item>
              )
            })}
          </Menu>
        </Col>
      </Row>
    </div>
  )
}
export default Header