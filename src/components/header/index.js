import React from 'react';
import {Menu,Layout} from 'antd';
import 'antd/dist/antd.css';
import MenuConfig from '../../config/menuConfig'
import { Link } from 'react-router-dom'
import styles  from './index.module.css'
import Modals from '../../pages/modal/index'


const {Header}=Layout
export default class Headers extends React.Component{
    componentWillMount(){
        const menuTressNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTressNode
        })
    }
    //菜单渲染
    renderMenu=(data)=>{
        return data.map((item)=>{
          
            return  <Menu.Item title={item.title} key={item.key}>
                        <Link  to={item.key} >{item.title}  </Link>                        
                    </Menu.Item>
        })
    }

    render(){
        return(
        <Layout>
            <Header>
                <div style={{float:'right',marginRight:20,display:'inline'}}>
                     < Modals/> 
                </div>
                <Menu
                mode= 'horizontal'
                theme='dark' 
                style={{textAlign:"center"}}
                className={styles.header}
                >     
                { this.state.menuTressNode }  
                </Menu> 
            </Header>
        </Layout>
        )
    }
}