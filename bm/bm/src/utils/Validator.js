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

export function timeToNum(time){
  let tmp = time.split(':');
  let num = parseInt(tmp[0]*60) + parseInt(tmp[1]);
  return num;
}

export function numToTime(num){
  let hh = parseInt(num/60);
  let mm = num%60;
  const time = `${hh<10?`0${hh}`:hh}:${mm<10?`0${mm}`:mm}`;

  return time;
}