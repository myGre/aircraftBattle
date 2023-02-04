// 游戏对象
((function () {
	function Game() {
		this.aircraft = new Aircraft() // 飞机
		this.positionAircraft = new PositionAircraft() // 敌机
		this.aircraftMousedown = () => { }
	}
	// 初始化游戏
	Game.prototype.init = function (map) {
		console.log('初始化游戏对象', this);
		this.aircraft.init(map)
		this.positionAircraft.init(map)
		this.rouAircraft(map)
	}
	// 触摸移动飞机
	Game.prototype.rouAircraft = function (map) {
		const bodyWidth = map.clientWidth
		const bodyHeight = map.clientHeight
		const aircraft = this.aircraft.aircraftElement

		// 开启飞机跟随鼠标移动
		this.aircraftMousedown = (e) => {
			this.aircraft.flag = true
			// 鼠标按下的位置
			let x = e.offsetX
			let y = e.offsetY
			let aircraftLeftOrTop = {}
			document.addEventListener('mousemove', (e) => {
				// 飞机的最大或最小移动范围
				let _w = bodyWidth - aircraft.offsetWidth
				let _h = bodyHeight - aircraft.offsetHeight

				let left = e.clientX - x
				let top = e.clientY - y
				// 限制飞机移动的范围
				aircraftLeftOrTop.left = Math.min(Math.max(0, left), _w)
				aircraftLeftOrTop.top = Math.min(Math.max(0, top), _h)
				this.aircraft.move(aircraftLeftOrTop)
			})
		}
		aircraft.addEventListener('mousedown', this.aircraftMousedown)

		// 关闭飞机跟随鼠标移动
		aircraft.addEventListener('mouseup', (e) => {
			this.aircraft.flag = false
		})
		document.addEventListener('mouseup', () => {
			this.aircraft.flag = false
		})
	}
	// 停止游戏
	Game.prototype.stop = function () {
		this.aircraft.stop()
		this.positionAircraft.stop()
		const aircraft = this.aircraft.aircraftElement
		aircraft.removeEventListener('mousedown', this.aircraftMousedown)
	}
	// 开始游戏
	Game.prototype.start = function (map) {
		this.aircraft.init(map)
		this.positionAircraft.init(map)
		this.rouAircraft(map)
	}
	window.Game = Game
})());