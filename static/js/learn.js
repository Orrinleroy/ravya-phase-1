// Sample course data with multiple classes/lessons
const courseData = {
  courseId: 1,
  courseName: "Business Fundamentals",
  classes: [
    {
      id: 1,
      number: 1,
      title: "Introduction to Business Fundamentals",
      duration: "45 minutes",
      instructor: "Sarah Johnson",
      level: "Beginner",
      description:
        "Learn the fundamentals of business in this comprehensive introductory course. We'll cover key concepts that every entrepreneur should know.",
      videoThumbnail: "/static/img/thumbnail1.jpg",
    },
    {
      id: 2,
      number: 2,
      title: "Understanding Market Research",
      duration: "52 minutes",
      instructor: "Sarah Johnson",
      level: "Beginner",
      description:
        "Discover how to conduct effective market research to understand your target audience and competition.",
      videoThumbnail: "/static/img/thumbnail2.jpg",
    },
    {
      id: 3,
      number: 3,
      title: "Building a Business Plan",
      duration: "58 minutes",
      instructor: "Michael Chen",
      level: "Beginner",
      description: "Learn how to create a comprehensive business plan that will guide your entrepreneurial journey.",
      videoThumbnail: "/static/img/thumbnail3.jpg",
    },
    {
      id: 4,
      number: 4,
      title: "Financial Management Basics",
      duration: "50 minutes",
      instructor: "Emily Rodriguez",
      level: "Intermediate",
      description:
        "Master the essentials of financial management including budgeting, cash flow, and financial projections.",
      videoThumbnail: "/images/image.png",
    },
    {
      id: 5,
      number: 5,
      title: "Marketing Your Business",
      duration: "55 minutes",
      instructor: "David Park",
      level: "Intermediate",
      description:
        "Explore effective marketing strategies to promote your business and attract customers in the digital age.",
      videoThumbnail: "/images/image.png",
    },
    {
      id: 6,
      number: 6,
      title: "Scaling Your Business",
      duration: "60 minutes",
      instructor: "Sarah Johnson",
      level: "Advanced",
      description: "Learn strategies to scale your business and achieve sustainable growth while maintaining quality.",
      videoThumbnail: "/images/image.png",
    },
  ],
}

let currentClassIndex = 0

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  renderClassesList()
  loadClass(0)
  setupVideoControls()
})

// Render the classes list
function renderClassesList() {
  const classesList = document.getElementById("classesList")
  classesList.innerHTML = ""

  courseData.classes.forEach((classItem, index) => {
    const classElement = document.createElement("div")
    classElement.className = `class-item ${index === 0 ? "active" : ""}`
    classElement.onclick = () => switchClass(index)

    classElement.innerHTML = `
      <div class="class-number">Class ${classItem.number}</div>
      <div class="class-name">${classItem.title}</div>
      <div class="class-duration">${classItem.duration}</div>
    `

    classesList.appendChild(classElement)
  })
}

// Load a specific class
function loadClass(index) {
  if (index < 0 || index >= courseData.classes.length) return

  currentClassIndex = index
  const classItem = courseData.classes[index]

  // Update video thumbnail
  document.getElementById("videoThumbnail").src = classItem.videoThumbnail

  // Update lesson info
  document.getElementById("lessonTitle").textContent = classItem.title
  document.getElementById("instructorName").textContent = classItem.instructor
  document.getElementById("lessonDuration").textContent = classItem.duration
  document.getElementById("lessonLevel").textContent = classItem.level
  document.getElementById("lessonDescription").textContent = classItem.description

  // Update active class in sidebar
  const classItems = document.querySelectorAll(".class-item")
  classItems.forEach((item, idx) => {
    item.classList.toggle("active", idx === index)
  })

  // Scroll to active item in sidebar
  classItems[index].scrollIntoView({ behavior: "smooth", block: "nearest" })
}

// Switch between classes
function switchClass(index) {
  loadClass(index)
}

// Navigate to next class
function nextClass() {
  if (currentClassIndex < courseData.classes.length - 1) {
    loadClass(currentClassIndex + 1)
  }
}

// Navigate to previous class
function previousClass() {
  if (currentClassIndex > 0) {
    loadClass(currentClassIndex - 1)
  }
}

// Setup video controls
function setupVideoControls() {
  const playBtn = document.getElementById("playBtnLarge")

  if (playBtn) {
    playBtn.addEventListener("click", () => {
      const videoPlayer = document.querySelector(".video-player-large")
      videoPlayer.classList.toggle("playing")

      // Change button appearance when playing
      if (videoPlayer.classList.contains("playing")) {
        console.log("[v0] Video playing for class:", courseData.classes[currentClassIndex].title)
      } else {
        console.log("[v0] Video paused")
      }
    })
  }
}

// Keyboard shortcuts for navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    nextClass()
  } else if (e.key === "ArrowLeft") {
    previousClass()
  }
})
