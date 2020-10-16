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
import 'antd/lib/input-number/style/css'
import 'antd/lib/table/style/css'
import 'antd/lib/popconfirm/style/css'
import 'antd/lib/modal/style/css'
import 'antd/lib/message/style/css'
import 'antd/lib/switch/style/css'
import 'antd/lib/tag/style/css'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
serviceWorker.unregister()
