import React from 'react'
import PropTypes from 'prop-types'
import CasinoFilter from '../casino/filter'

const SlotFilter = ({ typeId }) => {
  return <CasinoFilter typeId={typeId} />
}

SlotFilter.propTypes = {
  style: PropTypes.object,
  typeId: PropTypes.string
}

export default SlotFilter
