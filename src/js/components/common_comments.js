import React from 'react';
import {Row, Col, Menu, Icon, Tabs, message, Form, Input, Button, CheckBox, Modal, Card, notification} from 'antd';
import {Link} from 'react-router-dom'
import { stringify } from 'querystring';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

class CommonComments extends React.Component{
  constructor(){
    super();
    this.state={
      comments:'',
      commentsRenders:'',
      commentsCount:1
    };
  }
  componentDidMount(){
    let myFetchOptions={
      method:'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
          this.setState({comments:json});
          console.log(json.length);  
          if(json.length>(this.state.commentsCount * 5)){
            let commentsStr=[];
            for(let i=0; i<this.state.commentsCount * 5; i++){
              commentsStr.push(json[i]);
            }
            this.setState({commentsRenders:commentsStr});
          }else{
            this.setState({commentsRenders:json});
          }
      });
    //    

  };
  handleSubmit(e){
    //阻止submit事件向浏览器提交form数据
    e.preventDefault();
    let myFetchOptions={
      method:'GET'
    }
    let formdata = this.props.form.getFieldsValue();
    //formdata.remark为用户评论内容
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formdata.remark, myFetchOptions).then(response => response.json()).then(json => {
			this.componentDidMount();
		})
  };
  addUserCollection(){
    let myFetchOptions={
      method:'GET'
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey, myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      //收藏成功后提醒
      notification['success']({message:'ReactNews提醒',description:'收藏文章成功!'});
    })
  };
  //评论区切换
  //setState是异步的！！！！！！
  toggleComments(toggle){
    let commentsCount = this.state.commentsCount+1;
    (toggle=="more") ? this.setState({commentsCount:commentsCount},this.callBackforSetState):this.setState({commentsCount:1},this.callBackforSetState);   
  }
  //setState是异步的！！！！！！
  callBackforSetState(){
    if(this.state.comments.length>(this.state.commentsCount * 5)){
        let commentsStr=[];
        for(let i=0; i<this.state.commentsCount * 5; i++){
          commentsStr.push(this.state.comments[i]);
        }
        this.setState({commentsRenders:commentsStr});
      }else{
        this.setState({commentsRenders:this.state.comments});
      }
  }
  render(){
    let {getFieldProps}=this.props.form;
    //const {comments} = this.state;
    const {commentsRenders} = this.state;
    //
    const commentList = commentsRenders.length
    ?commentsRenders.map((commentsRender,index)=>(
      <div key={index} class="comment_wrapper">
        <div class="comment_user">
          <Icon type="user" />
        </div>
        <div class="comment_body">
          <div class="comment_header">
            <span class="username">{commentsRender.UserName}</span>
            <span class="comment_time">{commentsRender.datetime}</span>
            <Button icon="share-alt" size="small">分享</Button>
          </div>
          <div class="comment_conetnt">{commentsRender.Comments}</div>
          <div class="comment_footer">
            <Button icon="like" size="small">赞17</Button>
            <Button icon="message" size="small">回复37</Button>
          </div>          
        </div>
      </div>
    ))
    :'没有加载到任何评论';
    return(
      <div class="comment">
        <Row>
          <Col span={24}>
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <FormItem lable="你的评论">
                <div class="comment_form">
                  <Input type="textarea" rows={4} placeholder="随便写点什么" {...getFieldProps('remark',{initialValue: ''})} />
                  <div class="comments_button">
                      <Button type="primary" icon="upload" htmlType="submit">提交评论</Button>
                      <Button type="primary" icon="save" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏</Button>
                      <Button type="primary" icon="download" htmlType="button" onClick={this.toggleComments.bind(this,"hidden")}>收起评论</Button>
                  </div>
                </div>
                
              </FormItem>
            </Form>
            {commentList}
            <div class="moreComments" onClick={this.toggleComments.bind(this,"more")}>查看更多评论</div>
          </Col>
        </Row>
      </div>
    )
  }
}
export default CommonComments = Form.create({})(CommonComments);
