import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Modal} from 'antd';
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;
import {Tabs,message,Form,Input,Button,Checkbox,Card,notification,Upload,Breadcrumb,Layout} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const { Header, Content, Footer, Sider } = Layout;
import {Link} from 'react-router-dom'
import PCheader from './pc_header';
import PCfooter from './pc_footer';

export default class PCUerCenter extends React.Component{
  constructor(){
    super();
    this.state={
      usercollection: '',
			usercomments: '',
			previewImage: '',
			previewVisible: false,
      contentTpye:'usercollectionList'
    }
  };
  handleCancel(e){
    this.setState({
      previewVisible: false,
    });
  };
  componentDidMount(){
    let myFetchOptions={
      method:'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions).then(response=>response.json()).then(json=>{this.setState({usercollection:json});});

    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({usercomments:json});
    });
  };
  changeContent(e){
    this.setState({
      contentTpye:e.key,
    })

  }
  render(){
    const props={
      action: 'http://newsapi.gugujiankong.com/handler.ashx',
    	headers: {
    		"Access-Control-Allow-Origin":"*"
    	},
    	listType: 'picture-card',
    	defaultFileList:[
    		{
    			uid:-1,
    			name:'xxx.png',
    			state: 'done',
    			url:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
    			thumbUrl:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
    		}
    	],
      onPreview:(file)=>{
        this.setState({previewImage:file.url,previewVisible:true});
      }
    };
    const {usercollection,usercomments} = this.state;
    const usercollectionList = usercollection.length?
    usercollection.map((uc,index)=>(
      <Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={'/details/'+uc.uniquekey}>查看</a>} >
        <p>{uc.Title}</p>
      </Card>
    ))
    :
    '您还没有收藏任何的新闻，快去收藏一些新闻吧。'
    //
    const usercommentsList = usercomments.length ?
    usercomments.map((comment,index)=>(
      <Card key={index} title={'于'+comment.datetime+'评论了文章'} extra={<a target="_blank" href={'/details/'+comment.uniquekey}>查看</a>} >
        <p>{comment.Comments}</p>
      </Card>
    ))
    :
    '你还没有发表过任何评论。';
    /**/
    const rightContent = renderContent(this.state,this.handleCancel);
    function renderContent(state,handleCancel){
      switch(state.contentTpye){
        case "usercollectionList":
        return (usercollectionList);
        break;
        case "usercommentsList":
        return (usercommentsList);
        break;
        case "userHeadImage":
        return (
          <div class="clearfix">
            <Upload {...props}>
              <Icon type="plus"/>
              <div className="ant-upload-text">上传图片</div>
            </Upload>
            <Modal visible={state.previewVisible} footer={null} onCancel={handleCancel.bind(this)}>
              <img alt='预览' src={state.previewImage}/>
            </Modal>
          </div>
        );
        break;
        default:
        break;
      }
    }
    return(
      <div>
      <PCheader/>
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 25px' }}>
              <Breadcrumb.Item>ReactNews</Breadcrumb.Item>
              <Breadcrumb.Item>个人中心</Breadcrumb.Item>
            </Breadcrumb>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu mode="inline"  onClick={this.changeContent.bind(this)} defaultSelectedKeys={['usercollectionList']} defaultOpenKeys={['sub1']} style={{ height: '100%' }}>
                  <SubMenu key="sub1" title={<span><Icon type="user"/>基本信息</span>}>
                    <MenuItem key="usercollectionList">我的收藏列表</MenuItem>
                    <MenuItem key="usercommentsList">我的评论列表</MenuItem>
                    <MenuItem key="userHeadImage">头像设置</MenuItem>
                    <MenuItem key="personalInfo">个人信息</MenuItem>
                  </SubMenu>
                  <SubMenu key="sub2" title={<span><Icon type="bars"/>其他</span>}>
                    <MenuItem key="5">我的点赞列表</MenuItem>
                    <MenuItem key="6">其他列表</MenuItem>
                  </SubMenu>
                </Menu>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                {rightContent}
              </Content>
            </Layout>
          </Content>
          </Col>
          <Col span={2}></Col>
        </Row>
      <PCfooter/>
      </div>
    )
  }
}
