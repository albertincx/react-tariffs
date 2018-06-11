import React from 'react'

const ItemsList = ({items, id, title, renderTitle, renderItem: Item}) => (
  <div className={'results'}>
    {items ? items.map(
      (item, index) => <Item
        parentTitle={title}
        title={renderTitle ? renderTitle(item.pay_period) : ''}
        key={id + '_' + index}
        item={item}
        id={id}
        index={index}/>
    ) : null}
  </div>)

export default ItemsList


