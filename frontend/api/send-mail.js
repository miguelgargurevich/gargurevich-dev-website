

import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';
import path from 'path';

export default async function handler(req, res) {
  // Log de depuración para ver el body recibido
  console.log('BODY RECIBIDO:', req.body);
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { nombre, email, detalles, brief, tipo, timeline, phone, company, service, budget, newsletter, servicios } = req.body;
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
    doc.fillColor('white').fontSize(20).font('Helvetica-Bold').text('Gargurevich.Dev', 60, 28, { align: 'left' });
    doc.fillColor('white').fontSize(14).font('Helvetica').text('Propuesta de Servicios', 200, 32, { align: 'right' });

    // Datos del cliente y proyecto
    doc.moveDown(2);
    doc.fontSize(11).fillColor(negro).text(`Cliente: `, { continued: true }).fillColor(azul).text(nombre || '-', { continued: false });
    doc.fontSize(11).fillColor(negro).text(`Email: `, { continued: true }).fillColor(azul).text(email || '-', { continued: false });
    if (phone) doc.fontSize(11).fillColor(negro).text(`Teléfono: `, { continued: true }).fillColor(azul).text(phone, { continued: false });
    if (company) doc.fontSize(11).fillColor(negro).text(`Empresa: `, { continued: true }).fillColor(azul).text(company, { continued: false });
    if (timeline) doc.fontSize(11).fillColor(negro).text(`Plazo de entrega: `, { continued: true }).fillColor(azul).text(timeline, { continued: false });
    doc.fontSize(11).fillColor(negro).text(`Fecha: `, { continued: true }).fillColor(azul).text(new Date().toLocaleDateString('es-PE'));

    // Comentarios adicionales
    if (detalles) {
      doc.moveDown(0.5);
      doc.fontSize(11).fillColor(negro).text('Comentarios adicionales:', { underline: false });
      doc.fontSize(11).fillColor(gris).text(detalles);
    }

    doc.moveDown(1);
    // Título de sección
    doc.fontSize(12).fillColor(naranja).text('Servicios propuestos:', { underline: false });
    doc.moveDown(0.3);

    // Tabla simple: nombre + descripción + precio
    if (Array.isArray(servicios) && servicios.length > 0) {
      let total = 0;
      servicios.forEach((servicio, i) => {
        doc.fontSize(11).fillColor(negro).text(`${i + 1}. ${servicio.nombre || 'Servicio sin nombre'}`, { continued: false });
        if (servicio.descripcion) doc.fontSize(10).fillColor(gris).text(servicio.descripcion);
        if (servicio.precio) doc.fontSize(11).fillColor(azul).text(`Precio: $${servicio.precio}`, { align: 'right' });
        total += parseFloat(servicio.precio) || 0;
        doc.moveDown(0.3);
      });
      // Total
      doc.moveDown(0.5);
      doc.fontSize(12).fillColor(negro).text(`Total: $${total.toFixed(2)}`, { align: 'right' });
    } else {
      doc.fontSize(11).fillColor(gris).text('No se detallaron servicios en esta solicitud.', { align: 'left' });
      doc.moveDown(0.5);
      doc.fontSize(12).fillColor(negro).text('Total: $0.00', { align: 'right' });
    }

  // Firma (opcional)
  doc.moveDown(2);
  doc.fontSize(10).fillColor(gris).text('Atentamente,', { align: 'left' });
  doc.fontSize(12).fillColor(negro).text('Miguel Gargurevich', { align: 'left' });
  doc.fontSize(10).fillColor(gris).text('Gerente Técnico - Gargurevich.Dev');

  // Footer
  // Usar azul oscuro definido arriba
  doc.rect(0, doc.page.height - 80, pageWidth, 80).fill(azul);
  doc.fillColor('white').fontSize(10);
  doc.text('Gargurevich.Dev', 60, doc.page.height - 70);
  doc.text('Transformamos ideas en soluciones digitales', 60, doc.page.height - 55);
  doc.text('📍 Lima, Perú    📧 contacto@gargurevich.dev    📞 +51 966 918 363', 60, doc.page.height - 40);

  doc.fillColor(gris).fontSize(8).text('© 2025 Gargurevich.Dev. Todos los derechos reservados.', 60, doc.page.height - 20);
}

else {
  const pageWidth = doc.page.width;


  // Header visual (solo texto, sin imagen, tamaño más pequeño)
  doc.rect(0, 0, pageWidth, 70).fill(naranja); // Franja superior
  doc.fillColor('white').fontSize(20).font('Helvetica-Bold').text('Gargurevich.Dev', 60, 28, { align: 'left' });
  doc.fillColor('white').fontSize(14).font('Helvetica').text('Consulta de Contacto', 200, 32, { align: 'right' });

  // Datos del contacto
  doc.moveDown(2);
  doc.fontSize(11).fillColor(negro).text(`Nombre: `, { continued: true }).fillColor(azul).text(nombre || '-', { continued: false });
  doc.fontSize(11).fillColor(negro).text(`Email: `, { continued: true }).fillColor(azul).text(email || '-', { continued: false });
  if (phone) doc.fontSize(11).fillColor(negro).text(`Teléfono: `, { continued: true }).fillColor(azul).text(phone, { continued: false });
  if (company) doc.fontSize(11).fillColor(negro).text(`Empresa: `, { continued: true }).fillColor(azul).text(company, { continued: false });
  if (service) doc.fontSize(11).fillColor(negro).text(`Servicio de interés: `, { continued: true }).fillColor(azul).text(service, { continued: false });
  if (budget) doc.fontSize(11).fillColor(negro).text(`Presupuesto estimado: `, { continued: true }).fillColor(azul).text(budget, { continued: false });
  if (timeline) doc.fontSize(11).fillColor(negro).text(`Plazo estimado: `, { continued: true }).fillColor(azul).text(timeline, { continued: false });
  doc.fontSize(11).fillColor(negro).text(`Desea newsletter: `, { continued: true }).fillColor(azul).text(newsletter ? 'Sí' : 'No', { continued: false });

  // Mensaje
  if (detalles || brief) {
    doc.moveDown(0.5);
    doc.fontSize(11).fillColor(negro).text('Mensaje:', { underline: false });
    doc.fontSize(11).fillColor(gris).text(detalles || brief);
  }

  // Footer
  doc.rect(0, doc.page.height - 80, pageWidth, 80).fill(azul);
  doc.fillColor('white').fontSize(10);
  doc.text('Gargurevich.Dev', 60, doc.page.height - 70);
  doc.text('Consultas digitales con visión técnica y humana', 60, doc.page.height - 55);
  doc.text('📍 Lima, Perú    📧 contacto@gargurevich.dev    📞 +51 966 918 363', 60, doc.page.height - 40);

  doc.fillColor(gris).fontSize(8).text('© 2025 Gargurevich.Dev. Todos los derechos reservados.', 60, doc.page.height - 20);
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

  // Mensaje personalizado para usuario y copia interna
  let textMsg = '';
  if (tipo === 'cotizacion') {
    // Correo en HTML y texto plano mejorado
    textMsg = `Hola${nombre ? ' ' + nombre : ''},\n\n` +
      '¡Gracias por solicitar una cotización con Gargurevich.Dev!\n' +
      'A continuación, el resumen de tu requerimiento:\n' +
      '---------------------------------------------\n' +
      `Nombre: ${nombre || '-'}\n` +
      `Email: ${email || '-'}\n` +
      (phone ? `Teléfono: ${phone}\n` : '') +
      (company ? `Empresa: ${company}\n` : '') +
      (timeline ? `Plazo de entrega: ${timeline}\n` : '') +
      (Array.isArray(servicios) && servicios.length > 0 ? `Servicios solicitados:\n${servicios.map((s,i)=>`  ${i+1}. ${s.nombre || '-'}${s.descripcion ? ' - ' + s.descripcion : ''}${s.precio ? ' ($' + s.precio + ')' : ''}`).join('\n')}\n` : '') +
      (detalles ? `Comentarios: ${detalles}\n` : '') +
      '---------------------------------------------\n' +
      '\nAdjuntamos un PDF con el resumen de tu requerimiento.\n(Ver archivo adjunto más abajo)\n' +
      '\nUn especialista revisará tu solicitud y te contactaremos para validar detalles y enviarte una propuesta personalizada.\n' +
      'Si tienes dudas, puedes responder a este correo o escribirnos por WhatsApp.\n' +
      '\n¡Gracias por confiar en nosotros!\n' +
      'Equipo Gargurevich.Dev';
  } else {
    // Correo de contacto en formato claro y ordenado
    textMsg = `Hola${nombre ? ' ' + nombre : ''},\n\n` +
      '¡Gracias por contactarnos!\n' +
      'A continuación, el resumen de tu consulta:\n' +
      '---------------------------------------------\n' +
      `Nombre: ${nombre || '-'}\n` +
      `Email: ${email || '-'}\n` +
      (phone ? `Teléfono: ${phone}\n` : '') +
      (company ? `Empresa: ${company}\n` : '') +
      (service ? `Servicio de interés: ${service}\n` : '') +
      (budget ? `Presupuesto estimado: ${budget}\n` : '') +
      (timeline ? `Plazo de entrega: ${timeline}\n` : '') +
      `Newsletter: ${newsletter ? 'Sí' : 'No'}\n` +
      (detalles || brief ? `Mensaje: ${detalles || brief}\n` : '') +
      '---------------------------------------------\n' +
      '\nAdjuntamos un PDF con el resumen de tu consulta.\n(Ver archivo adjunto más abajo)\n' +
      '\nUn miembro de nuestro equipo te responderá a la brevedad.\n' +
      'Si tu mensaje es urgente, puedes escribirnos por WhatsApp o llamarnos directamente.\n' +
      '\n¡Gracias por tu interés en Gargurevich.Dev!';
  }

  const mailOptions = {
    from: `Gargurevich.Dev Team<${smtpUser}>`,
    to: toList,
    subject: tipo === 'cotizacion' ? 'Tu cotización Gargurevich.Dev' : 'Nueva consulta de contacto',
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
