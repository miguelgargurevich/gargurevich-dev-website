

import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';
import path from 'path';

export default async function handler(req, res) {
  // Log de depuración para ver el body recibido
  console.log('BODY RECIBIDO:', req.body);
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { nombre, email, detalles, brief, tipo, timeline, phone, company, service, budget, newsletter } = req.body;
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

  // 1. Inicializar PDFKit y buffers correctamente
  const buffers = [];
  const doc = new PDFDocument({ size: 'A4', margin: 40 });
  doc.on('data', (data) => buffers.push(data));

  // Paleta
  const azul = '#14213D';
  const naranja = '#FCA311';
  const gris = '#E5E5E5';
  const blanco = '#FFFFFF';
  const negro = '#000000';


  // Fondo blanco
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(blanco);




  if (tipo === 'cotizacion') {
    const pageWidth = doc.page.width;

    // Header visual (solo texto, sin imagen, tamaño más pequeño)
    doc.rect(0, 0, pageWidth, 70).fill(naranja); // Franja superior
    doc.fillColor('white').fontSize(20).font('Helvetica-Bold').text('GargurevichDev', 60, 28, { align: 'left' });
    doc.fillColor('white').fontSize(14).font('Helvetica').text('Propuesta de Servicios', 200, 32, { align: 'right' });

    // Espaciado extra para separar del header
    doc.moveDown(2.5);

    // Datos del cliente y proyecto
    doc.fontSize(11).fillColor(azul).text(`Cliente: `, { continued: true }).fillColor(negro).text(nombre || '-', { continued: false });
    doc.fontSize(11).fillColor(azul).text(`Email: `, { continued: true }).fillColor(negro).text(email || '-', { continued: false });
    if (phone) doc.fontSize(11).fillColor(azul).text(`Teléfono: `, { continued: true }).fillColor(negro).text(phone, { continued: false });
    if (company) doc.fontSize(11).fillColor(azul).text(`Empresa: `, { continued: true }).fillColor(negro).text(company, { continued: false });
    if (timeline) doc.fontSize(11).fillColor(azul).text(`Plazo de entrega: `, { continued: true }).fillColor(negro).text(timeline, { continued: false });
    doc.fontSize(11).fillColor(azul).text(`Fecha: `, { continued: true }).fillColor(negro).text(new Date().toLocaleDateString('es-PE'));

    // Comentarios adicionales
    if (detalles) {
      doc.moveDown(0.5);
      doc.fontSize(11).fillColor(azul).text('Comentarios adicionales:', { underline: false });
      doc.fontSize(11).fillColor(negro).text(detalles);
    }

    doc.moveDown(1);

    // Servicio solicitado (único, por contexto del brief)
    doc.moveDown(1);
    doc.fontSize(12).fillColor(naranja).text('Servicio solicitado:', { underline: false });
    doc.moveDown(0.3);
    doc.fontSize(11).fillColor(azul).text(service || '-', { align: 'left' });

    // Firma (opcional)
    doc.moveDown(2);
    doc.fontSize(10).fillColor(azul).text('Atentamente,', { align: 'left' });
    doc.fontSize(12).fillColor(negro).text('Miguel Gargurevich', { align: 'left' });
    doc.fontSize(10).fillColor(azul).text('Gerente Técnico - GargurevichDev');

    // --- Footer siempre al final de la página, sin crear páginas extra ---
    // Guardar posición actual
    const currentY = doc.y;
    const footerHeight = 80;
    const footerOffset = 100; // Subir el footer 20px más respecto al fondo
    // Si el contenido se acerca al footer, mover el cursor para dejar espacio
    if (currentY > doc.page.height - footerHeight - footerOffset) {
      doc.y = doc.page.height - footerHeight - footerOffset;
    }
    // Footer visual
    doc.rect(0, doc.page.height - footerHeight - 20, pageWidth, footerHeight).fill(azul);
    doc.fillColor('white').fontSize(10);
    doc.text('GargurevichDev', 60, doc.page.height - 70 - 20);
    doc.text('Transformamos ideas en soluciones digitales', 60, doc.page.height - 55 - 20);
    doc.text('📍 Lima, Perú    📧 contacto@gargurevich.dev    📞 +51 966 918 363', 60, doc.page.height - 40 - 20);
    doc.fillColor(gris).fontSize(8).text('© 2025 GargurevichDev. Todos los derechos reservados.', 60, doc.page.height - 20 - 20);
    // Nunca crear páginas extra
    while (doc.page && doc._pageBuffer && doc._pageBuffer.length > 1) {
      doc.removePage(doc._pageBuffer.length - 1);
    }
  }

else {
  const pageWidth = doc.page.width;

  // Header visual igual que cotización
  doc.rect(0, 0, pageWidth, 70).fill(naranja); // Franja superior
  doc.fillColor('white').fontSize(20).font('Helvetica-Bold').text('GargurevichDev', 60, 28, { align: 'left' });
  doc.fillColor('white').fontSize(14).font('Helvetica').text('Consulta de Contacto', 200, 32, { align: 'right' });

  // Espaciado extra para separar del header
  doc.moveDown(2.5);

  // Datos del contacto (labels azul, valores negro)
  doc.fontSize(11).fillColor(azul).text('Nombre: ', { continued: true }).fillColor(negro).text(nombre || '-', { continued: false });
  doc.fontSize(11).fillColor(azul).text('Email: ', { continued: true }).fillColor(negro).text(email || '-', { continued: false });
  if (phone) doc.fontSize(11).fillColor(azul).text('Teléfono: ', { continued: true }).fillColor(negro).text(phone, { continued: false });
  if (company) doc.fontSize(11).fillColor(azul).text('Empresa: ', { continued: true }).fillColor(negro).text(company, { continued: false });
  if (service) doc.fontSize(11).fillColor(azul).text('Servicio de interés: ', { continued: true }).fillColor(negro).text(service, { continued: false });
  if (budget) doc.fontSize(11).fillColor(azul).text('Presupuesto estimado: ', { continued: true }).fillColor(negro).text(budget, { continued: false });
  if (timeline) doc.fontSize(11).fillColor(azul).text('Plazo estimado: ', { continued: true }).fillColor(negro).text(timeline, { continued: false });
  doc.fontSize(11).fillColor(azul).text('Desea newsletter: ', { continued: true }).fillColor(negro).text(newsletter ? 'Sí' : 'No', { continued: false });

  // Mensaje
  if (detalles || brief) {
    doc.moveDown(0.5);
    doc.fontSize(11).fillColor(azul).text('Mensaje:', { underline: false });
    doc.fontSize(11).fillColor(negro).text(detalles || brief);
  }

  // --- Footer igual que cotización ---
  const currentY = doc.y;
  const footerHeight = 80;
  const footerOffset = 100;
  if (currentY > doc.page.height - footerHeight - footerOffset) {
    doc.y = doc.page.height - footerHeight - footerOffset;
  }
  doc.rect(0, doc.page.height - footerHeight - 20, pageWidth, footerHeight).fill(azul);
  doc.fillColor('white').fontSize(10);
  doc.text('GargurevichDev', 60, doc.page.height - 70 - 20);
  doc.text('Transformamos ideas en soluciones digitales', 60, doc.page.height - 55 - 20);
  doc.text('📍 Lima, Perú    📧 contacto@gargurevich.dev    📞 +51 966 918 363', 60, doc.page.height - 40 - 20);
  doc.fillColor(gris).fontSize(8).text('© 2025 GargurevichDev. Todos los derechos reservados.', 60, doc.page.height - 20 - 20);
  while (doc.page && doc._pageBuffer && doc._pageBuffer.length > 1) {
    doc.removePage(doc._pageBuffer.length - 1);
  }
}

  doc.end();

  const pdfBuffer = await new Promise((resolve, reject) => {
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });
    doc.on('error', (err) => {
      reject(err);
    });
  });

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
      'Adjuntamos un PDF con el resumen de tu requerimiento.\n' +
      'Un especialista revisará tu solicitud y te contactaremos pronto.\n' +
      '\n¡Gracias por confiar en nosotros!\n' +
      'Equipo GargurevichDev\n\n\n';
  } else {
    textMsg = `Hola${nombre ? ' ' + nombre : ''},\n\n` +
      '¡Gracias por contactarnos!\n' +
      'Adjuntamos un PDF con el resumen de tu consulta.\n' +
      'Un miembro de nuestro equipo te responderá a la brevedad.\n' +
      '\n¡Gracias por tu interés en GargurevichDev!\n\n\n';
  }
  

  const subjectService = service ? ` - ${service}` : '';
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
