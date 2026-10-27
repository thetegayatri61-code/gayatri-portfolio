/**
 * GAYATRI THETE — PORTFOLIO CORE ENGINE & VISUAL EDITOR
 * Vanilla JavaScript (ES6+), zero external dependencies.
 */

(() => {
  'use strict';

  // 1. STATE & STORAGE MANAGEMENT
  const STORAGE_KEY = 'gayatri_portfolio_custom_content';
  let defaultContent = window.PORTFOLIO_CONTENT || {};
  let content = {};

  // Try loading previously saved in-browser edits from localStorage
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      content = JSON.parse(saved);
      // Migrate old structure if needed
      if (!content.certificates && content.certifications) {
        content.certificates = content.certifications;
      }
    } else {
      content = JSON.parse(JSON.stringify(defaultContent));
    }
  } catch (e) {
    console.warn('Could not access localStorage; using default content.', e);
    content = JSON.parse(JSON.stringify(defaultContent));
  }

  // Ensure certificates array is present
  if (!content.certificates) {
    content.certificates = defaultContent.certificates || defaultContent.certifications || [];
  }

  // DOM Query Helpers
  const $ = (selector, root = document) => (root && typeof root.querySelector === 'function') ? root.querySelector(selector) : null;
  const $$ = (selector, root = document) => (root && typeof root.querySelectorAll === 'function') ? [...root.querySelectorAll(selector)] : [];
  
  // HTML Escape helper
  const esc = (str = '') => {
    return String(str).replace(/[&<>"']/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[c]));
  };

  // Safe URI encoder for file paths with spaces
  const safePath = (path = '') => {
    if (!path) return '';
    return encodeURI(path);
  };

  // Toast Notification System
  const toastEl = $('#toast');
  let toastTimer = null;
  function showToast(message, duration = 3200) {
    if (!toastEl) return;
    toastEl.innerHTML = `<span>✳</span> <span>${message}</span>`;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, duration);
  }

  // Save State to LocalStorage
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  // 2. COMPONENT RENDERERS

  // Update Page Title, Brand, and Profile Photo
  function renderMeta() {
    document.title = `${content.name || 'Gayatri Thete'} — ${content.role || 'Portfolio'}`;
    const brandName = $('#brandName');
    if (brandName) brandName.textContent = content.name || 'Gayatri Thete';
    const brandAvatar = $('#brandAvatar');
    if (brandAvatar) brandAvatar.textContent = content.initials || 'GT';
    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Render Profile Photo in Hero
    const heroProfileImg = $('#heroProfileImg');
    if (heroProfileImg) {
      const photoSrc = content.profilePhoto || 'assets/Professional Portrait with Shoulder-Length Waves.png';
      heroProfileImg.src = safePath(photoSrc);
      heroProfileImg.alt = `${content.name || 'Gayatri Thete'} — ${content.role || 'Portfolio'}`;
    }
  }

  // Render Direct Text Fields (Data-edit elements)
  function renderEditableFields() {
    $$('[data-edit]').forEach(el => {
      const key = el.dataset.edit;
      if (content[key] !== undefined) {
        el.textContent = content[key];
      }
    });
  }

  // Render Resume Action Buttons (Visibility based on content.contact.resume)
  function renderResumeButtons() {
    const resumeUrl = content.contact?.resume?.trim();
    const navResume = $('#navResumeBtn');
    const heroResume = $('#heroResumeBtn');
    const resumeBox = $('#resumeBox');
    const downloadResumeBtn = $('#downloadResumeBtn');

    if (resumeUrl) {
      const encoded = safePath(resumeUrl);
      if (navResume) {
        navResume.href = encoded;
        navResume.style.display = 'inline-flex';
      }
      if (heroResume) {
        heroResume.href = encoded;
        heroResume.style.display = 'inline-flex';
      }
      if (resumeBox) {
        resumeBox.style.display = 'flex';
      }
      if (downloadResumeBtn) {
        downloadResumeBtn.href = encoded;
      }
    } else {
      if (navResume) navResume.style.display = 'none';
      if (heroResume) heroResume.style.display = 'none';
      if (resumeBox) resumeBox.style.display = 'none';
    }
  }

  // Render Ticker Tape Marquee
  function renderTicker() {
    const track = $('#tickerTrack');
    if (!track) return;
    const baseItems = [
      ...(content.interests || []),
      'AI & Machine Learning',
      'Data-Driven Decision Making',
      'System Architecture',
      'Continuous Iteration'
    ];
    // Duplicate for seamless infinite loop
    const combined = [...baseItems, ...baseItems];
    track.innerHTML = combined.map(item => `
      <div class="ticker-item">
        <span>${esc(item)}</span>
        <span class="ticker-sep" aria-hidden="true">✳</span>
      </div>
    `).join('');
  }

  // Render Project Cards with Distinctive Visual Previews
  function renderProjects() {
    const grid = $('#projectGrid');
    if (!grid) return;

    grid.innerHTML = (content.projects || []).map((project, idx) => {
      const id = project.id || `proj-${idx + 1}`;
      const num = project.number || String(idx + 1).padStart(2, '0');
      
      // Distinctive Artwork Generation
      let visualHtml = '';
      if (project.image && project.image.trim() !== '') {
        visualHtml = `<img src="${safePath(project.image)}" alt="${esc(project.title)} Thumbnail" class="custom-thumbnail-img">`;
      } else if (idx === 0) {
        // Project 1 Artwork: AI & Competency Intelligence System
        visualHtml = `
          <div class="art-preview-competency">
            <div class="network-grid"></div>
            <div class="competency-hub">
              <div class="core-badge">
                <span style="color:#D8F36A;">✳</span>
                <span>COMPETENCY INTELLIGENCE CORE</span>
              </div>
              <div class="node-list">
                <span class="node-tag">LinkedIn</span>
                <span class="node-tag">GitHub</span>
                <span class="node-tag">Kaggle</span>
                <span class="node-tag">LeetCode</span>
              </div>
            </div>
          </div>
        `;
      } else {
        // Project 2 Artwork: Digital Legal Metrology Inspection Assistant
        visualHtml = `
          <div class="art-preview-metrology">
            <div class="viewfinder-frame">
              <div class="vf-corner vf-tl"></div>
              <div class="vf-corner vf-tr"></div>
              <div class="vf-corner vf-bl"></div>
              <div class="vf-corner vf-br"></div>
              <div class="vf-scan-line"></div>
              <div class="vf-header">
                <span>[SCANNING_PACKAGE_LABEL]</span>
                <span class="vf-status">OCR ACTIVE</span>
              </div>
              <div class="vf-checklist">
                <div class="vf-item"><b>✓</b> Net Quantity Detected</div>
                <div class="vf-item"><b>✓</b> MRP &amp; Date Verified</div>
                <div class="vf-item"><b>✓</b> Rule Compliance Checked</div>
              </div>
            </div>
          </div>
        `;
      }

      return `
        <article class="project-card" data-project-id="${esc(id)}">
          <div class="project-preview-wrap">
            ${visualHtml}
          </div>

          <div class="project-topline">
            <span class="project-category-text">${esc(project.category || 'PROJECT')}</span>
            <span class="project-number">${esc(num)}</span>
          </div>

          <h3 class="project-title">${esc(project.title)}</h3>
          <p class="project-desc">${esc(project.description)}</p>

          <div class="project-meta-box">
            <strong>Architecture &amp; Focus:</strong> ${esc(project.details || 'Conceptual and engineering framework in progress.')}
          </div>

          <div class="project-tags">
            ${(project.tools || []).map(t => `<span class="tech-pill">${esc(t)}</span>`).join('')}
          </div>

          <div class="project-footer">
            <span class="status-badge">${esc(project.status || 'Active exploration')}</span>
            <button type="button" class="view-details-btn" data-open-project="${esc(id)}">
              <span>View Breakdown</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Attach click handlers to "View Breakdown" buttons
    $$('[data-open-project]').forEach(btn => {
      btn.addEventListener('click', () => {
        const projId = btn.dataset.openProject;
        openProjectModal(projId);
      });
    });
  }

  // Render About Section Interest Pills
  function renderInterests() {
    const list = $('#interestList');
    if (!list) return;
    list.innerHTML = (content.interests || []).map(item => `
      <span class="interest-pill">${esc(item)}</span>
    `).join('');
  }

  // Render Skills Toolkit with Filtering and Search
  let activeSkillGroup = 'All Skills';
  let skillSearchQuery = '';

  function renderSkills() {
    const allSkills = content.skills || [];
    const rawGroups = [...new Set(allSkills.map(s => s.group || 'Other'))];
    const groups = ['All Skills', ...rawGroups];

    const tabsContainer = $('#skillTabs');
    if (tabsContainer) {
      tabsContainer.innerHTML = groups.map(g => {
        const count = g === 'All Skills' 
          ? allSkills.length 
          : allSkills.filter(s => s.group === g).length;
        const isActive = g === activeSkillGroup;
        return `
          <button type="button" class="skill-tab-btn ${isActive ? 'active' : ''}" data-group="${esc(g)}" role="tab" aria-selected="${isActive}">
            <span>${esc(g)}</span>
            <span class="tab-badge">${String(count).padStart(2, '0')}</span>
          </button>
        `;
      }).join('');

      $$('.skill-tab-btn', tabsContainer).forEach(btn => {
        btn.addEventListener('click', () => {
          activeSkillGroup = btn.dataset.group;
          renderSkills();
        });
      });
    }

    // Filter Skills
    let filtered = allSkills;
    if (activeSkillGroup !== 'All Skills') {
      filtered = filtered.filter(s => s.group === activeSkillGroup);
    }
    if (skillSearchQuery.trim()) {
      const q = skillSearchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(q) || (s.group && s.group.toLowerCase().includes(q))
      );
    }

    const chipsContainer = $('#skillChips');
    if (chipsContainer) {
      if (filtered.length === 0) {
        chipsContainer.innerHTML = `<div style="color:var(--ink-muted);font-size:13px;padding:12px 0;">No matching skills found.</div>`;
      } else {
        chipsContainer.innerHTML = filtered.map(s => `
          <div class="skill-item-chip">
            <span class="skill-chip-dot"></span>
            <span>${esc(s.name)}</span>
          </div>
        `).join('');
      }
    }

    const groupLabel = $('#skillGroupLabel');
    if (groupLabel) groupLabel.textContent = activeSkillGroup.toUpperCase();

    const countLabel = $('#skillCount');
    if (countLabel) countLabel.textContent = `${filtered.length} ITEMS`;
  }

  // 3. DEDICATED CERTIFICATIONS & RECOGNITION SECTION
  let activeCertFilter = 'all';

  function renderCertificates() {
    const certGrid = $('#certificateGrid');
    if (!certGrid) return;

    const allCerts = content.certificates || [];
    const imageCerts = allCerts.filter(c => c.image && c.image.trim() !== '');
    const docCerts = allCerts.filter(c => c.pdf && c.pdf.trim() !== '');

    // Update Counter Badges
    const totalCountEl = $('#certTotalCount');
    if (totalCountEl) totalCountEl.textContent = allCerts.length;
    const imagesCountEl = $('#certImagesCount');
    if (imagesCountEl) imagesCountEl.textContent = imageCerts.length;
    const docsCountEl = $('#certDocsCount');
    if (docsCountEl) docsCountEl.textContent = docCerts.length;

    // Filter list
    let filteredCerts = allCerts;
    if (activeCertFilter === 'images') {
      filteredCerts = imageCerts;
    } else if (activeCertFilter === 'documents') {
      filteredCerts = docCerts;
    }

    certGrid.innerHTML = filteredCerts.map((cert) => {
      const hasImage = cert.image && cert.image.trim() !== '';
      const hasPdf = cert.pdf && cert.pdf.trim() !== '';
      const hasLink = cert.link && cert.link.trim() !== '';
      
      // Thumbnail Box HTML
      let thumbHtml = '';
      if (hasImage) {
        thumbHtml = `
          <button type="button" class="cert-thumbnail-box" data-view-lightbox="${esc(cert.id)}" aria-label="Enlarge ${esc(cert.title)}">
            <img class="cert-img-thumb" src="${safePath(cert.image)}" alt="${esc(cert.title)} Certificate" loading="lazy">
            <div class="cert-expand-overlay" aria-hidden="true">
              <span class="expand-badge">🔍 Click to Enlarge</span>
            </div>
          </button>
        `;
      } else {
        // Document / PDF Badge Card
        thumbHtml = `
          <div class="cert-doc-placeholder">
            <div class="cert-doc-icon">📄</div>
            <div class="cert-doc-title">${esc(cert.title)}</div>
            <div class="cert-doc-subtitle">${esc(cert.issuer || 'Official Credential')}</div>
          </div>
        `;
      }

      // Actions Row
      let actionButtons = '';
      if (hasImage) {
        actionButtons += `
          <button type="button" class="btn-expand-cert" data-view-lightbox="${esc(cert.id)}">
            <span>🔍 View Certificate Image</span>
          </button>
        `;
      }
      if (hasPdf) {
        actionButtons += `
          <a class="btn-pdf-view" href="${safePath(cert.pdf)}" target="_blank" rel="noopener">
            <span>Open Official PDF ↗</span>
          </a>
        `;
      }
      if (hasLink) {
        actionButtons += `
          <a class="btn-credly-verify" href="${esc(cert.link)}" target="_blank" rel="noopener">
            <span>Verify on Credly ↗</span>
          </a>
        `;
      }

      return `
        <article class="certificate-card" data-cert-id="${esc(cert.id)}">
          ${thumbHtml}
          
          <div class="cert-card-body">
            <div class="cert-card-top">
              <span class="cert-badge-pill">${esc(cert.issuer || 'Credential')}</span>
              <span class="cert-date-text">${esc(cert.date || '')}</span>
            </div>

            <h3 class="cert-card-title">${esc(cert.title)}</h3>
            <p class="cert-card-desc">${esc(cert.description || '')}</p>

            ${cert.duration ? `<div class="cert-card-meta"><strong>Scope / Details:</strong> ${esc(cert.duration)}</div>` : ''}

            <div class="cert-card-actions">
              ${actionButtons}
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach click listeners to open lightbox
    $$('[data-view-lightbox]').forEach(btn => {
      btn.addEventListener('click', () => {
        const certId = btn.dataset.viewLightbox;
        openLightboxById(certId, btn);
      });
    });

    // Setup filter buttons
    $$('.cert-filter-btn').forEach(btn => {
      btn.onclick = () => {
        $$('.cert-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCertFilter = btn.dataset.certFilter;
        renderCertificates();
      };
    });
  }

  // 4. ACCESSIBLE CERTIFICATE LIGHTBOX
  const lightboxBackdrop = $('#certificateLightbox');
  const lightboxImg = $('#lightboxImg');
  const lightboxTitle = $('#lightboxTitle');
  const lightboxIssuer = $('#lightboxIssuer');
  const lightboxDate = $('#lightboxDate');
  const lightboxCounter = $('#lightboxCounter');
  const lightboxDesc = $('#lightboxDesc');
  const lightboxActions = $('#lightboxActions');
  const lightboxCloseBtn = $('#lightboxClose');
  const lightboxPrevBtn = $('#lightboxPrev');
  const lightboxNextBtn = $('#lightboxNext');

  let currentLightboxIndex = 0;
  let lastFocusedTrigger = null;

  function getImageCertificates() {
    return (content.certificates || []).filter(c => c.image && c.image.trim() !== '');
  }

  function openLightboxById(certId, triggerElement) {
    const list = getImageCertificates();
    const index = list.findIndex(c => c.id === certId);
    if (index !== -1) {
      openLightboxByIndex(index, triggerElement);
    }
  }

  function openLightboxByIndex(index, triggerElement) {
    const list = getImageCertificates();
    if (list.length === 0 || index < 0 || index >= list.length) return;

    currentLightboxIndex = index;
    lastFocusedTrigger = triggerElement || document.activeElement;
    const cert = list[currentLightboxIndex];

    if (lightboxImg) lightboxImg.src = safePath(cert.image);
    if (lightboxTitle) lightboxTitle.textContent = cert.title;
    if (lightboxIssuer) lightboxIssuer.textContent = cert.issuer || 'CREDENTIAL';
    if (lightboxDate) lightboxDate.textContent = `${cert.date || ''} ${cert.duration ? '• ' + cert.duration : ''}`;
    if (lightboxCounter) lightboxCounter.textContent = `${String(currentLightboxIndex + 1).padStart(2, '0')} / ${String(list.length).padStart(2, '0')}`;
    if (lightboxDesc) lightboxDesc.textContent = cert.description || '';

    // Action links
    if (lightboxActions) {
      const linksHtml = [];
      if (cert.link) {
        linksHtml.push(`<a class="button button-sm button-lime" href="${esc(cert.link)}" target="_blank" rel="noopener">Verify Credential on Credly ↗</a>`);
      }
      linksHtml.push(`<a class="button button-sm button-ghost" href="${safePath(cert.image)}" target="_blank" rel="noopener">Open Full Resolution Image ↗</a>`);
      lightboxActions.innerHTML = linksHtml.join(' ');
    }

    if (lightboxBackdrop) {
      lightboxBackdrop.hidden = false;
      document.body.style.overflow = 'hidden';
      if (lightboxCloseBtn) lightboxCloseBtn.focus();
    }
  }

  function closeLightbox() {
    if (!lightboxBackdrop) return;
    lightboxBackdrop.hidden = true;
    document.body.style.overflow = '';
    if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
      lastFocusedTrigger.focus();
    }
  }

  function showNextCertificate() {
    const list = getImageCertificates();
    if (list.length === 0) return;
    const nextIdx = (currentLightboxIndex + 1) % list.length;
    openLightboxByIndex(nextIdx);
  }

  function showPrevCertificate() {
    const list = getImageCertificates();
    if (list.length === 0) return;
    const prevIdx = (currentLightboxIndex - 1 + list.length) % list.length;
    openLightboxByIndex(prevIdx);
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', showNextCertificate);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', showPrevCertificate);

  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', (e) => {
      if (e.target === lightboxBackdrop) closeLightbox();
    });
  }

  // 5. EDUCATION TIMELINE & CO-CURRICULAR ACHIEVEMENTS
  function renderEducation() {
    const timeline = $('#educationList');
    if (!timeline) return;

    timeline.innerHTML = (content.education || []).map(edu => `
      <div class="timeline-item">
        <div class="timeline-period">${esc(edu.period)}</div>
        <div class="timeline-content">
          <div class="timeline-node-dot"></div>
          <h4 class="timeline-title">${esc(edu.title)}</h4>
          <div class="timeline-institution">${esc(edu.institution)}</div>
          ${edu.result ? `<div class="timeline-result-badge">${esc(edu.result)}</div>` : ''}
          ${edu.details ? `<p class="timeline-desc">${esc(edu.details)}</p>` : ''}
        </div>
      </div>
    `).join('');
  }

  function renderAchievements() {
    const achieveList = $('#achievementList');
    if (achieveList) {
      achieveList.innerHTML = (content.achievements || []).map(a => `
        <div class="achievement-card">
          <span class="achieve-icon">✳</span>
          <div class="achieve-info">
            <strong>${esc(a.title)}</strong>
            <p>${esc(a.description)}</p>
          </div>
        </div>
      `).join('');
    }
  }

  // Render Contact Channels & Footer
  function renderContact() {
    const email = content.contact?.email || '';
    const emailLink = $('#emailLink');
    if (emailLink) {
      emailLink.href = email ? `mailto:${email}` : '#';
      const addressText = $('.email-address-text', emailLink);
      if (addressText) addressText.textContent = email || 'Add your email';
    }

    const channelsContainer = $('#contactLinks');
    if (channelsContainer) {
      const links = [
        { label: 'LinkedIn', url: content.contact?.linkedin },
        { label: 'GitHub', url: content.contact?.github }
      ];
      channelsContainer.innerHTML = links
        .filter(l => l.url)
        .map(l => `
          <a class="social-link" href="${esc(l.url)}" target="_blank" rel="noopener">
            <span>${esc(l.label)}</span>
            <span aria-hidden="true">↗</span>
          </a>
        `).join('');
    }
  }

  // Master Render Function
  function renderAll() {
    renderMeta();
    renderEditableFields();
    renderResumeButtons();
    renderTicker();
    renderProjects();
    renderInterests();
    renderSkills();
    renderCertificates();
    renderEducation();
    renderAchievements();
    renderContact();
  }

  // 6. PROJECT DETAILS MODAL
  const projectModal = $('#projectModal');
  const modalCloseBtn = $('#modalClose');

  function openProjectModal(projectId) {
    if (!projectModal) return;
    const project = (content.projects || []).find(p => p.id === projectId);
    if (!project) return;

    $('#modalCategory').textContent = project.category || 'PROJECT CASE STUDY';
    $('#modalTitle').textContent = project.title;
    $('#modalDescription').textContent = project.description;
    $('#modalDetails').textContent = project.details || 'Conceptual system design and implementation plan underway.';
    $('#modalStatus').textContent = project.status || 'Active Investigation';

    // Tags
    $('#modalTools').innerHTML = (project.tools || []).map(t => `
      <span class="tech-pill">${esc(t)}</span>
    `).join('');

    // Modal Preview Graphic
    const previewZone = $('#modalPreviewZone');
    if (project.image) {
      previewZone.innerHTML = `<img src="${safePath(project.image)}" alt="${esc(project.title)}" style="width:100%;height:100%;object-fit:cover;">`;
    } else {
      previewZone.innerHTML = `
        <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#171B15;color:#D8F36A;font-family:var(--font-mono);font-size:13px;letter-spacing:0.05em;">
          <span>✳ // [SYSTEM_ARCHITECTURE_OVERVIEW]: ${esc(project.title)}</span>
        </div>
      `;
    }

    // Modal Links
    const linksZone = $('#modalLinks');
    const linksHtml = [];
    if (project.github) {
      linksHtml.push(`<a class="button button-sm button-dark" href="${esc(project.github)}" target="_blank" rel="noopener">GitHub Repository ↗</a>`);
    }
    if (project.demo) {
      linksHtml.push(`<a class="button button-sm button-lime" href="${esc(project.demo)}" target="_blank" rel="noopener">Live Demo ↗</a>`);
    }
    linksZone.innerHTML = linksHtml.join(' ');

    projectModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.hidden = true;
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  // 7. INTERACTION HELPERS & SCROLLSPY
  const copyEmailBtn = $('#copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = content.contact?.email;
      if (email) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email} to clipboard!`);
        }).catch(() => {
          showToast('Email: ' + email);
        });
      }
    });
  }

  // Mobile Navigation Toggle
  const mobileToggle = $('#mobileToggle');
  const navMenu = $('#navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    $$('.nav-link', navMenu).forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll Progress and ScrollSpy
  window.addEventListener('scroll', () => {
    const scrollBar = $('#scrollProgress');
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && scrollBar) {
      const progress = (window.scrollY / totalHeight) * 100;
      scrollBar.style.width = `${progress}%`;
    }

    // ScrollSpy active link
    const sections = $$('main > section[id]');
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      $$('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }, { passive: true });

  // Skill Search filter listener
  const skillSearchInput = $('#skillSearch');
  if (skillSearchInput) {
    skillSearchInput.addEventListener('input', (e) => {
      skillSearchQuery = e.target.value;
      renderSkills();
    });
  }

  // Global Keyboard Navigation
  window.addEventListener('keydown', (e) => {
    // Lightbox open: handle navigation
    if (lightboxBackdrop && !lightboxBackdrop.hidden) {
      if (e.key === 'Escape') {
        closeLightbox();
        return;
      }
      if (e.key === 'ArrowLeft') {
        showPrevCertificate();
        return;
      }
      if (e.key === 'ArrowRight') {
        showNextCertificate();
        return;
      }
    }

    if (e.key === 'Escape') {
      closeProjectModal();
      exitEditMode();
    }
    // Ctrl+E or Cmd+E to toggle editor
    if ((e.ctrlKey || e.metaKey) && (e.key === 'e' || e.key === 'E')) {
      e.preventDefault();
      toggleEditDrawer();
    }
  });

  // 8. VISUAL PORTFOLIO EDITOR ENGINE
  const editLaunch = $('#editLaunch');
  const editDrawer = $('#editDrawer');
  const closeEditorBtn = $('#closeEditorBtn');
  const finishEditingBtn = $('#finishEditingBtn');
  const exportContentBtn = $('#exportContentBtn');
  const resetDefaultsBtn = $('#resetDefaultsBtn');
  let isEditing = false;

  function enterEditMode() {
    isEditing = true;
    document.body.classList.add('editing-active');
    if (editDrawer) editDrawer.hidden = false;

    // Enable in-page contentEditable for data-edit elements
    $$('.editable-text').forEach(el => {
      el.contentEditable = 'true';
      el.spellcheck = true;
      el.addEventListener('input', handleInlineInput);
    });

    populateDrawerFields();
    showToast('Editing mode active. Click text on page or use the panel.', 3500);
  }

  function exitEditMode() {
    isEditing = false;
    document.body.classList.remove('editing-active');
    if (editDrawer) editDrawer.hidden = true;

    // Disable in-page contentEditable
    $$('.editable-text').forEach(el => {
      el.contentEditable = 'false';
      el.removeEventListener('input', handleInlineInput);
    });
  }

  function toggleEditDrawer() {
    if (isEditing) {
      exitEditMode();
    } else {
      enterEditMode();
    }
  }

  if (editLaunch) editLaunch.addEventListener('click', toggleEditDrawer);
  if (closeEditorBtn) closeEditorBtn.addEventListener('click', exitEditMode);
  if (finishEditingBtn) finishEditingBtn.addEventListener('click', exitEditMode);

  // Sync Inline Text Edits to State
  function handleInlineInput(e) {
    const el = e.target;
    const key = el.dataset.edit;
    if (key) {
      content[key] = el.innerText.trim();
      saveState();
      // Keep drawer inputs in sync
      const drawerInput = $(`#input${key.charAt(0).toUpperCase() + key.slice(1)}`);
      if (drawerInput) drawerInput.value = content[key];
    }
  }

  // Drawer Tabs Switcher
  $$('.drawer-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.drawer-tab').forEach(t => t.classList.remove('active'));
      $$('.drawer-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const targetPanel = $(`#${tab.dataset.tab}`);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // Populate Drawer Form Inputs
  function populateDrawerFields() {
    // General
    const bindInput = (id, key) => {
      const input = $(id);
      if (input) {
        input.value = content[key] || '';
        input.oninput = () => {
          content[key] = input.value;
          saveState();
          renderEditableFields();
          renderMeta();
        };
      }
    };

    bindInput('#inputName', 'name');
    bindInput('#inputRole', 'role');
    bindInput('#inputLocation', 'location');
    bindInput('#inputProfilePhoto', 'profilePhoto');
    bindInput('#inputHeadline', 'headline');
    bindInput('#inputIntro', 'intro');
    bindInput('#inputAbout', 'about');
    bindInput('#inputFooter', 'footer');

    // Contact
    const emailIn = $('#inputEmail');
    if (emailIn) {
      emailIn.value = content.contact?.email || '';
      emailIn.oninput = () => {
        content.contact = content.contact || {};
        content.contact.email = emailIn.value;
        saveState();
        renderContact();
      };
    }

    const githubIn = $('#inputGithub');
    if (githubIn) {
      githubIn.value = content.contact?.github || '';
      githubIn.oninput = () => {
        content.contact = content.contact || {};
        content.contact.github = githubIn.value;
        saveState();
        renderContact();
      };
    }

    const linkedinIn = $('#inputLinkedin');
    if (linkedinIn) {
      linkedinIn.value = content.contact?.linkedin || '';
      linkedinIn.oninput = () => {
        content.contact = content.contact || {};
        content.contact.linkedin = linkedinIn.value;
        saveState();
        renderContact();
      };
    }

    const resumeIn = $('#inputResume');
    if (resumeIn) {
      resumeIn.value = content.contact?.resume || '';
      resumeIn.oninput = () => {
        content.contact = content.contact || {};
        content.contact.resume = resumeIn.value;
        saveState();
        renderResumeButtons();
      };
    }

    // Projects Tab
    populateProjectEditor();

    // Education Tab
    populateEducationEditor();

    // Certs Tab
    populateCertsEditor();

    // Skills Tab
    populateSkillsEditor();
  }

  // Project Editor in Drawer
  let activeProjectIndex = 0;
  function populateProjectEditor() {
    const sel = $('#projectSelect');
    if (!sel) return;
    sel.innerHTML = (content.projects || []).map((p, i) => `
      <option value="${i}">${p.title}</option>
    `).join('');

    sel.value = activeProjectIndex;
    sel.onchange = () => {
      activeProjectIndex = parseInt(sel.value, 10);
      loadProjectForm(activeProjectIndex);
    };

    loadProjectForm(activeProjectIndex);

    // Image Upload Handling
    const fileInput = $('#projImageFile');
    const removeImgBtn = $('#removeProjImage');

    if (fileInput) {
      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const dataUrl = event.target.result;
            content.projects[activeProjectIndex].image = dataUrl;
            saveState();
            renderProjects();
            updateImagePreview(dataUrl);
            showToast('Project thumbnail image updated!');
          };
          reader.readAsDataURL(file);
        }
      };
    }

    if (removeImgBtn) {
      removeImgBtn.onclick = () => {
        content.projects[activeProjectIndex].image = '';
        saveState();
        renderProjects();
        updateImagePreview('');
        showToast('Reset to original tech graphic.');
      };
    }
  }

  function updateImagePreview(src) {
    const container = $('#imagePreviewContainer');
    if (!container) return;
    if (src) {
      container.style.display = 'block';
      container.innerHTML = `<img src="${src}" alt="Preview">`;
    } else {
      container.style.display = 'none';
      container.innerHTML = '';
    }
  }

  function loadProjectForm(index) {
    const proj = (content.projects || [])[index];
    if (!proj) return;

    const bindProj = (id, key, isArray = false) => {
      const input = $(id);
      if (input) {
        input.value = isArray ? (proj[key] || []).join(', ') : (proj[key] || '');
        input.oninput = () => {
          if (isArray) {
            proj[key] = input.value.split(',').map(s => s.trim()).filter(Boolean);
          } else {
            proj[key] = input.value;
          }
          saveState();
          renderProjects();
        };
      }
    };

    bindProj('#projTitle', 'title');
    bindProj('#projCategory', 'category');
    bindProj('#projDesc', 'description');
    bindProj('#projDetails', 'details');
    bindProj('#projTools', 'tools', true);
    bindProj('#projStatus', 'status');
    bindProj('#projGithub', 'github');
    bindProj('#projDemo', 'demo');

    updateImagePreview(proj.image || '');
  }

  // Education Editor in Drawer
  function populateEducationEditor() {
    const container = $('#educationEditList');
    if (!container) return;

    container.innerHTML = (content.education || []).map((edu, i) => `
      <div style="background:var(--bg-muted);border:1px solid var(--border-light);border-radius:var(--radius-sm);padding:14px;margin-bottom:14px;">
        <div class="form-group">
          <label>Degree / Level</label>
          <input type="text" class="form-input" data-edu-idx="${i}" data-edu-field="title" value="${esc(edu.title)}">
        </div>
        <div class="form-group">
          <label>Institution</label>
          <input type="text" class="form-input" data-edu-idx="${i}" data-edu-field="institution" value="${esc(edu.institution)}">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div class="form-group">
            <label>Period</label>
            <input type="text" class="form-input" data-edu-idx="${i}" data-edu-field="period" value="${esc(edu.period)}">
          </div>
          <div class="form-group">
            <label>Score / CGPA</label>
            <input type="text" class="form-input" data-edu-idx="${i}" data-edu-field="result" value="${esc(edu.result || '')}">
          </div>
        </div>
      </div>
    `).join('');

    $$('input[data-edu-idx]', container).forEach(input => {
      input.addEventListener('input', () => {
        const idx = parseInt(input.dataset.eduIdx, 10);
        const field = input.dataset.eduField;
        content.education[idx][field] = input.value;
        saveState();
        renderEducation();
      });
    });
  }

  // Certs Editor in Drawer
  function populateCertsEditor() {
    const container = $('#certEditList');
    if (!container) return;

    const certs = content.certificates || [];
    container.innerHTML = certs.map((c, i) => `
      <div style="background:var(--bg-muted);border:1px solid var(--border-light);border-radius:var(--radius-sm);padding:14px;margin-bottom:14px;">
        <div class="form-group">
          <label>Certificate Title</label>
          <input type="text" class="form-input" data-cert-idx="${i}" data-cert-field="title" value="${esc(c.title)}">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div class="form-group">
            <label>Issuer</label>
            <input type="text" class="form-input" data-cert-idx="${i}" data-cert-field="issuer" value="${esc(c.issuer || '')}">
          </div>
          <div class="form-group">
            <label>Date</label>
            <input type="text" class="form-input" data-cert-idx="${i}" data-cert-field="date" value="${esc(c.date || '')}">
          </div>
        </div>
        <div class="form-group">
          <label>Image File Path</label>
          <input type="text" class="form-input" data-cert-idx="${i}" data-cert-field="image" value="${esc(c.image || '')}" placeholder="certificates/Screenshot...">
        </div>
        <div class="form-group">
          <label>Credly / Verification Link (URL)</label>
          <input type="url" class="form-input" data-cert-idx="${i}" data-cert-field="link" value="${esc(c.link || '')}" placeholder="https://www.credly.com/...">
        </div>
      </div>
    `).join('');

    $$('input[data-cert-idx]', container).forEach(input => {
      input.addEventListener('input', () => {
        const idx = parseInt(input.dataset.certIdx, 10);
        const field = input.dataset.certField;
        content.certificates[idx][field] = input.value;
        saveState();
        renderCertificates();
      });
    });
  }

  // Skills Editor in Drawer
  function populateSkillsEditor() {
    const list = $('#skillsManageList');
    if (!list) return;

    list.innerHTML = (content.skills || []).map((s, i) => `
      <div class="skill-manage-row">
        <div>
          <span>${esc(s.name)}</span>
          <small> • ${esc(s.group)}</small>
        </div>
        <button type="button" class="skill-del-btn" data-del-skill="${i}" aria-label="Delete ${esc(s.name)}">✕</button>
      </div>
    `).join('');

    $$('[data-del-skill]', list).forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.delSkill, 10);
        content.skills.splice(idx, 1);
        saveState();
        renderSkills();
        populateSkillsEditor();
        showToast('Skill removed.');
      });
    });
  }

  const addSkillBtn = $('#addSkillBtn');
  if (addSkillBtn) {
    addSkillBtn.addEventListener('click', () => {
      const nameIn = $('#newSkillName');
      const groupIn = $('#newSkillGroup');
      const name = nameIn?.value.trim();
      const group = groupIn?.value;

      if (name) {
        content.skills = content.skills || [];
        content.skills.push({ name, group });
        saveState();
        renderSkills();
        populateSkillsEditor();
        nameIn.value = '';
        showToast(`Added "${name}" to ${group}`);
      }
    });
  }

  // 9. EXPORT & DOWNLOAD SYSTEM
  if (exportContentBtn) {
    exportContentBtn.addEventListener('click', () => {
      // Clean and clone state
      const cleaned = JSON.parse(JSON.stringify(content));
      const formatted = [
        '/* ==========================================================================',
        '   GAYATRI THETE — PORTFOLIO CONTENT SOURCE OF TRUTH',
        '   Exported from the in-browser Visual Portfolio Editor.',
        '   Place this file directly in your repository root to publish changes.',
        '   ========================================================================== */',
        '',
        'window.PORTFOLIO_CONTENT = ' + JSON.stringify(cleaned, null, 2) + ';',
        ''
      ].join('\n');

      const blob = new Blob([formatted], { type: 'text/javascript;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'content.js';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      showToast('content.js downloaded! Follow the guide below to publish to GitHub Pages.');
    });
  }

  // Reset to Defaults
  if (resetDefaultsBtn) {
    resetDefaultsBtn.addEventListener('click', () => {
      if (confirm('Reset all changes back to original defaults? This will erase your current edits in browser memory.')) {
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch (e) {}
        content = JSON.parse(JSON.stringify(defaultContent));
        renderAll();
        populateDrawerFields();
        showToast('Restored original portfolio content.');
      }
    });
  }

  // 10. INITIAL BOOTSTRAP
  renderAll();

})();
