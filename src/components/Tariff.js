import React from 'react'
import { Link } from 'react-router-dom'

export default ({item, id, index, title, parentTitle}) => (
  <div className='tariff-wrap'>
    <div className='tariff tariff-item'>
      <div className='group-name'>
        <Link to={{
          pathname: `/tariffs/tariff/${id}/${index}`,
          state: {item, title: parentTitle}
        }}>{title}</Link>
      </div>
      <Link className='undecor' to={{
        pathname: `/tariffs/tariff/${id}/${index}`,
        state: {item, title: parentTitle}
      }}>
        <div className='tariff-info'>
          <div className='prices'>{`${item.price_month} $/mon`}</div>
          <div className='skidka'>{`once payment - ${item.price} $`}
            <div>{item.skidka ? `discount - ${item.skidka} $` : <span className='holder'>&nbsp;</span>}</div>
          </div>
        </div>
      </Link>
    </div>
  </div>
)
