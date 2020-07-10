import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import Table from '../components/table/table'
// import Popconfirm from 'antd/lib/Popconfirm'
import Button from 'antd/lib/button'

const Category = ({ style }) => {
  const xcButton = () => {
    return <Button type="primary">Primary Button</Button>
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags'
    },
    {
      title: 'Action',
      key: 'action',
      render: action => xcButton()
    }
  ]
  const data = []
  for (let i = 0; i < 10000; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: i,
      address: `London Park no. ${i}`,
      tags: 1
    })
  }

  return (
    <>
      <Table style={{ ...style }} columns={columns} data={data}>
      </Table>
    </>
  )
}

Category.propTypes = {
  style: PropTypes.object
}

export default Category
