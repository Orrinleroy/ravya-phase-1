// Form Validation and Submission
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm")
  const loginForm = document.getElementById("loginForm")

  // Sign Up Form Handler
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const fullName = document.getElementById("fullName").value
      const email = document.getElementById("signupEmail").value
      const password = document.getElementById("signupPassword").value
      const confirmPassword = document.getElementById("confirmPassword").value
      const agreeTerms = document.getElementById("agreeTerms").checked

      // Validation
      if (!fullName.trim()) {
        showAlert("Please enter your full name", "error")
        return
      }

      if (!isValidEmail(email)) {
        showAlert("Please enter a valid email address", "error")
        return
      }

      if (password.length < 8) {
        showAlert("Password must be at least 8 characters long", "error")
        return
      }

      if (password !== confirmPassword) {
        showAlert("Passwords do not match", "error")
        return
      }

      if (!agreeTerms) {
        showAlert("Please agree to the Terms and Conditions", "error")
        return
      }

      // If all validations pass
      showAlert("Account created successfully!", "success")
      console.log("[v0] Sign up successful:", { fullName, email })

      // Reset form
      signupForm.reset()

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "login.html"
      }, 2000)
    })
  }

  // Login Form Handler
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("loginEmail").value
      const password = document.getElementById("loginPassword").value
      const rememberMe = document.getElementById("rememberMe").checked

      // Validation
      if (!isValidEmail(email)) {
        showAlert("Please enter a valid email address", "error")
        return
      }

      if (!password) {
        showAlert("Please enter your password", "error")
        return
      }

      // If all validations pass
      showAlert("Logged in successfully!", "success")
      console.log("[v0] Login successful:", { email, rememberMe })

      // Reset form
      loginForm.reset()

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "index.html"
      }, 2000)
    })
  }

  // Forgot Password Handler
  const forgotPasswordLink = document.querySelector(".forgot-password")
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", (e) => {
      e.preventDefault()
      showAlert("Password reset link has been sent to your email", "success")
    })
  }
})

// Email Validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Alert Function
function showAlert(message, type) {
  // Create alert element
  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type === "error" ? "danger" : "success"} alert-dismissible fade show`
  alertDiv.setAttribute("role", "alert")
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `

  // Add to page
  const container = document.querySelector(".container")
  container.insertBefore(alertDiv, container.firstChild)

  // Auto-close after 5 seconds
  setTimeout(() => {
    alertDiv.remove()
  }, 5000)
}
