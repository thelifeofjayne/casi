import React from 'react'
import Table from 'antd/lib/table'
import PropTypes from 'prop-types'

const TableXc = ({ columns, data }) => {
  return (
    <>
      <Table columns={columns} dataSource={data} scroll={{ y: 420 }} />
    </>
  )
}
TableXc.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
}

export default TableXc
