import React from 'react'
import PropTypes from 'prop-types'
import CasinoBanner from '../casino/banner'

const SlotBanner = ({ typeId }) => {
  return <CasinoBanner typeId={typeId} />
}

SlotBanner.propTypes = {
  style: PropTypes.object,
  typeId: PropTypes.string
}

export default SlotBanner
