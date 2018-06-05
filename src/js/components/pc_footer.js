import React from "react";
import { Row, Col} from 'antd';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
export default class PCfooter extends React.Component{   
    render(){
        return(
            <header>
                <Row>
                    <Col span={2}></Col>                   
                    <Col span={20} class="footer">
                        &copy;&nbsp;2017 ReactNews. ALL Rights Reserved.
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>            
        )
    }
}