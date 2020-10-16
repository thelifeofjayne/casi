import React from 'react'
import PropTypes from 'prop-types'

const EditableCell = ({ editing, dataIndex, title, record, index, children, customEditable, form, ...restProps }) => {
  return <td {...restProps}>{editing ? customEditable(form, record) : children}</td>
}
EditableCell.propTypes = {
  editing: PropTypes.any,
  dataIndex: PropTypes.string,
  title: PropTypes.string,
  record: PropTypes.object,
  index: PropTypes.number,
  children: PropTypes.node,
  customEditable: PropTypes.func,
  form: PropTypes.object
}

export default EditableCell
