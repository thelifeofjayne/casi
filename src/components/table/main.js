/* eslint-disable indent */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Table from 'antd/lib/table'
import Form from 'antd/lib/form'
import Typography from 'antd/lib/typography'
import Modal from 'antd/lib/modal'
import Button from 'antd/lib/button'
import { useDispatch, useSelector } from 'react-redux'
import { SET_INSERT_MODAL } from '../../redux/static'
import EditableCell from './editableCell'
import Popconfirm from 'antd/lib/popconfirm'

const TableMain = ({ style, data, columns, title, insertForm, onSubmit, onOk, onCancel, onDelete, addTitle, uneditable }) => {
  const { insert } = useSelector((state) => state.modal)
  const dispatch = useDispatch()
  const [editingKey, setEditingKey] = useState('')
  const [form] = Form.useForm()
  const [addForm] = Form.useForm()
  const isEditing = (record) => record.key === editingKey
  const [record, setRecord] = useState({})

  const edit = (record) => {
    form.setFieldsValue(record)
    setRecord(record)
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async () => {
    const status = await form.validateFields()
    if (status) {
      onSubmit({ ...record, ...form.getFieldsValue() })
      setEditingKey('')
    }
  }

  const Title = () => {
    return (
      insertForm && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography.Title style={{ height: '100%' }}>{title}</Typography.Title>
          <div>
            <Button
              type='primary'
              onClick={() => {
                dispatch({ type: SET_INSERT_MODAL, payload: true })
              }}
              disabled={editingKey !== ''}>
              {addTitle}
            </Button>
            <Modal
              visible={insert}
              onOk={async () => {
                const status = await onOk(addForm)
                if (status) dispatch({ type: SET_INSERT_MODAL, payload: false })
              }}
              onCancel={() => {
                onCancel()
                const reset = {}
                Object.keys(addForm.getFieldsValue()).forEach((key) => {
                  reset[key] = null
                })
                addForm.setFieldsValue(reset)
                dispatch({ type: SET_INSERT_MODAL, payload: false })
              }}
              cancelText={'cancel'}
              okText={'submit'}>
              {insertForm(addForm)}
            </Modal>
          </div>
        </div>
      )
    )
  }

  const Operation = (_, record) => {
    const editable = isEditing(record)
    return editable ? (
      <>
        <a onClick={() => save(record)} style={{ marginRight: 8 }}>
          submit
        </a>
        <a onClick={cancel} style={{ color: 'red', opacity: 0.5 }}>
          cancel
        </a>
      </>
    ) : (
      <>
        <a disabled={editingKey !== ''} onClick={() => edit(record)}>
          edit
        </a>
        <Popconfirm title='are_you_sure_deleting_this?' onConfirm={() => onDelete(record.key)} okText='yes' cancelText='no'>
          <a style={{ color: editingKey === '' && 'red', marginLeft: 8 }} disabled={editingKey !== ''}>
            delete
          </a>
        </Popconfirm>
      </>
    )
  }

  const mergedColumns = uneditable
    ? columns
    : [...columns, { title: '', dataIndex: 'operation', render: (_, record) => Operation(_, record) }].map((col) => {
        if (!col.editable) return col
        return {
          ...col,
          onCell: (record) => ({
            record,
            dataIndex: col.dataIndex,
            customEditable: col.customEditable,
            title: col.title,
            form,
            editing: isEditing(record)
          })
        }
      })

  return (
    <Form form={form} component={false}>
      <Table
        style={{ ...style }}
        title={Title}
        dataSource={data}
        columns={mergedColumns}
        components={{
          body: {
            cell: EditableCell
          }
        }}
      />
    </Form>
  )
}

TableMain.propTypes = {
  style: PropTypes.object,
  data: PropTypes.array,
  columns: PropTypes.array,
  title: PropTypes.string,
  insertForm: PropTypes.func,
  onSubmit: PropTypes.func,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  addTitle: PropTypes.string,
  uneditable: PropTypes.bool
}

TableMain.defaultProps = {
  style: {},
  data: [],
  columns: [],
  title: '',
  insertForm: () => {},
  onSubmit: () => {},
  onOk: () => {},
  onCancel: () => {},
  onDelete: () => {},
  addTitle: ''
}

export default TableMain
