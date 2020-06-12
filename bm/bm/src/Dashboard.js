import Table from './Table.js'
import DriverInfoModal from './DriverInfoModal.js'
import {
  validateAllocatedOrders
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
      
      this.driverData = this.driverData.map(driver =>
        {
          if(driver.orders.length !== 0){
            //배달을 끝낸 시간을 구해야함
            //배달 중 -> 현재위치랑 배달거리랑 계산해서 몇시에 도착하는지
            if(driver.orders.deliveredAt === ''){
              if(driver.orders.pickedUpAt === ''){
                Math.abs(driver.position[0] - driver.places.position[0]) 
                + Math.abs(driver.position[1] - driver.places.position[1]);
              }
            }
            //픽업 중 -> 현재위치, 픽업위치, 배달위치 계산해서 몇시에 도착하는지 

          }
          //배차가 안된 배달원
          else{
            this.driverData.position = [56,56];
          }
        });

      /*const getNextDriver = (driverData=>{
        let i=0;
        return ()=>driverData[i++%driverData.length];
      })(this.driverData)
      
      this.data.orders.filter(order=>!order.driverId).forEach(order=>{
        const driver = getNextDriver()
        driver.reservedOrders.push(order)
      })*/ 

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

    this.data.drivers.forEach(driver=>{
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
      if(driverOrders.length !== 0){
        driverInfo.firstOrderedAt = driverOrders[0].orderedAt;
      }
      
      
      //배달 완료 매출
      //driverOrders=> orderedAt:주문시각, pickedUpAt:픽업시각, deliveredAt:배달완료시각
      for(let i=0; i<driverOrders.length; i++){
        if(driverOrders[i].deliveredAt !== ''){
          let [dH, dM] = driverOrders[i].deliveredAt.split(':');
          dH = parseInt(dH)*60;
          dM = parseInt(dM);
          const dTime = dH+dM;

          let [oH, oM] = driverOrders[i].orderedAt.split(':');
          oH = parseInt(oH)*60;
          oM = parseInt(oM);
          const oTime = oH+oM;
          
          const time = dTime - oTime;
          
          if(time <= 60){
            driverInfo.todayDeliveryMenuPrice += driverOrders[i].price;
          }
          else{
            freeAmount += driverOrders[i].price;
          }
        }
      }

      //오늘 이동 거리
      let start = [56,56];
      let distance = [0,0];

      for(let i=0; i<driverOrders.length; i++){
        if(driverOrders[i].pickedUpAt !== ''){
          //시작->식당
          distance[0] += Math.abs(driverPlace[i].position[0] - start[0]);
          distance[1] += Math.abs(driverPlace[i].position[1] - start[1]);

          start = [driverPlace[i].position[0], driverPlace[i].position[1]];
          if(driverOrders[i].deliveredAt !== ''){
            //식당->배달지
            distance[0] += Math.abs(driverOrders[i].deliveryPosition[0] - driverPlace[i].position[0]);
            distance[1] += Math.abs(driverOrders[i].deliveryPosition[1] - driverPlace[i].position[1]);

            start = [driverOrders[i].deliveryPosition[0], driverOrders[i].deliveryPosition[1]];
          }
          else{
            //식당->현재위치
            distance[0] += Math.abs(start[0] - driverInfo.position[0]);
            distance[1] += Math.abs(start[1] - driverInfo.position[0]);
          }
        }
        else{
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
    aggregatedDriverData.sort((a,b) => {if(a.name === b.name){ return 0} return a.name > b.name ? 1 : -1;} );
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