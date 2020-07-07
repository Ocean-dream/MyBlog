import React, {useState, useEffect} from 'react'
import { Table,Space,message} from 'antd';
import axios from 'axios'
import servePath from './../config/appiUrl'
function ArticleList() {
    const columns = [
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '简介',
          dataIndex: 'introduce',
          key: 'introduce',
        },
        {
          title: '时间',
          dataIndex: 'addTime',
          key: 'addTime',
        },
        {
          title: '类型',
          key: 'typeName',
          dataIndex: 'typeName',
        },
        {
          title: '观看人数',
          key: 'view_count',
          dataIndex: 'view_count',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a>Edit</a>
              <a onClick={() => deleteTableData(record.id)}>Delete</a>
            </Space>
          ),
        },
      ];
      const [tableData, setTableData] = useState([])
      // 获取所有文章
      const getAllArticle = async() => {
        const {data:res} = await axios({
          method: 'get',
          url: servePath.getAllArticle,
          data: {},
          withCredentials: true
        })
        setTableData(res.data)
      }
      // 删除文章
      const deleteTableData = async (id) => {
        console.log(IDBCursorWithValue)
        const {data: res} = await axios({
          method: 'get',
          url: servePath.deleteArticle + id,
          data: {},
          withCredentials: true
        })
        if (res.data.code == 0) {
          message.success('删除成功')
          getAllArticle()
        }
      }
      useEffect(() => {
        getAllArticle()
      },[])
    return (
        <div>
            <Table rowKey={(record => record.id)} columns={columns} dataSource={tableData} />
        </div>
    )
}

export default ArticleList