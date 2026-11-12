/**
 * ==============================================================================
 * MAIN LOGIC: VENESTI EN VIBRA DISCOTECA
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const config = window.EVENT_CONFIG;
  if (!config) {
    console.error("Configuración del evento no encontrada.");
    return;
  }

  initCountdown(config.eventDateISO);
  initStageMap(config);
  initPricingSection(config);
  initBookingForm(config);
  initFaqAccordion(config);
  initFloatingWhatsApp(config);
  initSmoothScroll();
  initIntersectionAnimations();
});

/**
 * ------------------------------------------------------------------------------
 * 1. CUENTA REGRESIVA AL EVENTO (21 NOV 2026, 8:00 PM UTC-5)
 * ------------------------------------------------------------------------------
 */
function initCountdown(targetDateISO) {
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const secsEl = document.getElementById("cd-secs");

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  const targetTime = new Date(targetDateISO).getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetTime - now;

    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      const statusNotice = document.getElementById("cd-status");
      if (statusNotice) {
        statusNotice.textContent = "¡HOY ES LA NOCHE! PUERTAS ABIERTAS";
        statusNotice.classList.add("event-live");
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minsEl.textContent = String(minutes).padStart(2, "0");
    secsEl.textContent = String(seconds).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

/**
 * ------------------------------------------------------------------------------
 * 2. MAPA INTERACTIVO DE TARIMA Y MESAS
 * ------------------------------------------------------------------------------
 */
function initStageMap(config) {
  const detailPanel = document.getElementById("map-detail-card");
  const detailZoneBadge = document.getElementById("map-detail-zone");
  const detailTitle = document.getElementById("map-detail-title");
  const detailPrice = document.getElementById("map-detail-price");
  const detailCapacity = document.getElementById("map-detail-capacity");
  const detailIncludes = document.getElementById("map-detail-includes");
  const detailStatus = document.getElementById("map-detail-status");
  const detailBtn = document.getElementById("map-detail-btn");

  const tableElements = document.querySelectorAll(".interactive-table, .interactive-zone");
  let activeElement = null;

  // Mapa de mesas por ID para consulta rápida
  const tableMap = {};
  config.tables.forEach(t => { tableMap[t.id] = t; });

  tableElements.forEach(el => {
    const tableId = el.getAttribute("data-id");
    const tableData = tableMap[tableId];

    if (tableData && tableData.soldOut) {
      el.classList.add("is-sold-out");
      el.setAttribute("aria-disabled", "true");
      el.setAttribute("title", `${tableData.label} - AGOTADA`);
    }

    el.addEventListener("click", () => {
      selectTarget(el, tableData);
    });

    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectTarget(el, tableData);
      }
    });
  });

  function selectTarget(el, tableData) {
    if (activeElement) {
      activeElement.classList.remove("is-active");
    }
    activeElement = el;
    el.classList.add("is-active");

    const zoneKey = el.getAttribute("data-zone") || (tableData ? tableData.zone : "diamante");
    const zoneInfo = config.zones[zoneKey];
    const isSoldOut = tableData && tableData.soldOut;

    // Actualizar datos del panel informativo
    if (detailZoneBadge) {
      detailZoneBadge.textContent = zoneInfo ? zoneInfo.name : "ZONA VIP";
      detailZoneBadge.style.backgroundColor = zoneInfo ? zoneInfo.color : "#E2307C";
    }

    if (detailTitle) {
      if (tableData && !tableData.isBlock) {
        detailTitle.textContent = `Mesa ${tableData.label} · Zona ${zoneInfo.name}`;
      } else if (tableData && tableData.isBlock) {
        detailTitle.textContent = `${tableData.label} · Admisión General`;
      } else {
        detailTitle.textContent = `Zona ${zoneInfo ? zoneInfo.name : "VIP"}`;
      }
    }

    if (detailPrice) {
      if (zoneInfo.price) {
        detailPrice.innerHTML = `<span class="price-val">$ ${Number(zoneInfo.price).toLocaleString("es-CO")} COP</span>`;
      } else {
        detailPrice.innerHTML = `<span class="price-tbd shimmer-text">Muy pronto [POR CONFIRMAR]</span>`;
      }
    }

    if (detailCapacity) {
      detailCapacity.textContent = tableData && tableData.capacity
        ? `Capacidad: hasta ${tableData.capacity} personas [POR CONFIRMAR]`
        : `Capacidad: ${zoneInfo.capacity}`;
    }

    if (detailIncludes && zoneInfo && zoneInfo.includes) {
      detailIncludes.innerHTML = zoneInfo.includes.map(inc => `<li>✦ ${inc}</li>`).join("");
    }

    if (detailStatus) {
      if (isSoldOut) {
        detailStatus.className = "detail-status status-soldout";
        detailStatus.textContent = "● MESA AGOTADA";
        if (detailBtn) {
          detailBtn.classList.add("disabled");
          detailBtn.textContent = "Mesa no disponible";
          detailBtn.onclick = null;
        }
      } else {
        detailStatus.className = "detail-status status-available";
        detailStatus.textContent = "● DISPONIBLE PARA RESERVA";
        if (detailBtn) {
          detailBtn.classList.remove("disabled");
          detailBtn.textContent = `Reservar ${tableData ? tableData.label : zoneInfo.name}`;
          detailBtn.onclick = () => {
            selectInBookingForm(zoneKey, tableData ? tableData.id : null);
          };
        }
      }
    }

    // Asegurarse de que el panel tenga el glow de la zona activa
    if (detailPanel) {
      detailPanel.classList.add("has-selection");
      detailPanel.style.borderColor = zoneInfo ? zoneInfo.color : "#E3A92B";
      detailPanel.style.boxShadow = `0 0 25px ${zoneInfo ? zoneInfo.accentGlow : "rgba(245,140,30,0.4)"}`;
    }
  }

  // Preseleccionar la primera mesa disponible (D-01) al cargar
  const firstTable = document.querySelector('.interactive-table[data-id="D-01"]');
  if (firstTable && tableMap["D-01"]) {
    selectTarget(firstTable, tableMap["D-01"]);
  }
}

/**
 * ------------------------------------------------------------------------------
 * 3. SECCIÓN DE ZONAS Y PRECIOS
 * ------------------------------------------------------------------------------
 */
function initPricingSection(config) {
  const container = document.getElementById("pricing-cards-container");
  if (!container) return;

  const zonesList = Object.values(config.zones);

  const cardsHtml = zonesList.map(zone => {
    const isPriced = typeof zone.price === "number" && zone.price > 0;
    const priceHtml = isPriced
      ? `<div class="pricing-amount">$ ${Number(zone.price).toLocaleString("es-CO")} <small>COP</small></div>`
      : `<div class="pricing-amount-tbd shimmer-text">Muy pronto</div>
         <p class="pricing-tbd-note">[Precios oficiales por confirmar]</p>`;

    const notifyBtnText = isPriced ? "Reservar esta zona" : "Avísame cuando salgan";
    const notifyActionAttr = isPriced
      ? `data-action="book" data-zone="${zone.id}"`
      : `data-action="notify" data-zone="${zone.name}"`;

    const includesHtml = zone.includes.map(inc => `<li><span class="inc-star">✦</span> ${inc}</li>`).join("");

    return `
      <div class="pricing-card zone-${zone.id}" style="--zone-color: ${zone.color}; --zone-glow: ${zone.accentGlow}">
        <div class="pricing-card-header">
          <div class="zone-pill-tag" style="background-color: ${zone.color}">
            ${zone.name}
          </div>
          <span class="zone-badge-label">${zone.badge}</span>
        </div>

        <div class="pricing-card-body">
          <div class="price-box">
            ${priceHtml}
          </div>
          <p class="zone-capacity-text">👥 ${zone.capacity}</p>
          <p class="zone-desc-text">${zone.description}</p>
          
          <ul class="zone-features-list">
            ${includesHtml}
          </ul>
        </div>

        <div class="pricing-card-footer">
          <button type="button" class="btn btn-zone-action" ${notifyActionAttr} style="border-color: ${zone.color}">
            <span class="btn-icon">💬</span>
            <span class="btn-text">${notifyBtnText}</span>
          </button>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = cardsHtml;

  // Manejador de clics en los botones de precio
  container.querySelectorAll(".btn-zone-action").forEach(btn => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-action");
      const zoneName = btn.getAttribute("data-zone");

      if (action === "book") {
        selectInBookingForm(zoneName, null);
      } else {
        // Enviar WhatsApp avisando interés en precios
        const defaultPhone = config.whatsapp.primary.number;
        const msg = `¡Hola! Quiero que me avisen de inmediato cuando salgan los precios oficiales para la zona ${zoneName} de VENESTI en VIBRA (21 de noviembre).`;
        window.open(`https://wa.me/${defaultPhone}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
      }
    });
  });
}

/**
 * ------------------------------------------------------------------------------
 * 4. FORMULARIO DE RESERVA / COMPRA Y ENLACE DE WHATSAPP
 * ------------------------------------------------------------------------------
 */
function initBookingForm(config) {
  const form = document.getElementById("reservation-form");
  const lineRadios = document.querySelectorAll('input[name="whatsapp-line"]');
  const zoneSelect = document.getElementById("form-zone");
  const tableSelect = document.getElementById("form-table");
  const gatewayNotice = document.getElementById("gateway-notice");

  if (!form) return;

  // Llenar selector de mesas
  if (tableSelect) {
    const defaultOpt = document.createElement("option");
    defaultOpt.value = "";
    defaultOpt.textContent = "Sin mesa específica (Asignar la mejor disponible)";
    tableSelect.appendChild(defaultOpt);

    config.tables.forEach(t => {
      const opt = document.createElement("option");
      opt.value = t.id;
      opt.textContent = `${t.label} (${t.zone.toUpperCase()})${t.soldOut ? " - [AGOTADA]" : ""}`;
      if (t.soldOut) {
        opt.disabled = true;
      }
      tableSelect.appendChild(opt);
    });
  }

  // Sincronizar selección de zona con filtro de mesas
  if (zoneSelect && tableSelect) {
    zoneSelect.addEventListener("change", () => {
      const selectedZone = zoneSelect.value;
      Array.from(tableSelect.options).forEach(opt => {
        if (!opt.value) return; // Opción por defecto
        const tData = config.tables.find(t => t.id === opt.value);
        if (tData) {
          if (!selectedZone || tData.zone === selectedZone) {
            opt.hidden = false;
          } else {
            opt.hidden = true;
          }
        }
      });
      // Si la mesa actual no pertenece a la zona elegida, deseleccionarla
      const currentTable = config.tables.find(t => t.id === tableSelect.value);
      if (currentTable && selectedZone && currentTable.zone !== selectedZone) {
        tableSelect.value = "";
      }
    });
  }

  // Notificación de pasarela de pago desactivada
  if (gatewayNotice && config.paymentGateway) {
    gatewayNotice.innerHTML = `
      <div class="gateway-info-box">
        <div class="gateway-info-header">
          <span class="gateway-icon">💳</span>
          <strong>PAGO EN LÍNEA: ${config.paymentGateway.provider}</strong>
        </div>
        <p>${config.paymentGateway.statusText}</p>
      </div>
    `;
  }

  // Envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("form-name").value.trim();
    const phone = document.getElementById("form-phone").value.trim();
    const zoneVal = document.getElementById("form-zone").value;
    const guests = document.getElementById("form-guests").value;
    const tableVal = document.getElementById("form-table").value;
    const notes = document.getElementById("form-notes").value.trim();

    if (!name || !phone) {
      alert("Por favor diligencia tu nombre y número de celular para continuar con la reserva.");
      return;
    }

    // Determinar número de WhatsApp seleccionado (Línea 1 o Línea 2)
    let selectedNumber = config.whatsapp.primary.number;
    const activeRadio = document.querySelector('input[name="whatsapp-line"]:checked');
    if (activeRadio && activeRadio.value === "linea2") {
      selectedNumber = config.whatsapp.secondary.number;
    }

    // Nombre legible de la zona
    const zoneName = config.zones[zoneVal] ? config.zones[zoneVal].name : zoneVal;

    // Crear mensaje prellenado según especificación exacta:
    // "Hola, quiero reservar para VENESTI en VIBRA (21 nov). Nombre: __ · Zona: __ · Personas: __"
    const bookingData = {
      name: name,
      phone: phone,
      zone: zoneName || "Por confirmar",
      guests: guests || "1",
      table: tableVal || "A convenir",
      notes: notes
    };

    const textMessage = config.whatsapp.createBookingMessage(bookingData);
    const waUrl = `https://wa.me/${selectedNumber}?text=${encodeURIComponent(textMessage)}`;

    // Abrir WhatsApp en nueva pestaña
    window.open(waUrl, "_blank", "noopener");
  });
}

/**
 * Función auxiliar para seleccionar zona y mesa en el formulario desde el mapa o las tarjetas
 */
function selectInBookingForm(zoneKey, tableId) {
  const zoneSelect = document.getElementById("form-zone");
  const tableSelect = document.getElementById("form-table");
  const reservationSection = document.getElementById("reserva");

  if (zoneSelect && zoneKey) {
    zoneSelect.value = zoneKey;
    zoneSelect.dispatchEvent(new Event("change"));
  }

  if (tableSelect && tableId) {
    tableSelect.value = tableId;
  }

  if (reservationSection) {
    reservationSection.scrollIntoView({ behavior: "smooth", block: "start" });
    // Animar temporalmente el formulario para dar feedback visual al usuario
    reservationSection.classList.add("form-focus-pulse");
    setTimeout(() => {
      reservationSection.classList.remove("form-focus-pulse");
    }, 1600);
  }
}

/**
 * ------------------------------------------------------------------------------
 * 5. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
 * ------------------------------------------------------------------------------
 */
function initFaqAccordion(config) {
  const container = document.getElementById("faq-accordion");
  if (!container || !config.faqs) return;

  const faqsHtml = config.faqs.map((faq, index) => {
    return `
      <div class="faq-item" id="faq-item-${index}">
        <button type="button" class="faq-question" aria-expanded="false" aria-controls="faq-ans-${index}">
          <span class="faq-question-text">${faq.question}</span>
          <span class="faq-toggle-icon" aria-hidden="true">+</span>
        </button>
        <div id="faq-ans-${index}" class="faq-answer" role="region" aria-labelledby="faq-item-${index}" hidden>
          <div class="faq-answer-inner">
            <p>${faq.answer}</p>
          </div>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = faqsHtml;

  const faqItems = container.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question");
    const ans = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-toggle-icon");

    btn.addEventListener("click", () => {
      const isExpanded = btn.getAttribute("aria-expanded") === "true";

      // Cerrar los demás acordeones para mantener orden en móvil
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          const otherBtn = otherItem.querySelector(".faq-question");
          const otherAns = otherItem.querySelector(".faq-answer");
          const otherIcon = otherItem.querySelector(".faq-toggle-icon");
          otherBtn.setAttribute("aria-expanded", "false");
          otherAns.hidden = true;
          otherItem.classList.remove("is-open");
          if (otherIcon) otherIcon.textContent = "+";
        }
      });

      // Alternar el actual
      if (isExpanded) {
        btn.setAttribute("aria-expanded", "false");
        ans.hidden = true;
        item.classList.remove("is-open");
        if (icon) icon.textContent = "+";
      } else {
        btn.setAttribute("aria-expanded", "true");
        ans.hidden = false;
        item.classList.add("is-open");
        if (icon) icon.textContent = "−";
      }
    });
  });
}

/**
 * ------------------------------------------------------------------------------
 * 6. BOTÓN FLOTANTE DE WHATSAPP (MÓVIL)
 * ------------------------------------------------------------------------------
 */
function initFloatingWhatsApp(config) {
  const floatingBtn = document.getElementById("floating-whatsapp-btn");
  if (!floatingBtn) return;

  const defaultPhone = config.whatsapp.primary.number;
  const msg = "Hola, quiero información y reservar para el show de VENESTI en VIBRA Discoteca (21 de noviembre).";
  floatingBtn.href = `https://wa.me/${defaultPhone}?text=${encodeURIComponent(msg)}`;

  // Ocultar levemente cuando el usuario está justo sobre el formulario de compra
  // para no tapar los campos en pantallas muy pequeñas
  const bookingSection = document.getElementById("reserva");
  if (bookingSection && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          floatingBtn.classList.add("is-dimmed");
        } else {
          floatingBtn.classList.remove("is-dimmed");
        }
      });
    }, { threshold: 0.3 });

    observer.observe(bookingSection);
  }
}

/**
 * ------------------------------------------------------------------------------
 * 7. DESPLAZAMIENTO SUAVE ENTRE SECCIONES
 * ------------------------------------------------------------------------------
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}

/**
 * ------------------------------------------------------------------------------
 * 8. ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER)
 * ------------------------------------------------------------------------------
 */
function initIntersectionAnimations() {
  // Respetar prefers-reduced-motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const animTargets = document.querySelectorAll(".animate-on-scroll, .section-ornament, .pricing-card");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animTargets.forEach(target => observer.observe(target));
  }
}
