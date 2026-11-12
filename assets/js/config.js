/**
 * ==============================================================================
 * CONFIGURACIÓN CENTRALIZADA DEL EVENTO VENESTI EN VIBRA DISCOTECA
 * ==============================================================================
 * Todos los precios, mesas, datos de contacto, enlaces y estados están centralizados
 * aquí según el flyer oficial (venesti_vibra_feed_2).
 */

const EVENT_CONFIG = {
  // --- Metadatos del Evento ---
  artist: "VENESTI",
  artistSubtitle: "En vivo con show completo",
  venue: "VIBRA Discoteca",
  venueSub: "Zona T · Bogotá",
  address: "Cra 13 # 83-47, piso 5, Zona T, Bogotá",
  dateFull: "Sábado 21 de noviembre de 2026",
  dateShort: "21 NOV 2026",
  doorsTime: "8:00 p. m.",
  // Fecha y hora en formato ISO 8601 con zona horaria de Bogotá (UTC-5)
  eventDateISO: "2026-11-21T20:00:00-05:00",
  brandPhrase: "La noche se vive, se siente y se vibra en VIBRA.",

  // --- Líneas de WhatsApp de Reservas e Información ---
  whatsapp: {
    primary: {
      number: "573012273675",
      display: "301 227 3675",
      label: "Línea Reservas 1"
    },
    secondary: {
      number: "573159264893",
      display: "315 926 4893",
      label: "Línea Reservas 2"
    },
    // Mensaje base cuando el usuario pulsa para consultar
    notifyMessage: "¡Hola! Quiero consultar disponibilidad de boletas y mesas para VENESTI en VIBRA (21 de noviembre de 2026).",
    // Función que arma el mensaje de reserva formal
    createBookingMessage: function (data) {
      const parts = [
        "Hola, quiero reservar para VENESTI en VIBRA (21 nov).",
        `Nombre: ${data.name || "Sin especificar"}`,
        `Zona: ${data.zone || "Por definir"}`,
        `Personas: ${data.guests || "Por definir"}`
      ];
      if (data.table) {
        parts.push(`Mesa: ${data.table}`);
      }
      if (data.phone) {
        parts.push(`Celular: ${data.phone}`);
      }
      if (data.notes) {
        parts.push(`Comentarios: ${data.notes}`);
      }
      return parts.join(" · ");
    }
  },

  // --- Enlaces a Mapas ---
  maps: {
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Vibra+Discoteca+Cra+13+%23+83-47+Bogota",
    wazeUrl: "https://waze.com/ul?q=Cra%2013%20%23%2083-47%2C%20Bogot%C3%A1"
  },

  // --- Redes Sociales [POR CONFIRMAR Handles] ---
  social: {
    vibraInstagram: "https://instagram.com/vibra_bogota", // [POR CONFIRMAR]
    vibraHandle: "@vibra_bogota",
    venestiInstagram: "https://instagram.com/venestioficial", // [POR CONFIRMAR]
    venestiHandle: "@venestioficial"
  },

  // --- Zonas y Precios Oficiales (Actualizados según flyer venesti_vibra_feed_2) ---
  zones: {
    diamante: {
      id: "diamante",
      name: "DIAMANTE",
      color: "#D91E74",
      accentGlow: "rgba(217, 30, 116, 0.55)",
      badge: "FRENTE A TARIMA",
      price: 250000,
      priceFormatted: "$ 250.000",
      priceDisplay: "$ 250.000 COP",
      capacity: "[POR CONFIRMAR: Hasta 10 personas por mesa]",
      description: "Ubicación VIP en las 8 mesas principales situadas justo frente a la tarima de Venesti.",
      includes: [
        "Primera y segunda fila directamente frente al artista",
        "Servicio de mesero y bartender exclusivo",
        "Acceso VIP prioritario sin filas",
        "Atención preferencial durante toda la noche"
      ]
    },
    oro: {
      id: "oro",
      name: "ORO",
      color: "#E8A21C",
      accentGlow: "rgba(232, 162, 28, 0.55)",
      badge: "ZONA PREFERENCIAL",
      price: 180000,
      priceFormatted: "$ 180.000",
      priceDisplay: "$ 180.000 COP",
      capacity: "[POR CONFIRMAR: Hasta 8 a 10 personas por mesa]",
      description: "Mesas en alas laterales superiores (3 a cada lado) y fila central posterior (5 mesas) con excelente visibilidad.",
      includes: [
        "Visión panorámica de la tarima y el escenario",
        "Mesas VIP cómodas en áreas lateral y central",
        "Atención personalizada a la mesa",
        "Acceso preferencial al venue"
      ]
    },
    plata: {
      id: "plata",
      name: "PLATA",
      color: "#14539E",
      accentGlow: "rgba(20, 83, 158, 0.55)",
      badge: "ALAS LATERALES / GENERAL",
      price: 120000,
      priceFormatted: "$ 120.000",
      priceDisplay: "$ 120.000 COP",
      capacity: "[POR CONFIRMAR: Entrada individual / grupos]",
      description: "Grandes bloques laterales con acceso a barras principales y zona lounge de Vibra.",
      includes: [
        "Ingreso general al concierto de Venesti",
        "Acceso a barras principales del piso 5",
        "Sonido envolvente de alta fidelidad",
        "Experiencia de fiesta non-stop"
      ]
    }
  },

  // --- Distribución de Mesas en la Tarima (Exacta según flyer venesti_vibra_feed_2) ---
  // Estructura:
  // TARIMA: Superior centro
  // ORO SUPERIOR IZQUIERDO: 3 mesas horizontales (O-01, O-02, O-03)
  // ORO SUPERIOR DERECHO: 3 mesas horizontales (O-04, O-05, O-06)
  // PLATA: 2 grandes bloques verticales a los extremos (Plata Izquierda y Plata Derecha)
  // DIAMANTE: 8 mesas en 2 filas de 4 (D-01 a D-08) justo frente a tarima
  // ORO INFERIOR: 5 mesas horizontales en fila (O-07 a O-11)
  tables: [
    // Oro Superior Izquierdo (3 mesas)
    { id: "O-01", label: "Mesa Oro O-01", zone: "oro", section: "Oro Superior Izq", capacity: 8, soldOut: false },
    { id: "O-02", label: "Mesa Oro O-02", zone: "oro", section: "Oro Superior Izq", capacity: 8, soldOut: false },
    { id: "O-03", label: "Mesa Oro O-03", zone: "oro", section: "Oro Superior Izq", capacity: 8, soldOut: false },

    // Oro Superior Derecho (3 mesas)
    { id: "O-04", label: "Mesa Oro O-04", zone: "oro", section: "Oro Superior Der", capacity: 8, soldOut: false },
    { id: "O-05", label: "Mesa Oro O-05", zone: "oro", section: "Oro Superior Der", capacity: 8, soldOut: true }, // Ejemplo de mesa agotada configurable
    { id: "O-06", label: "Mesa Oro O-06", zone: "oro", section: "Oro Superior Der", capacity: 8, soldOut: false },

    // Diamante - Fila 1 (frente inmediato a tarima, 4 mesas)
    { id: "D-01", label: "Mesa Diamante D-01", zone: "diamante", section: "Diamante Fila 1", capacity: 10, soldOut: false },
    { id: "D-02", label: "Mesa Diamante D-02", zone: "diamante", section: "Diamante Fila 1", capacity: 10, soldOut: true }, // Ejemplo de mesa agotada
    { id: "D-03", label: "Mesa Diamante D-03", zone: "diamante", section: "Diamante Fila 1", capacity: 10, soldOut: false },
    { id: "D-04", label: "Mesa Diamante D-04", zone: "diamante", section: "Diamante Fila 1", capacity: 10, soldOut: false },

    // Diamante - Fila 2 (4 mesas)
    { id: "D-05", label: "Mesa Diamante D-05", zone: "diamante", section: "Diamante Fila 2", capacity: 10, soldOut: false },
    { id: "D-06", label: "Mesa Diamante D-06", zone: "diamante", section: "Diamante Fila 2", capacity: 10, soldOut: false },
    { id: "D-07", label: "Mesa Diamante D-07", zone: "diamante", section: "Diamante Fila 2", capacity: 10, soldOut: false },
    { id: "D-08", label: "Mesa Diamante D-08", zone: "diamante", section: "Diamante Fila 2", capacity: 10, soldOut: false },

    // Oro Inferior (5 mesas en fila)
    { id: "O-07", label: "Mesa Oro O-07", zone: "oro", section: "Oro Fila Inferior", capacity: 8, soldOut: false },
    { id: "O-08", label: "Mesa Oro O-08", zone: "oro", section: "Oro Fila Inferior", capacity: 8, soldOut: false },
    { id: "O-09", label: "Mesa Oro O-09", zone: "oro", section: "Oro Fila Inferior", capacity: 8, soldOut: false },
    { id: "O-10", label: "Mesa Oro O-10", zone: "oro", section: "Oro Fila Inferior", capacity: 8, soldOut: false },
    { id: "O-11", label: "Mesa Oro O-11", zone: "oro", section: "Oro Fila Inferior", capacity: 8, soldOut: false },

    // Plata - Bloques Laterales
    { id: "P-IZQ", label: "Bloque Plata Izquierda", zone: "plata", section: "Lateral Izquierdo", isBlock: true, soldOut: false },
    { id: "P-DER", label: "Bloque Plata Derecha", zone: "plata", section: "Lateral Derecho", isBlock: true, soldOut: false }
  ],

  // --- Pasarela de Pago [POR CONFIRMAR: Wompi / ePayco / Mercado Pago] ---
  paymentGateway: {
    enabled: false,
    provider: "[POR CONFIRMAR: Wompi / ePayco / Mercado Pago]",
    statusText: "Pasarela de pagos en línea por confirmar. Actualmente todas las reservas se gestionan vía WhatsApp oficial con confirmación inmediata."
  },

  // --- Preguntas Frecuentes (FAQ) ---
  faqs: [
    {
      question: "¿Cuál es la edad mínima para ingresar al evento?",
      answer: "El ingreso es exclusivo para mayores de 18 años (+18). Es obligatorio presentar la cédula de ciudadanía física original o pasaporte vigente en el filtro de seguridad [POR CONFIRMAR: no se admiten fotos ni contraseñas digitales]."
    },
    {
      question: "¿Cuál es el código de vestuario de VIBRA Discoteca?",
      answer: "Glamour nocturno / casual chic. Nos reservamos el derecho de admisión [POR CONFIRMAR: no se permite ingreso en ropa deportiva, pantalonetas, gorras deportivas o sandalias]."
    },
    {
      question: "¿Cuántas personas pueden ingresar por mesa reservada?",
      answer: "Las mesas de zona Diamante tienen capacidad para hasta 10 personas, y las mesas de zona Oro para 8 a 10 personas [POR CONFIRMAR]. En caso de requerir cupos adicionales, se debe consultar disponibilidad directamente con los coordinadores de reservas."
    },
    {
      question: "¿Qué incluye el valor de la boleta o mesa?",
      answer: "Zona Diamante ($ 250.000) y Zona Oro ($ 180.000) aseguran tu mesa VIP reservada toda la noche con atención de mesero. Zona Plata ($ 120.000) brinda acceso general a la fiesta y barras principales. [POR CONFIRMAR: Consumos de barra según carta oficial de Vibra]."
    },
    {
      question: "¿Cuáles son los métodos de pago disponibles?",
      answer: "Se aceptan transferencias bancarias directas (Bancolombia, Davivienda), PSE, tarjetas de crédito/débito y efectivo en taquilla autorizada [POR CONFIRMAR: pasarela en línea Wompi / ePayco / Mercado Pago]."
    },
    {
      question: "¿A qué hora iniciará la presentación de VENESTI?",
      answer: "Las puertas abrirán a las 8:00 p. m. con DJs invitados y la mejor rumba de Bogotá. La presentación estelar en vivo de VENESTI está programada para la medianoche [POR CONFIRMAR: horario sujeto al cronograma de producción de la discoteca]."
    },
    {
      question: "¿Cómo se confirma la reserva de una mesa?",
      answer: "Una vez diligenciado el formulario o enviado el mensaje por WhatsApp, un asesor oficial de VIBRA verificará la disponibilidad en tiempo real, brindará las opciones de pago y emitirá la confirmación y manillas digitales."
    }
  ],

  // --- Grandes éxitos de Venesti para la sección EL SHOW ---
  hits: [
    { title: "No Es Normal", tag: "Hit Mundial", desc: "El himno que rompió tendencias en toda Latinoamérica" },
    { title: "Umi", tag: "Favorito del Público", desc: "Ritmo y sentimiento urbano en su máxima expresión" },
    { title: "Shorty", tag: "Sensación Radial", desc: "La canción obligada en la noche de Vibra" },
    { title: "Poderosa", tag: "Colaboración Estelar", desc: "Energía pura para encender la pista" }
  ]
};

// Exportación global para navegadores
if (typeof window !== "undefined") {
  window.EVENT_CONFIG = EVENT_CONFIG;
}
