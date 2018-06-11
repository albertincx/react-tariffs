import data from '../helpers/data.json'

const API_JSON = '/?data=1'

function processData (data, id, tarifId) {

  let item = null, childItem = null
  for (let i = 0; i < data.tariffs.length; i++) {
    const tariff = data.tariffs[i]
    let tariffs = tariff.tariffs

    if (!isNaN(id) && i === parseInt(id) && !item) {
      console.log('ITEM', item)
      item = tariff
    }

    tariffs = tariffs.sort((a, b) => {
      a = parseInt(a.pay_period)
      b = parseInt(b.pay_period)
      if (a < b)
        return -1
      if (a > b)
        return 1
      return 0
    })

    data.tariffs[i].tariffs = tariffs
    tariff.prices = ''

    let prices = []
    let basePrice = 0

    tariffs.map((_tariff, index) => {
      let price = _tariff.price
      if (!isNaN(tarifId)
        && index === parseInt(tarifId) && !childItem) {
        childItem = _tariff
      }
      let month = parseFloat(_tariff.pay_period)
      if (month) {
        if (month === 1) {
          basePrice = price
        } else {
          data.tariffs[i].tariffs[index].skidka = price - (basePrice * month)
          if (data.tariffs[i].tariffs[index].skidka < 0) {
            data.tariffs[i].tariffs[index].skidka *= -1
          }
        }
        price = price / month
        data.tariffs[i].tariffs[index].price_month = price
      }
      prices.push(price)
    })

    tariff.prices = `${Math.min.apply(null, prices)} – ${Math.max.apply(null, prices)}`
  }
  return {type: 'data_success', items: data, item, childItem}
}

export default ({dispatch}) => (next) => (action) => {
  switch (action.type) {

    case 'get_data' : {

      const id = action.id, tarifId = action.tarifId

      if (true || process.env.NODE_ENV === 'development') {
        console.log('local data enabled')
        const payload = processData(data, id, tarifId)
        dispatch(payload)
      } else {
        fetch(`${API_JSON}`, {
          headers: {'Content-Type': 'application/json'}
        })
          .then(res => {
            if (res.status !== 200) {
              throw 'Not Found'
            } else {
              return res.json()
            }
          }).then(data => {
          const payload = processData(data, id , tarifId)
          dispatch(payload)
        }).catch(e => {
          dispatch({type: 'data_error', message: e.toString()})
        })
      }
      break
    }
    default:
      break
  }
  return next(action)
}