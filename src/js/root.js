import React from 'react';
import ReactDOM from 'react-dom';
import {Link,BrowserRouter,Switch,Route} from 'react-router-dom'
import MediaQuery from "react-responsive";
import 'antd/dist/antd.css';
import PCIndex from './components/pc_index';
import MobileIndex from './components/mobile_index';
import PC_news_details from './components/pc_news_details'
import Mobile_news_details from './components/Mobile_news_details'
import PCUserCenter from './components/PCUserCenter'
import MobileUserCenter from './components/mobileUserCenter'
export default class Root extends React.Component{
  render(){
    return (
      <div>
        <MediaQuery query='(min-device-width:1224px)'>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={PCIndex}></Route>
            <Route path="/details/:uniquekey" component={PC_news_details}></Route>
            <Route path="/PCUserCenter" component={PCUserCenter}></Route>
          </Switch>
        </BrowserRouter>
        </MediaQuery>
        <MediaQuery query='(max-device-width:1224px)'>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={MobileIndex}></Route>
              <Route path="/details/:uniquekey" component={Mobile_news_details}></Route>
              <Route path="/MobileUserCenter" component={MobileUserCenter}></Route>
            </Switch>
          </BrowserRouter>
        </MediaQuery>
      </div>
    );
  };
}

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));
