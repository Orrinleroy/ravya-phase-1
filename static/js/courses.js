const coursesData = [
  {
    id: 1,
    name: "Introduction to Business Fundamentals",
    description:
      "A beginner-friendly overview of essential business concepts, covering management, marketing, finance, and entrepreneurship.",
    category: "business",
    image: "/static/img/thumbnail1.jpg",
    duration: "4 weeks",
    level: "Beginner",
    instructor: "Sarah Johnson",
  },
  {
    id: 2,
    name: "Understanding Market Research",
    description: "A concise introduction to the methods and importance of gathering, analyzing, and interpreting market data for better business decisions",
    category: "digital",
    image: "/static/img/thumbnail2.jpg",
    duration: "6 weeks",
    level: "Intermediate",
    instructor: "Michael Chen",
  },
  {
    id: 3,
    name: "Building a Business Plan",
    description:
      "A practical guide to creating a clear, structured, and strategic business plan from concept to execution",
    category: "finance",
    image: "/static/img/thumbnail3.jpg",
    duration: "5 weeks",
    level: "Intermediate",
    instructor: "Emma Williams",
  },
  // {
  //   id: 4,
  //   name: "Leadership and Management",
  //   description:
  //     "Develop essential leadership skills and learn effective management techniques to lead teams successfully.",
  //   category: "business",
  //   image: "/leadership-team.jpg",
  //   duration: "8 weeks",
  //   level: "Advanced",
  //   instructor: "James Anderson",
  // },
  // {
  //   id: 5,
  //   name: "Social Media Marketing",
  //   description: "Create compelling social media strategies and grow your online presence across all platforms.",
  //   category: "digital",
  //   image: "/social-media.jpg",
  //   duration: "4 weeks",
  //   level: "Beginner",
  //   instructor: "Lisa Martinez",
  // },
  // {
  //   id: 6,
  //   name: "Investment Strategies",
  //   description: "Understand investment fundamentals and learn proven strategies for growing your wealth.",
  //   category: "finance",
  //   image: "/investment-strategy.jpg",
  //   duration: "6 weeks",
  //   level: "Advanced",
  //   instructor: "Robert Taylor",
  // },
  // {
  //   id: 7,
  //   name: "Startup Launch Blueprint",
  //   description: "Complete guide to launching your startup from idea to market with real-world case studies.",
  //   category: "business",
  //   image: "/startup-launch.jpg",
  //   duration: "10 weeks",
  //   level: "Advanced",
  //   instructor: "David Brown",
  // },
  // {
  //   id: 8,
  //   name: "Content Marketing Mastery",
  //   description: "Create engaging content that converts audiences into loyal customers and builds your brand.",
  //   category: "digital",
  //   image: "/content-marketing.jpg",
  //   duration: "5 weeks",
  //   level: "Intermediate",
  //   instructor: "Jessica White",
  // },
  // {
  //   id: 9,
  //   name: "Customer Acquisition",
  //   description: "Learn proven tactics to acquire, retain, and delight your customers effectively.",
  //   category: "business",
  //   image: "/customer-acquisition.jpg",
  //   duration: "4 weeks",
  //   level: "Intermediate",
  //   instructor: "Tom Rodriguez",
  // },
]

let currentFilter = "all"
const bootstrap = window.bootstrap // Declare the bootstrap variable

document.addEventListener("DOMContentLoaded", () => {
  // Render initial courses
  console.log("[v0] DOM loaded, rendering courses...")
  renderCourses(coursesData)

  // Category filter buttons
  const categoryButtons = document.querySelectorAll(".category-btn")
  console.log("[v0] Found", categoryButtons.length, "category buttons")

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      categoryButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")
      currentFilter = this.getAttribute("data-category")
      console.log("[v0] Filter changed to:", currentFilter)
      filterAndRenderCourses()
    })
  })
})

function renderCourses(courses) {
  const coursesGrid = document.getElementById("coursesGrid")
  console.log("[v0] Rendering", courses.length, "courses")

  if (!coursesGrid) {
    console.log("[v0] ERROR: coursesGrid element not found!")
    return
  }

  coursesGrid.innerHTML = ""

  courses.forEach((course) => {
    const courseCard = document.createElement("div")
    courseCard.className = "col-lg-4 col-md-6"
    courseCard.innerHTML = `
      <div class="course-card" data-course-id="${course.id}">
        <div class="course-image">
          <img src="${course.image}" alt="${course.name}">
        </div>
        <div class="course-content">
          <h5 class="course-name">Course Name: ${course.name}</h5>
          <p class="course-description">${course.description}</p>
        </div>
      </div>
    `

    // Add click event to open modal
    courseCard.addEventListener("click", () => {
      openCourseModal(course)
    })

    coursesGrid.appendChild(courseCard)
  })
  console.log("[v0] Courses rendered successfully")
}

function filterAndRenderCourses() {
  const filtered =
    currentFilter === "all" ? coursesData : coursesData.filter((course) => course.category === currentFilter)

  renderCourses(filtered)
}

function openCourseModal(course) {
  console.log("[v0] Opening modal for course:", course.name)

  // Populate modal with course data
  document.getElementById("modalCourseImage").src = course.image
  document.getElementById("modalCourseName").textContent = course.name
  document.getElementById("modalCourseDescription").textContent = course.description
  document.getElementById("modalCourseCategory").textContent = course.category
  document.getElementById("modalCourseDuration").textContent = course.duration
  document.getElementById("modalCourseLevel").textContent = course.level
  document.getElementById("modalCourseInstructor").textContent = course.instructor

  // Show modal using Bootstrap's built-in method
  const courseModal = document.getElementById("courseModal")
  const modal = new bootstrap.Modal(courseModal)
  modal.show()
}
