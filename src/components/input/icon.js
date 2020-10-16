import React from 'react'
import PropTypes from 'prop-types'
import AutoComplete from 'antd/lib/auto-complete'
import Input from 'antd/lib/input'
import { useSelector, useDispatch } from 'react-redux'
import { SET_ICON } from '../../redux/static'

const InputIcon = ({ form }) => {
  const dispatch = useDispatch()
  const { icons } = useSelector((state) => state.fetch)
  const { icon } = useSelector((state) => state.form)

  return (
    <AutoComplete
      options={icons}
      placeholder='try to type `duck or somethings`'
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
  )
}

InputIcon.propTypes = {
  form: PropTypes.object
}

export default InputIcon
