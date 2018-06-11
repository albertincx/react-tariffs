import React from 'react'
import { connect } from 'react-redux'
import ItemsList from '../components/ItemsList'
import TariffGroup from '../components/TariffGroup'

class Group extends React.Component {

  componentDidMount () {
    if (!this.props.items) {
      this.props.dispatch({
        type: 'get_data'
      })
    }
  }

  render () {
    const {items} = this.props
    return (
      <div>
        {items && items.tariffs ? <ItemsList
          match={this.props.match}
          items={items.tariffs}
          renderItem={TariffGroup}
        /> : null}
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {items} = state.tariffs
  return {
    items
  }
}

export default connect(mapStateToProps)(Group)