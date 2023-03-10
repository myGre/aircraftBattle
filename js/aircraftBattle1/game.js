const btn = document.querySelector('.btn') // 暂停
const root = document.querySelector('#root') // 整个页面
const hostile_box = document.querySelector('.hostile_box') // 装敌机的容器
// const hostile = document.querySelector('.hostile') // 每个敌机盒子
const aircraft_box = document.querySelector('.aircraft_box') // 整个飞机盒子
const bullet_box = document.querySelector('.bullet_box') // 装子弹的容器
const aircraft = document.querySelector('.aircraft') // 飞机
// 获取整个div的宽高
const bodyWidth = root.clientWidth
const bodyHeight = root.clientHeight

let bulletArr = [] // 存放子弹的数组
let hostileArr = [] // 敌机的数量
let timer // 子弹的当前位置盒子
let trajectoryTimer // 子弹射击定时器
let positionAircraftoffsetTimer // 敌机出现的位置
let positionAircraftTimer // 敌机的运动
let aircraftLeft = 200 // 当前飞机的Left
let aircraftTop = 450 // 当前飞机的Left
let change = 15 // 每次运动的距离
let isplay = true // 是否开始游戏
let flag = false

// 敌机的位置
function positionAircraft() {
	let top = -200
	let hostile = document.createElement('div') // 每个敌机盒子
	hostile.className = 'hostile'
	// 敌机的最大或最小移动范围
	// console.log('hostile.offsetWidth', hostile.offsetWidth);
	let _w = bodyWidth - 100
	let hostile_Left = Math.random() * 500
	hostile_Left = Math.min(Math.max(0, hostile_Left), _w)

	hostile.style.top = top + 'px'
	hostile.style.left = hostile_Left + 'px'
	hostile_box.appendChild(hostile)

	// 敌机可被射击的范围
	let minLeft = hostile_Left
	let maxLeft = hostile_Left + hostile.offsetWidth
	let minTop = top
	let maxTop = top + hostile.offsetHeight
	hostileArr.push({
		topScope: [minTop, maxTop],
		leftScope: [minLeft, maxLeft]
	})
}
// 敌机出现的位置
positionAircraftoffsetTimer = setInterval(() => {
	positionAircraft()
}, 3000)

// 敌机的运动
function setPositionAircraft(hostileArr) {
	if (!hostileArr.length) return
	hostileArr.forEach((elemt, index) => {
		let minTop = elemt.topScope[0]
		let maxTop = elemt.topScope[1]
		if (minTop < bodyHeight) {
			elemt.topScope[0] = minTop + 4
			elemt.topScope[1] = maxTop + 4
			hostile_box.children[index].style.top = minTop + 'px'
		} else {
			hostile_box.removeChild(hostile_box.children[index])
			hostileArr.shift()
		}
	})
}
positionAircraftTimer = setInterval(() => {
	setPositionAircraft(hostileArr)
}, 45)

// 飞机当前的位置
aircraft.addEventListener('mousedown', (e) => {
	flag = true
	// 鼠标按下的位置
	let x = e.offsetX
	let y = e.offsetY
	document.addEventListener('mousemove', (e) => {
		// 清除定时器
		// clearInterval(timer)
		// 飞机的最大或最小移动范围
		let _w = bodyWidth - aircraft.offsetWidth
		let _h = bodyHeight - aircraft.offsetHeight

		let aircraft_Left = e.clientX - x
		let aircraft_Top = e.clientY - y
		aircraft_Left = Math.min(Math.max(0, aircraft_Left), _w)
		aircraft_Top = Math.min(Math.max(0, aircraft_Top), _h)

		if (flag) {
			aircraft.style.top = aircraft_Top + 'px'
			aircraft.style.left = aircraft_Left + 'px'

			aircraftLeft = aircraft_Left
			aircraftTop = aircraft_Top
		}
	})
})

// 子弹开始射击的位置
timer = setInterval(() => {
	createBullet(aircraftLeft, aircraftTop)
}, 200)

// 设置子弹射击,子弹的运动轨迹
function setBullet(bulletArr) {
	if (!bulletArr.length) return
	bulletArr.forEach((elemt, index) => {
		// 左右子弹的坐标
		let bulletLeft
		let bulletLTop
		let bulletRight
		let bulletRTop
		if (elemt.children[0] && elemt.children[1]) {
			bulletLeft = elemt.children[0].left
			bulletLTop = elemt.children[0].top
			bulletRight = elemt.children[1].left
			bulletRTop = elemt.children[1].top
		}

		// 子弹射击效果
		elemt.top = elemt.top - 15
		elemt.children.forEach(item => {
			item.top = item.top - 15
		})
		console.log('elemt.top', elemt.top);
		bullet_box.children[index].style.top = elemt.top + 'px'
		// 敌机所在的位置
		hostileArr.forEach((item) => {
			let minLeft = item.leftScope[0]
			let maxLeft = item.leftScope[1]
			let minTop = item.topScope[0]
			let maxTop = item.topScope[1]

			let _w = aircraft.offsetWidth // 飞机的宽度
			// 判断弹道是否在敌机上
			// 左右侧侧子弹可能会射在敌机上
			if (bulletLeft > minLeft && bulletLeft < maxLeft &&
				bulletRight < maxLeft) {
				if (elemt.top < maxTop && elemt.top > minTop) {
					bullet_box.removeChild(bullet_box.children[index])
					bulletArr.shift()
				}
			}
			// 左侧子弹可能会射在敌机上
			else if (bulletLeft > minLeft && bulletLeft < maxLeft) {
				crash(elemt.top, maxTop, minTop, index, 0)
			}
			// 右侧侧子弹可能会射在敌机上
			else if (bulletRight > minLeft && bulletRight < maxLeft) {
				crash(elemt.top, maxTop, minTop, index, 1)
			} else {
				if (elemt.top <= -15) {
					console.log('index', index);
					bullet_box.removeChild(bullet_box.children[index])
					bulletArr.shift()
				}
			}
			// 
		})
	})
}
// 子弹和敌机在同一top值时, 左右子弹都射中碰撞
function crash(top, maxTop, minTop, index, LorRbullet) {
	if (top < maxTop && top > minTop) {
		bullet_box.children[index].children[LorRbullet].style.display = 'none'
	}
	if (top <= -15) {
		bullet_box.removeChild(bullet_box.children[index])
		bulletArr.shift()
	}
}
trajectoryTimer = setInterval(() => {
	setBullet(bulletArr)
}, 50)

aircraft.addEventListener('mouseup', (e) => {
	flag = false
})
document.addEventListener('mouseup', () => {
	flag = false
})
// 暂停或继续
btn.addEventListener('click', () => {
	if (isplay) {
		clearInterval(trajectoryTimer)
		clearInterval(timer)
		clearInterval(positionAircraftoffsetTimer)
		clearInterval(positionAircraftTimer)

		isplay = false
		btn.innerHTML = '继续'
	} else {
		isplay = true
		// 子弹
		timer = setInterval(() => {
			createBullet(aircraftLeft, aircraftTop)
		}, 200)
		trajectoryTimer = setInterval(() => {
			setBullet(bulletArr)
		}, 50)
		// 敌机出现的位置
		positionAircraftoffsetTimer = setInterval(() => {
			positionAircraft()
		}, 3000)
		// 敌机飞行
		positionAircraftTimer = setInterval(() => {
			setPositionAircraft(hostileArr)
		}, 45)
	}

})

// 创建子弹节点
function createBullet(aircraft_Left = 200, aircraft_Top = 450) {
	// 两发子弹
	let twoBullet = document.createElement('div')
	twoBullet.className = 'twobullet'
	twoBullet.style.left = aircraft_Left + 'px'
	twoBullet.style.top = aircraft_Top + 'px'

	let left_bullet = document.createElement('div')
	let right_bullet = document.createElement('div')
	left_bullet.className = 'bullet'
	right_bullet.className = 'bullet'

	left_bullet.style.left = '5px'
	right_bullet.style.left = '89px'

	twoBullet.appendChild(left_bullet)
	twoBullet.appendChild(right_bullet)

	// 添加到子弹容器里
	bullet_box.appendChild(twoBullet)

	bulletArr.push({
		left: aircraft_Left,
		top: aircraft_Top,
		children: [
			// 左侧子弹
			{
				left: aircraft_Left + 5,
				top: aircraft_Top,
			},
			// 右侧子弹
			{
				left: aircraft_Left + 89,
				top: aircraft_Top,
			},
		]
	})

}