export function isNumber(a) {
  return typeof a === 'number'
}

/**
* DO NOT CHANGE CODE BELOW THIS LINE
*/

export function validateAllocatedOrders(driverData, orders) {
  const checkOrders = orders.every(order => {
      let count = 0
      driverData.forEach(driver => {
          driver.reservedOrders.forEach(reservedOrder => {
              if (reservedOrder.id === order.id) {
                  count++
              }
          })
      })
      const expectCount = order.driverId > 0 ? 0 : 1
      return count === expectCount
  })
  return checkOrders
}