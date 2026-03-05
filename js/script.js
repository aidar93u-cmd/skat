/**
 * SKAT Website - Minimal JavaScript
 *
 * This file contains minimal JavaScript functionality for the website.
 */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
	initFeedbackButton()
	initCatalogSwiper()
	initCompanySlider()
	initBurgerMenu()
	initAdvantagesSwiper()
	initContactsPage()
})

/**
 * Initialize AOS (Animate On Scroll) library
 */
function initAOS() {
	if (typeof AOS === 'undefined') return

	AOS.init({
		duration: 500,
		easing: 'ease-out-cubic',
		offset: 0,
		once: true,
	})
}

document.addEventListener('DOMContentLoaded', initAOS)
window.addEventListener('load', () => AOS.refresh())

/**
 * Initialize feedback button click handler
 */
function initFeedbackButton() {
	const feedbackBtn = document.querySelector('.feedback-btn')

	if (feedbackBtn) {
		feedbackBtn.addEventListener('click', function () {
			alert('Feedback form would open here')
		})
	}
}

/**
 * Initialize menu item effects
 */

/**
 * Initialize Swiper slider for catalog section
 */
function initCatalogSwiper() {
	if (typeof Swiper === 'undefined') {
		return
	}

	const catalogSwiperEl = document.querySelector('.catalog-swiper')

	if (!catalogSwiperEl) {
		return
	}

	new Swiper('.catalog-swiper', {
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			768: {
				slidesPerView: 2,
			},
			1224: {
				slidesPerView: 3,
			},
		},
	})
}

/**
 * Initialize simple company slider
 */
function initCompanySlider() {
	const slider = document.querySelector('[data-slider="company"]')
	if (!slider) return

	const slides = Array.from(slider.querySelectorAll('.company-slide'))
	const dots = Array.from(slider.querySelectorAll('.company-dot'))

	if (!slides.length || !dots.length) return

	let current = 0
	let timer = null

	function showSlide(index) {
		current = index
		slides.forEach((slide, i) => {
			const offset = (i - current) * 100
			slide.style.transform = `translateX(${offset}%)`
		})

		// update all dot groups
		const allDots = slider.querySelectorAll('.company-dot')
		allDots.forEach(dot => {
			const target = Number(dot.getAttribute('data-slide'))
			dot.classList.toggle('company-dot--active', target === current)
		})
	}

	function startAuto() {
		stopAuto()
		timer = setInterval(() => {
			const next = (current + 1) % slides.length
			showSlide(next)
		}, 8000)
	}

	function stopAuto() {
		if (timer) {
			clearInterval(timer)
			timer = null
		}
	}

	dots.forEach(dot => {
		dot.addEventListener('click', () => {
			const target = Number(dot.getAttribute('data-slide'))
			if (!Number.isNaN(target)) {
				showSlide(target)
				startAuto()
			}
		})
	})

	const prevArrow = slider.querySelector('.company-arrow--prev')
	const nextArrow = slider.querySelector('.company-arrow--next')

	if (prevArrow) {
		prevArrow.addEventListener('click', () => {
			const prev = (current - 1 + slides.length) % slides.length
			showSlide(prev)
			startAuto()
		})
	}

	if (nextArrow) {
		nextArrow.addEventListener('click', () => {
			const next = (current + 1) % slides.length
			showSlide(next)
			startAuto()
		})
	}

	slider.addEventListener('mouseenter', stopAuto)
	slider.addEventListener('mouseleave', startAuto)

	slides.forEach((slide, i) => {
		const offset = i * 100
		slide.style.transform = `translateX(${offset}%)`
	})

	showSlide(0)
	startAuto()
}

/**
 * Бургер-меню: открытие/закрытие панели, крестик
 */
function initBurgerMenu() {
	const burger = document.querySelector('.burger-btn')
	const panel = document.getElementById('mobile-menu-panel')
	const overlay = document.getElementById('mobile-menu-overlay')

	if (!burger || !panel || !overlay) return

	function openMenu() {
		burger.classList.add('is-open')
		burger.setAttribute('aria-label', 'Закрыть меню')
		panel.classList.add('is-open')
		panel.setAttribute('aria-hidden', 'false')
		overlay.classList.add('is-open')
		overlay.setAttribute('aria-hidden', 'false')
		document.body.style.overflow = 'hidden'
	}

	function closeMenu() {
		burger.classList.remove('is-open')
		burger.setAttribute('aria-label', 'Открыть меню')
		panel.classList.remove('is-open')
		panel.setAttribute('aria-hidden', 'true')
		overlay.classList.remove('is-open')
		overlay.setAttribute('aria-hidden', 'true')
		document.body.style.overflow = ''
	}

	burger.addEventListener('click', function () {
		if (panel.classList.contains('is-open')) {
			closeMenu()
		} else {
			openMenu()
		}
	})

	overlay.addEventListener('click', closeMenu)

	panel.querySelectorAll('.menu-item, .btn').forEach(el => {
		el.addEventListener('click', closeMenu)
	})
}

/**
 * Advantages: Swiper только на мобилке (≤690px). На ПК — обычная сетка без Swiper.
 */
function initAdvantagesSwiper() {
	if (typeof Swiper === 'undefined') return

	const el = document.querySelector('.advantages-swiper')
	if (!el || !el.classList.contains('advantages-swiper')) return

	const MOBILE_BREAKPOINT = 690
	let swiperInstance = null

	function init() {
		if (swiperInstance) return
		swiperInstance = new Swiper('.advantages-swiper', {
			slidesPerView: 1.3,
			spaceBetween: 45,
			loop: true,
		})
	}

	function destroy() {
		if (!swiperInstance) return
		swiperInstance.destroy(true, true)
		swiperInstance = null
	}

	function update() {
		if (window.innerWidth <= MOBILE_BREAKPOINT) {
			init()
		} else {
			destroy()
		}
	}

	update()
	window.addEventListener('resize', update)
}

$(function () {
	// Phone mask: +7 (999) 999-99-99
	$('#request-phone').inputmask({
		mask: '+7 (999) 999-99-99',
		showMaskOnHover: false,
		clearIncomplete: true,
	})

	function validateName() {
		const $field = $('#request-name')
		const isValid = $field.val().trim().length >= 2
		toggleError($field, isValid)
		return isValid
	}

	function validatePhone() {
		const $field = $('#request-phone')
		const isValid = $field.inputmask('isComplete')
		toggleError($field, isValid)
		return isValid
	}

	function toggleError($field, isValid) {
		if (!isValid) {
			$field.addClass('error')
		} else {
			$field.removeClass('error')
		}
	}

	// Live validation (only required fields)
	$('#request-name').on('input blur', validateName)
	$('#request-phone').on('input blur', validatePhone)

	// Submit
	$('.request-form').on('submit', function (e) {
		const isNameValid = validateName()
		const isPhoneValid = validatePhone()

		if (!isNameValid || !isPhoneValid) {
			e.preventDefault()
		}
	})
})

/**
 * Страница контактов: кнопки «Копировать» и переключение блока с данными на карте
 */
function initContactsPage() {
	const copyButtons = document.querySelectorAll('.contacts-copy-btn')
	copyButtons.forEach(function (btn) {
		btn.addEventListener('click', function () {
			const toCopy = this.getAttribute('data-copy')
			if (!toCopy) return
			navigator.clipboard.writeText(toCopy).then(
				function () {
					btn.classList.add('is-active')
					btn.setAttribute('aria-label', 'Скопировано')
					setTimeout(function () {
						btn.classList.remove('is-active')
						btn.setAttribute('aria-label', 'Копировать')
					}, 2000)
				},
				function () {
					btn.setAttribute('aria-label', 'Ошибка копирования')
				},
			)
		})
	})

}
