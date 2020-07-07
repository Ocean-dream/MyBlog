import '../public/style/components/advert.css'
const Advert = () => {
  var bg5 = {
    background: 'url(../../assets/5.png) no-repeat'
  }
  var bg6 = {
    background: 'url(../../assets/6.png) no-repeat'
  }
  var bg7 = {
    background: 'url(../../assets/7.png) no-repeat'
  }
  var bg8 = {
    background: 'url(../../assets/8.png) no-repeat'
  }
  return (
    <div className="ad-div comm-box">
       <div className="sky">
         <h3>路漫漫其修远兮，吾将上下而求索！</h3>
       </div>
      {/* <div><img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1208538952,1443328523&fm=26&gp=0.jpg" width="100%" /></div>
      <div><img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1208538952,1443328523&fm=26&gp=0.jpg" width="100%" /></div>
      <div><img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1208538952,1443328523&fm=26&gp=0.jpg" width="100%" /></div>
      <div><img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1208538952,1443328523&fm=26&gp=0.jpg" width="100%" /></div> */}
       <div className="f1" style={bg5}></div>
        <div className="f2" style={bg6}></div>
        <div className="f3" style={bg7}></div>
        <div className="f4" style={bg8}></div>
    </div>
  )
}
export default Advert