import React from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Checkbox from 'antd/lib/checkbox'
import Card from 'antd/lib/card'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  .ant-card {
    margin: auto;
  }
`

const Login = () => {
  const onFinish = values => {
    console.log(values)
  }

  return (
    <Container>
      <Card title='Login' style={{ height: 'fit-content' }}>
        <Form
          name='basic'
          initialValues={{
            remember: true,
            username: 'admin',
            password: '1234'
          }}
          onFinish={onFinish}
        >
          <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Please input your username!' }]} >
            <Input />
          </Form.Item>
          <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]} >
            <Input.Password />
          </Form.Item>
          <Form.Item name='remember' valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
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
