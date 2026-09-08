# 🏙️ RealEstate — Premier Luxury Living & Investment Portal

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive Design](https://img.shields.io/badge/Responsive-Mobile_First-success?style=for-the-badge)]()
[![GitHub Pages Ready](https://img.shields.io/badge/GitHub_Pages-Ready-blue?style=for-the-badge&logo=github)]()

A modern, responsive, and commercial-grade Real Estate web application built with Vanilla HTML5, CSS3 (Glassmorphism & CSS Custom Properties), and interactive JavaScript. Designed for high-impact visual appeal, rapid performance, and frictionless user experience across desktop, tablet, and mobile devices.

---

## ✨ Features Overview

### 1. 🌟 Flagship Portal Landing (`index.html`)
- **Hero Quick Search**: Search properties by Location, Property Type (Apartment, Villa, Island, Land), Bedrooms (1-4+ BHK), and Budget with tab switching (All / For Sale / For Rent).
- **Key Metrics Bar**: Highlighting verified listings, transacted value, happy families, and satisfaction rates.
- **Dynamic Property Showcase**: Handpicked portfolio cards with high-resolution imagery, pricing, and specifications.
- **Interactive Mortgage / EMI Calculator**: Real-time loan repayment slider calculating monthly EMI, total interest, and total payable amounts.
- **Specialist Agent Showcase**: Direct call, email, and social connectivity.
- **Client Testimonials**: Verified ratings and reviews.
- **Newsletter Subscription**: Instant toast notification feedback.

### 2. 🔍 Interactive Properties Catalog (`properties.html`)
- **Live Search**: Instant client-side text search across property titles, locations, and BHK configurations.
- **Category Filter Chips**: Filter on-the-fly by All, For Sale, For Rent, Apartments, Villas, Islands, and Farmland.
- **Sort Control**: Sort properties by price (Low-to-High, High-to-Low) or featured priority.
- **Interactive Quick-View Modal**: Displays high-resolution gallery, amenities checklist, detailed architectural overview, and direct inquiry actions.

### 3. ❤️ Favorites & Wishlist System
- Saved items persist across page refreshes and browser tabs using `localStorage`.
- Heart counter badge in header updates dynamically in real-time.
- Interactive slide-out Favorites Drawer allows users to view and manage their saved properties.

### 4. 💼 Concierge Services & Workflow (`services.html`)
- Structured breakdown of core offerings: Home Buying, Executive Leasing, Divestment, Legal Due Diligence, and Island/Coastal Advisory.
- Three-step "How It Works" roadmap (Private Discovery → Curated Previews → Frictionless Closing).
- Direct consultation booking trigger.

### 5. 👔 Professional Agents Directory (`agent.html`)
- Full profiles with closed transaction stats, client satisfaction ratings, and specialization badges.
- Direct click-to-call (`tel:`) and click-to-email (`mailto:`) actions.
- Integrated "Book Private Consultation" appointment modal.

### 6. 📍 Contact & Support Desk (`contact.html`)
- Validated direct contact form with animated confirmation toasts.
- Interactive Google Maps embed with office directions.
- Comprehensive FAQ accordion addressing title verification, NRI purchases, and tour scheduling.

### 7. 🔐 User Session Simulation (`login.html` & `login2.html`)
- Modern glassmorphic authentication cards.
- Client-side validation for mandatory fields, 10-digit phone verification, and matching passwords.
- Password visibility show/hide toggle.
- Simulates user login state via `localStorage`, displaying active user badge and logout functionality in the header.

---

## 📁 Repository Structure

```text
RealEstate-CSE326-main/
├── index.html           # Flagship homepage & portal landing
├── properties.html      # Properties catalog with live search & filters
├── services.html        # Concierge services & workflow
├── agent.html           # Licensed real estate advisors directory
├── contact.html         # Contact desk, FAQs & Google Maps
├── login.html           # User registration / Sign Up page
├── login2.html          # User sign in / Login page
├── style.css            # Unified luxury design system & responsive media queries
├── script.js            # Core interactive engine (search, modals, EMI, favorites)
├── login.js             # Sign up validation & session management
├── login2.js            # Sign in validation & session management
├── .gitignore           # Ignores OS, IDE, and temporary files
├── README.md            # Comprehensive project documentation
└── *.jpg                # High-resolution property and agent assets
```

---

## 🚀 Getting Started Locally

This project requires **zero dependencies or build steps**. It runs directly in any modern web browser.

### Option 1: Direct File Open
Simply double-click `index.html` in your file explorer to launch the website.

### Option 2: Live Server (VS Code / Python)
For the best experience with smooth module loading:

```bash
# Using Python 3 built-in server
python -m http.server 8080

# Then open http://localhost:8080 in your browser
```

---

## 🌐 Deploying to GitHub & GitHub Pages

Follow these step-by-step instructions to push this project to GitHub and host it live for free on GitHub Pages:

### Step 1: Initialize Git in the Project Folder
Open your terminal or PowerShell **inside this project directory**:
```bash
# Verify you are in the project folder
cd "c:\Users\Karth\Downloads\RealEstate-CSE326-main\RealEstate-CSE326-main"

# Initialize git repository
git init

# Stage all files
git add .

# Create initial commit
git commit -m "feat: complete modern real estate website with interactive features"
```

### Step 2: Push to GitHub
```bash
git branch -M main
git remote add origin https://github.com/Anjanakarthik7/RealEstate-CSE326.git
git push -u origin main
```

### Step 3: Enable Free Live Hosting on GitHub Pages
1. On GitHub, navigate to your repository's [Settings](https://github.com/Anjanakarthik7/RealEstate-CSE326/settings) tab.
2. In the left sidebar, click on **Pages**.
3. Under **Branch**, select `main` and keep the folder set to `/ (root)`.
4. Click **Save**.
5. Within 1-2 minutes, your website will be live at:
   `https://anjanakarthik7.github.io/RealEstate-CSE326/`

---

## 🛠️ Built With

- **HTML5**: Semantic document layout and SEO-friendly metadata.
- **Vanilla CSS3**: CSS Custom Properties (Variables), Flexbox, CSS Grid, Glassmorphism backdrop filters, and responsive media queries.
- **Vanilla JavaScript (ES6+)**: `localStorage` state persistence, dynamic DOM manipulation, real-time EMI loan calculation, and toast notification engine.
- **Font Awesome 6**: Vector icons for actions, amenities, and social media.
- **Google Fonts**: Outfit & Plus Jakarta Sans for luxury typography.

---

## 📄 License & Credits

Developed as part of CSE326 Web Development coursework. Designed with luxury modern aesthetics and production-ready code standards.
