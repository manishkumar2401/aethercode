/**
 * AETHERCODETECH - CLIENT-SIDE INTERACTIVITY
 * SaaS Interactive Elements, API Simulator, Demo Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Scroll Observer
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Interactive API Payload Sandbox Simulator
  const apiPayloads = {
    flights: {
      endpoint: 'POST /v2/flights/search',
      request: `{\n  "trip_type": "ONE_WAY",\n  "cabin_class": "ECONOMY",\n  "passengers": { "adults": 1, "children": 0 },\n  "routes": [\n    {\n      "origin": "DEL",\n      "destination": "DXB",\n      "departure_date": "2026-11-15"\n    }\n  ],\n  "sources": ["AMADEUS", "SABRE", "TBO_AIR", "TRIPJACK"]\n}`,
      response: `{\n  "status": "success",\n  "latency_ms": 142,\n  "total_results": 64,\n  "currency": "USD",\n  "flights": [\n    {\n      "id": "FL-9821-EK",\n      "airline": "Emirates (EK-511)",\n      "departure": "2026-11-15T09:45:00+05:30",\n      "arrival": "2026-11-15T12:15:00+04:00",\n      "origin": "DEL (Terminal 3)",\n      "destination": "DXB (Terminal 3)",\n      "stops": 0,\n      "duration": "3h 30m",\n      "base_fare": 285.00,\n      "tax": 42.50,\n      "total_fare": 327.50,\n      "instant_ticketing": true,\n      "baggage": "30 KG Check-in"\n    },\n    {\n      "id": "FL-6402-AI",\n      "airline": "Air India (AI-995)",\n      "departure": "2026-11-15T20:10:00+05:30",\n      "arrival": "2026-11-15T22:45:00+04:00",\n      "stops": 0,\n      "total_fare": 312.00,\n      "instant_ticketing": true\n    }\n  ]\n}`
    },
    hotels: {
      endpoint: 'POST /v2/hotels/availability',
      request: `{\n  "city_code": "DXB",\n  "check_in": "2026-11-15",\n  "check_out": "2026-11-18",\n  "rooms": [{ "adults": 2, "children": 0 }],\n  "rating_min": 4,\n  "providers": ["HOTELBEDS", "TBO_HOLIDAYS", "EXPEDIA"]\n}`,
      response: `{\n  "status": "success",\n  "latency_ms": 178,\n  "total_hotels": 142,\n  "currency": "USD",\n  "data": [\n    {\n      "hotel_id": "HT-4091",\n      "name": "Atlantis The Royal Resort & Spa",\n      "stars": 5,\n      "location": "Palm Jumeirah, Dubai",\n      "room_type": "Sky Terrace Suite (Ocean View)",\n      "rate_per_night": 460.00,\n      "taxes_included": true,\n      "cancellation_policy": "Free cancellation until Nov 12",\n      "instant_confirmation": true\n    }\n  ]\n}`
    },
    ticketing: {
      endpoint: 'POST /v2/bookings/issue-ticket',
      request: `{\n  "order_id": "ORD-2026-90412",\n  "pnr": "AEC78X",\n  "payment_method": "AGENT_CREDIT_WALLET",\n  "auto_invoice": true,\n  "sms_notify": true\n}`,
      response: `{\n  "status": "ISSUED",\n  "ticket_numbers": ["176-2490812390"],\n  "pnr": "AEC78X",\n  "gds_locator": "1A-9812YZ",\n  "invoice_number": "INV-2026-0814",\n  "agent_wallet_deducted": 327.50,\n  "agent_remaining_balance": 48250.00,\n  "e_ticket_pdf_url": "https://api.aethercodetech.com/docs/ticket-90412.pdf"\n}`
    },
    wallet: {
      endpoint: 'GET /v2/agent/wallet/ledger',
      request: `{\n  "agency_id": "AG-9041",\n  "filter_currency": "USD",\n  "period": "LAST_30_DAYS"\n}`,
      response: `{\n  "status": "success",\n  "agency_name": "Apex Global Travel Ltd",\n  "credit_limit": 100000.00,\n  "available_balance": 48250.00,\n  "total_markup_earned": 14680.00,\n  "sub_agents_active": 42,\n  "currency": "USD"\n}`
    }
  };

  const termTabBtns = document.querySelectorAll('.term-tab-btn');
  const endpointEl = document.getElementById('api-endpoint-display');
  const requestEl = document.getElementById('api-request-code');
  const responseEl = document.getElementById('api-response-code');
  const runApiBtn = document.getElementById('run-api-btn');
  const latencyBadge = document.getElementById('api-latency-pill');

  function updateApiSandbox(key) {
    if (!apiPayloads[key]) return;
    const item = apiPayloads[key];
    if (endpointEl) endpointEl.innerText = item.endpoint;
    if (requestEl) requestEl.innerText = item.request;
    if (responseEl) responseEl.innerText = item.response;
  }

  termTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      termTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.dataset.tab;
      updateApiSandbox(key);
    });
  });

  if (runApiBtn) {
    runApiBtn.addEventListener('click', () => {
      runApiBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Executing API...';
      if (responseEl) responseEl.style.opacity = '0.4';
      setTimeout(() => {
        runApiBtn.innerHTML = '<i class="fas fa-play"></i> Run Query';
        if (responseEl) responseEl.style.opacity = '1';
        const simulatedLatency = Math.floor(Math.random() * 40) + 125;
        if (latencyBadge) latencyBadge.innerText = `${simulatedLatency}ms`;
      }, 350);
    });
  }


  // 4. Modal Dialog Trigger for "Query For Demo"
  const demoModal = document.getElementById('demo-modal');
  const openModalBtns = document.querySelectorAll('.trigger-demo-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const demoForm = document.getElementById('demo-request-form');
  const modalSuccessMsg = document.getElementById('modal-success-msg');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (demoModal) {
        demoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (demoModal) {
      demoModal.classList.remove('active');
      document.body.style.overflow = 'auto';
      if (modalSuccessMsg) modalSuccessMsg.style.display = 'none';
      if (demoForm) demoForm.style.display = 'block';
    }
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) closeModal();
    });
  }

  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = demoForm.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting Request...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = 'Request Submitted!';
        if (demoForm) demoForm.style.display = 'none';
        if (modalSuccessMsg) modalSuccessMsg.style.display = 'block';
      }, 700);
    });
  }

  // 5. Ambient Canvas Interactive Glow Follower
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetX = mouseX;
    let targetY = mouseY;

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    function drawAmbientLight() {
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const grad = ctx.createRadialGradient(mouseX, mouseY, 10, mouseX, mouseY, 380);
      grad.addColorStop(0, 'rgba(59, 130, 246, 0.08)');
      grad.addColorStop(0.5, 'rgba(6, 182, 212, 0.03)');
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      requestAnimationFrame(drawAmbientLight);
    }
    drawAmbientLight();
  }

  // 6. Mobile Navigation Drawer
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileMenu = document.getElementById('mobile-drawer-menu');
  if (mobileToggle && mobileMenu) {
    const toggleIcon = mobileToggle.querySelector('i');

    const closeMobileMenu = () => {
      mobileMenu.classList.remove('open');
      mobileToggle.classList.remove('active');
      if (toggleIcon) {
        toggleIcon.className = 'fas fa-bars';
      }
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      if (toggleIcon) {
        toggleIcon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    // Close when clicking any link inside the mobile drawer
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close when clicking outside of the drawer
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target) && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  // 7. FAQ Accordion Toggle Interaction
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-header-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Optional: close other open items in the same container
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active', !isActive);
      });
    }
  });

  // 8. Contact Page Interactive RFQ Form
  const contactPageForm = document.getElementById('contact-page-form');
  const contactSuccessAlert = document.getElementById('contact-success-alert');
  if (contactPageForm) {
    contactPageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactPageForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending Message...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check-circle me-2"></i> Message Transmitted';
        if (contactSuccessAlert) {
          contactSuccessAlert.style.display = 'block';
          contactSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        contactPageForm.reset();
        setTimeout(() => {
          submitBtn.innerHTML = originalHtml;
          submitBtn.disabled = false;
        }, 3000);
      }, 750);
    });
  }

  // 9. Services Page: Vertical Tab Navigation System
  const vtabBtns = document.querySelectorAll('.vtab-btn');
  const vtabPanes = document.querySelectorAll('.vtab-pane');

  function activateVerticalTab(targetPaneId, isUserClick = false) {
    // 1. Deactivate all tab buttons & panes
    vtabBtns.forEach(btn => {
      if (btn.dataset.target === targetPaneId) {
        btn.classList.add('active');
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        btn.classList.remove('active');
      }
    });

    let activePane = null;
    vtabPanes.forEach(pane => {
      if (pane.id === targetPaneId) {
        pane.classList.add('active');
        activePane = pane;
      } else {
        pane.classList.remove('active');
      }
    });

    // If user clicked on a mobile/tablet view (<992px), smooth scroll to the active pane content
    if (isUserClick && window.innerWidth <= 991 && activePane) {
      const headerOffset = 85;
      const panePos = activePane.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: panePos, behavior: 'smooth' });
    }
  }

  // Click handler for vertical tab buttons
  vtabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPaneId = btn.dataset.target;
      activateVerticalTab(targetPaneId, true);
    });
  });

  // 10. Services Page: Inner Detail Tabs inside Service Panes
  const innerNavContainers = document.querySelectorAll('.service-inner-tabs-container');
  innerNavContainers.forEach(container => {
    const innerLinks = container.querySelectorAll('.inner-tab-link');
    const innerPanes = container.querySelectorAll('.inner-tab-pane');

    innerLinks.forEach(link => {
      link.addEventListener('click', () => {
        const targetId = link.dataset.target;
        
        innerLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        innerPanes.forEach(pane => {
          if (pane.id === targetId) {
            pane.classList.add('active');
          } else {
            pane.classList.remove('active');
          }
        });
      });
    });
  });

  // 11. Interactive ROI Estimator Tabs
  const estimatorBtns = document.querySelectorAll('.estimator-tab-btn');
  const estTitle = document.getElementById('estimator-title');
  const estDesc = document.getElementById('estimator-desc');
  const estBullets = document.getElementById('estimator-bullets');
  const estMetricTime = document.getElementById('est-metric-time');
  const estMetricCost = document.getElementById('est-metric-cost');
  const estMetricApis = document.getElementById('est-metric-apis');
  const estMetricSla = document.getElementById('est-metric-sla');

  const estimatorData = {
    startup: {
      title: "Turnkey White-Label Travel Portal Suite",
      desc: "Pre-integrated with live flights and 1M+ hotels. Perfect for launching an independent branded online travel agency in just 7 days with zero development headaches.",
      bullets: [
        '<li class="mb-2"><i class="fas fa-check-circle text-info me-2"></i> Complete Flight & Hotel Booking Engine</li>',
        '<li class="mb-2"><i class="fas fa-check-circle text-info me-2"></i> Custom Domain with Free SSL & Payment Gateway</li>',
        '<li class="mb-2"><i class="fas fa-check-circle text-info me-2"></i> Back-office Admin Accounting & Profit Analytics</li>'
      ],
      time: "7 Days",
      cost: "-80%",
      apis: "12+",
      sla: "99.99%"
    },
    midsize: {
      title: "Hybrid B2B Agent Portal & Direct B2C OTA Engine",
      desc: "Empowers growing consolidators to manage 500+ sub-agents with multi-tier wallets while capturing retail consumer bookings with promotional cashback engines.",
      bullets: [
        '<li class="mb-2"><i class="fas fa-check-circle text-info me-2"></i> 4-Level Sub-Agent Network & Virtual Wallet Float</li>',
        '<li class="mb-2"><i class="fas fa-check-circle text-info me-2"></i> Multi-Supplier Aggregation (TBO, Tripjack, Amadeus)</li>',
        '<li class="mb-2"><i class="fas fa-check-circle text-info me-2"></i> Dynamic Rule-Based Markup & Commission Matrix</li>'
      ],
      time: "14 Days",
      cost: "-65%",
      apis: "35+",
      sla: "99.99%"
    },
    enterprise: {
      title: "Custom Travel Microservices, NDC Direct Hub & Corporate SBT",
      desc: "Engineered for high-volume DMCs and TMCs requiring Kubernetes scalability, direct IATA NDC connections, custom ERP sync, and corporate policy compliance.",
      bullets: [
        '<li class="mb-2"><i class="fas fa-check-circle text-info me-2"></i> Corporate Self-Booking Tool (SBT) with Multi-Level Approvals</li>',
        '<li class="mb-2"><i class="fas fa-check-circle text-info me-2"></i> IATA NDC Direct Connects & Unified Sub-180ms Caching</li>',
        '<li class="mb-2"><i class="fas fa-check-circle text-info me-2"></i> Enterprise Single Sign-On (Okta / Azure AD) & SAP Concur Sync</li>'
      ],
      time: "3-4 Weeks",
      cost: "-55%",
      apis: "120+",
      sla: "99.995%"
    }
  };

  if (estimatorBtns.length > 0) {
    estimatorBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        estimatorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const modelKey = btn.dataset.model;
        const data = estimatorData[modelKey];
        if (data) {
          if (estTitle) estTitle.innerText = data.title;
          if (estDesc) estDesc.innerText = data.desc;
          if (estBullets) estBullets.innerHTML = data.bullets.join('');
          if (estMetricTime) estMetricTime.innerText = data.time;
          if (estMetricCost) estMetricCost.innerText = data.cost;
          if (estMetricApis) estMetricApis.innerText = data.apis;
          if (estMetricSla) estMetricSla.innerText = data.sla;
        }
      });
    });
  }

  // 12. Deep Linking / Hash Anchor Handler for Vertical Tabs
  function handleUrlHash(customHash) {
    const hash = customHash || window.location.hash;
    if (hash) {
      // Map hashes like #tab-b2b, #service-b2b, #tab-flight, or #b2b
      const cleanKey = hash.replace('#tab-', '').replace('#service-', '').replace('#', '');
      const targetPaneId = `vtab-pane-${cleanKey}`;
      const targetPane = document.getElementById(targetPaneId);
      
      if (targetPane) {
        activateVerticalTab(targetPaneId);

        const vSection = document.getElementById('vertical-services-anchor');
        if (vSection) {
          setTimeout(() => {
            const headerOffset = 90;
            const elementPosition = vSection.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
              top: elementPosition - headerOffset,
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    }
  }

  // Handle direct clicks on anchor links targeting tab anchors
  document.querySelectorAll('a[href*="#tab-"], a[href*="#service-"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href) {
        const hashIdx = href.indexOf('#');
        if (hashIdx !== -1) {
          const hashPart = href.substring(hashIdx);
          const urlPart = href.substring(0, hashIdx);
          const currentPage = window.location.pathname.split('/').pop() || 'index.html';

          // If on same page or urlPart matches current page
          if (!urlPart || urlPart === currentPage) {
            const cleanKey = hashPart.replace('#tab-', '').replace('#service-', '').replace('#', '');
            const targetPaneId = `vtab-pane-${cleanKey}`;
            const targetPane = document.getElementById(targetPaneId);
            if (targetPane) {
              e.preventDefault();
              history.pushState(null, null, hashPart);
              handleUrlHash(hashPart);
            }
          }
        }
      }
    });
  });

  handleUrlHash();
  window.addEventListener('hashchange', () => handleUrlHash());

  // 13. AOS Animation Initialization
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      delay: 50
    });
  }
});



