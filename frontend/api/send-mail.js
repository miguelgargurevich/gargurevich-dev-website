

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

    // Header visual (solo texto, sin imagen)
    doc.rect(0, 0, pageWidth, 100).fill(naranja); // Franja superior
    doc.fillColor('white').fontSize(32).font('Helvetica-Bold').text('Gargurevich.Dev', 60, 40, { align: 'left' });
    doc.fillColor('white').fontSize(24).font('Helvetica').text('Propuesta de Servicios', 200, 50, { align: 'right' });

  doc.moveDown(4);

  // Cliente, Email, Plazo y Fecha
  doc.fontSize(12).fillColor(negro).text(`Cliente: `, { continued: true }).fillColor(azul).text(nombre || '-', { continued: false });
  doc.fontSize(12).fillColor(negro).text(`Email: `, { continued: true }).fillColor(azul).text(email || '-', { continued: false });
  if (timeline) doc.fontSize(12).fillColor(negro).text(`Plazo de entrega: `, { continued: true }).fillColor(azul).text(timeline, { continued: false });
  doc.fontSize(12).fillColor(negro).text(`Fecha: `, { continued: true }).fillColor(azul).text(new Date().toLocaleDateString('es-PE'));

  doc.moveDown(1);

  // Título de sección
  doc.fontSize(14).fillColor(naranja).text('Servicios propuestos:', { underline: false });
  doc.moveDown(0.5);

  // Tabla simple: nombre + descripción + precio
  if (Array.isArray(servicios) && servicios.length > 0) {
    servicios.forEach((servicio, i) => {
      doc.fontSize(12).fillColor(negro).text(`${i + 1}. ${servicio.nombre || 'Servicio sin nombre'}`, { continued: false });
      doc.fontSize(10).fillColor(gris).text(servicio.descripcion || 'Sin descripción');
      doc.fontSize(12).fillColor(azul).text(`Precio: $${servicio.precio || '0.00'}`, { align: 'right' });
      doc.moveDown(0.8);
    });
    // Total
    doc.moveDown(1);
    const total = servicios.reduce((sum, s) => sum + (parseFloat(s.precio) || 0), 0);
    doc.fontSize(14).fillColor(negro).text(`Total: $${total.toFixed(2)}`, { align: 'right' });
  } else {
    doc.fontSize(12).fillColor(gris).text('No se detallaron servicios en esta solicitud.', { align: 'left' });
    doc.moveDown(1);
    doc.fontSize(14).fillColor(negro).text('Total: $0.00', { align: 'right' });
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

  // Header visual (solo texto, sin imagen)
  doc.rect(0, 0, pageWidth, 100).fill(naranja); // Franja superior
  doc.fillColor('white').fontSize(32).font('Helvetica-Bold').text('Gargurevich.Dev', 60, 40, { align: 'left' });
  doc.fillColor('white').fontSize(24).font('Helvetica').text('Consulta de Contacto', 200, 50, { align: 'right' });

  doc.moveDown(4);

  // Datos del contacto
  doc.fontSize(12).fillColor(negro).text(`Nombre: `, { continued: true }).fillColor(azul).text(nombre || '-');
  doc.fontSize(12).fillColor(negro).text(`Email: `, { continued: true }).fillColor(azul).text(email || '-');
  if (phone) doc.fontSize(12).fillColor(negro).text(`Teléfono: `, { continued: true }).fillColor(azul).text(phone);
  if (company) doc.fontSize(12).fillColor(negro).text(`Empresa: `, { continued: true }).fillColor(azul).text(company);
  if (service) doc.fontSize(12).fillColor(negro).text(`Servicio de interés: `, { continued: true }).fillColor(azul).text(service);
  if (budget) doc.fontSize(12).fillColor(negro).text(`Presupuesto estimado: `, { continued: true }).fillColor(azul).text(budget);
  if (timeline) doc.fontSize(12).fillColor(negro).text(`Plazo estimado: `, { continued: true }).fillColor(azul).text(timeline);
  doc.fontSize(12).fillColor(negro).text(`Desea newsletter: `, { continued: true }).fillColor(azul).text(newsletter ? 'Sí' : 'No');

  doc.moveDown(1);

  // Mensaje
  doc.fontSize(14).fillColor(naranja).text('Mensaje:', { underline: false });
  doc.moveDown(0.3);
  doc.fontSize(12).fillColor(negro).text(detalles || brief || 'Sin mensaje', { align: 'left' });

  // Footer
  doc.rect(0, doc.page.height - 80, pageWidth, 80).fill(azulOscuro);
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
    textMsg = `Hola${nombre ? ' ' + nombre : ''},\n\n¡Gracias por solicitar una cotización con Gargurevich.Dev!\n\nAdjuntamos un PDF con el resumen de tu requerimiento.\n\nPlazo de entrega: ${timeline || '-'}\n\nUn especialista revisará tu solicitud y te contactaremos para validar detalles y enviarte una propuesta personalizada.\n\nSi tienes dudas, puedes responder a este correo o escribirnos por WhatsApp.\n\n¡Gracias por confiar en nosotros!\n\nEquipo Gargurevich.Dev`;
  } else {
    // Texto con todos los campos relevantes
    textMsg = `Hola${nombre ? ' ' + nombre : ''},\n\n¡Gracias por contactarnos!\n\nResumen de tu consulta:\n` +
      `Nombre: ${nombre || '-'}\n` +
      `Email: ${email || '-'}\n` +
      (phone ? `Teléfono: ${phone}\n` : '') +
      (company ? `Empresa: ${company}\n` : '') +
      (service ? `Servicio de interés: ${service}\n` : '') +
      (budget ? `Presupuesto estimado: ${budget}\n` : '') +
      (timeline ? `Plazo de entrega: ${timeline}\n` : '') +
      `Newsletter: ${newsletter ? 'Sí' : 'No'}\n` +
      `\nMensaje:\n${detalles || brief || 'Sin detalles'}\n` +
      `\nUn miembro de nuestro equipo te responderá a la brevedad.\n\nSi tu mensaje es urgente, puedes escribirnos por WhatsApp o llamarnos directamente.\n\n¡Gracias por tu interés en Gargurevich.Dev!`;
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
