import Form from 'antd/lib/form/Form'
import Input from 'antd/lib/input'
import Switch from 'antd/lib/switch'
import Tag from 'antd/lib/tag'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import TableMain from '../../components/table/main'

const CasinoBanner = ({ typeId }) => {
  const [banners, setBanners] = useState([])

  useEffect(() => {
    getBanner()
  }, [])

  const nameInput = () => (
    <Form.Item
      name='casino_banner_name'
      style={{ margin: 0 }}
      rules={[
        {
          required: true,
          pattern: /^[a-zA-Zก-์ ]+$/,
          message: 'please_input_casino_banner_name!'
        }
      ]}>
      <Input />
    </Form.Item>
  )

  const imageInput = () => (
    <Form.Item
      name='casino_banner_image'
      style={{ margin: 0 }}
      rules={[
        {
          required: true,
          pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
          message: 'please_input_casino_banner_image_properly!'
        }
      ]}>
      <Input />
    </Form.Item>
  )

  const switch_ = (form) => (
    <Form.Item name='casino_banner_active' style={{ margin: 0 }} valuePropName='checked'>
      <Switch defaultChecked={form.getFieldValue('casino_banner_active')} />
    </Form.Item>
  )

  const columns = [
    {
      title: 'casino_banner_name',
      dataIndex: 'casino_banner_name',
      customEditable: nameInput,
      sorter: (a, b) => {
        return a.casino_provider_name > b.casino_provider_name
      },
      editable: true
    },
    {
      title: 'casino_banner_image',
      dataIndex: 'casino_banner_image',
      render: (record) => (
        <div>
          <img src={record} style={{ height: 22 }} />
        </div>
      ),
      customEditable: imageInput,
      editable: true
    },
    {
      title: 'casino_banner_active',
      dataIndex: 'casino_banner_active',
      render: (record) => <Tag color={record ? 'green' : 'red'}>{record ? 'active' : 'inactive'}</Tag>,
      customEditable: switch_,
      sorter: (a, b) => a.casino_banner_active > b.casino_banner_active,
      editable: true
    }
  ]

  const insertProviderForm = (form) => (
    <Form form={form} layout='vertical'>
      <Form.Item
        label='casino_banner_name'
        name='casino_banner_name'
        rules={[
          {
            required: true,
            pattern: /^[a-zA-Zก-์ ]+$/,
            message: 'please_input_casino_banner_name!'
          }
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        label='casino_banner_image'
        name='casino_banner_image'
        rules={[
          {
            required: true,
            pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
            message: 'please_input_casino_banner_image!'
          }
        ]}>
        <Input />
      </Form.Item>
    </Form>
  )

  const getBanner = async () => {
    const res = await Axios.get(`casino/banner/${typeId}`)
    setBanners(res.data.map((data) => ({ ...data, key: data._id })))
  }

  const update = async (data) => {
    const res = await Axios.put('casino/banner', data)
    const banners_ = banners.map((banner) => {
      if (banner._id === data._id) return data
      return banner
    })
    if (res.data) setBanners(banners_)
  }

  const ok = async (form) => {
    const status = await form.validateFields()
    if (status) {
      const res = await Axios.post(`casino/banner/${typeId}`, form.getFieldsValue())
      if (res.status === 200) setBanners([{ ...res.data, key: res.data._id }, ...banners])
    }
    return status
  }

  const remove = async (_id) => {
    const status = await Axios.delete(`casino/banner/${_id}`)
    if (status) {
      setBanners(banners.filter((banner) => banner._id !== _id))
    }
  }

  return (
    <TableMain
      data={banners}
      columns={columns}
      insertForm={insertProviderForm}
      title={'banner_table'}
      addTitle={'add_banner'}
      onSubmit={update}
      onOk={ok}
      onDelete={remove}
    />
  )
}

CasinoBanner.propTypes = {
  typeId: PropTypes.string
}

export default CasinoBanner
