import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const HomeXc = styled.div`
`

const Home = ({ style }) => {
  return (
    <HomeXc style={{ ...style }}>
      Home
    </HomeXc>
  )
}

Home.propTypes = {
  style: PropTypes.object
}

export default Home
