import React from 'react'
import { Route } from 'react-router'
import { connect } from 'react-redux'

import TariffItem from '../components/TariffItem'

const Tariffs = props => (
  <div>
    <div>
      {props.match.isExact ? <TariffItem {...props}/> : null}
      <Route path={`${props.match.url}/:tarifId`} component={TariffItem}/>
    </div>
  </div>
)

function mapStateToProps (state) {
  const {items} = state.tariffs
  return {
    items
  }
}

export default connect(mapStateToProps)(Tariffs)
