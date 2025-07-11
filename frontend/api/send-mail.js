import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';

export default async function handler(req, res) {
  // Log de depuración para ver el body recibido
  console.log('BODY RECIBIDO:', req.body);
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { nombre, email, detalles, brief, tipo, timeline, phone, company, service, budget, newsletter, theme } = req.body;
  // tipo: 'cotizacion' o 'contacto'

  // Validación de campos obligatorios (debe ir aquí, después de obtener req.body)
  if (!nombre || !email || (!detalles && !brief) || !tipo) {
    return res.status(400).json({
      error: 'Faltan campos obligatorios',
      detail: `Campos requeridos: nombre, email, detalles/brief, tipo. Recibido: nombre=${!!nombre}, email=${!!email}, detalles=${!!detalles}, brief=${!!brief}, tipo=${!!tipo}`
    });
  }

  // Configuración SMTP según tipo
  const smtpUser = tipo === 'cotizacion' ? 'ventas@gargurevich.dev' : 'contacto@gargurevich.dev';
  const smtpPass = process.env.ZOHO_SMTP_PASS;
  if (!smtpPass) {
    return res.status(500).json({ error: 'No se encontró la variable de entorno ZOHO_SMTP_PASS para el password SMTP.' });
  }

  // --- Generación unificada de PDF ---
  async function generarPDF({ nombre, email, detalles, brief, tipo, timeline, phone, company, service, budget, newsletter, theme = 'dark' }) {
    const buffers = [];
    const doc = new PDFDocument({ size: 'A4', margin: 40 });
    doc.on('data', (data) => buffers.push(data));

    // Paletas por tema
    // Paleta de colores para PDF según tema visual
    const colorPalettes = {
      dark: {
        primaryBg: '#14213D',      // Azul oscuro: fondo header/footer
        accent: '#FCA311',         // Naranja: acentos y CTAs
        secondaryText: '#E5E5E5',  // Gris claro: textos secundarios
        surface: '#FFFFFF',        // Blanco: fondo principal
        primaryText: '#000000',    // Negro: textos principales
      },
      light: {
        primaryBg: '#4FC3F7',      // Azul muy claro: fondo header/footer
        accent: '#FCA311',         // Naranja: acentos y CTAs
        secondaryText: '#E5E5E5',  // Azul celeste: textos secundarios y botones
        surface: '#FFFFFF',        // Blanco: fondo principal
        primaryText: '#14213D',    // Azul oscuro: textos principales
      }
    };
    
    // Normalizamos el valor de theme para evitar falsos negativos, pero por defecto siempre será 'dark' salvo que explícitamente sea 'light'
    let themeKey = 'dark';
    if (typeof theme === 'string' && theme.trim().toLowerCase() === 'light') {
      themeKey = 'light';
    }
    // Log de depuración para rastrear el valor recibido y el key usado
    console.log('PDF Theme recibido:', theme, '| ThemeKey aplicado:', themeKey);
    const {
      primaryBg,
      accent,
      secondaryText,
      surface,
      primaryText
    } = colorPalettes[themeKey];

    // Fondo principal
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(surface);
    const pageWidth = doc.page.width;
    // Layout
    const headerHeight = 120;
    const footerHeight = 120;
    const footerOffset = 30;
    const minBodySpace = 60;
    const maxBodyY = doc.page.height - footerHeight - footerOffset - minBodySpace;

    // --- Header ---
    doc.save();
    doc.rect(0, 0, pageWidth, headerHeight).fill(primaryBg);
    // Bajamos el texto de la cabecera para mayor separación del borde superior
    const headerTextOffset = 44; // antes 26
    const headerSubTextOffset = headerTextOffset + 28; // antes 54
    doc.fillColor(accent).fontSize(24).font('Helvetica-Bold').text('Gargurevich', 60, headerTextOffset, { continued: true });
    doc.fillColor(surface).fontSize(24).font('Helvetica-Bold').text('.Dev', undefined, headerTextOffset);
    doc.fillColor(secondaryText).fontSize(13).font('Helvetica').text(tipo === 'cotizacion' ? 'Propuesta de Servicios' : 'Consulta de Contacto', 60, headerSubTextOffset, { align: 'left' });
    doc.restore();

    // Espaciado extra para separar del header
    doc.moveDown(5);
    if (doc.y > maxBodyY) doc.y = maxBodyY;

    // --- Datos principales ---
    let contentStartY = doc.y;
    let contentEndY = 0;
    // Texto inicial amigable
    doc.moveDown(1);
    // Mostramos el nombre destacado, más grande y con color predominante
    if (nombre) {
      doc.fontSize(18).fillColor(themeKey === 'light' ? secondaryText : accent).text(`Hola ${nombre},`, { align: 'left' });
      doc.moveDown(0.5);
      doc.fontSize(13).fillColor(themeKey === 'light' ? secondaryText : accent).text(
        tipo === 'cotizacion'
          ? '¡Gracias por tu interés! A continuación, el resumen de tu solicitud:'
          : '¡Gracias por contactarnos! Aquí tienes el resumen de tu consulta:',
        { align: 'left' }
      );
    } else {
      doc.fontSize(13).fillColor(themeKey === 'light' ? secondaryText : accent).text(
        tipo === 'cotizacion'
          ? '¡Gracias por tu interés! A continuación, el resumen de tu solicitud:'
          : '¡Gracias por contactarnos! Aquí tienes el resumen de tu consulta:',
        { align: 'left' }
      );
    }
    doc.moveDown(1);
    if (tipo === 'cotizacion') {
      doc.fontSize(11).fillColor(primaryBg).text(`Cliente: `, { continued: true }).fillColor(primaryText).text(nombre || '-', { continued: false });
      doc.fontSize(11).fillColor(primaryBg).text(`Email: `, { continued: true }).fillColor(primaryText).text(email || '-', { continued: false });
      doc.fontSize(11).fillColor(primaryBg).text(`Fecha: `, { continued: true }).fillColor(primaryText).text(new Date().toLocaleDateString('es-PE'));
      if (phone) doc.fontSize(11).fillColor(primaryBg).text(`Teléfono: `, { continued: true }).fillColor(primaryText).text(phone, { continued: false });
      if (company) doc.fontSize(11).fillColor(primaryBg).text(`Empresa: `, { continued: true }).fillColor(primaryText).text(company, { continued: false });
      if (timeline) doc.fontSize(11).fillColor(primaryBg).text(`Plazo de entrega: `, { continued: true }).fillColor(primaryText).text(timeline, { continued: false });
      if (detalles) {
        doc.moveDown(0.5);
        doc.fontSize(11).fillColor(primaryBg).text('Comentarios adicionales:', { underline: false });
        doc.fontSize(11).fillColor(primaryText).text(detalles);
      }
      doc.moveDown(1);
      doc.moveDown(1);
      doc.fontSize(12).fillColor(accent).text('Servicio solicitado:', { underline: false });
      doc.moveDown(0.3);
      doc.fontSize(11).fillColor(primaryBg).text(service, { align: 'left' });
      // Firma y mensaje de contacto
      doc.moveDown(1);
      doc.fontSize(11).fillColor(primaryBg).text('Nos pondremos en contacto a la brevedad.', { align: 'left' });
      doc.moveDown(2);
      doc.fontSize(10).fillColor(primaryBg).text('Atentamente,', { align: 'left' });
      doc.fontSize(12).fillColor(primaryText).text('Miguel Gargurevich', { align: 'left' });
      doc.fontSize(10).fillColor(primaryBg).text('Gerente Técnico - GargurevichDev');
    } else {
      doc.fontSize(11).fillColor(primaryBg).text('Nombre: ', { continued: true }).fillColor(primaryText).text(nombre || '-', { continued: false });
      doc.fontSize(11).fillColor(primaryBg).text('Email: ', { continued: true }).fillColor(primaryText).text(email || '-', { continued: false });
      doc.fontSize(11).fillColor(primaryBg).text(`Fecha: `, { continued: true }).fillColor(primaryText).text(new Date().toLocaleDateString('es-PE'));
      if (phone) doc.fontSize(11).fillColor(primaryBg).text('Teléfono: ', { continued: true }).fillColor(primaryText).text(phone, { continued: false });
      if (company) doc.fontSize(11).fillColor(primaryBg).text('Empresa: ', { continued: true }).fillColor(primaryText).text(company, { continued: false });
      if (budget) doc.fontSize(11).fillColor(primaryBg).text('Presupuesto estimado: ', { continued: true }).fillColor(primaryText).text(budget, { continued: false });
      if (timeline) doc.fontSize(11).fillColor(primaryBg).text('Plazo estimado: ', { continued: true }).fillColor(primaryText).text(timeline, { continued: false });
      doc.fontSize(11).fillColor(primaryBg).text('Desea newsletter: ', { continued: true }).fillColor(primaryText).text(newsletter ? 'Sí' : 'No', { continued: false });
      doc.moveDown(1);
      doc.fontSize(12).fillColor(accent).text('Servicio de interés:', { underline: false });
      doc.moveDown(0.3);
      doc.fontSize(11).fillColor(primaryBg).text(service, { align: 'left' });
      if (detalles || brief) {
        doc.moveDown(0.5);
        doc.fontSize(11).fillColor(primaryBg).text('Mensaje:', { underline: false });
        doc.fontSize(11).fillColor(primaryText).text(detalles || brief);
      }
      // Firma y mensaje de contacto
      doc.moveDown(1);
      doc.fontSize(11).fillColor(primaryBg).text('Nos pondremos en contacto a la brevedad.', { align: 'left' });
      doc.moveDown(2);
      doc.fontSize(10).fillColor(primaryBg).text('Atentamente,', { align: 'left' });
      doc.fontSize(12).fillColor(primaryText).text('Miguel Gargurevich', { align: 'left' });
      doc.fontSize(10).fillColor(primaryBg).text('Gerente Técnico - GargurevichDev');
    }
    contentEndY = doc.y;

    // --- Footer ---
    // Si el contenido se extiende demasiado, recortamos para que el footer nunca pase a la segunda página
    const footerY = doc.page.height - footerHeight - footerOffset;
    const safeFooterY = footerY - 5;

    // Si el contenido invade el área del footer, recortamos el contenido y agregamos un aviso
    if (contentEndY > safeFooterY) {
      // Borramos la página y reescribimos solo lo que cabe
      doc._pageBuffer = [doc._pageBuffer[0]];
      doc.page = doc._pageBuffer[0];
      doc.y = contentStartY;
      doc.fillColor(naranja).fontSize(11).text('El contenido ha sido recortado para mantener el diseño compacto del PDF.', 60, safeFooterY - 30, { width: pageWidth - 120, align: 'center' });
    }
    // Eliminar cualquier página extra (solo 1 página)
    while (doc.page && doc._pageBuffer && doc._pageBuffer.length > 1) {
      doc.removePage(doc._pageBuffer.length - 1);
    }
    doc.save();
    // El fondo del footer ahora cubre desde el inicio del footer hasta el final de la página
    doc.rect(0, footerY, pageWidth, doc.page.height - footerY).fill(primaryBg);
    // Ajuste: bajamos los textos del footer para mayor separación visual respecto al borde superior
    const footerTextOffset = 28;
    // Definimos líneas con saltos (espacios en blanco) para separar visualmente los bloques
    const footerLine1 = footerY + footerTextOffset; // Gargurevich.Dev
    const footerLine2 = footerLine1 + 18; // espacio después del logo
    const footerLineSpace1 = footerLine2 + 10; // línea en blanco
    const footerLineSpace1b = footerLineSpace1 + 10; // salto de línea extra solicitado
    const footerLine3 = footerLineSpace1b + 10; // Servicios
    const footerLine4 = footerLine3 + 12; // Empresa y contacto
    const footerLine5 = footerLine4 + 10; // Derechos reservados

    doc.fillColor(accent).fontSize(16).font('Helvetica-Bold').text('Gargurevich', 60, footerLine1, { continued: true });
    doc.fillColor(surface).fontSize(16).font('Helvetica-Bold').text('.Dev', undefined, footerLine1);
    doc.fillColor(secondaryText).fontSize(9).font('Helvetica').text('Transformamos ideas en soluciones digitales de alta calidad con tecnología moderna y diseño innovador.', 60, footerLine2, { width: 400 });
    // Línea en blanco (footerLineSpace1)
    // Línea en blanco extra (footerLineSpace1b)
    // Bloque de servicios
    doc.fillColor(accent).fontSize(9).font('Helvetica-Bold').text('Servicios:', 60, footerLine3, { continued: true });
    doc.fillColor(surface).fontSize(9).font('Helvetica').text(' Landing Pages, Sitios Web Institucionales, E-commerce, Aplicaciones Web, Integración IA', undefined, footerLine3);
    // Bloque de contacto
    doc.fillColor(secondaryText).fontSize(9).font('Helvetica').text('Lima, Perú | contacto@gargurevich.dev | +51 966 918 363', 60, footerLine4);
    // Derechos reservados
    doc.fillColor(secondaryText).fontSize(8).text('© 2025 Gargurevich.Dev. Todos los derechos reservados.', 60, footerLine5);
    doc.restore();

    doc.end();
    return await new Promise((resolve, reject) => {
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });
      doc.on('error', (err) => {
        reject(err);
      });
    });
  }

  // Generar el PDF según los datos recibidos y el tema
  const pdfBuffer = await generarPDF({ nombre, email, detalles, brief, tipo, timeline, phone, company, service, budget, newsletter, theme });

  // 2. Configurar transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  // 3. Opciones de correo
  // Enviar a ambos: usuario y Gargurevich.Dev
  const toList = tipo === 'cotizacion'
    ? [email, 'ventas@gargurevich.dev']
    : [email, 'contacto@gargurevich.dev'];
  // Mensaje breve, sin repetir datos (todo está en el PDF adjunto)
  let textMsg = '';
  if (tipo === 'cotizacion') {
    textMsg = `Hola${nombre ? ' ' + nombre : ''},\n\n` +
      '¡Gracias por solicitar una cotización con GargurevichDev!\n' +
      '\nAdjuntamos un PDF con el resumen de tu requerimiento.\n' +
      'Un especialista revisará tu solicitud y te contactaremos pronto.\n' +
      '\n¡Gracias por confiar en nosotros!\n' +
      'Equipo GargurevichDev\n\n\n';
  } else {
    textMsg = `Hola${nombre ? ' ' + nombre : ''},\n\n` +
      '¡Gracias por contactarnos!\n' +
      '\nAdjuntamos un PDF con el resumen de tu consulta.\n' +
      'Un miembro de nuestro equipo te responderá a la brevedad.\n' +
      '\n¡Gracias por tu interés en GargurevichDev!\n\n\n';
  }
  

  // El servicio siempre debe aparecer en el subject si existe, tanto para cotización como contacto
  let subjectService = '';
  if (service) {
    subjectService = ` - ${service}`;
  }
  const mailOptions = {
    from: `GargurevichDev Team<${smtpUser}>`,
    to: toList,
    subject:
      tipo === 'cotizacion'
        ? `Tu cotización GargurevichDev${subjectService}`
        : `Nueva consulta de contacto${subjectService}`,
    text: textMsg,
    attachments: [
      {
        filename: tipo === 'cotizacion' ? 'cotizacion.pdf' : 'consulta.pdf',
        content: pdfBuffer,
      },
    ],
  };

  try {
    console.log('Enviando correo a:', toList);
    const sendResult = await transporter.sendMail(mailOptions);
    console.log('Resultado sendMail:', sendResult);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('ERROR EN EL ENVÍO:', err);
    res.status(500).json({ error: 'No se pudo enviar el correo.', detail: err.message });
  }
}
