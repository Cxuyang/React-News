import React from "react";
import { Row, Col} from 'antd';
import { Menu, Icon, Tabs, message, Form, Input, Button, CheckBox, Modal } from 'antd';
import {Link} from 'react-router-dom'
const FormItem = Form.Item;
const TabPane=Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class PCheader extends React.Component{
    constructor(){
        super();
        this.state={
            current:"top",
            modalVisible:false,
            action:'login',
            hasLogined:false,
            userNickName:'',
            userid:0
        };
    }
    componentWillMount(){
      console.log(localStorage);
      if(localStorage.userid){
        this.setState({
          userNickName:localStorage.userNickName,
          userid:localStorage.userid,
          hasLogined:true
        });
      }
    }
    setModalVisible(value){
      this.setState({modalVisible:value});
    }
    handleClick(e){
      (e.key=="register") ? (this.setState({current:"register"}),this.setModalVisible(true)):this.setState({current:e.key})
    }
    callback(e){
      (e.key == "1") ? this.setState({action:"login"}) :this.setState({action:"register"});
    }
    logout(){
      localStorage.userid="";
      localStorage.userNickName="";
      this.setState({hasLogined:false});
    }
    handleSubmit(e)
    {
      //阻止事件冒泡
      e.preventDefault();
      let myFetchOptions={
        method:'GET'
      }
      let formData = this.props.form.getFieldsValue();
      console.log(formData);
      //传递数据
      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
  		+ "&username="+formData.userName+"&password="+formData.password
  		+"&r_userName=" + formData.r_userName + "&r_password="
  		+ formData.r_password + "&r_confirmPassword="
  		+ formData.r_confirmPassword,myFetchOptions).then(response=>response.json()).then(json=>{
        console.log(json);
        this.setState({userNickName:json.NickUserName,userid:json.UserId});
        localStorage.userNickName=json.NickUserName;
        localStorage.userid=json.UserId;
      });
      message.success("请求成功!");
      this.setModalVisible(false);
      (this.state.action=="login") ? this.setState({hasLogined:true}) : this.setState({hasLogined:false});
    }
    render(){
      let {getFieldProps}=this.props.form;
      const usershow = this.state.hasLogined
      ?
      <Menu.Item key="logout" class="register">
        <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
        &nbsp;&nbsp;
        <Link target="_blank" to={'/PCUserCenter'}>
          <Button type="dashed" htmlType="button">个人中心</Button>
        </Link>
        &nbsp;&nbsp;
        <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
      </Menu.Item>
      :
      <Menu.Item key="register" class="register">
        <Icon type="user"/>注册/登录
      </Menu.Item>;
        return(
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a href="/" class="logo">
                            <img src="../../../src/images/newsloge.png" alt="logo"></img>
                            <span>NewsPage</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]} mode="horizontal">
                            <Menu.Item key="top"><Icon type="appstore" />头条</Menu.Item>
                            <Menu.Item key="shehui"><Icon type="mail" />社会</Menu.Item>
                            <Menu.Item key="guonei"><Icon type="mail" />国内</Menu.Item>
                            <Menu.Item key="yule"><Icon type="mail" />娱乐</Menu.Item>
                            <Menu.Item key="tiyu"><Icon type="mail" />体育</Menu.Item>
                            <Menu.Item key="keji"><Icon type="mail" />科技</Menu.Item>
                            <Menu.Item key="shishang"><Icon type="mail" />时尚</Menu.Item>
                            {usershow}
                        </Menu>
                        <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false) } OkText="关闭">
                          <Tabs type="card" onChange={this.callback.bind(this)}>
                          <TabPane tab={<span><Icon type="user" />登录</span>} key="1">
                              <Form onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem labbel="账户">
                                  <Input placeholder="请输入你的账号"{...getFieldProps('userName')}/>
                                </FormItem>
                                <FormItem labbel="密码">
                                  <Input type="password" placeholder="请输入你的密码"{...getFieldProps('password')}/>
                                </FormItem>
                                <Button type="primary" htmlType="submit">登录</Button>
                              </Form>
                            </TabPane>

                            <TabPane tab={<span><Icon type="login" />注册</span>} key="2">
                              <Form onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem labbel="账户">
                                  <Input placeholder="请输入你的账号"{...getFieldProps('r_userName')}/>
                                </FormItem>
                                <FormItem labbel="密码">
                                  <Input type="password" placeholder="请输入你的密码"{...getFieldProps('r_password')}/>
                                </FormItem>
                                <FormItem labbel="确认密码">
                                  <Input type="password" placeholder="请再次输入你的密码"{...getFieldProps('r_confirmpassword')}/>
                                </FormItem>
                                <Button type="primary" htmlType="submit">注册</Button>
                              </Form>
                            </TabPane>
                          </Tabs>
                        </Modal>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        )
    }
}
export default PCheader = Form.create({})(PCheader);
