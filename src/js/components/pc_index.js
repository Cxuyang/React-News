import React from 'react';
import PCheader from './pc_header';
import PCfooter from './pc_footer';
import PC_news_container from './pc_news_container';
export default class PCIndex extends React.Component{
  render(){
    return (
      <div>
        <PCheader></PCheader>
        <PC_news_container></PC_news_container>
        <PCfooter></PCfooter>
      </div>
    );
  };
}
