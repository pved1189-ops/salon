/**
 * =========================================================================
 * TAKDIR HAIR STYLE - MAIN JAVASCRIPT
 * =========================================================================
 * Clean, lightweight, dependency-free JavaScript for:
 * 1. Global config binding (One-file salon updates)
 * 2. Sticky navigation & Mobile menu
 * 3. Quick Booking Modal with automated WhatsApp message generation
 * 4. Interactive Work Gallery & Lightbox
 * 5. Scroll-to-top & Floating WhatsApp CTA
 * 6. Smooth animations & Accessibility
 * =========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initSalonConfig();
  initNavbar();
  initBookingModal();
  initGalleryLightbox();
  initScrollTop();
  initContactForm();
  initScrollAnimations();
});

/**
 * 1. CONFIG BINDING
 * Automatically populates salon phone, whatsapp, email, address, etc.
 * across all pages using data attributes.
 */
function initSalonConfig() {
  const config = window.SALON_CONFIG || {};

  // Update Salon Name elements
  document.querySelectorAll("[data-salon-name]").forEach((el) => {
    el.textContent = config.salonName || "Takdir Hair Style";
  });

  // Update Phone links & text
  const phone1 = config.phone1 || config.phoneNumber || "+919104112214";
  const phone1Text = config.phone1Display || "+91 91041 12214";
  const phone2 = config.phone2 || "+919824401958";
  const phone2Text = config.phone2Display || "+91 98244 01958";
  const phoneCombined = config.phoneDisplay || `${phone1Text} / ${phone2Text}`;

  document.querySelectorAll("[data-salon-phone-link]").forEach((el) => {
    el.setAttribute("href", `tel:${phone1}`);
  });
  document.querySelectorAll("[data-salon-phone-text]").forEach((el) => {
    el.textContent = phoneCombined;
  });

  // Dedicated single-phone bindings
  document.querySelectorAll("[data-salon-phone-1-link]").forEach((el) => {
    el.setAttribute("href", `tel:${phone1}`);
  });
  document.querySelectorAll("[data-salon-phone-1-text]").forEach((el) => {
    el.textContent = phone1Text;
  });

  document.querySelectorAll("[data-salon-phone-2-link]").forEach((el) => {
    el.setAttribute("href", `tel:${phone2}`);
  });
  document.querySelectorAll("[data-salon-phone-2-text]").forEach((el) => {
    el.textContent = phone2Text;
  });

  // Update WhatsApp links & text (Target: 9104112214)
  const wa = config.whatsappNumber || "919104112214";
  const waText = config.whatsappDisplay || "+91 91041 12214";
  const defaultMsg = encodeURIComponent(config.defaultWhatsappMessage || "Hello Takdir Hair Style, I would like to book an appointment.");
  
  document.querySelectorAll("[data-salon-whatsapp-link]").forEach((el) => {
    el.setAttribute("href", `https://wa.me/${wa}?text=${defaultMsg}`);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });
  document.querySelectorAll("[data-salon-whatsapp-text]").forEach((el) => {
    el.textContent = waText;
  });

  // Update Email links & text (Target: jaydipnayi676@gmail.com)
  const email = config.email || "jaydipnayi676@gmail.com";
  const emailText = config.emailDisplay || email;
  document.querySelectorAll("[data-salon-email-link]").forEach((el) => {
    el.setAttribute("href", `mailto:${email}`);
  });
  document.querySelectorAll("[data-salon-email-text]").forEach((el) => {
    el.textContent = emailText;
  });

  // Update Address
  document.querySelectorAll("[data-salon-address]").forEach((el) => {
    el.textContent = config.address || "[Your Salon Address]";
  });

  // Update Hours
  document.querySelectorAll("[data-salon-hours]").forEach((el) => {
    el.textContent = config.openingHours || "Monday - Sunday: 9:00 AM - 9:00 PM";
  });

  // Update Social Media URLs
  if (config.instagramUrl) {
    document.querySelectorAll("[data-salon-instagram]").forEach((el) => {
      el.setAttribute("href", config.instagramUrl);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });
  }
  if (config.facebookUrl) {
    document.querySelectorAll("[data-salon-facebook]").forEach((el) => {
      el.setAttribute("href", config.facebookUrl);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });
  }
  if (config.youtubeUrl) {
    document.querySelectorAll("[data-salon-youtube]").forEach((el) => {
      el.setAttribute("href", config.youtubeUrl);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });
  }

  // Update Google Maps iframe src if provided and not placeholder
  const mapIframe = document.querySelector("[data-salon-map-iframe]");
  if (mapIframe && config.googleMapsEmbedUrl && config.googleMapsEmbedUrl !== "YOUR_GOOGLE_MAPS_EMBED_URL") {
    mapIframe.setAttribute("src", config.googleMapsEmbedUrl);
  }

  // Update Google Maps external links
  if (config.googleMapsLink) {
    document.querySelectorAll("[data-salon-map-link]").forEach((el) => {
      el.setAttribute("href", config.googleMapsLink);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });
  }
}

/**
 * 2. NAVBAR & MOBILE MENU
 */
function initNavbar() {
  const header = document.querySelector(".site-header");
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav a");

  // Sticky header class
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");
      mobileToggle.classList.toggle("active", isOpen);
      mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close mobile nav when clicking a link
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        mobileToggle.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    // Close mobile menu on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileNav.classList.contains("open")) {
        mobileNav.classList.remove("open");
        mobileToggle.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  // Highlight active page link
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

/**
 * 3. BOOKING MODAL & WHATSAPP GENERATION
 */
function initBookingModal() {
  const modal = document.getElementById("bookingModal");
  if (!modal) return;

  const openBtns = document.querySelectorAll("[data-open-booking]");
  const closeBtns = modal.querySelectorAll("[data-close-booking]");
  const bookingForm = document.getElementById("whatsappBookingForm");
  const serviceSelect = document.getElementById("bookingService");

  const openModal = (preselectedService = "") => {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Preselect service if passed
    if (serviceSelect && preselectedService) {
      for (let option of serviceSelect.options) {
        if (option.value.toLowerCase().includes(preselectedService.toLowerCase()) || 
            option.text.toLowerCase().includes(preselectedService.toLowerCase())) {
          serviceSelect.value = option.value;
          break;
        }
      }
    }

    // Auto-set minimum date to today
    const dateInput = document.getElementById("bookingDate");
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.min = today;
      if (!dateInput.value) {
        dateInput.value = today;
      }
    }

    const firstInput = modal.querySelector("input:not([type=hidden])");
    firstInput?.focus();
  };

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  openBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute("data-service-name") || "";
      openModal(serviceName);
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  // Close when clicking modal backdrop
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Handle Form Submission -> WhatsApp
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("bookingName")?.value.trim() || "";
      const phone = document.getElementById("bookingPhone")?.value.trim() || "";
      const service = document.getElementById("bookingService")?.value || "Haircut & Styling";
      const date = document.getElementById("bookingDate")?.value || "";
      const time = document.getElementById("bookingTime")?.value || "";
      const note = document.getElementById("bookingNote")?.value.trim() || "";

      // Format clean, professional WhatsApp message with all customer booking details
      let message = `*NEW APPOINTMENT BOOKING - TAKDIR HAIR STYLE*\n`;
      message += `----------------------------------------\n`;
      message += `👤 *Customer Name:* ${name}\n`;
      message += `📞 *Customer Phone:* ${phone}\n`;
      message += `✂️ *Selected Service:* ${service}\n`;
      if (date) message += `📅 *Preferred Date:* ${date}\n`;
      if (time) message += `⏰ *Preferred Time:* ${time}\n`;
      if (note) message += `📝 *Notes / Request:* ${note}\n`;
      message += `----------------------------------------\n`;
      message += `_Sent via Takdir Hair Style Online Booking_`;

      const targetWa = window.SALON_CONFIG?.whatsappNumber || "919104112214";
      const waUrl = `https://wa.me/${targetWa}?text=${encodeURIComponent(message)}`;

      // Open WhatsApp in new tab
      window.open(waUrl, "_blank", "noopener,noreferrer");
      closeModal();
    });
  }
}

/**
 * 4. WORK GALLERY FILTERING & LIGHTBOX
 */
function initGalleryLightbox() {
  const filterBtns = document.querySelectorAll(".gallery-filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("imageLightbox");

  // Gallery Filters
  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        galleryItems.forEach((item) => {
          const category = item.getAttribute("data-category");
          if (filter === "all" || category === filter) {
            item.style.display = "block";
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            }, 10);
          } else {
            item.style.opacity = "0";
            item.style.transform = "scale(0.95)";
            setTimeout(() => {
              item.style.display = "none";
            }, 250);
          }
        });
      });
    });
  }

  // Lightbox Modal Functionality
  if (lightbox) {
    const lightboxImg = lightbox.querySelector(".lightbox-img");
    const lightboxTitle = lightbox.querySelector(".lightbox-title");
    const lightboxCategory = lightbox.querySelector(".lightbox-category");
    const lightboxBookBtn = lightbox.querySelector(".lightbox-book-btn");
    const closeBtn = lightbox.querySelector(".lightbox-close");
    const prevBtn = lightbox.querySelector(".lightbox-prev");
    const nextBtn = lightbox.querySelector(".lightbox-next");

    let currentIndex = 0;
    const itemsArray = Array.from(galleryItems);

    const showImage = (index) => {
      if (itemsArray.length === 0) return;
      if (index < 0) index = itemsArray.length - 1;
      if (index >= itemsArray.length) index = 0;
      currentIndex = index;

      const item = itemsArray[currentIndex];
      const img = item.querySelector("img");
      const title = item.getAttribute("data-title") || img.getAttribute("alt") || "Hairstyle Design";
      const category = item.getAttribute("data-category") || "Salon Work";
      const src = img.getAttribute("src");

      if (lightboxImg) {
        lightboxImg.src = src;
        lightboxImg.alt = title;
      }
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxCategory) lightboxCategory.textContent = category.toUpperCase();

      if (lightboxBookBtn) {
        const waMsg = encodeURIComponent(`Hello Takdir Hair Style, I saw this style in your gallery ("${title}") and would like to book an appointment.`);
        const targetWa = window.SALON_CONFIG?.whatsappNumber || "YOUR_WHATSAPP_NUMBER";
        lightboxBookBtn.href = `https://wa.me/${targetWa}?text=${waMsg}`;
      }
    };

    galleryItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        showImage(index);
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    closeBtn?.addEventListener("click", closeLightbox);
    prevBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      showImage(currentIndex - 1);
    });
    nextBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      showImage(currentIndex + 1);
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target.classList.contains("lightbox-backdrop")) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showImage(currentIndex - 1);
      if (e.key === "ArrowRight") showImage(currentIndex + 1);
    });
  }
}

/**
 * 5. SCROLL TO TOP & FLOATING WHATSAPP
 */
function initScrollTop() {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (!scrollTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  }, { passive: true });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/**
 * 6. CONTACT PAGE FORM (WHATSAPP & EMAIL FLOW)
 */
function initContactForm() {
  const contactForm = document.getElementById("contactPageBookingForm") || document.getElementById("mainContactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contactName")?.value.trim() || "";
    const phone = document.getElementById("contactPhone")?.value.trim() || "";
    const email = document.getElementById("contactEmail")?.value.trim() || "";
    const service = document.getElementById("contactService")?.value || "General Inquiry";
    const date = document.getElementById("contactDate")?.value || "";
    const time = document.getElementById("contactTime")?.value || "";
    const messageText = document.getElementById("contactMessage")?.value.trim() || "";

    // Build the formatted WhatsApp message with complete customer booking details
    let msg = `*NEW APPOINTMENT / INQUIRY - TAKDIR HAIR STYLE*\n`;
    msg += `----------------------------------------\n`;
    msg += `👤 *Customer Name:* ${name}\n`;
    msg += `📞 *Customer Phone:* ${phone}\n`;
    if (email) msg += `✉️ *Customer Email:* ${email}\n`;
    msg += `✂️ *Service Needed:* ${service}\n`;
    if (date) msg += `📅 *Preferred Date:* ${date}\n`;
    if (time) msg += `⏰ *Preferred Time:* ${time}\n`;
    if (messageText) msg += `📝 *Notes / Message:* ${messageText}\n`;
    msg += `----------------------------------------\n`;
    msg += `_Sent via Takdir Hair Style Contact Page_`;

    const targetWa = window.SALON_CONFIG?.whatsappNumber || "919104112214";
    const waUrl = `https://wa.me/${targetWa}?text=${encodeURIComponent(msg)}`;

    // Show visual confirmation on screen
    const successBox = document.getElementById("contactSuccessMessage");
    if (successBox) {
      successBox.style.display = "block";
      successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // Open WhatsApp directly
    window.open(waUrl, "_blank", "noopener,noreferrer");
  });
}

/**
 * 7. SCROLL ANIMATIONS (IntersectionObserver)
 */
function initScrollAnimations() {
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });
}
