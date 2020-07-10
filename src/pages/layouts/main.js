import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Menu from 'antd/lib/menu'
import Card from 'antd/lib/card'
import Layout from 'antd/lib/layout'
import Button from 'antd/lib/button'
import Breadcrumb from 'antd/lib/breadcrumb'
import { LogoutOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { ChangeRoute } from '../../redux/static'
import { Link } from '@reach/router'
import menus from '../../menu'

const { Header, Content, Sider, Footer } = Layout
const { SubMenu } = Menu

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  color: white;
  height: 100%;
`
const SpinBreadcrumb = styled.div`
  position: relative;
  height: auto;
  padding: 20px;
  border: 1px solid #eee;
  background: #fff;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 20px 0 rgba(0,0,0,.09);
`

const Main = ({ children }) => {
  const { route } = useSelector(state => state.router)
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')

  useEffect(() => {
    menus.forEach(({ subs }, index) => {
      subs.forEach(({ path }, _index) => {
        if (path === route) { setTitle(menus[index]?.subs[_index].name) }
      })
    })
  }, [route])

  useEffect(() => {
    dispatch({ type: ChangeRoute, payload: window.location.pathname })
  }, [])

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', padding: '0 16px' }}>
        <Container>
          <img style={{ margin: 'auto 0' }} src='https://cdn.duckbet.com/wl/?id=xqbypFvlgdQoAqjPt7qzvzM4noKzm0sk' alt='logo' />
          <Button type='primary' style={{ margin: 'auto 0' }} icon={<LogoutOutlined />} size='large' danger />
        </Container>
      </Header>
      <Layout>
        <Sider width={200} style={{ overflow: 'auto', height: '100vh', position: 'fixed', marginTop: 64 }} >
          <Menu mode='inline' defaultSelectedKeys={[window.location.pathname]} defaultOpenKeys={menus.map(({ path }) => path)} style={{ height: '100%', borderRight: 0 }}>
            {
              menus.map(({ path, name, subs, Icon }) =>
                <SubMenu key={path} icon={<Icon />} title={name}>
                  {
                    subs.map(({ path, name }) =>
                      <Menu.Item key={path} onClick={() => dispatch({ type: ChangeRoute, payload: path })}>
                        <Link to={path}>
                          {name}
                        </Link>
                      </Menu.Item>
                    )
                  }
                </SubMenu>
              )
            }
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px', margin: '64px 0 0 200px', minHeight: 'calc(100vh - 64px)' }}>
          <SpinBreadcrumb>
            <Breadcrumb>
              {
                route.split('/').map((name, index) =>
                  <Breadcrumb.Item key={index}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Breadcrumb.Item>
                )
              }
            </Breadcrumb>
          </SpinBreadcrumb>
          <Content className='site-layout-background' style={{ padding: 24 }} >
            <Card title={title} bordered={false}>
              {children}
            </Card>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Duck Bet ©2020</Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

Main.propTypes = {
  children: PropTypes.node
}

export default Main
