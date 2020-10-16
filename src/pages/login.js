import React from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Card from 'antd/lib/card'
import styled from 'styled-components'
import Axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from '@reach/router'

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  .ant-card {
    margin: auto;
  }
`

const Login = () => {
  const navigate = useNavigate()

  const submit = async (data) => {
    const res = await Axios.post('http://172.104.171.122:2041/auth/token', data)
    if (res.data.token) {
      Cookies.set('token', res.data.token, res.data.token, { expires: 8 })
      navigate('/')
    }
  }

  return (
    <Container>
      <Card title='Login' style={{ height: 'fit-content' }}>
        <Form
          name='basic'
          initialValues={{
            username: 'admin',
            password: '1234'
          }}
          onFinish={submit}>
          <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
            <input type='text' />
          </Form.Item>
          <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item style={{ margin: 0 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Container>
  )
}

export default Login
