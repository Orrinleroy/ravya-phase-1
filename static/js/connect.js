// Sample data for feed items
const feedItems = [
  {
    id: 1,
    name: "Social Media Management Package",
    category: "service",
    description:
      "Professional social media management for small businesses. Includes content creation, posting, and engagement management across all major platforms.",
    price: "$500/month",
    providerName: "Sarah Johnson",
    providerEmail: "sarah.johnson@email.com",
    providerPhone: "+1-234-567-8900",
    providerLinkedin: "https://linkedin.com/in/sarahjohnson",
  },
  {
    id: 2,
    name: "E-commerce Website Development",
    category: "service",
    description:
      "Build your online store with modern design and secure payment integration. Includes product catalog, inventory management, and analytics.",
    price: "$2000 - $5000",
    providerName: "Alex Chen",
    providerEmail: "alex.chen@email.com",
    providerPhone: "+1-234-567-8901",
    providerLinkedin: "https://linkedin.com/in/alexchen",
  },
  {
    id: 3,
    name: "Digital Marketing Consultation",
    category: "consulting",
    description:
      "Expert consultation on digital marketing strategies. Learn how to build brand awareness, drive traffic, and convert leads into customers.",
    price: "$150/hour",
    providerName: "Emma Williams",
    providerEmail: "emma.williams@email.com",
    providerPhone: "+1-234-567-8902",
    providerLinkedin: "https://linkedin.com/in/emmawilliams",
  },
  {
    id: 4,
    name: "Organic Coffee Blend",
    category: "product",
    description:
      "Premium organic coffee blend from sustainable farms. Medium roast with notes of chocolate and nuts. Perfect for coffee enthusiasts.",
    price: "$25/bag",
    providerName: "James Brown",
    providerEmail: "james.brown@email.com",
    providerPhone: "+1-234-567-8903",
    providerLinkedin: "https://linkedin.com/in/jamesbrown",
  },
  {
    id: 5,
    name: "Business Plan Writing Service",
    category: "service",
    description:
      "Comprehensive business plan development with market analysis, financial projections, and executive summary for startups and existing businesses.",
    price: "$1500",
    providerName: "Michael Roberts",
    providerEmail: "michael.roberts@email.com",
    providerPhone: "+1-234-567-8904",
    providerLinkedin: "https://linkedin.com/in/michaelroberts",
  },
  {
    id: 6,
    name: "Brand Identity Design",
    category: "service",
    description:
      "Complete brand identity package including logo design, color palette, typography, and brand guidelines. Stand out from your competition.",
    price: "$1200",
    providerName: "Lisa Anderson",
    providerEmail: "lisa.anderson@email.com",
    providerPhone: "+1-234-567-8905",
    providerLinkedin: "https://linkedin.com/in/lisaanderson",
  },
  {
    id: 7,
    name: "Financial Planning Workshop",
    category: "consulting",
    description:
      "Learn personal and business financial planning from certified advisors. Topics include budgeting, investment strategies, and tax optimization.",
    price: "$75/person",
    providerName: "David Miller",
    providerEmail: "david.miller@email.com",
    providerPhone: "+1-234-567-8906",
    providerLinkedin: "https://linkedin.com/in/davidmiller",
  },
  {
    id: 8,
    name: "Eco-Friendly Packaging Solutions",
    category: "product",
    description:
      "Sustainable packaging materials for businesses. Biodegradable boxes, bags, and eco-friendly packing materials. Bulk orders available.",
    price: "Contact for pricing",
    providerName: "Rachel Green",
    providerEmail: "rachel.green@email.com",
    providerPhone: "+1-234-567-8907",
    providerLinkedin: "https://linkedin.com/in/rachelgreen",
  },
]

// Import Bootstrap
const bootstrap = window.bootstrap

// Initialize the feed
document.addEventListener("DOMContentLoaded", () => {
  renderFeed(feedItems)
  setupCategoryFilters()
  setupPostForm()
})

// Render feed items
function renderFeed(items) {
  const feedContainer = document.getElementById("feedContainer")
  feedContainer.innerHTML = ""

  if (items.length === 0) {
    feedContainer.innerHTML = `
      <div class="col-12">
        <div class="empty-feed">
          <div class="empty-feed-icon">📭</div>
          <h4>No items found</h4>
          <p>Be the first to post something amazing!</p>
          <button class="btn btn-signup" data-bs-toggle="modal" data-bs-target="#postModal">
            Post Your Item
          </button>
        </div>
      </div>
    `
    return
  }

  items.forEach((item) => {
    const card = createFeedCard(item)
    feedContainer.innerHTML += card
  })

  // Add click handlers to cards
  document.querySelectorAll(".feed-card").forEach((card) => {
    card.addEventListener("click", function () {
      const itemId = this.getAttribute("data-item-id")
      const item = items.find((i) => i.id === Number.parseInt(itemId))
      if (item) {
        openItemDetailsModal(item)
      }
    })
  })
}

// Create feed card HTML
function createFeedCard(item) {
  const initials = item.providerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return `
    <div class="col-lg-6 col-md-12">
      <div class="feed-card" data-item-id="${item.id}">
        <div class="feed-card-header">
          <div>
            <span class="feed-card-category">${item.category}</span>
            <h4 class="feed-card-title">${item.name}</h4>
            <div class="feed-card-rating">⭐⭐⭐⭐⭐ Verified</div>
          </div>
        </div>
        <div class="feed-card-body">
          <p class="feed-card-description">${item.description}</p>
          <div class="feed-card-price">${item.price}</div>
          <div class="feed-card-provider">
            <div class="provider-avatar-small">${initials}</div>
            <div class="provider-info-small">
              <p class="provider-name-small">${item.providerName}</p>
              <p class="provider-email-small">${item.providerEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

// Setup category filters
function setupCategoryFilters() {
  const categoryButtons = document.querySelectorAll(".category-btn")

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      categoryButtons.forEach((btn) => btn.classList.remove("active"))
      this.classList.add("active")

      const category = this.getAttribute("data-category")
      const filtered = category === "all" ? feedItems : feedItems.filter((item) => item.category === category)

      renderFeed(filtered)
    })
  })
}

// Open item details modal
function openItemDetailsModal(item) {
  const initials = item.providerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  document.getElementById("modalItemTitle").textContent = item.name
  document.getElementById("modalItemCategory").textContent =
    item.category.charAt(0).toUpperCase() + item.category.slice(1)
  document.getElementById("modalItemName").textContent = item.name
  document.getElementById("modalItemDescription").textContent = item.description
  document.getElementById("modalItemPrice").textContent = item.price

  document.getElementById("modalProviderAvatar").textContent = initials
  document.getElementById("modalProviderName").textContent = item.providerName
  document.getElementById("modalProviderEmail").textContent = item.providerEmail

  // Setup contact badges
  const phoneContact = document.getElementById("modalProviderPhone")
  const linkedinContact = document.getElementById("modalProviderLinkedin")

  if (item.providerPhone) {
    phoneContact.innerHTML = `📞 ${item.providerPhone}`
    phoneContact.style.cursor = "pointer"
    phoneContact.onclick = () => (window.location.href = `tel:${item.providerPhone}`)
  } else {
    phoneContact.style.display = "none"
  }

  if (item.providerLinkedin) {
    linkedinContact.innerHTML = `🔗 View Profile`
    linkedinContact.style.cursor = "pointer"
    linkedinContact.onclick = () => window.open(item.providerLinkedin, "_blank")
  } else {
    linkedinContact.style.display = "none"
  }

  // Setup contact provider button
  const contactBtn = document.getElementById("contactProviderBtn")
  contactBtn.href = `mailto:${item.providerEmail}?subject=Interested in ${item.name}`

  // Show modal
  const modal = new bootstrap.Modal(document.getElementById("itemDetailsModal"))
  modal.show()
}

// Setup post form
function setupPostForm() {
  const submitBtn = document.getElementById("submitPostBtn")
  const postForm = document.getElementById("postForm")

  submitBtn.addEventListener("click", () => {
    if (postForm.checkValidity() === false) {
      postForm.classList.add("was-validated")
      return
    }

    const newItem = {
      id: feedItems.length + 1,
      name: document.getElementById("itemName").value,
      category: document.getElementById("itemCategory").value,
      description: document.getElementById("itemDescription").value,
      price: document.getElementById("itemPrice").value || "Contact for pricing",
      providerName: document.getElementById("providerName").value,
      providerEmail: document.getElementById("providerEmail").value,
      providerPhone: document.getElementById("providerPhone").value,
      providerLinkedin: document.getElementById("providerLinkedin").value,
    }

    feedItems.unshift(newItem)
    renderFeed(feedItems)

    // Reset form and close modal
    postForm.reset()
    postForm.classList.remove("was-validated")
    bootstrap.Modal.getInstance(document.getElementById("postModal")).hide()

    // Show success message
    showSuccessMessage("Item posted successfully!")
  })
}

// Show success message
function showSuccessMessage(message) {
  const alert = document.createElement("div")
  alert.className = "alert alert-success alert-dismissible fade show"
  alert.style.cssText = "position: fixed; top: 100px; right: 20px; z-index: 1050; max-width: 300px;"
  alert.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `
  document.body.appendChild(alert)

  setTimeout(() => {
    alert.remove()
  }, 5000)
}
