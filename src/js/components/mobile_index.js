import React from 'react';
import MobileHeader from './mobile_header';
import MobleFooter from './mobile_footer';
import Mobile_news_list from './mobile_list';
import {Tabs,Carousel} from 'antd';
import MobileListPullRefresh from './mobile_list_pull_refresh'
const TabPane = Tabs.TabPane;
export default class MobileIndex extends React.Component{
  render(){
    const settings={
      dots:true,
      infinite:true,
      speed:500,
      slidesToShow:1,
      autoplay:true
    }
    return (
      <div>
        <MobileHeader></MobileHeader>
        <Tabs style={{width:'100%'}}>
          <TabPane tab="头条" key="1">
          <div class="carousel">
							<Carousel {...settings}>
								<div><img src="/src/images/carousel_1.jpg"/></div>
								<div><img src="/src/images/carousel_2.jpg"/></div>
								<div><img src="/src/images/carousel_3.jpg"/></div>
								<div><img src="/src/images/carousel_4.jpg"/></div>
							</Carousel>
						</div>
            <Mobile_news_list count={20} type="top" />
          </TabPane>
          <TabPane tab="社会" key="2">
            <Mobile_news_list count={20} type="shehui" />
          </TabPane>
          <TabPane tab="国内" key="3">
            <MobileListPullRefresh count={20} type="guonei"/>
          </TabPane>
          <TabPane tab="娱乐" key="4">
            <Mobile_news_list count={20} type="yule" />
          </TabPane>
          <TabPane tab="体育" key="5">
            <Mobile_news_list count={20} type="tiyu" />
          </TabPane>
          <TabPane tab="科技" key="6">
            <Mobile_news_list count={20} type="keji" />
          </TabPane>
          <TabPane tab="时尚" key="7">
            <Mobile_news_list count={20} type="shishang" />
          </TabPane>
        </Tabs>
        <MobleFooter></MobleFooter>
      </div>
    );
  };
}
