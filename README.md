# Gayatri Thete — Portfolio Website

A visually exceptional, editorial, modern, and interactive portfolio designed for placements and internship applications.

Built with clean, standard **HTML5, CSS3, and vanilla JavaScript (ES6+)**. Fully optimized for free deployment on **GitHub Pages** with zero build steps, zero paid dependencies, and no node_modules required.

---

## 📁 Repository Structure

```text
gayatri-portfolio/
├── index.html        # Main semantic HTML structure & visual editor interface
├── styles.css        # Editorial design system (typography, CSS artwork, dark/light themes)
├── script.js         # Interactive engine, certificate lightbox, filters, and visual editor
├── content.js        # Single source of truth for all portfolio data
├── assets/           # Profile photo & brand media
│   └── Professional Portrait with Shoulder-Length Waves.png
├── certificates/     # Verified certificates (screenshots & official PDFs)
│   ├── isc2-candidate.png
│   ├── Screenshot 2025-10-13 230525.png
│   ├── Screenshot 2025-10-27 184015.png
│   ├── Screenshot 2025-10-27 184059.png
│   ├── Screenshot 2025-10-27 184230.png
│   ├── CourseAttendance20261023-20-hnnbs3.pdf
│   ├── IBMDesign20260724-21-rbhrqx.pdf
│   ├── IBMDesign20260724-21-v2aejo.pdf
│   └── edunet.pdf
└── README.md         # Deployment and editing documentation
```

---

## 🖼️ Profile Photo

- **Location:** `assets/Professional Portrait with Shoulder-Length Waves.png`
- **Presentation:** Displayed prominently in the Hero section inside an editorial, responsive tech-framed portrait card with interactive floating badges (`CSBS • RSCOE Pune`, `FY CGPA: 9.4`, `AI & Cybersecurity`).
- **To update:** Place your new photo in the `assets/` folder and update the path in `content.js` under `"profilePhoto"`, or use the in-browser Visual Editor.

---

## 📜 Certifications & Interactive Lightbox

All certificates are displayed in a responsive grid in the **Certifications** section:
- **Interactive Lightbox:** Clicking any certificate card opens a high-resolution lightbox view.
- **Keyboard Navigation:** 
  - <kbd>Esc</kbd> to close.
  - <kbd>←</kbd> (Left Arrow) to view the previous certificate.
  - <kbd>→</kbd> (Right Arrow) to view the next certificate.
- **Filters:** Toggle between *All Credentials*, *Certificate Images*, and *Official Documents & Badges*.
- **Authentic Verification:** Direct verification links to Credly badges for Red Hat (RH124 & AD183) and IBM SkillsBuild are linked directly. No fake PDF download links are created for screenshot-only certificates.

### How to Add Future Certificate Images:
1. Save your certificate image (`.png`, `.jpg`, `.jpeg`, or `.webp`) or PDF in the `certificates/` folder (e.g., `certificates/AWS-Cloud-Practitioner.png`).
2. Open `content.js` (or use the in-browser **Visual Editor** under the *Certificates* tab).
3. Add a new certificate entry in the `certificates` array:
   ```javascript
   {
     "id": "cert-new-1",
     "title": "Your Certificate Title",
     "issuer": "Issuing Organization (e.g. AWS / Google / Red Hat)",
     "date": "Month Year",
     "duration": "Course duration or passing score",
     "type": "Professional Certificate",
     "image": "certificates/Your-Certificate-Image.png",
     "link": "https://www.credly.com/badges/...", // Optional verification URL
     "description": "Brief description of the skills and competencies covered."
   }
   ```
4. Refresh your browser preview. The certificate will automatically appear in the grid and join the interactive lightbox gallery!

---

## 🚀 Instant Local Preview

1. **Option A (Direct in Browser):**
   Double-click `index.html` to open it in Chrome, Edge, Safari, or Firefox.

2. **Option B (Local Web Server):**
   Using Python:
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000` in your browser.

---

## ✏️ Easy In-Browser Visual Editing

You do not need to edit code to customize your portfolio. The website comes with a **built-in Visual Editor**:

1. Click the **“✏️ Edit Portfolio”** floating button in the bottom-right corner (or press `Ctrl+E` / `Cmd+E`).
2. **Inline Text Editing:** Click directly on any text on the page (headline, role, location, bio, about me, footer) and type your changes.
3. **Control Center Drawer:** A slide-out panel lets you:
   - **General:** Edit name, role, location, profile photo path, headline, intro, bio, and footer.
   - **Projects:** Update project titles, categories, full descriptions, technical architecture, and tech tags. You can also upload custom thumbnail images.
   - **Certificates:** Edit certificate titles, issuers, dates, image paths, and Credly verification URLs.
   - **Education:** Update colleges, degrees, graduation years, and GPA / percentage scores.
   - **Skills:** Add new technical tools or remove existing ones with category sorting.
   - **Contact & Resume:** Update your email, LinkedIn, GitHub, and set your resume file name.
4. **Export & Save:**
   - Edits are automatically saved in your browser's local memory (`localStorage`) so you won't lose work on page refresh.
   - To make your changes permanent on the live web, click **“⬇ Export content.js”** in the editor drawer.
   - Replace the `content.js` file in your repository with the downloaded file.

---

## 🌐 Free Publishing on GitHub Pages

Publish your portfolio for free in under 3 minutes:

### Initial Deployment:
1. Go to [GitHub.com](https://github.com/) and log in (or sign up).
2. Click **New Repository**.
3. Name the repository:
   - For a personal root domain: `YOUR-USERNAME.github.io` (e.g. `thetegayatri61-code.github.io`).
   - Or name it `portfolio` (will be hosted at `YOUR-USERNAME.github.io/portfolio`).
4. Set the repository to **Public**.
5. Upload all the files and folders (`index.html`, `styles.css`, `script.js`, `content.js`, `README.md`, `assets/`, `certificates/`) directly into the repository root.
6. Open repository **Settings** → **Pages** (in the left sidebar).
7. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: `main` (or `master`), Folder: `/(root)`
   - Click **Save**.
8. Within 1–2 minutes, GitHub will display your live link:
   `https://YOUR-USERNAME.github.io`

### Publishing Updates:
Whenever you edit your portfolio using the visual editor:
1. Click **“⬇ Export content.js”** to download your new content file.
2. Replace `content.js` in your repository on GitHub.
3. GitHub Pages automatically rebuilds and updates your live portfolio within 60 seconds!

---

## 📄 Adding Your Resume (CV)

The portfolio includes a dynamic resume download button that appears **only when a valid resume file or link is configured**:

1. Place your resume PDF in the website folder (e.g. `Gayatri_Thete_Resume.pdf`).
2. In `content.js` (or via the Visual Editor under Contact & CV), set:
   ```javascript
   "contact": {
     "email": "gayatrithete06@gmail.com",
     "github": "https://github.com/thetegayatri61-code",
     "linkedin": "https://www.linkedin.com/in/gayatri-thete-941861301",
     "resume": "Gayatri_Thete_Resume.pdf"
   }
   ```
3. The "Resume" button in the top navigation, "Download CV" in the hero, and "Download Resume" in the contact section will instantly appear and link to your PDF!
4. If `resume` is left empty `""`, the buttons remain cleanly hidden so there are no broken links.

---

## 🛡️ Privacy & Professional Authenticity Notice

- **No fake statistics:** All achievements, grades (FY CGPA: 9.4, HSC: 86.44%, SSC: 94.83%), and project details accurately reflect Gayatri Thete's authentic academic records.
- **No inflated percentages:** Technical skills are presented as an honest toolkit rather than arbitrary percentages.
- **No fabricated verification links:** All Credly badges link to verified public verification credentials.
- **Zero Tracking:** No third-party trackers or external cookies.
