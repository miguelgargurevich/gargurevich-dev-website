
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'miguel@gargurevich.com'; // Debe estar verificado en Resend
const TO_EMAIL = 'miguel.gargurevich@gmail.com';

function renderBriefHtml({ nombre, email, mensaje, telefono, empresa, servicio }) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#fff;border-radius:8px;padding:32px 24px;color:#14213D;box-shadow:0 2px 8px #0001;">
      <h2 style="color:#FCA311;margin-bottom:8px;">Nuevo Brief de Cotización</h2>
      <p style="margin:0 0 16px 0;font-size:16px;">Has recibido un nuevo brief desde Gargurevich.Dev:</p>
      <table style="width:100%;font-size:15px;margin-bottom:24px;">
        <tr><td style="font-weight:bold;padding:4px 0;">Nombre:</td><td>${nombre || '-'}</td></tr>
        <tr><td style="font-weight:bold;padding:4px 0;">Email:</td><td>${email || '-'}</td></tr>
        <tr><td style="font-weight:bold;padding:4px 0;">Teléfono:</td><td>${telefono || '-'}</td></tr>
        <tr><td style="font-weight:bold;padding:4px 0;">Empresa:</td><td>${empresa || '-'}</td></tr>
        <tr><td style="font-weight:bold;padding:4px 0;">Servicio:</td><td>${servicio || '-'}</td></tr>
      </table>
      <div style="background:#E5E5E5;padding:16px 12px;border-radius:6px;margin-bottom:16px;">
        <strong style="color:#14213D;">Mensaje:</strong>
        <p style="margin:8px 0 0 0;white-space:pre-line;">${mensaje || '-'}</p>
      </div>
      <footer style="font-size:13px;color:#888;margin-top:24px;text-align:center;">Gargurevich.Dev · Notificación automática</footer>
    </div>
  `;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { nombre, email, mensaje, telefono, empresa, servicio } = req.body || {};

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const html = renderBriefHtml({ nombre, email, mensaje, telefono, empresa, servicio });
    const subject = `Nuevo Brief de ${nombre} (${empresa || 'Sin empresa'})`;

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
