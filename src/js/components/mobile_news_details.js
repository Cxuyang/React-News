import React from 'react';
import {Row, Col, BackTop} from 'antd';
import MobileHeader from './mobile_header';
import MobleFooter from './mobile_footer';
import CommonComments from './common_comments';
export default class Mobile_news_details extends React.Component{
constructor(){
    super();
    this.state={
        newsItem:''
    };
};
componentDidMount(){
    let myFetchOptions={
        method:'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey, myFetchOptions)
    .then(response=>response.json()
    .then(json=>{this.setState({newsItem:json});
    console.table(json);
        document.title=this.state.newsItem.title+" - React News | React 驱动的新闻平台"}))
    };
    createMarkup(){
        return {__html:this.state.newsItem.pagecontent};
    };
render(){
    return(
        <div>
            <MobileHeader/>
            <Row>
                <Col span={24}>
                    <div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                    <hr/>
                    <div class="comments">
                      <CommonComments  uniquekey={this.props.match.params.uniquekey}/>
                    </div>

                </Col>
            </Row>
            <BackTop/>
            <MobleFooter/>
        </div>

    )
}
}
