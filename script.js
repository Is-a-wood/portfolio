/* =========================================================
   DOM REFERENCES
   ========================================================= */

const categorySelect = document.getElementById("category-select")
const yearSelect = document.getElementById("year-select")
const portfolioItems = document.querySelectorAll(".portfolio-item")
const workCards = document.querySelectorAll(".work-card")
const highlightCards = document.querySelectorAll(".highlight-card")
const statsSection = document.querySelector(".stats-section")
const statNumbers = document.querySelectorAll(".stat-number")

let activeCategory = "all"
let activeYear = "all"

/* =========================================================
   PORTFOLIO FILTERING
   ========================================================= */

if (categorySelect) {
  categorySelect.addEventListener("change", () => {
    activeCategory = categorySelect.value
    filterItems()
  })
}

if (yearSelect) {
  yearSelect.addEventListener("change", () => {
    activeYear = yearSelect.value
    filterItems()
  })
}

function filterItems() {
  portfolioItems.forEach(item => {
    const categories = item.dataset.category?.split(" ") || []
    const itemYear = item.dataset.year

    const matchesCategory =
      activeCategory === "all" || categories.includes(activeCategory)

    const matchesYear =
      activeYear === "all" || itemYear === activeYear

    const shouldShow = matchesCategory && matchesYear
    item.classList.toggle("is-hidden", !shouldShow)

    // Reset card transform after filtering
    const card = item.querySelector(".work-card")
    if (card) resetCardTransform(card)
  })
}

/* =========================================================
   AIRBNB STYLE 3D CARD TILT
   ========================================================= */

const MAX_ROTATION = 8
const MAX_ROTATION_HIGHLIGHT = 3
const PERSPECTIVE = 1000

function applyTilt(card, maxRotation, lift) {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -maxRotation
    const rotateY = ((x - centerX) / centerX) * maxRotation

    card.style.transform = `
      perspective(${PERSPECTIVE}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-${lift}px)
    `
  })

  card.addEventListener("mouseleave", () => resetCardTransform(card))
}

function resetCardTransform(card) {
  card.style.transform = `
    perspective(${PERSPECTIVE}px)
    rotateX(0deg)
    rotateY(0deg)
    translateY(0)
  `
}

// Work cards
workCards.forEach(card => applyTilt(card, MAX_ROTATION, 4))

// Highlight cards
highlightCards.forEach(card =>
  applyTilt(card, MAX_ROTATION_HIGHLIGHT, 8)
)

/* =========================================================
   STATS COUNTER ANIMATION
   ========================================================= */

let hasAnimated = false

function animateCounter(element) {
  const target = parseInt(element.dataset.target, 10)
  const duration = 2000
  const increment = target / (duration / 16)
  let current = 0

  function update() {
    current += increment
    if (current < target) {
      element.textContent = Math.floor(current).toLocaleString()
      requestAnimationFrame(update)
    } else {
      element.textContent = target.toLocaleString()
    }
  }

  update()
}

 // Filter functionality
    const categorySelect = document.getElementById('category-select');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    categorySelect.addEventListener('change', function() {
      const selectedCategory = this.value;

      portfolioItems.forEach(item => {
        const categories = item.getAttribute('data-category').split(' ');
        
        if (selectedCategory === 'all' || categories.includes(selectedCategory)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });