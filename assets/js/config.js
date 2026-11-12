/**
 * ==============================================================================
 * CONFIGURACIÓN CENTRALIZADA DEL EVENTO VENESTI EN VIBRA DISCOTECA
 * ==============================================================================
 * Todos los precios, mesas, datos de contacto, enlaces y estados están centralizados
 * aquí para que el equipo o cliente pueda editarlos fácilmente en un solo lugar.
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
    // Mensaje base cuando el usuario pulsa 'Avísame cuando salgan'
    notifyMessage: "¡Hola! Quiero que me avisen de inmediato cuando salgan los precios de las boletas y mesas para VENESTI en VIBRA (21 de noviembre de 2026).",
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

  // --- Zonas y Precios ---
  // Si el campo 'price' es null o 0, el sistema muestra "Muy pronto" con efecto shimmer
  // Cuando se confirmen los precios, basta con asignar el valor numérico en COP (ej. 3500000)
  zones: {
    diamante: {
      id: "diamante",
      name: "DIAMANTE",
      color: "#E2307C",
      accentGlow: "rgba(226, 48, 124, 0.4)",
      badge: "FRENTE A TARIMA",
      price: null, // [POR CONFIRMAR: ej. 4000000]
      priceDisplay: "[POR CONFIRMAR]",
      capacity: "[POR CONFIRMAR: Hasta 10 personas]",
      description: "Ubicación privilegiada en las dos primeras filas justo frente a la tarima de Venesti.",
      includes: [
        "Ubicación en primera línea frente al artista",
        "Servicio de mesero y bartender exclusivo",
        "Acceso VIP prioritario sin filas",
        "Consumo mínimo y cortesía de la casa [POR CONFIRMAR]"
      ]
    },
    oro: {
      id: "oro",
      name: "ORO",
      color: "#F2B01E",
      accentGlow: "rgba(242, 176, 30, 0.4)",
      badge: "ZONA PREFERENCIAL",
      price: null, // [POR CONFIRMAR: ej. 2800000]
      priceDisplay: "[POR CONFIRMAR]",
      capacity: "[POR CONFIRMAR: Hasta 8 a 10 personas]",
      description: "Mesas en alas laterales superiores y fila central posterior, con excelente vista elevada.",
      includes: [
        "Visión panorámica de la tarima y el show",
        "Mesas VIP cómodas en áreas lateral y central",
        "Atención personalizada a la mesa",
        "Acceso preferencial al venue"
      ]
    },
    plata: {
      id: "plata",
      name: "PLATA",
      color: "#1C4E9C",
      accentGlow: "rgba(28, 78, 156, 0.45)",
      badge: "ALAS LATERALES / GENERAL",
      price: null, // [POR CONFIRMAR: ej. 150000]
      priceDisplay: "[POR CONFIRMAR]",
      capacity: "[POR CONFIRMAR: Entrada individual / grupos]",
      description: "Ambiente de fiesta total, acceso a barras principales y zona lounge de Vibra.",
      includes: [
        "Ingreso general al concierto de Venesti",
        "Acceso a barras principales del piso 5",
        "Sonido envolvente de alta fidelidad",
        "Experiencia de fiesta non-stop"
      ]
    }
  },

  // --- Distribución de Mesas en la Tarima ---
  // Estructura:
  // DIAMANTE: 8 mesas en 2 filas de 4 (D-01 a D-08)
  // ORO: 3 mesas a cada lado arriba (O-01 a O-06) + 5 mesas en fila abajo (O-07 a O-11)
  // PLATA: 2 bloques azules a los lados (Plata Occidental y Plata Oriental)
  tables: [
    // Diamante - Fila 1 (frente inmediato a tarima)
    { id: "D-01", label: "D-01", zone: "diamante", row: 1, capacity: 10, soldOut: false },
    { id: "D-02", label: "D-02", zone: "diamante", row: 1, capacity: 10, soldOut: true }, // Ejemplo de mesa agotada configurable
    { id: "D-03", label: "D-03", zone: "diamante", row: 1, capacity: 10, soldOut: false },
    { id: "D-04", label: "D-04", zone: "diamante", row: 1, capacity: 10, soldOut: false },
    // Diamante - Fila 2
    { id: "D-05", label: "D-05", zone: "diamante", row: 2, capacity: 10, soldOut: false },
    { id: "D-06", label: "D-06", zone: "diamante", row: 2, capacity: 10, soldOut: false },
    { id: "D-07", label: "D-07", zone: "diamante", row: 2, capacity: 10, soldOut: false },
    { id: "D-08", label: "D-08", zone: "diamante", row: 2, capacity: 10, soldOut: false },

    // Oro - Lateral Izquierdo (3 mesas)
    { id: "O-01", label: "O-01", zone: "oro", row: "lateral-izq", capacity: 8, soldOut: false },
    { id: "O-02", label: "O-02", zone: "oro", row: "lateral-izq", capacity: 8, soldOut: false },
    { id: "O-03", label: "O-03", zone: "oro", row: "lateral-izq", capacity: 8, soldOut: false },

    // Oro - Lateral Derecho (3 mesas)
    { id: "O-04", label: "O-04", zone: "oro", row: "lateral-der", capacity: 8, soldOut: false },
    { id: "O-05", label: "O-05", zone: "oro", row: "lateral-der", capacity: 8, soldOut: true }, // Ejemplo de mesa agotada
    { id: "O-06", label: "O-06", zone: "oro", row: "lateral-der", capacity: 8, soldOut: false },

    // Oro - Fila Posterior Central (5 mesas)
    { id: "O-07", label: "O-07", zone: "oro", row: "centro-post", capacity: 8, soldOut: false },
    { id: "O-08", label: "O-08", zone: "oro", row: "centro-post", capacity: 8, soldOut: false },
    { id: "O-09", label: "O-09", zone: "oro", row: "centro-post", capacity: 8, soldOut: false },
    { id: "O-10", label: "O-10", zone: "oro", row: "centro-post", capacity: 8, soldOut: false },
    { id: "O-11", label: "O-11", zone: "oro", row: "centro-post", capacity: 8, soldOut: false },

    // Plata - Bloques Laterales
    { id: "P-IZQ", label: "Plata Izquierda", zone: "plata", isBlock: true, soldOut: false },
    { id: "P-DER", label: "Plata Derecha", zone: "plata", isBlock: true, soldOut: false }
  ],

  // --- Pasarela de Pago [POR CONFIRMAR: Wompi / ePayco / Mercado Pago] ---
  // Desactivada por defecto como se solicitó.
  paymentGateway: {
    enabled: false,
    provider: "[POR CONFIRMAR: Wompi / ePayco / Mercado Pago]",
    statusText: "Pasarela de pagos en línea por confirmar. Actualmente todas las reservas se gestionan vía WhatsApp oficial con atención personalizada."
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
      question: "¿Qué incluye el valor de la mesa o boleta?",
      answer: "El valor de cada mesa garantiza la ubicación reservada durante toda la noche, mesero dedicado y acceso preferencial VIP. [POR CONFIRMAR: El porcentaje o monto consumible en licores y bebidas de la carta oficial de Vibra se anunciará junto con los precios definitivos]."
    },
    {
      question: "¿Cuáles serán los métodos de pago disponibles?",
      answer: "Se aceptarán transferencias bancarias (Bancolombia, Davivienda), PSE, tarjetas de crédito/débito y efectivo en taquilla autorizada [POR CONFIRMAR: pasarela en línea Wompi / ePayco / Mercado Pago]."
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
