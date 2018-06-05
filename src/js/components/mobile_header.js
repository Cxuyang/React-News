import React from "react";
import { Row, Col} from 'antd';
import { Menu, Icon, Tabs, message, Form, Input, Button, CheckBox, Modal } from 'antd';
import {Link} from 'react-router-dom'
import MobileUserCenter from './MobileUserCenter'
const FormItem = Form.Item;
const TabPane=Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MobileHeader extends React.Component{
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
  if(localStorage.userNickName != ""){
    this.setState({
      userNickName:localStorage.userNickName,
      userid:localStorage.userid,
      hasLogined:true
    })
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
login(e){
  this.setModalVisible(true);
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
  + formData.r_confirmPassword,myFetchOptions).then(response=>response.json()).then(json=>{this.setState({userNickName:json.NickUserName,userid:json.UserId})});
  message.success("请求成功!");
  this.setModalVisible(false);
  localStorage.userNickName = JSON.userNickName;
  localStorage.userid=JSON.userid;
  (this.state.action=="login") ? this.setState({hasLogined:true}) : this.setState({hasLogined:false});
}
  render(){
    let {getFieldProps}=this.props.form;
    const userShow = this.state.hasLogined ? <Link to={'/MobileUserCenter'}><Icon type="inbox"/></Link> : <Icon type="setting" onClick={this.login.bind(this)} />

    return (
      <div id="mobileheader">
        <header>
            <a href="/">
              <img src="/src/images/newsloge.png" alt="logo"></img>
              <span>NewsPage</span>
            </a>
            {userShow}
        </header>
        <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false) } OkText="关闭">
          <Tabs defaultActiveKey="1" type="card">
            <TabPane onChange={this.callback.bind(this)} tab={<span><Icon type="user" />登录</span>} key="1">
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
      </div>
    );
  };
}
export default MobileHeader = Form.create({})(MobileHeader);
