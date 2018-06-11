import React from 'react'

export default ({item, title, renderTitle}) => (
  <div className='tariff-wrap'>
    <div className='tariff tariff-item'>
      <div className='group-name'>
        <div>{title}</div>
      </div>
      <div className='tariff-info detail'>
        <div className='prices'>{`Payment period - ${renderTitle(item.pay_period)}`}
          <br/>{`${item.price_month} ₽/мес`}</div>
        <div className='skidka'>{`once payment - ${item.price}`}
          <div>{`debit - ${item.price}`}</div>
        </div>
        <div className='skidka gray'>{`activate - today`}
          <div>{`activated until - ${item.new_payday}`}</div>
        </div>
        <div className='button-wrap'>
          <button className={'button'}>Select</button>
        </div>
      </div>
    </div>
  </div>
)
