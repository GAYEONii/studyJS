import Table from './Table.js'
import DriverInfoModal from './DriverInfoModal.js'
import {
  validateAllocatedOrders,
  timeToNum,
  numToTime
} from './utils/validator.js'

export default class Dashboard {

  $target = null
  $driverTable = null
  $driverTableSortInfo = null
  $driverInfoModal = null

  data = {
    drivers: [],
    orders: [],
    places: [],
  }

  driverData = []
  freeAmount = 0 //무료 제공 금액
  localStorage = window.localStorage
  sort = localStorage.getItem('sortInfo') ?
    JSON.parse(localStorage.getItem('sortInfo')) : {
      index: 0,
      isDescending: false
    }

  constructor($target) {
    this.$target = $target

    this.createHeader($target)
    this.createAllocateButton($target)
    this.createDriverTable($target)
    this.createModals($target)
    this.createTextArea($target)
  }

  createHeader($target) {
    const $h1 = document.createElement('h1')

    $h1.innerText = '드라이버 현황 페이지'
    $target.appendChild($h1)
  }

  createAllocateButton($target) {

    function handleAllocateClick() {
      // TODO: 배차 로직 구현 부분
      //배차 전 13:00 배달현황
      this.driverData = this.driverData.map(driver => {
        let tmp = 0;
        if (driver.orders.length !== 0) {
          const currentPosition = this.data.drivers.find(d => d.id === driver.id).position;
          const lastOrder = driver.orders.slice(-1)[0]; // 마지막 주문

          //배달완료함
          if(lastOrder.deliveredAt !== ''){
            driver.lastTime = lastOrder.deliveredAt;
            driver.lastPosition = lastOrder.deliveryPosition;
          }
          //배달지로 이동중 
          else if(lastOrder.pickedUpAt !== ''){
            const [x,y] = [Math.abs(currentPosition[0] - lastOrder.deliveryPosition[0]), Math.abs(currentPosition[1] - lastOrder.deliveryPosition[1])];
            const distance = x+y;
            let time = numToTime(timeToNum('13:00') + distance);
            lastOrder.deliveredAt = time;
            driver.lastTime = lastOrder.deliveredAt;
            driver.position = lastOrder.deliveryPosition;
          }
          //식당으로 가는중
          else{
            const currentPlace = this.data.places.find(d => d.id === lastOrder.placeId).position;
            //현재위치 -> 식당
            const [x,y] = [Math.abs(currentPosition[0] - currentPlace[0]), Math.abs(currentPosition[1] - currentPlace[1])];
            const distance = x+y;
            let time = numToTime(timeToNum('13:00') + distance);
            lastOrder.pickedUpAt = time;
            
            //식당 -> 배달지
            const [xx,yy] = [Math.abs(currentPlace[0] - lastOrder.deliveryPosition[0]), Math.abs(currentPlace[1] - lastOrder.deliveryPosition[1])];
            time = numToTime(timeToNum(time) + (xx+yy));
            lastOrder.deliveredAt = time;
            driver.lastTime = lastOrder.deliveredAt;
            driver.position = lastOrder.deliveryPosition;
          }
        }
        else{
          driver.lastTime = '13:00';
          driver.position = [56, 56];
        }
          return driver;
      });

      
      let newOrders = this.data.orders.filter(order => !order.driverId);
      newOrders.sort((a,b) => b.price - a.price);

      newOrders.forEach(order => {
        const min = {
          id: 0,
          distance: 10000,
        };
        
        const placePosition = this.data.places.find(place => place.id === order.placeId).position;

        this.driverData.forEach(driver => {
          let distance = Math.abs(placePosition[0] - driver.position[0]) + Math.abs(placePosition[1] - driver.position[1]);
          if(driver.reservedOrders.length === 0){
            min.id = driver.id;
            min.distance = -1;
          }
          
          if(min.distance > distance){
            min.distance = distance;
            min.id = driver.id;
          }
        });
        
        const selectDriver = this.driverData.find(driver => driver.id === min.id);
        selectDriver.position = order.deliveryPosition;
        //reservedOrders에 넣기
        selectDriver.reservedOrders.push(order);
        
      });
      
      //무료금액 계산하기
      this.driverData.forEach(driver => {
        let lastTime = driver.lastTime;
        let position = driver.position;
        driver.reservedOrders.forEach(order => {
          const placePosition = this.data.places.find(place => place.id === order.placeId).position;

          //(13:00부터) 픽업시간 구하기
          let distance = Math.abs(position[0] - placePosition[0]) + Math.abs(position[1] - placePosition[1]);
          order.pickedUpAt = numToTime(timeToNum(lastTime) + distance);
          //배달지 도착시간구하기
          distance = Math.abs(placePosition[0] - order.deliveryPosition[0]) + Math.abs(placePosition[1] - order.deliveryPosition[1]);
          order.deliveredAt = numToTime(distance + timeToNum(order.pickedUpAt));

          lastTime = order.deliveredAt;
          position = order.deliveryPosition;
          //무료금액 계산
          const time = timeToNum(order.deliveredAt) - timeToNum(order.orderedAt);
          
          if(time>60){
            this.freeAmount += order.price;
          }; 

          
        });
      });  

      /*const getNextDriver = (driverData=>{
        let i=0;
        return ()=>driverData[i++%driverData.length];
      })(this.driverData)
      
      this.data.orders.filter(order=>!order.driverId).forEach(order=>{
        const driver = getNextDriver()
        driver.reservedOrders.push(order)
      }) */

      /**
       * 채점용 코드입니다. 여기부터
       */

      const checkOrders = validateAllocatedOrders(this.driverData, this.data.orders)
      if (!checkOrders) {
        alert('모든 주문이 하나씩 배차되어야 합니다.')
        return;
      }

      var textArea = document.getElementsByTagName("TEXTAREA")[0];
      const driverDataJson = JSON.stringify(this.driverData);
      textArea.value = driverDataJson
      textArea.select();
      document.execCommand("copy")

      console.log(JSON.stringify(this.driverData));

      this.render()
      /**
       * 여기까지 코드를 수정하지 마세요
       */

      alert(`배차 결과 예상 무료 제공 매출은 ${this.freeAmount}원 입니다.`)
    }

    const $container = document.createElement('section')
    $container.className = 'display-flex justify-end'

    const $buttonAllocate = document.createElement('button')
    $buttonAllocate.innerText = '배차하기'
    $buttonAllocate.addEventListener('click', handleAllocateClick.bind(this))
    $container.appendChild($buttonAllocate)

    $target.appendChild($container)
  }

  createDriverTable($target) {

    const driverTableHeaders = [
      '이름',
      '첫 배달 접수 시간',
      '배달 완료된 매출',
      '오늘 이동한 거리',
      '이후 배달 일정'
    ]

    const handleHeaderClick = (index) => {
      alert(driverTableHeaders[index])
    }

    const $container = document.createElement('div')
    $container.className = 'display-flex justify-end'
    this.$driverTableSortInfo = $container
    $target.appendChild($container)

    this.renderSortInfo(driverTableHeaders[this.sort.index], this.sort.isDescending)

    this.$driverTable = new Table($target)
    this.$driverTable.createTableHeaders(driverTableHeaders, handleHeaderClick)
  }

  createModals($target) {
    this.$driverInfoModal = new DriverInfoModal($target)
  }

  createTextArea($target) {
    const $textArea = document.createElement("TEXTAREA", {
      id: "result"
    })
    $target.appendChild($textArea)
  }

  aggregateDriverData() {

    const aggregatedDriverData = [];

    this.data.drivers.forEach(driver => {
      const driverInfo = {
        id: driver.id,
        name: driver.name,
        firstOrderedAt: '',
        todayDeliveryMenuPrice: 0,
        todayDeliveryDistance: 0,
        reservedOrders: [],
        orders: [],
        position: driver.position,
      };

      const driverOrders = this.data.orders
        .filter(order => order.driverId === driver.id);

      const driverPlace = this.data.places
        .filter(place => place.placeId === driverOrders.placeId);

      driverInfo.orders = driverOrders;


      //------------- 1.1 ----------------
      //첫 배달 접수 시각
      if (driverOrders.length !== 0) {
        driverInfo.firstOrderedAt = driverOrders[0].orderedAt;
      }


      //배달 완료 매출
      //driverOrders=> orderedAt:주문시각, pickedUpAt:픽업시각, deliveredAt:배달완료시각
      for (let i = 0; i < driverOrders.length; i++) {
        if (driverOrders[i].deliveredAt !== '') {
          const dTime = timeToNum(driverOrders[i].deliveredAt);
          const oTime = timeToNum(driverOrders[i].orderedAt);

          const time = dTime - oTime;

          if (time <= 60) {
            driverInfo.todayDeliveryMenuPrice += driverOrders[i].price;
          } else {
            this.freeAmount += driverOrders[i].price;
          }
        }
      }

      //오늘 이동 거리
      let start = [56, 56];
      let distance = [0, 0];

      for (let i = 0; i < driverOrders.length; i++) {
        if (driverOrders[i].pickedUpAt !== '') {
          //시작->식당
          distance[0] += Math.abs(driverPlace[i].position[0] - start[0]);
          distance[1] += Math.abs(driverPlace[i].position[1] - start[1]);

          start = [driverPlace[i].position[0], driverPlace[i].position[1]];
          if (driverOrders[i].deliveredAt !== '') {
            //식당->배달지
            distance[0] += Math.abs(driverOrders[i].deliveryPosition[0] - driverPlace[i].position[0]);
            distance[1] += Math.abs(driverOrders[i].deliveryPosition[1] - driverPlace[i].position[1]);

            start = [driverOrders[i].deliveryPosition[0], driverOrders[i].deliveryPosition[1]];
          } else {
            //식당->현재위치
            distance[0] += Math.abs(start[0] - driverInfo.position[0]);
            distance[1] += Math.abs(start[1] - driverInfo.position[0]);
          }
        } else {
          //시작->현재위치
          distance[0] += Math.abs(driverInfo.position[0] - start[0]);
          distance[1] += Math.abs(driverInfo.position[1] - start[1]);
        }
      
        const totalDistance = distance[0] + distance[1];
        driverInfo.todayDeliveryDistance = totalDistance;
      }

      aggregatedDriverData.push(driverInfo)
    })

    //1.1 처음) 드라이버 이름순으로 정렬
    aggregatedDriverData.sort((a, b) => {
      if (a.name === b.name) {
        return 0
      }
      return a.name > b.name ? 1 : -1;
    });
    this.driverData = aggregatedDriverData
  }

  setState(data) {
    this.data = data
    this.aggregateDriverData()
    this.render()
  }

  renderSortInfo(header, isDescending) {
    const sort = isDescending ? '내림차순' : '오름차순'
    this.$driverTableSortInfo.innerHTML = `
            <span>정렬: ${header}(${sort})</span>
        `
  }

  render() {
    function handleDriverClick(item) {
      this.$driverInfoModal.setState({
        visible: true,
        places: this.data.places,
        driver: item,
      })
    }

    const driverTableHeaders = [
      '이름',
      '첫 배달 접수 시간',
      '배달 완료된 매출',
      '오늘 이동한 거리',
      '이후 배달 일정'
    ]

    this.renderSortInfo(driverTableHeaders[this.sort.index], this.sort.isDescending)

    this.$driverTable.render(this.driverData, item => {
      const reservedOrderCount = item.reservedOrders.length
      return `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.firstOrderedAt}</td>
                    <td>${item.todayDeliveryMenuPrice}</td>
                    <td>${item.todayDeliveryDistance}</td>
                    <td>${reservedOrderCount > 0
                        ? `${reservedOrderCount}개 오더 수행 예정`
                        : `이후 배달 일정이 없습니다.`}
                    </td>
                </tr>
            `
    }, handleDriverClick.bind(this))
  }
}