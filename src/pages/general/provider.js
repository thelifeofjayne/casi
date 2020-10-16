import Form from 'antd/lib/form/Form'
import Input from 'antd/lib/input'
import Switch from 'antd/lib/switch'
import Tag from 'antd/lib/tag'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import TableMain from '../../components/table/main'

const Provider = () => {
  const [providers, setProviders] = useState([])

  useEffect(() => {
    getProvider()
  }, [])

  const nameInput = () => (
    <Form.Item
      name='casino_provider_name'
      style={{ margin: 0 }}
      rules={[
        {
          required: true,
          pattern: /^[a-zA-Zก-์ ]+$/,
          message: 'please_input_casino_provider_name!'
        }
      ]}>
      <Input />
    </Form.Item>
  )

  const imageInput = () => (
    <Form.Item
      name='casino_provider_image'
      style={{ margin: 0 }}
      rules={[
        {
          required: true,
          pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
          message: 'please_input_casino_provider_image!'
        }
      ]}>
      <Input />
    </Form.Item>
  )

  const switch_ = (form, record) => (
    <Form.Item name='casino_provider_active' style={{ margin: 0 }} valuePropName='checked'>
      <Switch defaultChecked={form.getFieldValue('casino_provider_active')} />
    </Form.Item>
  )

  const columns = [
    {
      title: 'caisno_provider_name',
      dataIndex: 'casino_provider_name',
      customEditable: nameInput,
      sorter: (a, b) => {
        return a.casino_provider_name > b.casino_provider_name
      },
      editable: true
    },
    {
      title: 'casino_provider_image',
      dataIndex: 'casino_provider_image',
      render: (record) => (
        <div>
          <img src={record} style={{ height: 22 }} />
        </div>
      ),
      customEditable: imageInput,
      editable: true
    },
    {
      title: 'casino_provider_active',
      dataIndex: 'casino_provider_active',
      render: (record) => <Tag color={record ? 'green' : 'red'}>{record ? 'active' : 'inactive'}</Tag>,
      customEditable: switch_,
      sorter: (a, b) => a.casino_provider_active > b.casino_provider_active,
      editable: true
    }
  ]

  const insertProviderForm = (form) => (
    <Form form={form} layout='vertical'>
      <Form.Item
        label='casino_provider_name'
        name='casino_provider_name'
        rules={[
          {
            required: true,
            pattern: /^[a-zA-Zก-์ ]+$/,
            message: 'please_input_casino_provider_name!'
          }
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        label='casino_provider_image'
        name='casino_provider_image'
        rules={[
          {
            required: true,
            pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
            message: 'please_input_casino_provider_image!'
          }
        ]}>
        <Input />
      </Form.Item>
    </Form>
  )

  const getProvider = async () => {
    const res = await Axios.get('casino/provider')
    setProviders(res.data.map((data) => ({ ...data, key: data._id })))
  }

  const update = async (data) => {
    const res = await Axios.put('casino/provider', data)
    const providers_ = providers.map((provider) => {
      if (provider._id === data._id) return data
      return provider
    })
    if (res.data) setProviders(providers_)
  }

  const ok = async (form) => {
    const status = await form.validateFields()
    if (status) {
      const res = await Axios.post('casino/provider', form.getFieldsValue())
      if (res.status === 200) setProviders([{ ...res.data, key: res.data._id }, ...providers])
    }
    return status
  }

  const remove = async (_id) => {
    const status = await Axios.delete(`casino/provider/${_id}`)
    if (status) {
      setProviders(providers.filter((provider) => provider._id !== _id))
    }
  }

  return (
    <TableMain
      data={providers}
      columns={columns}
      insertForm={insertProviderForm}
      title={'provider_table'}
      addTitle={'add_provider'}
      onSubmit={update}
      onOk={ok}
      onDelete={remove}
    />
  )
}

export default Provider
