import React from 'react'
import CasinoCategory from '../casino/category'
import PropTypes from 'prop-types'

const SlotCategory = ({ typeId }) => {
  return <CasinoCategory typeId={typeId} />
}

SlotCategory.propTypes = {
  style: PropTypes.object,
  typeId: PropTypes.string
}

export default SlotCategory
