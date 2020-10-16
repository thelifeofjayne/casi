import Form from 'antd/lib/form/Form'
import Input from 'antd/lib/input'
import Switch from 'antd/lib/switch'
import Select from 'antd/lib/select'
import Tag from 'antd/lib/tag'
import Radio from 'antd/lib/radio'

import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import TableMain from '../../components/table/main'
import PropTypes from 'prop-types'

const { Option } = Select

const CasinoGame = ({ typeId }) => {
  const [games, setGames] = useState([])
  const [categories, setCategories] = useState([])
  const [providers, setProviders] = useState([])

  useEffect(() => {
    getGame()
    getCategory()
    getProvider()
  }, [])

  const switch_ = (form) => (
    <Form.Item name='casino_game_active' style={{ margin: 0 }} valuePropName='checked'>
      <Switch defaultChecked={form.getFieldValue('casino_game_active')} />
    </Form.Item>
  )

  const nameInput = () => (
    <Form.Item
      name='casino_game_name'
      style={{ margin: 0 }}
      rules={[
        {
          required: true,
          pattern: /^['0-9a-zA-Zก-์ ]+$/,
          message: 'please_input_casino_game_name!'
        }
      ]}>
      <Input />
    </Form.Item>
  )

  const urlInput = () => (
    <Form.Item
      name='casino_game_url'
      style={{ margin: 0 }}
      rules={[
        {
          required: true,
          pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
          message: 'please_input_casino_game_url_properly!'
        }
      ]}>
      <Input />
    </Form.Item>
  )

  const imageInput = () => (
    <Form.Item
      name='casino_game_image'
      style={{ margin: 0 }}
      rules={[
        {
          required: true,
          pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
          message: 'please_input_casino_game_image_url_properly!'
        }
      ]}>
      <Input />
    </Form.Item>
  )
  const categoryInput = () => (
    <Form.Item
      name='casino_category_id'
      style={{ margin: 0 }}
      rules={[
        {
          required: true,
          message: 'please_input_casino_game_category!'
        }
      ]}>
      <Select>
        {categories.map((categpry) => (
          <Option key={categpry._id} value={categpry._id}>
            {categpry.casino_category_name}
          </Option>
        ))}
      </Select>
    </Form.Item>
  )
  const providerInput = () => (
    <Form.Item
      name='casino_provider_id'
      style={{ margin: 0 }}
      rules={[
        {
          required: true,
          message: 'please_input_casino_game_provider!'
        }
      ]}>
      <Select>
        {providers.map((provider) => (
          <Option key={provider._id} value={provider._id}>
            {provider.casino_provider_name}
          </Option>
        ))}
      </Select>
    </Form.Item>
  )

  const liveInput = () => (
    <Form.Item
      name='casino_game_live'
      style={{ margin: 0 }}
      rules={[
        {
          required: true,
          message: 'please_input_casino_game_live!'
        }
      ]}>
      <Radio.Group>
        <Radio.Button value={true}>live</Radio.Button>
        <Radio.Button value={false}>3d</Radio.Button>
      </Radio.Group>
    </Form.Item>
  )

  const columns = [
    {
      title: 'casino_game_name',
      dataIndex: 'casino_game_name',
      customEditable: nameInput,
      sorter: (a, b) => {
        return a.casino_game_name > b.casino_game_name
      },
      editable: true
    },
    {
      title: 'casino_game_url',
      dataIndex: 'casino_game_url',
      render: (record) => (
        <a href={record} target='_blank' rel='noreferrer'>
          {record}
        </a>
      ),
      customEditable: urlInput,
      editable: true
    },
    {
      title: 'casino_game_image',
      dataIndex: 'casino_game_image',
      render: (record) => (
        <div>
          <img src={record} style={{ height: 22 }} />
        </div>
      ),
      customEditable: imageInput,
      editable: true
    },
    {
      title: 'casino_game_active',
      dataIndex: 'casino_game_active',
      render: (record) => <Tag color={record ? 'green' : 'red'}>{record ? 'active' : 'inactive'}</Tag>,
      customEditable: switch_,
      sorter: (a, b) => a.casino_provider_active > b.casino_provider_active,
      editable: true
    },
    {
      title: 'casino_game_category',
      dataIndex: 'category',
      render: (record) => <span>{record?.casino_category_name}</span>,
      customEditable: categoryInput,
      sorter: (a, b) => a.category.casino_category_name > b.category.casino_category_name,
      editable: true
    },
    {
      title: 'casino_game_provider',
      dataIndex: 'provider',
      render: (record) => <span>{record?.casino_provider_name}</span>,
      customEditable: providerInput,
      sorter: (a, b) => a.casino_provider_active > b.casino_provider_active,
      editable: true
    },
    {
      title: 'casino_game_live',
      dataIndex: 'casino_game_live',
      render: (record) => <Tag color={record ? 'blue' : 'orange'}>{record ? 'live' : '3d'}</Tag>,
      customEditable: liveInput,
      sorter: (a, b) => a.casino_provider_active > b.casino_provider_active,
      editable: true
    }
  ]

  const insertProviderForm = (form) => (
    <Form form={form} style={{ marginTop: 24 }}>
      <Form.Item
        label='casino_game_name'
        name='casino_game_name'
        rules={[
          {
            required: true,
            pattern: /^['0-9a-zA-Zก-์ ]+$/,
            message: 'please_input_casino_game_name!'
          }
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        label='casino_game_url'
        name='casino_game_url'
        rules={[
          {
            required: true,
            pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
            message: 'please_input_casino_game_url_properly!'
          }
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        label='casino_game_image_url'
        name='casino_game_image'
        rules={[
          {
            required: true,
            pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
            message: 'please_input_casino_game_image_url_properly!'
          }
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        name='casino_category_id'
        label='casino_game_category'
        rules={[
          {
            required: true,
            message: 'please_input_casino_game_category!'
          }
        ]}>
        <Select>
          {categories.map((categpry) => (
            <Option key={categpry._id} value={categpry._id}>
              {categpry.casino_category_name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name='casino_provider_id'
        label='casino_game_provider'
        rules={[
          {
            required: true,
            message: 'please_input_casino_game_provider!'
          }
        ]}>
        <Select>
          {providers.map((provider) => (
            <Option key={provider._id} value={provider._id}>
              {provider.casino_provider_name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name='casino_game_live'
        label='casino_game_live'
        rules={[
          {
            required: true,
            message: 'please_input_casino_game_live!'
          }
        ]}>
        <Radio.Group>
          <Radio.Button value={true}>live</Radio.Button>
          <Radio.Button value={false}>3d</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Form>
  )

  const getGame = async () => {
    const res = await Axios.post('casino/game', { casino_type_id: typeId })
    console.log(res)
    setGames(res.data.map((data) => ({ ...data, key: data._id })))
  }

  const getCategory = async () => {
    const res = await Axios.get(`casino/category/${typeId}`)
    setCategories(res.data)
  }

  const getProvider = async () => {
    const res = await Axios.get('casino/provider')
    setProviders(res.data)
  }

  const update = async (data) => {
    const res = await Axios.put('casino/game', data)
    const game_ = games.map((game) => {
      if (game._id === data._id) {
        const category = categories.find((category) => category._id === data.casino_category_id)
        const provider = providers.find((provider) => provider._id === data.casino_provider_id)
        const game = { ...data, category, provider }
        return game
      }
      return game
    })
    if (res.data) setGames(game_)
  }

  const ok = async (form) => {
    const status = await form.validateFields()
    if (status) {
      const res = await Axios.post(`casino/game/${typeId}`, form.getFieldsValue())
      const category = categories.find((category) => category._id === res.data.casino_category_id)
      const provider = providers.find((provider) => provider._id === res.data.casino_provider_id)
      const game = { ...res.data, category, provider, key: res.data._id }
      if (res.status === 200) setGames([game, ...games])
    }
    return status
  }

  const remove = async (_id) => {
    const status = await Axios.delete(`casino/game/${_id}`)
    if (status) {
      setGames(games.filter((game) => game._id !== _id))
    }
  }

  return (
    <TableMain
      data={games}
      columns={columns}
      insertForm={insertProviderForm}
      title={'game_table'}
      addTitle={'add_game'}
      onSubmit={update}
      onOk={ok}
      onDelete={remove}
    />
  )
}

CasinoGame.propTypes = {
  style: PropTypes.object,
  typeId: PropTypes.string
}

export default CasinoGame
