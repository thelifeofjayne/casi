import React from 'react'
import { hot } from 'react-hot-loader/root'
import Main from './pages/layouts/main'
import Login from './pages/login'
import Home from './pages/home'
import { Router } from '@reach/router'
import menus from './menu'

const App = () => {
  return (
    <Router>
      <Login path='/login' />
      <Main path='/'>
        <Home path='/' />
        {
          menus.map(({ subs }) =>
            subs.map(({ path, Component }) =>
              <Component key={path} path={path} />
            )
          )
        }
      </Main>
    </Router>

  )
}

export default hot(App)
