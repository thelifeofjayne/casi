import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Switch from 'antd/lib/switch'
import TableMain from '../../components/table/main'
import PropTypes from 'prop-types'

const CasinoFilter = ({ typeId }) => {
  const [games, setGames] = useState([])

  useEffect(() => {
    getGame()
  }, [])

  const columns = [
    {
      title: 'casino_game_name',
      dataIndex: 'casino_game_name',
      sorter: (a, b) => {
        return a.casino_game_name > b.casino_game_name
      }
    },
    {
      title: 'casino_game_category',
      dataIndex: 'category',
      render: (record) => record?.casino_category_name,
      sorter: (a, b) => a.category.casino_category_name > b.category.casino_category_name
    },
    {
      title: 'casino_game_provider',
      dataIndex: 'provider',
      render: (record) => record?.casino_provider_name,
      sorter: (a, b) => a.casino_provider_active > b.casino_provider_active
    },
    {
      title: 'recommended',
      dataIndex: 'casino_game_recommended',
      render: (record, row) => (
        <Switch
          defaultChecked={record}
          onChange={async (value) => {
            try {
              await Axios.put('/casino/game', { _id: row._id, casino_game_recommended: value })
            } catch (error) {}
          }}
        />
      ),
      sorter: (a, b) => a.casino_game_recommended > b.casino_game_recommended
    },
    {
      title: 'new',
      dataIndex: 'casino_game_new',
      render: (record, row) => (
        <Switch
          defaultChecked={record}
          onChange={async (value) => {
            try {
              await Axios.put('/casino/game', { _id: row._id, casino_game_new: value })
            } catch (error) {}
          }}
        />
      ),
      sorter: (a, b) => a.casino_game_new > b.casino_game_new
    },
    {
      title: 'popular',
      dataIndex: 'casino_game_popular',
      render: (record, row) => (
        <Switch
          defaultChecked={record}
          onChange={async (value) => {
            try {
              await Axios.put('/casino/game', { _id: row._id, casino_game_popular: value })
            } catch (error) {}
          }}
        />
      ),
      sorter: (a, b) => a.casino_game_popular > b.casino_game_popular
    }
  ]

  const getGame = async () => {
    const res = await Axios.post('casino/game', { casino_type_id: typeId })
    console.log(res)
    setGames(res.data.map((data) => ({ ...data, key: data._id })))
  }

  return <TableMain data={games} columns={columns} title={'game_table'} uneditable />
}

CasinoFilter.propTypes = {
  style: PropTypes.object,
  typeId: PropTypes.string
}

export default CasinoFilter
