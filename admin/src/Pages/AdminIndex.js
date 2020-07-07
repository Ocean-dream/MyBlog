import React, {useState} from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { Route,BrowserRouter as Router } from 'react-router-dom'
import AddArctile from './AddArctile'
import ArctileList from './ArticleList'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import '../static/css/adminIndex.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
    const [collapsed, setCollapsed] = useState(false)
    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    }
    const handleMenu = (e) => {
      let key = e.key
      switch (key) {
        case '1':
          props.history.push('/index')
          break;
        case 'articleList':
          props.history.push('/index/list')
          break;
        default:
          break;
      }
    }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={handleMenu}>
            <Menu.Item key="1">
              <PieChartOutlined />
              <span>工作台</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <UserOutlined />
                  <span>文章管理</span>
                </span>
              }
            >
              <Menu.Item key="articleList">文章列表</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <FileOutlined />
              <span>留言管理</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
              <Breadcrumb.Item>添加文章</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Route path='/index' exact component={AddArctile}></Route>
              <Route path='/index/list/' component={ArctileList}></Route>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>haiyang.com</Footer>
        </Layout>
      </Layout>
    );
  }
  export default AdminIndex