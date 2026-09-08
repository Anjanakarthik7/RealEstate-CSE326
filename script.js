/* =========================================================
   REALESTATE - CORE INTERACTIVE JAVASCRIPT
   ========================================================= */

// Comprehensive Property Database
const PROPERTIES = [
  {
    id: 1,
    title: "Jubilee Hills Luxury Heights",
    type: "apartment",
    status: "sale",
    price: 25000000,
    priceDisplay: "Rs. 2,50,00,000",
    location: "Jubilee Hills, Hyderabad",
    beds: "3 BHK",
    baths: "3 Baths",
    sqft: "2,400 sq.ft",
    image: "apartment1.jpg",
    featured: true,
    agent: "Range Manideep",
    agentPhone: "+(123)-456-7890",
    description: "Experience ultra-luxury living in the heart of Jubilee Hills. Featuring bespoke Italian marble, panoramic city skyline views, private lift access, and round-the-clock smart home automation.",
    amenities: ["Infinity Pool", "24/7 Concierge", "Smart Automation", "3 Covered Parkings", "Clubhouse", "Fitness Center"]
  },
  {
    id: 2,
    title: "Banjara Skyline Modern Suites",
    type: "apartment",
    status: "rent",
    price: 15000,
    priceDisplay: "Rs. 15,000 / mo",
    location: "Banjara Hills, Hyderabad",
    beds: "2 BHK",
    baths: "2 Baths",
    sqft: "1,150 sq.ft",
    image: "apartment2.jpg",
    featured: true,
    agent: "Burra buttu Teja",
    agentPhone: "+(754)-764-6324",
    description: "Sleek and contemporary urban residence perfect for professionals and young families. Fully modular kitchen, high-speed fiber connectivity, and close proximity to top tier cafes and business parks.",
    amenities: ["Modular Kitchen", "Power Backup", "High-speed Elevators", "Children's Play Area", "24/7 Security"]
  },
  {
    id: 3,
    title: "Manhattan Crown Luxury Villa",
    type: "villa",
    status: "rent",
    price: 60000,
    priceDisplay: "Rs. 60,000 / mo",
    location: "Manhattan, New York, USA",
    beds: "4 BHK",
    baths: "4 Baths",
    sqft: "3,800 sq.ft",
    image: "villa3.jpg",
    featured: true,
    agent: "Attagadu Aakash",
    agentPhone: "+(657)-675-6421",
    description: "An architectural marvel boasting floor-to-ceiling glass, heated plunge pool, private rooftop terrace, and custom wine cellar in prime Manhattan.",
    amenities: ["Private Rooftop", "Plunge Pool", "Wine Cellar", "Gourmet Kitchen", "Private Garage", "Central HVAC"]
  },
  {
    id: 4,
    title: "Lakshadweep Azure Private Island",
    type: "island",
    status: "sale",
    price: 500000000,
    priceDisplay: "Rs. 50,00,00,000",
    location: "Lakshadweep Archipelago, India",
    beds: "6+ BHK",
    baths: "7 Baths",
    sqft: "15 Acres",
    image: "island4.jpg",
    featured: true,
    agent: "Supreme Yaskin",
    agentPhone: "+(658)-546-8705",
    description: "Rare opportunity to own an exclusive private island paradise. White sand beaches, private helipad, solar microgrid, deep-water yacht marina, and luxury eco-villas.",
    amenities: ["Private Helipad", "Yacht Marina", "White Sand Beach", "Solar Microgrid", "Staff Quarters", "Seaplane Dock"]
  },
  {
    id: 5,
    title: "Green Acres Prime Agricultural Estate",
    type: "land",
    status: "sale",
    price: 8500000,
    priceDisplay: "Rs. 85,00,000",
    location: "Shamshabad Outer Ring, Hyderabad",
    beds: "Plot",
    baths: "Clear Title",
    sqft: "1.5 Acres",
    image: "land5.jpg",
    featured: true,
    agent: "Range Manideep",
    agentPhone: "+(123)-456-7890",
    description: "High-yield fertility farmland with direct expressway road connectivity, borewell infrastructure, perimeter fencing, and immediate clear title documentation.",
    amenities: ["Expressway Access", "Borewell Water", "Gated Boundary", "Solar Fencing", "Clear Documented Title"]
  }
];

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initFavorites();
  initUserSession();
  initPropertyModals();
  initInquiryModal();
  initEMICalculator();
  initContactForms();
  renderPropertiesGrid();
  initSearchAndFilters();
});

/* =========================================================
   NAVIGATION & MOBILE MENU
   ========================================================= */
function initNavbar() {
  const menuBtn = document.getElementById("menu-bars");
  const navbar = document.querySelector(".navbar");
  const header = document.querySelector("header");

  if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("fa-times");
      navbar.classList.toggle("open");
    });

    document.querySelectorAll(".navbar a").forEach(link => {
      link.addEventListener("click", () => {
        menuBtn.classList.remove("fa-times");
        navbar.classList.remove("open");
      });
    });

    // Close on click outside
    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target) && !menuBtn.contains(e.target) && navbar.classList.contains("open")) {
        menuBtn.classList.remove("fa-times");
        navbar.classList.remove("open");
      }
    });
  }

  // Header scroll blur effect
  window.addEventListener("scroll", () => {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });
}

/* =========================================================
   FAVORITES / WISHLIST SYSTEM (localStorage)
   ========================================================= */
function getFavorites() {
  try {
    const favs = localStorage.getItem("realestate_favorites");
    return favs ? JSON.parse(favs) : [];
  } catch (e) {
    return [];
  }
}

function saveFavorites(favs) {
  localStorage.setItem("realestate_favorites", JSON.stringify(favs));
  updateFavoritesCount();
}

function updateFavoritesCount() {
  const favs = getFavorites();
  const badges = document.querySelectorAll(".badge-counter, #fav-count");
  badges.forEach(b => {
    b.textContent = favs.length;
  });
}

function toggleFavorite(propertyId) {
  let favs = getFavorites();
  const id = Number(propertyId);
  const exists = favs.includes(id);

  if (exists) {
    favs = favs.filter(item => item !== id);
    showToast("Property removed from Favorites", "gold");
  } else {
    favs.push(id);
    showToast("Property saved to Favorites!", "success");
  }
  saveFavorites(favs);

  // Update active state on all heart buttons for this property
  document.querySelectorAll(`.card-fav-btn[data-id="${id}"]`).forEach(btn => {
    if (!exists) {
      btn.classList.add("active");
      btn.innerHTML = '<i class="fas fa-heart"></i>';
    } else {
      btn.classList.remove("active");
      btn.innerHTML = '<i class="far fa-heart"></i>';
    }
  });

  // Re-render favorites modal if open
  const favModal = document.getElementById("favoritesModal");
  if (favModal && favModal.classList.contains("open")) {
    renderFavoritesModalContent();
  }
}

function initFavorites() {
  updateFavoritesCount();

  const favBtn = document.getElementById("fav-btn");
  if (favBtn) {
    favBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openFavoritesModal();
    });
  }
}

function openFavoritesModal() {
  const modal = document.getElementById("favoritesModal");
  if (!modal) return;
  renderFavoritesModalContent();
  modal.classList.add("open");
}

function renderFavoritesModalContent() {
  const container = document.getElementById("favoritesModalList");
  if (!container) return;

  const favIds = getFavorites();
  const favProps = PROPERTIES.filter(p => favIds.includes(p.id));

  if (favProps.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px;">
        <i class="far fa-heart" style="font-size: 3rem; color: var(--text-dim); margin-bottom: 16px;"></i>
        <h3 style="font-size: 1.3rem; margin-bottom: 8px;">No Saved Properties Yet</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem;">Browse properties and click the heart icon to save your top picks.</p>
        <a href="properties.html" class="btn btn-primary btn-sm" style="margin-top: 20px;">Browse Properties</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 14px; max-height: 60vh; overflow-y: auto; padding-right: 6px;">
      ${favProps.map(p => `
        <div style="display: flex; gap: 16px; align-items: center; background: rgba(9, 13, 22, 0.7); border: 1px solid var(--border-light); border-radius: 12px; padding: 12px;">
          <img src="${p.image}" alt="${p.title}" style="width: 80px; height: 70px; object-fit: cover; border-radius: 8px;">
          <div style="flex: 1;">
            <h4 style="font-size: 1rem; margin-bottom: 4px;">${p.title}</h4>
            <p style="color: var(--accent-gold); font-weight: 700; font-size: 0.9rem;">${p.priceDisplay}</p>
            <p style="color: var(--text-muted); font-size: 0.75rem;">${p.location}</p>
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <button class="btn btn-primary btn-sm" onclick="showPropertyDetails(${p.id}); closeAllModals();">View</button>
            <button class="btn btn-outline btn-sm" style="color: var(--accent-rose);" onclick="toggleFavorite(${p.id})">Remove</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/* =========================================================
   USER SESSION SIMULATION (localStorage)
   ========================================================= */
function initUserSession() {
  const userBtn = document.getElementById("user-account-btn");
  const currentUser = localStorage.getItem("realestate_user");

  if (userBtn) {
    if (currentUser) {
      userBtn.innerHTML = `
        <i class="fas fa-user-check" style="color: var(--accent-emerald);"></i>
        <span style="font-size: 0.85rem; font-weight: 600;">${currentUser}</span>
      `;
      userBtn.title = "Logged in as " + currentUser + " (Click to Log Out)";
      userBtn.href = "#";
      userBtn.onclick = (e) => {
        e.preventDefault();
        if (confirm(`Logged in as ${currentUser}. Do you want to sign out?`)) {
          localStorage.removeItem("realestate_user");
          showToast("Successfully logged out.", "gold");
          setTimeout(() => location.reload(), 800);
        }
      };
    } else {
      userBtn.title = "Sign In / Register";
    }
  }
}

/* =========================================================
   PROPERTY CARDS RENDERING & FILTERING
   ========================================================= */
function createPropertyCardHTML(p) {
  const favs = getFavorites();
  const isFav = favs.includes(p.id);

  return `
    <div class="property-card" data-type="${p.type}" data-status="${p.status}" data-price="${p.price}" data-id="${p.id}">
      <div class="card-image-wrap">
        <span class="property-badge ${p.status === 'sale' ? 'badge-sale' : 'badge-rent'}">
          For ${p.status === 'sale' ? 'Sale' : 'Rent'}
        </span>
        <button class="card-fav-btn ${isFav ? 'active' : ''}" data-id="${p.id}" onclick="toggleFavorite(${p.id})" title="Save to Favorites">
          <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
        </button>
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <div class="card-overlay-stats">
          <span class="badge-counter-sm"><i class="fas fa-camera"></i> 8</span>
          <span class="badge-counter-sm"><i class="fas fa-film"></i> 2</span>
        </div>
      </div>

      <div class="card-body">
        <div class="card-location">
          <i class="fas fa-map-marker-alt"></i>
          <span>${p.location}</span>
        </div>
        <h3 class="card-title">${p.title}</h3>

        <div class="card-specs">
          <span class="spec-item"><i class="fas fa-bed"></i> ${p.beds}</span>
          <span class="spec-item"><i class="fas fa-bath"></i> ${p.baths}</span>
          <span class="spec-item"><i class="fas fa-vector-square"></i> ${p.sqft}</span>
        </div>

        <div class="card-footer">
          <div class="card-price">
            <span class="price-label">Price</span>
            <span class="price-val">${p.priceDisplay}</span>
          </div>
          <div class="card-actions">
            <button class="btn btn-outline btn-sm" onclick="openInquiryModal('${p.title.replace(/'/g, "\\'")}', '${p.agent}')">Inquire</button>
            <button class="btn btn-primary btn-sm" onclick="showPropertyDetails(${p.id})">Details</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderPropertiesGrid() {
  const container = document.getElementById("properties-container");
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const typeFilter = urlParams.get("type");
  const statusFilter = urlParams.get("status");

  let filtered = PROPERTIES;
  if (typeFilter) {
    filtered = filtered.filter(p => p.type.toLowerCase() === typeFilter.toLowerCase());
  }
  if (statusFilter) {
    filtered = filtered.filter(p => p.status.toLowerCase() === statusFilter.toLowerCase());
  }

  container.innerHTML = filtered.map(createPropertyCardHTML).join('');
}

function initSearchAndFilters() {
  // Filter chips on properties page & home page
  const chips = document.querySelectorAll(".chip-btn");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const filter = chip.dataset.filter;
      filterPropertiesByTag(filter);
    });
  });

  // Live search input on properties page
  const searchInput = document.getElementById("propertySearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      const cards = document.querySelectorAll(".property-card");
      cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(q) ? "flex" : "none";
      });
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById("propertySortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      const val = e.target.value;
      const container = document.getElementById("properties-container");
      if (!container) return;

      let list = [...PROPERTIES];
      if (val === "price-asc") list.sort((a, b) => a.price - b.price);
      else if (val === "price-desc") list.sort((a, b) => b.price - a.price);

      container.innerHTML = list.map(createPropertyCardHTML).join('');
    });
  }

  // Hero search form handling
  const heroSearchForm = document.getElementById("heroSearchForm");
  if (heroSearchForm) {
    heroSearchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const statusBtn = document.querySelector(".search-tabs .tab-btn.active");
      const status = statusBtn ? statusBtn.dataset.tab : "all";
      const type = document.getElementById("heroPropType")?.value || "";
      const city = document.getElementById("heroCity")?.value || "";

      // Redirect to properties.html with search parameters
      let url = `properties.html?status=${encodeURIComponent(status)}`;
      if (type) url += `&type=${encodeURIComponent(type)}`;
      if (city) url += `&city=${encodeURIComponent(city)}`;
      window.location.href = url;
    });
  }

  // Tab buttons in search card
  const tabBtns = document.querySelectorAll(".search-tabs .tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

function filterPropertiesByTag(filter) {
  const cards = document.querySelectorAll(".property-card");
  cards.forEach(card => {
    if (filter === "all") {
      card.style.display = "flex";
    } else if (filter === "sale" || filter === "rent") {
      card.style.display = card.dataset.status === filter ? "flex" : "none";
    } else {
      card.style.display = card.dataset.type === filter ? "flex" : "none";
    }
  });
}

/* =========================================================
   PROPERTY DETAILS MODAL
   ========================================================= */
function initPropertyModals() {
  document.querySelectorAll(".modal-backdrop").forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeAllModals();
      }
    });
  });

  document.querySelectorAll(".modal-close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      closeAllModals();
    });
  });
}

function showPropertyDetails(id) {
  const p = PROPERTIES.find(item => item.id === Number(id));
  if (!p) return;

  const modal = document.getElementById("propertyDetailsModal");
  const content = document.getElementById("propertyDetailsContent");
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="margin-bottom: 20px; border-radius: 12px; overflow: hidden; height: 260px; position: relative;">
      <img src="${p.image}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;">
      <span class="property-badge ${p.status === 'sale' ? 'badge-sale' : 'badge-rent'}" style="position: absolute; top: 16px; left: 16px;">
        For ${p.status === 'sale' ? 'Sale' : 'Rent'}
      </span>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
      <div>
        <h2 style="font-size: 1.6rem; margin-bottom: 4px;">${p.title}</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem;"><i class="fas fa-map-marker-alt text-gold"></i> ${p.location}</p>
      </div>
      <div style="text-align: right;">
        <span style="display: block; font-size: 0.8rem; color: var(--text-dim); text-transform: uppercase;">Offer Price</span>
        <span style="font-size: 1.6rem; font-weight: 800; color: var(--accent-gold); font-family: var(--font-heading);">${p.priceDisplay}</span>
      </div>
    </div>

    <div class="card-specs" style="padding: 16px 0; margin-bottom: 20px;">
      <span class="spec-item"><i class="fas fa-bed"></i> <strong>Bedrooms:</strong> &nbsp;${p.beds}</span>
      <span class="spec-item"><i class="fas fa-bath"></i> <strong>Bathrooms:</strong> &nbsp;${p.baths}</span>
      <span class="spec-item"><i class="fas fa-vector-square"></i> <strong>Area:</strong> &nbsp;${p.sqft}</span>
    </div>

    <div style="margin-bottom: 24px;">
      <h4 style="font-size: 1.1rem; margin-bottom: 8px;">Property Overview</h4>
      <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.7;">${p.description}</p>
    </div>

    <div style="margin-bottom: 24px;">
      <h4 style="font-size: 1.1rem; margin-bottom: 12px;">Premium Amenities</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${p.amenities.map(a => `<span style="background: rgba(59, 130, 246, 0.12); border: 1px solid rgba(59, 130, 246, 0.25); color: #93c5fd; padding: 5px 12px; border-radius: 20px; font-size: 0.82rem; font-weight: 600;"><i class="fas fa-check-circle" style="color: var(--accent-emerald);"></i> ${a}</span>`).join('')}
      </div>
    </div>

    <div style="background: rgba(9, 13, 22, 0.7); border: 1px solid var(--border-light); border-radius: 12px; padding: 18px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
      <div>
        <span style="font-size: 0.8rem; color: var(--text-dim); text-transform: uppercase;">Listing Agent</span>
        <h4 style="font-size: 1.05rem;">${p.agent}</h4>
        <p style="color: var(--text-muted); font-size: 0.85rem;"><i class="fas fa-phone-alt"></i> ${p.agentPhone}</p>
      </div>
      <div style="display: flex; gap: 10px;">
        <button class="btn btn-outline btn-sm" onclick="toggleFavorite(${p.id})"><i class="fas fa-heart"></i> Save</button>
        <button class="btn btn-gold btn-sm" onclick="closeAllModals(); openInquiryModal('${p.title.replace(/'/g, "\\'")}', '${p.agent}');">Request Private Tour</button>
      </div>
    </div>
  `;

  modal.classList.add("open");
}

/* =========================================================
   INQUIRY MODAL & FORM
   ========================================================= */
function initInquiryModal() {
  const form = document.getElementById("inquiryForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const propTitle = document.getElementById("inquiryPropertyTitle").value;
      const name = document.getElementById("inquiryName").value;
      const phone = document.getElementById("inquiryPhone").value;

      closeAllModals();
      showToast(`Thank you, ${name}! Your inquiry for "${propTitle}" has been received. Our agent will call you at ${phone}.`, "success");
      form.reset();
    });
  }
}

function openInquiryModal(propTitle, agentName) {
  const modal = document.getElementById("inquiryModal");
  if (!modal) return;

  const titleField = document.getElementById("inquiryPropertyTitle");
  const agentNote = document.getElementById("inquiryAgentNote");

  if (titleField) titleField.value = propTitle || "General Property Inquiry";
  if (agentNote) agentNote.textContent = agentName ? `Assigned Agent: ${agentName}` : "";

  modal.classList.add("open");
}

function closeAllModals() {
  document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.remove("open"));
}

/* =========================================================
   MORTGAGE / EMI CALCULATOR
   ========================================================= */
function initEMICalculator() {
  const amountSlider = document.getElementById("calcAmount");
  const rateSlider = document.getElementById("calcRate");
  const tenureSlider = document.getElementById("calcTenure");

  if (!amountSlider || !rateSlider || !tenureSlider) return;

  const updateCalculation = () => {
    const P = parseFloat(amountSlider.value);
    const R = parseFloat(rateSlider.value) / 12 / 100;
    const N = parseFloat(tenureSlider.value) * 12;

    // Display badges
    const amountBadge = document.getElementById("calcAmountBadge");
    const rateBadge = document.getElementById("calcRateBadge");
    const tenureBadge = document.getElementById("calcTenureBadge");

    if (amountBadge) amountBadge.textContent = "Rs. " + (P >= 10000000 ? (P / 10000000).toFixed(2) + " Cr" : (P / 100000).toFixed(1) + " Lakhs");
    if (rateBadge) rateBadge.textContent = rateSlider.value + " %";
    if (tenureBadge) tenureBadge.textContent = tenureSlider.value + " Years";

    // EMI calculation: [P * R * (1+R)^N] / [(1+R)^N - 1]
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    const emiElem = document.getElementById("calcEmiResult");
    const interestElem = document.getElementById("calcTotalInterest");
    const totalElem = document.getElementById("calcTotalPayment");

    if (emiElem && !isNaN(emi)) emiElem.textContent = "Rs. " + Math.round(emi).toLocaleString("en-IN");
    if (interestElem && !isNaN(totalInterest)) interestElem.textContent = "Rs. " + Math.round(totalInterest).toLocaleString("en-IN");
    if (totalElem && !isNaN(totalPayment)) totalElem.textContent = "Rs. " + Math.round(totalPayment).toLocaleString("en-IN");
  };

  amountSlider.addEventListener("input", updateCalculation);
  rateSlider.addEventListener("input", updateCalculation);
  tenureSlider.addEventListener("input", updateCalculation);

  updateCalculation();
}

/* =========================================================
   CONTACT FORMS & NEWSLETTER
   ========================================================= */
function initContactForms() {
  const contactForm = document.getElementById("contactUsForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('input[placeholder="name"]')?.value || "Valued Client";
      showToast(`Thank you, ${name}! Your message has been sent to our prime brokerage desk.`, "success");
      contactForm.reset();
    });
  }

  const newsletterForms = document.querySelectorAll(".newsletter-form");
  newsletterForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        showToast("Subscribed! You will receive exclusive luxury market reports.", "gold");
        emailInput.value = "";
      }
    });
  });
}

/* =========================================================
   TOAST NOTIFICATION ENGINE
   ========================================================= */
function showToast(message, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let icon = "fa-check-circle";
  if (type === "error") icon = "fa-exclamation-circle";
  if (type === "gold") icon = "fa-bell";

  toast.innerHTML = `
    <i class="fas ${icon}" style="font-size: 1.2rem; color: ${type === 'gold' ? 'var(--accent-gold)' : type === 'error' ? 'var(--accent-rose)' : 'var(--accent-emerald)'};"></i>
    <div style="font-size: 0.9rem; color: #fff; line-height: 1.4;">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(40px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
