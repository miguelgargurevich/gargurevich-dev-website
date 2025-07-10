
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';

export default async function handler(req, res) {
  // Log de depuración para ver el body recibido
  console.log('BODY RECIBIDO:', req.body);
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { nombre, email, detalles, brief, tipo } = req.body;
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
  const smtpPass = 'Zl@tan2016'; // Por seguridad, usa variables de entorno en producción

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

  // Generar PDF según tipo
  if (tipo === 'cotizacion') {
    // Cotización: branding, resumen, detalles, espacio para precios
    doc.fillColor(naranja).fontSize(28).text('Gargurevich.Dev', { align: 'center', underline: false });
    doc.moveDown(0.5);
    doc.lineWidth(2).moveTo(60, doc.y).lineTo(doc.page.width - 60, doc.y).stroke(naranja);
    doc.moveDown(1.5);
    doc.fontSize(16).fillColor(azul).text('Propuesta de Cotización', { align: 'left', underline: false });
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor(negro).text(`Nombre: `, { continued: true }).fillColor(azul).text(nombre || '-', { continued: false });
    doc.fontSize(12).fillColor(negro).text(`Email: `, { continued: true }).fillColor(azul).text(email || '-', { continued: false });
    doc.fontSize(12).fillColor(negro).text(`Tipo: Cotización`);
    doc.moveDown(1);
    doc.fontSize(14).fillColor(naranja).text('Detalles del proyecto:', { underline: false });
    doc.moveDown(0.2);
    doc.fontSize(12).fillColor(negro).text(detalles || brief || 'Sin detalles', { align: 'left' });
    doc.moveDown(1);
    doc.fontSize(14).fillColor(azul).text('Condiciones y precios:', { underline: false });
    doc.fontSize(12).fillColor(negro).text('Los precios y condiciones serán definidos tras una reunión de validación de requerimientos.', { align: 'left' });
    doc.moveDown(2);
    doc.fontSize(10).fillColor(gris).text('Gargurevich.Dev · Propuestas digitales', { align: 'center' });
    doc.fontSize(10).fillColor(azul).text('www.gargurevich.dev', { align: 'center', link: 'https://gargurevich.dev', underline: true });
  } else {
    // Contacto: simple, solo datos y mensaje
    doc.fillColor(naranja).fontSize(28).text('Gargurevich.Dev', { align: 'center', underline: false });
    doc.moveDown(0.5);
    doc.lineWidth(2).moveTo(60, doc.y).lineTo(doc.page.width - 60, doc.y).stroke(naranja);
    doc.moveDown(1.5);
    doc.fontSize(16).fillColor(azul).text('Consulta de contacto', { align: 'left', underline: false });
    doc.moveDown(0.5);
    doc.fontSize(12).fillColor(negro).text(`Nombre: `, { continued: true }).fillColor(azul).text(nombre || '-', { continued: false });
    doc.fontSize(12).fillColor(negro).text(`Email: `, { continued: true }).fillColor(azul).text(email || '-', { continued: false });
    doc.fontSize(12).fillColor(negro).text(`Tipo: Contacto`);
    doc.moveDown(1);
    doc.fontSize(14).fillColor(naranja).text('Mensaje:', { underline: false });
    doc.moveDown(0.2);
    doc.fontSize(12).fillColor(negro).text(detalles || brief || 'Sin detalles', { align: 'left' });
    doc.moveDown(2);
    doc.fontSize(10).fillColor(gris).text('Gargurevich.Dev · Consultas digitales', { align: 'center' });
    doc.fontSize(10).fillColor(azul).text('www.gargurevich.dev', { align: 'center', link: 'https://gargurevich.dev', underline: true });
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
    textMsg = `Hola${nombre ? ' ' + nombre : ''},\n\n¡Gracias por solicitar una cotización con Gargurevich.Dev!\n\nAdjuntamos un PDF con el resumen de tu requerimiento. Un especialista revisará tu solicitud y te contactaremos para validar detalles y enviarte una propuesta personalizada.\n\nSi tienes dudas, puedes responder a este correo o escribirnos por WhatsApp.\n\n¡Gracias por confiar en nosotros!\n\nEquipo Gargurevich.Dev`;
  } else {
    textMsg = `Hola${nombre ? ' ' + nombre : ''},\n\n¡Gracias por contactarnos!\n\nAdjuntamos un PDF con el resumen de tu consulta. Un miembro de nuestro equipo te responderá a la brevedad.\n\nSi tu mensaje es urgente, puedes escribirnos por WhatsApp o llamarnos directamente.\n\n¡Gracias por tu interés en Gargurevich.Dev!`;
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
