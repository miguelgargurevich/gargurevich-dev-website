
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'miguel@gargurevich.com'; // Debe estar verificado en Resend
const TO_EMAIL = 'miguel.gargurevich@gmail.com';

function renderBriefHtml(fields) {
  // Paleta y dark mode
  const bg = '#14213D';
  const accent = '#FCA311';
  const light = '#E5E5E5';
  const white = '#FFFFFF';
  const labelStyle = 'font-weight:bold;padding:4px 0;color:' + accent;
  const valueStyle = 'color:' + white;
  // Título branding
  const title = `<div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
    <span style="display:inline-block;width:36px;height:36px;background:${accent};border-radius:8px;"></span>
    <span style="font-size:2rem;font-family:Montserrat,sans-serif;font-weight:700;color:${white};letter-spacing:1px;">Gargurevich.Dev</span>
  </div>`;
  // Campos a mostrar
  const rows = [
    ['Nombre', fields.nombre],
    ['Email', fields.email],
    ['Teléfono', fields.telefono],
    ['Empresa', fields.empresa],
    ['Servicio', fields.servicio],
    ['Actividad', fields.business],
    ['Objetivo', fields.goal],
    ['Tipo de integración', fields.integrationType],
    ['CMS', fields.cms],
    ['Secciones', fields.sections],
    ['Contenido listo', fields.content],
    ['Branding', fields.branding],
    ['Formulario de contacto', fields.contactForm],
    ['Integraciones externas', fields.integrations],
    ['Referencias', fields.references],
    ['Fecha ideal de entrega', fields.deadline],
    ['Plataforma', fields.platform],
    ['Productos/Servicios', fields.products],
    ['Características', fields.features],
    ['Audiencia', fields.audience],
    ['Comentarios', fields.comments],
  ].filter(([label, value]) => value && value !== '');
  // Tabla de campos
  const table = rows.length ? `<table style="width:100%;font-size:15px;margin-bottom:24px;">
    ${rows.map(([label, value]) => `<tr><td style='${labelStyle}'>${label}:</td><td style='${valueStyle}'>${value}</td></tr>`).join('')}
  </table>` : '';
  // Mensaje principal
  const mensaje = fields.mensaje || '-';
  return `
    <div style="font-family:Montserrat,Arial,sans-serif;max-width:600px;margin:auto;background:${bg};border-radius:12px;padding:32px 24px;color:${white};box-shadow:0 2px 16px #0003;">
      ${title}
      <h2 style="color:${accent};margin-bottom:8px;font-size:1.5rem;">Nuevo Brief de Cotización</h2>
      <p style="margin:0 0 16px 0;font-size:16px;color:${light};">Has recibido un nuevo brief desde Gargurevich.Dev:</p>
      ${table}
      <div style="background:${light};color:${bg};padding:16px 12px;border-radius:6px;margin-bottom:16px;">
        <strong style="color:${bg};">Mensaje:</strong>
        <p style="margin:8px 0 0 0;white-space:pre-line;">${mensaje}</p>
      </div>
      <footer style="font-size:13px;color:${light};margin-top:24px;text-align:center;">Gargurevich.Dev · Notificación automática</footer>
    </div>
  `;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }


  // Extraer todos los campos posibles (en español e inglés)
  const {
    nombre, name,
    email,
    mensaje, message,
    telefono, phone,
    empresa, company,
    servicio, service,
    business,
    goal,
    integrationType,
    cms,
    sections,
    content,
    branding,
    contactForm,
    integrations,
    references,
    deadline,
    platform,
    products,
    features,
    audience,
    comments,
    // honeypot y captcha no se envían
  } = req.body || {};

  // Normalización de campos
  const finalNombre = nombre || name;
  const finalMensaje = mensaje || message;
  const finalTelefono = telefono || phone;
  const finalEmpresa = empresa || company;
  const finalServicio = servicio || service;

  // Validación básica
  if (!finalNombre || !email || !(finalMensaje || business || goal)) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  // Construir objeto de campos para la plantilla
  const fields = {
    nombre: finalNombre,
    email,
    telefono: finalTelefono,
    empresa: finalEmpresa,
    servicio: finalServicio,
    business,
    goal,
    integrationType,
    cms,
    sections,
    content,
    branding,
    contactForm,
    integrations,
    references,
    deadline,
    platform,
    products,
    features,
    audience,
    comments,
    mensaje: finalMensaje
  };

  try {
    const html = renderBriefHtml(fields);
    const subject = `Nuevo Brief de ${finalNombre} (${finalEmpresa || 'Sin empresa'})`;

    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject,
      html,
      reply_to: email
    });

    if (data.error) {
      throw new Error(data.error.message || 'Error enviando email');
    }

    return res.status(200).json({ success: true, message: 'Brief recibido y enviado por email.' });
  } catch (err) {
    return res.status(500).json({ error: 'Error enviando el brief', details: err.message });
  }
}
