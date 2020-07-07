import React, {useState, useEffect} from 'react'
import marked from 'marked'
import { Row, Col ,Input, Select ,Button ,DatePicker,message } from 'antd'
import axios from 'axios'
import serverPath from '../config/appiUrl'
import '../static/css/addarticle.css'

const { Option } = Select;
const { TextArea } = Input
function AddArctile() {
    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate,setShowDate] = useState()   //发布日期
    // const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState(1) //选择的文章类别

    // 设置marked
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false
    })

    // 实现预览内容
    const changeMarked = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }
    // 文章简介
    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }
    useEffect(() => {
        getArticleType()
    }, [])
    // get article type
    const getArticleType = async() => {
        const {data: res} = await axios({
            method: 'get',
            url: serverPath.getTypeInfo,
            withCredentials: true
        })
        setTypeInfo(res.data)
    }
    // set typeInfo
    const selectType = (value) => {
        setSelectType(value)
    }
    const saveArticle = async() => {
        if (!articleTitle) {
            message.error('文章标题不能为空')
            return false
        } else if (!selectedType) {
            message.error('文章类别不能为空')
            return false
        } else if (!articleContent) {
            message.error('文章内容不能为空')
            return false
        } else if (!introducemd) {
            message.error('文章简介不能为空')
            return false
        } else if (!showDate) {
            message.error('发布日期不能为空')
            return false
        }
        let datetext= showDate.replace('-','/') //把字符串转换成时间戳
        let dataProps = {
            title: articleTitle,
            article_content: articleContent,
            introduce: introducemd,
            addTime: (new Date(datetext).getTime())/1000,
            type_id: selectedType
        }
            const {data: res} = await axios({
                method: 'post',
                url: serverPath.addArticle,
                withCredentials: true,
                data: dataProps
            })
            setArticleId(res.insertId)
            if (res.code == 0) {
                message.success('发布成功')
                setIntroducehtml('等待编辑')
                setMarkdownContent('预览内容')
            }
    }
    return (
        <div>
            <Row gutter={5}>
            <Col span={18}>
                <Row gutter={10}>
                    <Col span={20}>
                        <Input placeholder="博客标题" size="large" onChange={e => {setArticleTitle(e.target.value)}}/>
                    </Col>
                    <Col span={4}>
                        &nbsp;
                        <Select defaultValue={selectedType} size="large" onChange = {selectType}>
                            {typeInfo.map((item, index) => {
                                return (
                                    <Option value={item.id} key={index}>{item.typeName}</Option>
                                )
                            })}
                        </Select>
                    </Col>
                </Row>
                <br/>
                <Row gutter={10}>
                    <Col span={12}>
                        <TextArea className="markdown-content" rows={35} placeholder="文章内容" onChange={changeMarked}/>
                    </Col>
                    <Col span={12}>
                       <div className="show-html"  dangerouslySetInnerHTML={{__html: markdownContent}}>
                       </div>
                    </Col>
                </Row>
            </Col>
            <Col span={6}>
                <Row>
                    <Col span={24}>
                            <Button  size="large">暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                            <br/>
                    </Col>
                    <Col span={24}>
                        <br/>
                        <TextArea 
                            rows={4} 
                            placeholder="文章简介"
                            onChange={changeIntroduce}
                        />
                        <br/><br/>
                        <div  className="introduce-html" dangerouslySetInnerHTML={{__html: introducehtml}}></div>
                    </Col>
                    <Col span={12}>
                        <div className="date-select">
                            <DatePicker
                            onChange={(date,dateString)=>setShowDate(dateString)}
                                placeholder="发布日期"
                                size="large"  
                            />
                        </div>
                    </Col>
                </Row>
            </Col>
            </Row>
        </div>
    )
}
export default AddArctile