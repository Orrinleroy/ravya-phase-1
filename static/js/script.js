// Category Filter Functionality
document.addEventListener("DOMContentLoaded", () => {
  const categoryButtons = document.querySelectorAll(".category-btn")

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Get the category
      const category = this.getAttribute("data-category")
      console.log("Selected category:", category)

      // Here you can add logic to filter courses based on category
      filterCourses(category)
    })
  })

  // Video Controls
  const playBtn = document.getElementById("playBtn")
  const pauseBtn = document.getElementById("pauseBtn")
  const videoPlayer = document.querySelector(".video-player")

  if (playBtn) {
    playBtn.addEventListener("click", () => {
      console.log("Play button clicked")
      videoPlayer.classList.add("playing")
      // Add your video play logic here
    })
  }

  if (pauseBtn) {
    pauseBtn.addEventListener("click", () => {
      console.log("Pause button clicked")
      videoPlayer.classList.remove("playing")
      // Add your video pause logic here
    })
  }

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href !== "#" && href !== "#signup" && href !== "#login") {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({ behavior: "smooth" })
        }
      }
    })
  })
})

// Filter courses function
function filterCourses(category) {
  const courses = document.querySelectorAll(".course-card")

  courses.forEach((course) => {
    if (category === "all") {
      course.style.display = "block"
      setTimeout(() => {
        course.style.opacity = "1"
      }, 10)
    } else {
      // Add your filtering logic here based on data attributes
      course.style.opacity = "1"
    }
  })
}

// Add scroll animation for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe course cards for animation
document.addEventListener("DOMContentLoaded", () => {
  const courseCards = document.querySelectorAll(".course-card")
  courseCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })
})
