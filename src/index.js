import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './redux/store'

import 'antd/lib/menu/style/css'
import 'antd/lib/layout/style/css'
import 'antd/lib/button/style/css'
import 'antd/lib/breadcrumb/style/css'
import 'antd/lib/card/style/css'
import 'antd/lib/form/style/css'
import 'antd/lib/input/style/css'
import 'antd/lib/checkbox/style/css'
import 'antd/lib/list/style/css'
import 'antd/lib/avatar/style/css'
import 'antd/lib/table/style/css'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
