import React from 'react'
import { connect } from 'react-redux'

import ItemsList from './ItemsList'
import Header from './Header'
import TariffDetail from './TariffDetail'
import Tariff from './Tariff'

class TariffItem extends React.Component {

  componentDidMount () {
    const {items, match, location} = this.props
    let id = match.params.id
    const tarifId = match.params.tarifId
    if ((isNaN(tarifId) || !location.state) && !items) {
      if (!id) {
        let idFromPath = location.pathname.match(/tariff\/([0-9]+)/)
        if (idFromPath.length > 1) {
          id = idFromPath[1]
        }
      }
      this.props.dispatch({
        type: 'get_data',
        id,
        tarifId
      })
    }
  }

  renderTitle (number) {
    let titles = ['month', 'months', 'months']
    let cases = [2, 0, 1, 1, 1, 2]
    return number + ' ' + titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
  }

  render () {
    const {location, match, history} = this.props
    let {item, childItem} = this.props
    let id = match.params.id
    let tarifId = match.params.tarifId
    let backUrl = '/'
    if (!isNaN(tarifId)) {
      id = match.params.tarifId
      backUrl = match.path.replace(':tarifId', '')
    }
    let onClick = () => history.push(backUrl)

    let title = '', headerTitle = ''

    if (location.state) {
      item = location.state.item
      title = location.state.title
      if (isNaN(tarifId)) {
        item = location.state.item
        title = item.title
      } else {
        childItem = location.state.item
      }
      onClick = history.goBack
    } else if (item) {
      title = item.title
    }

    if (!isNaN(tarifId)) {
      id = match.params.tarifId
      backUrl = match.path.replace(':tarifId', '')
      headerTitle = 'Tariff select'
    } else if (item) {
      headerTitle = `Tariff "${title}"`
    }
    if (childItem && !/\./.test(childItem.new_payday)) {
      let timestamp = childItem.new_payday.split(/(\-|\+)/)
      let theBigDay = new Date(timestamp[0] * 1000)
      let symbol = timestamp[1]
      let time = timestamp[2]
      let hours = parseInt(time[0] + time[1])
      if (symbol === '-') {
        hours *= -1
      }
      let newDate = new Date(theBigDay.setUTCHours(hours))
      let day = newDate.getDate()
      let monthIndex = newDate.getMonth() + 1
      let year = newDate.getFullYear()
      if (monthIndex < 10) monthIndex = '0' + monthIndex
      childItem.new_payday = day + '.' + monthIndex + '.' + year
    }

    return (
      <div>
        <div>
          <Header
            title={headerTitle}
            backProps={{onClick}}
          />
          {
            !tarifId && item && item.tariffs ? <ItemsList
                title={item.title}
                renderItem={Tariff}
                items={item.tariffs}
                id={id}
                renderTitle={this.renderTitle}/> :
              null
          }
          {tarifId && childItem ?
            <TariffDetail title={`Tariff "${title}"`} item={childItem} renderTitle={this.renderTitle}/> : null}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {items, item, childItem} = state.tariffs
  return {
    items,
    item,
    childItem
  }
}

export default connect(mapStateToProps)(TariffItem)
