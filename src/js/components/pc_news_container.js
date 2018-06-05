import React from "react";
import { Row, Col, Menu, Icon, Carousel,Tabs,Card } from 'antd';
import PC_news_block from './pc_news_block';
import PC_news_image_block from './pc_news_image_block';
import PCProduct from './pc_products'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane=Tabs.TabPane;
export default class PC_news_container extends React.Component{
    render(){
        const settings={
            dots:true,
            infinite:true,
            speed:500,
            slidesToShow:1,
            autoplay:true
        };
        return(
            <div class="pc_news_container">
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} class="container">
                        <div class="leftContainer">
                            <div class="carousel">
                                <Carousel {...settings}>
                                    <div><img src="../../src/images/carousel_1.jpg"/></div>
                                    <div><img src="../../src/images/carousel_2.jpg"/></div>
                                    <div><img src="../../src/images/carousel_3.jpg"/></div>
                                    <div><img src="../../src/images/carousel_4.jpg"/></div>
                                </Carousel>
                            </div>
                            <PC_news_image_block count={6} type="top" width="400px" cardTitle="头条新闻" imageWidth="112px"/>
                        </div>
                        <div class="tab_content">
                            <Tabs class="tabs_news">
                                <TabPane tab="头条新闻" key="1">
                                    <PC_news_block count={22} type="top" width="100%" bordered="false"></PC_news_block>
                                </TabPane>
                                <TabPane tab="社会" key="2">
                                    <PC_news_block count={22} type="shehui" width="100%" bordered="false"></PC_news_block>
                                </TabPane>
                                <TabPane tab="国内" key="3">
                                    <PC_news_block count={22} type="guonei" width="100%" bordered="false"></PC_news_block>
                                </TabPane>
                                <TabPane tab="娱乐" key="4">
                                    <PC_news_block count={22} type="yule" width="100%" bordered="false"></PC_news_block>
                                </TabPane>
                            </Tabs>
                        </div>
                        <div class="Link_tab">
                            <Tabs class="tabs_product">
                                <TabPane tab="相关链接" key="1">
                                    <PCProduct/>
                                </TabPane>
                            </Tabs>
                        </div>
                        <div>
                            <PC_news_image_block count={8} type="guonei" width="100%" cardTitle="国内新闻" imageWidth="125px"/>
                            <PC_news_image_block count={16} type="yule" width="100%" cardTitle="娱乐新闻" imageWidth="125px"/>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}
