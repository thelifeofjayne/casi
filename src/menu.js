import { CopyrightCircleOutlined, BlockOutlined, DollarCircleOutlined } from '@ant-design/icons'
import Category from './pages/casino/category'
import Category_ from './pages/slot/category'
import Provider from './pages/general/provider'
import CasinoGame from './pages/casino/game'
import SlotGame from './pages/slot/game'
import SlotBanner from './pages/slot/banner'
import CasinoBanner from './pages/casino/banner'
import CasinoFilter from './pages/casino/filter'
import SlotFilter from './pages/slot/filter'

export default [
  {
    path: '/general',
    name: 'general',
    Icon: BlockOutlined,
    subs: [
      {
        path: '/general/provider',
        name: 'provider',
        Component: Provider,
      },
    ],
  },
  {
    path: '/casino',
    name: 'casino',
    Icon: CopyrightCircleOutlined,
    typeIndex: 0,
    subs: [
      {
        path: '/casino/game',
        name: 'casino_game',
        Component: CasinoGame,
      },
      {
        path: '/casino/game-filter',
        name: 'casino_game_filter',
        Component: CasinoFilter,
      },
      {
        path: '/casino/category',
        name: 'casino_category',
        Component: Category,
      },
      {
        path: '/casino/banner',
        name: 'casino_banner',
        Component: CasinoBanner,
      },
    ],
  },
  {
    path: '/slot',
    name: 'slot',
    typeIndex: 1,
    Icon: DollarCircleOutlined,
    subs: [
      {
        path: '/slot/game',
        name: 'slot_game',
        Component: SlotGame,
      },
      {
        path: '/slot/game-filter',
        name: 'slot_game_filter',
        Component: SlotFilter,
      },
      {
        path: '/slot/category',
        name: 'slot_category',
        Component: Category_,
      },
      {
        path: '/slot/banner',
        name: 'slot_banner',
        Component: SlotBanner,
      },
    ],
  },
]
