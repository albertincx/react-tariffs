import React from 'react'

const Header = ({title, backProps}) => (
  <div className={'header'}>
    <a className={'back'} {...backProps}>
      <span className={'icon'}></span>
      <div className={'title'}>{title}</div>
    </a>
  </div>
)

export default Header