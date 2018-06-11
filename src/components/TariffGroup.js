import React from 'react'
import { Link } from 'react-router-dom'

const TarifGroup = ({index, item}) => (
  <div className='tariff-wrap'>
    <div className='tariff'>
      <div className='group-name'>
        <Link to={{
          pathname: `/tariffs/tariff/${index}`,
          state: {item, title: `Tariff "${item.title}"`}
        }}>{`Tariff "${item.title}"`}</Link>
      </div>
      <Link className='undecor' to={{pathname: `/tariffs/tariff/${index}`, state: {item, title: `Tariff "${item.title}"`}}}>
        <div className='tariff-info'>
          <div className={'speed speed' + item.speed}>
            {`${item.speed} Mbit/s`}
          </div>
          <div className='prices'>
            {`${item.prices}, $/mon`}
            {item.free_options ? <div className='free'>{item.free_options.map((item, i) => (
              <div key={i}>{item}</div>
              ))}</div> : null}

          </div>
        </div>
      </Link>
      <div className='link ph'>
        <a href={item.link} target='_blank'>more on our website test.ru</a>
      </div>
      <div className='link'>
        <a href={item.link} target='_blank'>more on our website test.ru</a>
      </div>
    </div>

  </div>
)

export default TarifGroup
