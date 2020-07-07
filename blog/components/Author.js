import {Avatar, Divider,Tooltip} from 'antd'
import '../public/style/components/author.css'
import {GithubOutlined, QqOutlined, WechatOutlined} from '@ant-design/icons'

const Author = () => {
  return (
    <div className="author-div comm-box">
      <div>
        <Avatar size={100} src="http://b43.photo.store.qq.com/psb?/V10ZzE001V19tz/6GB7NalJBE2bDU*WWGHbbXj3duv8AfZCE4lxaPonh8U!/b/dCsAAAAAAAAA&bo=gAJwBAAAAAAFB9I!&rf=viewer_4"/>
      </div>
      <div className="author-instroduction">
          有全栈想法的前端程序员
          <Divider>社交账号</Divider>
          <Tooltip placement="topRight" title={'https://github.com/Ocean-dream/'}>
            <Avatar size={28} icon={<GithubOutlined />} src="https://github.com/Ocean-dream/" className="account" />
          </Tooltip>
          <Tooltip placement="topRight" title={961742948}>
            <Avatar size={28} icon={<QqOutlined />} className="account" alt="961742948" />
          </Tooltip>
          <Tooltip placement="topRight" title={'y2527668'}>
            <Avatar size={28} icon={<WechatOutlined />} className="account" />
          </Tooltip>
      </div>
    </div>
  )
}
export default Author