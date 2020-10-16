import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { SET_CATEGORY, SET_ICON, SET_ICONS } from '../../redux/static'
import Input from 'antd/lib/input'
import Form from 'antd/lib/form'
import TableMain from '../../components/table/main'
import AutoComplete from 'antd/lib/auto-complete'
import Switch from 'antd/lib/switch'
import Tag from 'antd/lib/tag'

const CasinoCategory = ({ style, typeId }) => {
  const { categories, icons } = useSelector((state) => state.fetch)
  const { icon } = useSelector((state) => state.form)

  const dispatch = useDispatch()

  useEffect(() => {
    fetchCategory()
    fetchIcon()
  }, [])

  const fetchIcon = async () => {
    const res = await Axios.get('/icon')
    const icons = res.data.map((data, index) => ({
      value: (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {data}
          <i className={data} style={{ marginLeft: 4 }} />
        </div>
      ),
      data,
      key: index
    }))
    dispatch({ type: SET_ICONS, payload: icons })
  }

  const fetchCategory = async () => {
    const res = await Axios.get(`/casino/category/${typeId}`)
    const categories = res.data.map((data) => ({ key: data._id, ...data }))
    dispatch({ type: SET_CATEGORY, payload: categories })
  }

  const insertCategoryForm = (form) => (
    <Form form={form} layout='vertical'>
      <Form.Item
        label='casino_category_name'
        name='casino_category_name'
        rules={[
          {
            required: true,
            pattern: /^[a-zA-Zก-์ ]+$/,
            message: 'please_input_casino_category_name!'
          }
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        label='casino_category_icon'
        name='casino_category_icon'
        rules={[
          {
            required: true,
            message: 'please_input_casino_category_icon!',
            validator: async (_, value) => {
              if (icons.findIndex(({ data }) => data === value) === -1) {
                throw new Error('wrong!')
              }
            }
          }
        ]}>
        <AutoComplete
          options={icons}
          onSelect={(_, option) => {
            dispatch({ type: SET_ICON, payload: option.data })
            form.setFieldsValue({
              ...form.getFieldsValue(),
              casino_category_icon: option.data
            })
          }}
          filterOption={(_, option) => option.data.toUpperCase().indexOf(form.getFieldValue('casino_category_icon').toUpperCase()) !== -1}>
          <Input addonAfter={<i className={icon} />} />
        </AutoComplete>
      </Form.Item>
    </Form>
  )

  const input = () => (
    <Form.Item
      name='casino_category_name'
      style={{ margin: 0 }}
      rules={[
        {
          required: true,
          pattern: /^[a-zA-Zก-์ ]+$/,
          message: 'please_input_casino_category_name!'
        }
      ]}>
      <Input />
    </Form.Item>
  )

  const insert = async (data) => {
    const res = await Axios.put('/casino/category', data)
    const categories_ = categories.map((category) => {
      if (category._id === data._id) return data
      return category
    })
    if (res.data) {
      dispatch({ type: SET_CATEGORY, payload: categories_ })
    }
  }

  const autocomplete = (form) => (
    <Form.Item
      name='casino_category_icon'
      style={{ margin: 0 }}
      rules={[
        {
          required: true,
          message: 'please_input_casino_category_icon!',
          validator: async (_, value) => {
            if (icons.findIndex(({ data }) => data === value) === -1) {
              throw new Error()
            }
          }
        }
      ]}>
      <AutoComplete
        options={icons}
        onSelect={(_, option) => {
          dispatch({ type: SET_ICON, payload: option.data })
          form.setFieldsValue({
            ...form.getFieldsValue(),
            casino_category_icon: option.data
          })
        }}
        filterOption={(_, option) => option.data.toUpperCase().indexOf(form.getFieldValue('casino_category_icon').toUpperCase()) !== -1}>
        <Input addonAfter={<i className={form.getFieldValue('casino_category_icon')} />} />
      </AutoComplete>
    </Form.Item>
  )

  const switch_ = (form) => (
    <Form.Item name='casino_category_active' style={{ margin: 0 }} valuePropName='checked'>
      <Switch defaultChecked={form.getFieldValue('casino_category_active')} />
    </Form.Item>
  )

  const columns = [
    {
      title: 'casino_category_name',
      dataIndex: 'casino_category_name',
      customEditable: input,
      sorter: (a, b) => a.casino_category_name > b.casino_category_name,
      editable: true
    },
    {
      title: 'casino_category_icon',
      dataIndex: 'casino_category_icon',
      render: (record) => (
        <div>
          <i className={record} style={{ marginRight: 4 }} /> {record}
        </div>
      ),
      customEditable: autocomplete,
      sorter: (a, b) => a.casino_category_icon > b.casino_category_icon,
      editable: true
    },
    {
      title: 'casino_category_active',
      dataIndex: 'casino_category_active',
      render: (record) => <Tag color={record ? 'green' : 'red'}>{record ? 'active' : 'inactive'}</Tag>,
      customEditable: switch_,
      sorter: (a, b) => a.casino_category_active > b.casino_category_active,
      editable: true
    }
  ]

  const ok = async (form) => {
    const status = await form.validateFields()
    if (status) {
      const res = await Axios.post(`casino/category/${typeId}`, form.getFieldsValue())
      if (res.status === 200) dispatch({ type: SET_CATEGORY, payload: [{ ...res.data, key: res.data._id }, ...categories] })
    }
    return status
  }

  const cancel = () => {
    dispatch({ type: SET_ICON, payload: null })
  }

  const remove = async (_id) => {
    const status = await Axios.delete(`casino/category/${_id}`)
    if (status) {
      dispatch({ type: SET_CATEGORY, payload: categories.filter((category) => category._id !== _id) })
    }
  }

  return (
    <TableMain
      data={categories}
      columns={columns}
      insertForm={insertCategoryForm}
      title={'category_table'}
      addTitle={'add_category'}
      onSubmit={insert}
      onOk={ok}
      onCancel={cancel}
      onDelete={remove}
    />
  )
}

CasinoCategory.propTypes = {
  style: PropTypes.object,
  typeId: PropTypes.string
}

export default CasinoCategory
