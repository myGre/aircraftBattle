// 敌机对象
((function () {
	let hostileClass = ['hostile1'];
	function PositionAircraft() {
		this.hostileArrly = []; // 敌机位置数组
		this.hostileElementArrly = []; // 敌机元素数组
		this.hostileClass = hostileClass; // 敌机机型样式
		this.element = document.querySelector('#hostileBox'); // 敌机盒子
		this.timer = '' // 敌机运动
		this.createTimer = '' // 创建敌机

	}
	// 初始化敌机
	PositionAircraft.prototype.init = function (map) {
		this.move(map)
	}
	// 敌机的样式
	PositionAircraft.prototype.setStyle = function (map) {
		let element = this.element
		// 敌机的最大或最小移动范围(出现位置)
		let hostileElement = document.createElement('div')
		const bodyWidth = map.clientWidth
		const bodyHeight = map.clientHeight
		hostileElement.className = this.hostileClass[0];

		element.appendChild(hostileElement)
		// 初始化敌机出现位置
		let left = Math.random() * (bodyWidth - hostileElement.offsetWidth)
		hostileElement.style.top = (-hostileElement.offsetHeight) + 'px';
		hostileElement.style.left = left + 'px';
		let maxNumber = Math.ceil(Math.random() * 50)
		this.hostileArrly.push({ top: (-hostileElement.offsetHeight + hostileElement.offsetHeight), left, right: left + hostileElement.offsetWidth, height: hostileElement.offsetHeight, number: 0, maxNumber })
		this.hostileElementArrly.push(hostileElement)
	}
	// 敌机运动轨迹
	PositionAircraft.prototype.move = function (map) {
		const bodyHeight = map.clientHeight
		let hostileElementArrly = this.hostileElementArrly

		// 创建敌机
		this.createTimer = setInterval(() => {
			this.setStyle(map)
		}, 3000)
		// 敌机运动
		this.timer = setInterval(() => {
			this.hostileArrly.forEach((item, index) => {
				let hostileElement = hostileElementArrly[index]
				let difference = hostileElement.offsetHeight / 30
				item.top += difference

				hostileElement.style.top = (item.top - hostileElement.offsetHeight) + 'px'
				if (item.top > bodyHeight) {
					this.clearAircraft(index)
				}
			});
		}, 50)
	}
	// 清除敌机
	PositionAircraft.prototype.clearAircraft = function (index) {
		this.hostileArrly.splice(index, 1)
		this.element.removeChild(this.element.children[index])
		this.hostileElementArrly.splice(index, 1)
	}
	PositionAircraft.prototype.stop = function () {
		clearInterval(this.createTimer)
		clearInterval(this.timer)

	}
	window.PositionAircraft = PositionAircraft;
}()));