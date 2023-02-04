// 飞机对象
((function () {
	let aircraftClass = ['aircraft1'];
	function Aircraft() {
		this.aircraftLeftOrTop = { top: 450, left: 200 };
		this.aircraftClass = aircraftClass; // 飞机机型样式
		this.element = document.querySelector('#aircraftBox'); // 整个飞机盒子
		this.aircraftElement = document.createElement('div'); // 飞机
		this.bullet = new Bullet(); // 子弹
		this.flag = false; // 控制飞机是否可以移动
	}
	// 初始化
	Aircraft.prototype.init = function (map) {
		let aircraftBox = this.element
		let aircraftElement = this.aircraftElement
		let bullet = this.bullet
		// 初始化飞机样式
		this.setStyle(aircraftElement)
		// 添加到页面
		aircraftBox.appendChild(aircraftElement);
		console.log('初始化飞机', this);

		// 初始化子弹
		bullet.init(this.aircraftLeftOrTop)
		aircraftBox.appendChild(bullet.bulletElement);

		map.appendChild(aircraftBox);
	}
	// 飞机样式
	Aircraft.prototype.setStyle = function (aircraftElement) {
		aircraftElement.style.top = this.aircraftLeftOrTop.top + 'px';
		aircraftElement.style.left = this.aircraftLeftOrTop.left + 'px';
		aircraftElement.className = this.aircraftClass[0];
	}
	// 飞机移动
	Aircraft.prototype.move = function (aircraftLeftOrTop) {
		let { top, left } = aircraftLeftOrTop
		let aircraft = this.aircraftElement
		let bullet = this.bullet
		if (this.flag) {
			aircraft.style.top = top + 'px'
			aircraft.style.left = left + 'px'
			this.aircraftLeftOrTop.left = left
			this.aircraftLeftOrTop.top = top
			// bullet.setLeftOrTop(this.aircraftLeftOrTop)

		}
	}
	// 停止
	Aircraft.prototype.stop = function () {
		this.bullet.stop()
	}

	window.Aircraft = Aircraft;
})());

// 子弹对象
((function () {
	let bulletsClass = 'bulletsClass';
	let bulletClass = 'bullet';
	function Bullet() {
		this.bulletsClass = bulletsClass; // 装子弹盒子的样式
		this.bulletClass = bulletClass; // 子弹样式
		this.bullets = []; // 装子弹的数组
		this.bulletsArrElement = []; // 装子弹元素的数组
		this.bulletsLeftOrTop = {} // 子弹盒子当前的位置
		this.number = 3; // 子弹数量
		this.bulletElement = document.createElement('div');
		this.timer = ''; //子弹射击
	}
	// 初始化子弹
	Bullet.prototype.init = function (bulletsLeftOrTop) {
		this.setLeftOrTop(bulletsLeftOrTop)
		this.setBulletNum()
		this.setBullet()
	}
	// 设置子弹盒子当前的位置
	Bullet.prototype.setLeftOrTop = function (bulletsLeftOrTop) {
		let bullets = this.bulletElement;
		this.bulletsLeftOrTop = bulletsLeftOrTop
		let { top, left } = this.bulletsLeftOrTop
	}
	// 设置子弹样式和数量
	Bullet.prototype.setBulletNum = function (number = 2) {
		// this.number = number
		let { top, left } = this.bulletsLeftOrTop
		let bulletElement = this.bulletElement;
		let bullets = document.createElement('div');
		let bulletsArrElement = this.bulletsArrElement
		bullets.className = this.bulletsClass;
		bullets.style.top = top + 'px';
		bullets.style.left = left + 'px';
		let bulletArr = [] // 每发子弹的盒子
		let bulletLeft = null
		let bulletTop = null
		switch (this.number) {
			case 1:
				let bullet = document.createElement('p'); // 每发子弹
				bullet.className = this.bulletClass;

				bulletLeft = left + 48
				bulletTop = top
				bullet.style.left = 48 + 'px'

				bullets.appendChild(bullet)
				bulletArr.push({ bulletLeft, bulletTop })
				// 子弹的初始位置
				this.bullets.push(bulletArr)
				bulletsArrElement.push(bullets)
				bulletElement.appendChild(bullets)
				break;
			case 2:
				for (let i = 0; i < 2; i++) {
					let bullet = document.createElement('p'); // 每发子弹
					bullet.className = this.bulletClass; // 每发子弹的样式
					if (i === 0) {
						bulletLeft = left + 5
						bulletTop = top
						bullet.style.left = 5 + 'px'
					}
					if (i === 1) {
						bulletLeft = left + 89
						bulletTop = top
						bullet.style.left = 89 + 'px'
					}
					bullets.appendChild(bullet)
					bulletArr.push({ bulletLeft, bulletTop })

				}
				this.bullets.push(bulletArr)
				bulletsArrElement.push(bullets)
				bulletElement.appendChild(bullets)
				break;
			case 3:
				for (let i = 0; i < 3; i++) {
					let bullet = document.createElement('p'); // 每发子弹
					bullet.className = this.bulletClass; // 每发子弹的样式
					if (i === 0) {
						bulletLeft = left + 5
						bulletTop = top
						bullet.style.left = 5 + 'px'
					}
					if (i === 1) {
						bulletLeft = left + 48
						bulletTop = top + -10
						bullet.style.left = 48 + 'px'
						bullet.style.top = -10 + 'px'

					}
					if (i === 2) {
						bulletLeft = left + 89
						bulletTop = top
						bullet.style.left = 89 + 'px'
					}
					bullets.appendChild(bullet)
					bulletArr.push({ bulletLeft, bulletTop })
				}
				bulletsArrElement.push(bullets)
				bulletElement.appendChild(bullets)
				this.bullets.push(bulletArr)
				break;
		}

	}
	// 子弹射击
	Bullet.prototype.setBullet = function () {
		this.timer = setInterval(() => {
			let difference = Math.ceil(Math.random() * 10) + 30
			this.setBulletNum(Math.ceil(Math.random() * 3))

			this.bullets.forEach((item, index) => {
				const element = this.bulletsArrElement[index];
				element.style.top = (this.bullets[index][0].bulletTop - difference) + 'px'
				item.forEach(item => {
					item.bulletTop -= difference
				})
				if (this.bullets[index][0].bulletTop < -60) {
					this.bulletElement.removeChild(this.bulletElement.children[index])
					this.bulletsArrElement.shift()
					this.bullets.shift()
				}
			})
			console.log('bullets', this.bullets);
			console.log('bulletsArrElement', this.bulletsArrElement);
		}, 100)
	}
	// 停止射击
	Bullet.prototype.stop = function () {
		clearInterval(this.timer)
	}
	window.Bullet = Bullet;
})());