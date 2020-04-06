import React from 'react';
import '../public/style/components/header.css'
import {Row, Col, Menu} from 'antd'
import {HomeOutlined, YoutubeOutlined, SmileOutlined} from '@ant-design/icons'

const Header =  () => (
  <div className="header">
    <Row type="flex" justify="space-around">
      <Col xs={24} sm={24} md={10} lg={10} xl={10}>
        <span className="header-logo">孟海洋</span>
        <span className="header-text">每天进步一点点</span>
      </Col>
      <Col  xs={0} sm={0} md={14} lg={8} xl={6}>
        <Menu mode="horizontal">
          <Menu.Item key='home'>
          <HomeOutlined />
            首页
          </Menu.Item>
          <Menu.Item key='video'>
          <YoutubeOutlined />
            视频
          </Menu.Item>
          <Menu.Item key='life'>
          <SmileOutlined />
            生活
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  </div>
)

export default Header