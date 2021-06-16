
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu } from 'antd';
// import User from "./pages/users/user";
import { NavLink , withRouter} from 'react-router-dom';
// import helloWorld from "./pages/hello/hello";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class SiderDemo extends React.Component {


  state = {
    collapsed: false,
    mode: 'inline',

  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
        this.state.collapsed?document.querySelector(".ant-layout.ant-layout-has-sider > .ant-layout, .ant-layout.ant-layout-has-sider > .ant-layout-content").style.left="200px":document.querySelector(".ant-layout.ant-layout-has-sider > .ant-layout, .ant-layout.ant-layout-has-sider > .ant-layout-content").style.left="80px";
    };

    handleClick = (item,key,selectedKeys) => {
        console.log("aaaaaaaaa", item.key)
      this.setState({
          current: item.key
      });

    }
  render() {
    const path = this.props.location.pathname
      console.log(path)
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"  selectedKeys={path}>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <span>成员管理</span>
                </span>
              }
            >
                <Menu.Item key="/" onSelect={this.handleClick} >
                  <NavLink to="/" activeClassName="helloWorld" exact={true}>
                      <span className="nav-text">Dashboard</span>
                  </NavLink>
              </Menu.Item>
              <Menu.Item key="/user" onSelect={this.handleClick}>
                  <NavLink to="/user" activeClassName="User" exact={true}>
                      <span className="nav-text">用户列表</span>
                  </NavLink>
              </Menu.Item>
            </SubMenu>

          </Menu>
        </Sider>
        <Layout>
            <Header>
              <span style={{color:'#fff', paddingLeft:'85%', fontSize:'1em'}}>欢迎来到管理系统！</span>
            </Header>
            <Content style={{ margin: '0 16px' }}>
                {this.props.content}
                {console.log(this.state.current)}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(SiderDemo)