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
	initCatalogPage()
	initProductPage()
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
	$('.request-phone').inputmask({
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

	$('.request-name').on('input blur', validateName)
	$('.request-phone').on('input blur', validatePhone)

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
function initFeedbackButton() {
	const buttons = document.querySelectorAll('.feedback-btn')
	const panel = document.getElementById('request-panel')
	const overlay = document.getElementById('request-overlay')
	const close = document.querySelector('.request-panel-close')

	if (!buttons.length || !panel || !overlay) return

	function openPanel() {
		panel.classList.add('is-open')
		overlay.classList.add('is-open')
		document.body.style.overflow = 'hidden'
	}

	function closePanel() {
		panel.classList.remove('is-open')
		overlay.classList.remove('is-open')
		document.body.style.overflow = ''
	}

	buttons.forEach(function (btn) {
		btn.addEventListener('click', openPanel)
	})

	if (close) {
		close.addEventListener('click', closePanel)
	}

	overlay.addEventListener('click', closePanel)
}

// ============================================================
// СТРАНИЦА КАТАЛОГА (catalog1.html)
// ============================================================

/**
 * Инициализация страницы каталога:
 * - Sticky сайдбар с остановкой у нижней границы колонки
 * - Кастомный select (кросс-браузерный)
 * - Переключение вида сетка / список
 */
function initCatalogPage() {
	initCatSidebar()
	initCatFilterGroups()
	initCatFilterReset()
	initCatSelect()
	initCatViewToggle()
	initCatMobileBar()
}

/** Sticky сайдбар: реализован чистым CSS (position: sticky; top: 20px)
 *  Нативно останавливается у нижней границы родительской колонки — без скачков.
 */
function initCatSidebar() {
	// Логика не требуется — браузер обрабатывает sticky самостоятельно.
}

/** Аккордеон групп фильтра: раскрытие/закрытие по клику на заголовок */
function initCatFilterGroups() {
	var groups = document.querySelectorAll('.cat-filter-group')
	groups.forEach(function (group) {
		var toggle = group.querySelector('.cat-filter-group__toggle')
		if (!toggle) return
		toggle.addEventListener('click', function () {
			var isOpen = group.classList.toggle('is-open')
			toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
		})
	})
}

/** Сброс фильтров: снять все чекбоксы, задизейблить кнопку */
function initCatFilterReset() {
	var resetBtn = document.getElementById('cat-filter-reset')
	var filterPanel = document.querySelector('.cat-filter')
	if (!resetBtn || !filterPanel) return

	function updateResetBtn() {
		var checked = filterPanel.querySelectorAll('input[type="checkbox"]:checked')
		resetBtn.disabled = checked.length === 0
	}

	filterPanel.addEventListener('change', updateResetBtn)

	resetBtn.addEventListener('click', function () {
		filterPanel
			.querySelectorAll('input[type="checkbox"]')
			.forEach(function (cb) {
				cb.checked = false
			})
		resetBtn.disabled = true
		// Точка расширения для будущего AJAX-запроса:
		// dispatchEvent(new CustomEvent('cat:filter:reset'))
	})

	updateResetBtn()
}

/** Кастомный select: открытие/закрытие, выбор значения */
function initCatSelect() {
	var selects = document.querySelectorAll('.cat-select')
	selects.forEach(function (wrap) {
		var trigger = wrap.querySelector('.cat-select__trigger')
		var label = wrap.querySelector('.cat-select__label')
		var options = wrap.querySelectorAll('.cat-select__option')
		var native = wrap.querySelector('.cat-select__native')
		if (!trigger || !options.length) return

		function open() {
			wrap.classList.add('is-open')
			trigger.setAttribute('aria-expanded', 'true')
		}
		function close() {
			wrap.classList.remove('is-open')
			trigger.setAttribute('aria-expanded', 'false')
		}
		function toggle() {
			wrap.classList.contains('is-open') ? close() : open()
		}

		trigger.addEventListener('click', function (e) {
			e.stopPropagation()
			toggle()
		})
		trigger.addEventListener('keydown', function (e) {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault()
				toggle()
			}
			if (e.key === 'Escape') close()
		})

		options.forEach(function (opt) {
			opt.addEventListener('click', function () {
				var val = opt.dataset.value
				var text = opt.textContent.trim()
				// Обновить label
				if (label) label.textContent = text
				// Обновить нативный select
				if (native) native.value = val
				// Обновить selected-класс
				options.forEach(function (o) {
					o.classList.remove('cat-select__option--selected')
					o.setAttribute('aria-selected', 'false')
				})
				opt.classList.add('cat-select__option--selected')
				opt.setAttribute('aria-selected', 'true')
				close()
			})
		})

		// Закрыть при клике вне
		document.addEventListener('click', function (e) {
			if (!wrap.contains(e.target)) close()
		})
	})
}

/** Переключение вида: сетка / список */
function initCatViewToggle() {
	var btns = document.querySelectorAll('.cat-toolbar__view-btn')
	var grid = document.getElementById('cat-grid')
	if (!btns.length || !grid) return

	btns.forEach(function (btn) {
		btn.addEventListener('click', function () {
			btns.forEach(function (b) {
				b.classList.remove('cat-toolbar__view-btn--active')
			})
			btn.classList.add('cat-toolbar__view-btn--active')
			grid.classList.toggle('list-view', btn.dataset.view === 'list')
		})
	})
}

/**
 * Мобильный бар: bottom sheet (категории/сортировка), поиск, вид сетки
 * Синхронизирует состояние с desktop-сайдбаром и desktop-тулбаром
 */
function initCatMobileBar() {
	var overlay = document.getElementById('cat-sheet-overlay')
	var sheet = document.getElementById('cat-sheet')
	var sheetTitle = document.getElementById('cat-sheet-title')
	var sheetClose = document.getElementById('cat-sheet-close')
	var panelCats = document.getElementById('cat-sheet-cats')
	var panelSort = document.getElementById('cat-sheet-sort')

	var btnCats = document.getElementById('cat-mb-cats')
	var btnSort = document.getElementById('cat-mb-sort')
	var grid = document.getElementById('cat-grid')

	var searchBtn = document.getElementById('cat-mb-search-btn')
	var searchRow = document.getElementById('cat-mobile-search-row')
	var searchInput = document.getElementById('cat-mb-search-input')
	var searchClear = document.getElementById('cat-mb-search-clear')

	var viewToggle = document.getElementById('cat-mb-view-toggle')

	if (!overlay || !sheet) return

	/* ── Bottom sheet ── */
	function openSheet(panel) {
		panelCats.classList.toggle('cat-sheet__panel--hidden', panel !== 'cats')
		panelSort.classList.toggle('cat-sheet__panel--hidden', panel !== 'sort')
		sheetTitle.textContent = panel === 'cats' ? 'Категория' : 'Сортировка'
		overlay.classList.add('is-open')
		sheet.classList.add('is-open')
		document.body.style.overflow = 'hidden'
	}

	function closeSheet() {
		overlay.classList.remove('is-open')
		sheet.classList.remove('is-open')
		document.body.style.overflow = ''
	}

	if (btnCats)
		btnCats.addEventListener('click', function () {
			openSheet('cats')
		})
	if (btnSort)
		btnSort.addEventListener('click', function () {
			openSheet('sort')
		})
	if (sheetClose) sheetClose.addEventListener('click', closeSheet)
	overlay.addEventListener('click', closeSheet)
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') closeSheet()
	})

	/* ── Выбор подкатегории ── */
	var sheetCatBtns = (panelCats || document).querySelectorAll(
		'.cat-sheet__item-btn[data-cat]',
	)
	sheetCatBtns.forEach(function (btn) {
		btn.addEventListener('click', function () {
			var cat = btn.dataset.cat
			sheetCatBtns.forEach(function (b) {
				b.closest('.cat-sheet__item').classList.remove(
					'cat-sheet__item--active',
				)
			})
			btn.closest('.cat-sheet__item').classList.add('cat-sheet__item--active')
			var desktopBtns = document.querySelectorAll('.cat-sidebar__btn[data-cat]')
			desktopBtns.forEach(function (b) {
				b.closest('.cat-sidebar__item').classList.remove(
					'cat-sidebar__item--active',
				)
				if (b.dataset.cat === cat) {
					b.closest('.cat-sidebar__item').classList.add(
						'cat-sidebar__item--active',
					)
				}
			})
			if (btnCats) btnCats.classList.add('is-active')
			closeSheet()
		})
	})

	/* ── Выбор сортировки ── */
	var sheetSortBtns = (panelSort || document).querySelectorAll(
		'.cat-sheet__item-btn[data-sort]',
	)
	sheetSortBtns.forEach(function (btn) {
		btn.addEventListener('click', function () {
			var sort = btn.dataset.sort
			sheetSortBtns.forEach(function (b) {
				b.closest('.cat-sheet__item').classList.remove(
					'cat-sheet__item--active',
				)
			})
			btn.closest('.cat-sheet__item').classList.add('cat-sheet__item--active')
			var nativeSelect = document.querySelector('.cat-select__native')
			var selectLabel = document.querySelector('.cat-select__label')
			var selectOptions = document.querySelectorAll('.cat-select__option')
			if (nativeSelect) nativeSelect.value = sort
			if (selectLabel) selectLabel.textContent = btn.textContent.trim()
			selectOptions.forEach(function (o) {
				o.classList.toggle(
					'cat-select__option--selected',
					o.dataset.value === sort,
				)
				o.setAttribute(
					'aria-selected',
					o.dataset.value === sort ? 'true' : 'false',
				)
			})
			if (btnSort) btnSort.classList.add('is-active')
			closeSheet()
		})
	})

	/* ── Поиск (slide-down строка под баром) ── */
	function openSearch() {
		if (!searchRow) return
		searchRow.classList.add('is-open')
		if (searchBtn) searchBtn.classList.add('is-active')
		setTimeout(function () {
			if (searchInput) searchInput.focus()
		}, 310)
	}
	function closeSearch() {
		if (!searchRow) return
		searchRow.classList.remove('is-open')
		if (searchBtn) searchBtn.classList.remove('is-active')
		if (searchInput) searchInput.value = ''
		var desktopInput = document.querySelector('.cat-toolbar__search-input')
		if (desktopInput) desktopInput.value = ''
	}

	if (searchBtn) {
		searchBtn.addEventListener('click', function (e) {
			e.stopPropagation()
			if (searchRow && searchRow.classList.contains('is-open')) {
				closeSearch()
			} else {
				openSearch()
			}
		})
	}
	if (searchClear) {
		searchClear.addEventListener('click', function () {
			closeSearch()
		})
	}
	if (searchInput) {
		searchInput.addEventListener('input', function () {
			var desktopInput = document.querySelector('.cat-toolbar__search-input')
			if (desktopInput) desktopInput.value = searchInput.value
		})
	}

	/* ── Переключение вида (одна кнопка) ── */
	if (viewToggle) {
		var iconList = viewToggle.querySelector('.cat-mb-icon-list')
		var iconGrid = viewToggle.querySelector('.cat-mb-icon-grid')
		viewToggle.addEventListener('click', function () {
			var current = viewToggle.dataset.current || 'grid'
			var next = current === 'grid' ? 'list' : 'grid'
			viewToggle.dataset.current = next
			if (iconList) iconList.style.display = next === 'grid' ? 'flex' : 'none'
			if (iconGrid) iconGrid.style.display = next === 'list' ? 'flex' : 'none'
			if (grid) grid.classList.toggle('list-view', next === 'list')
			var desktopBtns = document.querySelectorAll(
				'.cat-toolbar .cat-toolbar__view-btn',
			)
			desktopBtns.forEach(function (b) {
				b.classList.toggle(
					'cat-toolbar__view-btn--active',
					b.dataset.view === next,
				)
			})
		})
	}
}

/* ============================================
   СТРАНИЦА ТОВАРА
   ============================================ */

function initProductPage() {
	if (!document.querySelector('.pd-section')) return

	initProductGallery()
	initProductVariants()
	initProductAccordions()
	initRelatedSwiper()
}

/**
 * Галерея: вертикальные миниатюры + главный слайдер (Swiper thumbs)
 */
function initProductGallery() {
	if (!document.getElementById('pd-main-swiper')) return

	var thumbsSwiper = null
	var thumbsEl = document.getElementById('pd-thumbs-swiper')

	// Миниатюры — только на десктопе (≥768px)
	if (thumbsEl && window.innerWidth >= 768) {
		thumbsSwiper = new Swiper('#pd-thumbs-swiper', {
			direction: 'vertical',
			slidesPerView: 'auto',
			spaceBetween: 8,
			freeMode: true,
			watchSlidesProgress: true,
		})
	}

	new Swiper('#pd-main-swiper', {
		spaceBetween: 0,
		thumbs: thumbsSwiper ? { swiper: thumbsSwiper } : false,
		navigation: {
			prevEl: '.pd-gallery-prev',
			nextEl: '.pd-gallery-next',
		},
		loop: true,
		centeredSlides: true,
		slidesPerView: 1,
		breakpoints: {
			0: { slidesPerView: 1.2, spaceBetween: 10 },
			1200: { slidesPerView: 1, spaceBetween: 0 },
		},
	})
}

/**
 * Варианты: кнопки-радио по группам
 */
function initProductVariants() {
	var btns = document.querySelectorAll('.pd-variant-btn')
	btns.forEach(function (btn) {
		btn.addEventListener('click', function () {
			var group = btn.dataset.group
			document
				.querySelectorAll('.pd-variant-btn[data-group="' + group + '"]')
				.forEach(function (b) {
					b.classList.remove('pd-variant-btn--active')
				})
			btn.classList.add('pd-variant-btn--active')
		})
	})
}

/**
 * Аккордеоны
 */
function initProductAccordions() {
	const heads = document.querySelectorAll('.pd-accordion__head')

	heads.forEach(function (head) {
		head.addEventListener('click', function () {
			const accordion = head.closest('.pd-accordion')
			const isOpen = accordion.classList.contains('pd-accordion--open')

			if (isOpen) {
				// close current accordion
				accordion.classList.remove('pd-accordion--open')
				head.setAttribute('aria-expanded', 'false')
			} else {
				// open current accordion
				accordion.classList.add('pd-accordion--open')
				head.setAttribute('aria-expanded', 'true')
			}
		})
	})
}

/**
 * Слайдер "Другие товары"
 */
function initRelatedSwiper() {
	if (!document.querySelector('.pd-related-swiper')) return

	new Swiper('.pd-related-swiper', {
		slidesPerView: 5.5,
		spaceBetween: 16,
		navigation: {
			prevEl: '.pd-related-prev',
			nextEl: '.pd-related-next',
		},
		breakpoints: {
			0: { slidesPerView: 1.1, spaceBetween: 10 },
			480: { slidesPerView: 1.2, spaceBetween: 10 },
			768: { slidesPerView: 2.8, spaceBetween: 10 },
			992: { slidesPerView: 4.3, spaceBetween: 10 },
			1200: { slidesPerView: 4.5, spaceBetween: 20 },
			1500: { slidesPerView: 5.5, spaceBetween: 20 },
		},
	})
}
