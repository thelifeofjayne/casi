import React from 'react'
import PropTypes from 'prop-types'
import CasinoGame from '../casino/game'

const SlotGame = ({ typeId }) => {
  return <CasinoGame typeId={typeId} />
}

SlotGame.propTypes = {
  style: PropTypes.object,
  typeId: PropTypes.string
}

export default SlotGame
