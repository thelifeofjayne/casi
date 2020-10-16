import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader/root'
import Main from './pages/layouts/main'
import Login from './pages/login'
import Home from './pages/home'
import { Router } from '@reach/router'
import menus from './menu'
import Axios from 'axios'

Axios.defaults.baseURL = 'http://172.104.171.122:2053'
Axios.defaults.headers.common.Authorization = 'AUTH TOKEN'

const App = () => {
  const [types, setTypes] = useState(null)
  useEffect(() => {
    Axios.get('/casino/type').then((res) => {
      setTypes(res.data)
    })
  }, [])

  return (
    !!types && (
      <Router>
        <Login path='/login' />
        <Main path='/'>
          <Home path='/' />
          {menus.map(({ subs, typeIndex }) =>
            subs.map(({ path, Component, props }) => <Component key={path} path={path} typeId={types[typeIndex]?._id} {...props} />)
          )}
        </Main>
      </Router>
    )
  )
}

export default hot(App)
