import { CopyrightCircleOutlined, BlockOutlined, DollarCircleOutlined } from '@ant-design/icons'
import Category from './pages/category'

export default [
  {
    path: '/general',
    name: 'General',
    Icon: BlockOutlined,
    subs: [
      {
        path: '/general/category',
        name: 'Category',
        Component: Category
      },
      {
        path: '/general/provider',
        name: 'Provider',
        Component: Category

      }
    ]
  },
  {
    path: '/casino',
    name: 'Casino',
    Icon: CopyrightCircleOutlined,
    subs: [
      {
        path: '/casino/game',
        name: 'Game Casino',
        Component: Category

      }
    ]
  },
  {
    path: '/slot',
    name: 'Slot',
    Icon: DollarCircleOutlined,
    subs: [
      {
        path: '/slot/game',
        name: 'Game Slot',
        Component: Category
      }
    ]
  }
]
