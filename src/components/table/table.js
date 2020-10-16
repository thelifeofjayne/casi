// import React, { useState } from 'react'
// import styled from 'styled-components'
// import PropTypes from 'prop-types'
// import { useSelector, useDispatch } from 'react-redux'
// import { ModalIcon } from '../../redux/static'
// import Table from 'antd/lib/table'
// import Input from 'antd/lib/input'
// import Form from 'antd/lib/form'
// import Popconfirm from 'antd/lib/popconfirm'
// import Message from 'antd/lib/message'
// import Row from 'antd/lib/row'
// import Col from 'antd/lib/col'
// import Modal from 'antd/lib/modal'
// import Button from 'antd/lib/button'
// import {
//   SaveOutlined,
//   CloseCircleOutlined,
//   EditOutlined,
//   DeleteFilled
// } from '@ant-design/icons'
// import Typography from 'antd/lib/typography'
// import Radio from 'antd/lib/radio'

// const { Text } = Typography
// const Tablexc = styled.span`
//   .editable-row .ant-form-item-explain {
//     position: absolute;
//     top: 100%;
//     font-size: 12px;
//   }
// `
// const Edit = styled.a`
//   &[disabled] {
//     opacity: 0.5;
//   }
// `

// const EditableCell = ({
//   editing,
//   dataIndex,
//   title,
//   inputType,
//   record,
//   index,
//   children,
//   ...restProps
// }) => {
//   const dispatch = useDispatch()
//   const inputNode =
//     inputType === 'button' ? (
//       <Button onClick={() => dispatch({ type: ModalIcon })}>
//         {record.icon}
//       </Button>
//     ) : (
//       <Input />
//     )
//   return (
//     <td {...restProps}>
//       {editing ? (
//         <Form.Item
//           name={dataIndex}
//           style={{
//             margin: 0
//           }}
//           rules={[
//             {
//               required: true,
//               message: `Please Input ${title}!`
//             }
//           ]}>
//           {inputNode}
//         </Form.Item>
//       ) : (
//         children
//       )}
//     </td>
//   )
// }

// const EditableTable = ({ itemcolumn, datarow, dialogSelectIcon }) => {
//   const [form] = Form.useForm()
//   const [data, setData] = useState(datarow)
//   const [editingKey, setEditingKey] = useState('')
//   const [keyIcon, editIcon] = useState('')
//   console.log(keyIcon)

//   const isEditing = (record) => record.key === editingKey
//   const edit = (record) => {
//     form.setFieldsValue({
//       ...record
//     })
//     setEditingKey(record.key)
//   }

//   const Listing = (_, record) => {
//     const editable = isEditing(record)
//     return editable ? (
//       <span>
//         <a onClick={() => save(record.key)} style={{ marginRight: 8 }}>
//           <SaveOutlined style={{ color: '#229fa5', fontSize: '20px' }} />
//         </a>
//         <Popconfirm title='Cancel editing?' onConfirm={cancel}>
//           <CloseCircleOutlined style={{ color: '#FF7875', fontSize: '20px' }} />
//         </Popconfirm>
//       </span>
//     ) : (
//       <>
//         <Edit
//           disabled={editingKey !== ''}
//           onClick={() => {
//             edit(record)
//           }}>
//           <EditOutlined style={{ color: '#229fa5', fontSize: '20px' }} />
//         </Edit>
//         <Popconfirm
//           title='Do you want to delete?'
//           onConfirm={() => deleteData(record)}>
//           <DeleteFilled
//             style={{
//               color: '#229fa5',
//               fontSize: 20,
//               marginLeft: 10
//             }}
//           />
//         </Popconfirm>
//       </>
//     )
//   }

//   const cancel = () => {
//     setEditingKey('')
//   }

//   const deleteData = (e) => {
//     Message.success('Click on Yes')
//     console.log(e)
//   }

//   const save = async (key) => {
//     try {
//       const row = await form.validateFields()
//       const newData = [...data]
//       const index = newData.findIndex((item) => key === item.key)

//       if (index > -1) {
//         const item = newData[index]
//         newData.splice(index, 1, { ...item, ...row })
//         setData(newData)
//         setEditingKey('')
//       } else {
//         newData.push(row)
//         setData(newData)
//         setEditingKey('')
//       }
//     } catch (errInfo) {
//       console.log('Validate Failed:', errInfo)
//     }
//   }

//   const columns = itemcolumn.map((res) => {
//     return {
//       title: res.title,
//       dataIndex: res.dataIndex,
//       width: res.width,
//       editable: res.editable
//     }
//   })
//   if (columns.length - 1) {
//     columns.push({
//       title: 'action',
//       dataIndex: 'action',
//       render: Listing
//     })
//   }

//   const mergedColumns = columns.map((col) => {
//     if (!col.editable) {
//       return col
//     }

//     return {
//       ...col,
//       onCell: (record) => ({
//         record,
//         inputType: col.dataIndex === 'icon' ? 'button' : 'text',
//         dataIndex: col.dataIndex,
//         title: col.title,
//         editing: isEditing(record)
//       })
//     }
//   })

//   const { icon } = useSelector((state) => state.modal)
//   const dispatch = useDispatch()
//   return (
//     <Tablexc>
//       <Modal
//         centered
//         title='select icon'
//         visible={icon}
//         onOk={() => {
//           dispatch({ type: ModalIcon })
//         }}
//         okText='ok'
//         cancelText='close'
//         onClose={() => dispatch({ type: ModalIcon })}
//         width='1000px'>
//         <Radio.Group
//           defaultValue={1}
//           size='large'
//           onChange={(selected) => editIcon(selected)}>
//           <Row style={{ maxHeight: 600, overflowX: 'auto' }}>
//             {dialogSelectIcon.map((name, index) => (
//               <React.Fragment key={index}>
//                 <Col span={4} style={{ padding: '10px' }}>
//                   <Radio.Button
//                     value={index}
//                     style={{
//                       height: '100%',
//                       textAlign: 'center',
//                       width: '100%'
//                     }}>
//                     <i
//                       className={name}
//                       style={{ color: 'black', fontSize: 25 }}></i>
//                     <div>
//                       <Text code>{name}</Text>
//                     </div>
//                   </Radio.Button>
//                 </Col>
//               </React.Fragment>
//             ))}
//           </Row>
//         </Radio.Group>
//       </Modal>

//       <Form form={form} component={false}>
//         <Table
//           scroll={{ y: 420 }}
//           components={{
//             body: {
//               cell: EditableCell
//             }
//           }}
//           bordered
//           dataSource={data}
//           columns={mergedColumns}
//           rowClassName='editable-row'
//           pagination={{
//             onChange: cancel
//           }}
//         />
//       </Form>
//     </Tablexc>
//   )
// }

// EditableCell.propTypes = {
//   editing: PropTypes.bool,
//   dataIndex: PropTypes.string,
//   title: PropTypes.string,
//   inputType: PropTypes.string,
//   record: PropTypes.object,
//   index: PropTypes.string,
//   children: PropTypes.array
// }

// EditableTable.propTypes = {
//   itemcolumn: PropTypes.array,
//   datarow: PropTypes.array,
//   dialogSelectIcon: PropTypes.array
// }

// export default EditableTable
