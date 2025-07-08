import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, ...rest } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER, // Configura en Vercel
      pass: process.env.MAIL_PASS  // Configura en Vercel
    }
  });

  try {
    // Construir HTML bonito para el brief
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9f9f9;border-radius:8px;">
        <h2 style="color:#14213D;margin-bottom:8px;">Nuevo Brief Web recibido</h2>
        <hr style="border:none;border-top:2px solid #FCA311;margin:16px 0;">
        <h3 style="color:#14213D;margin-bottom:4px;">Datos de contacto</h3>
        <ul style="padding-left:18px;">
          <li><b>Nombre:</b> ${name}</li>
          <li><b>Email:</b> ${email}</li>
          ${rest.phone ? `<li><b>Teléfono:</b> ${rest.phone}</li>` : ''}
          ${rest.company ? `<li><b>Empresa:</b> ${rest.company}</li>` : ''}
        </ul>
        <h3 style="color:#14213D;margin-bottom:4px;">Información del Proyecto</h3>
        <ul style="padding-left:18px;">
          ${rest.business ? `<li><b>Actividad:</b> ${rest.business}</li>` : ''}
          ${rest.goal ? `<li><b>Objetivo:</b> ${rest.goal}</li>` : ''}
          ${rest.sections ? `<li><b>Secciones:</b> ${rest.sections}</li>` : ''}
          ${rest.content ? `<li><b>¿Textos/Imágenes?:</b> ${rest.content}</li>` : ''}
          ${rest.branding ? `<li><b>¿Logotipo/Manual?:</b> ${rest.branding}</li>` : ''}
          ${rest.contactForm ? `<li><b>¿Formulario de contacto?:</b> ${rest.contactForm}</li>` : ''}
        </ul>
        <h3 style="color:#14213D;margin-bottom:4px;">Detalles y Extras</h3>
        <ul style="padding-left:18px;">
          ${rest.integrations ? `<li><b>Integraciones:</b> ${rest.integrations}</li>` : ''}
          ${rest.references ? `<li><b>Referencias:</b> ${rest.references}</li>` : ''}
          ${rest.deadline ? `<li><b>Fecha ideal de entrega:</b> ${rest.deadline}</li>` : ''}
          ${rest.comments ? `<li><b>Comentarios:</b> ${rest.comments}</li>` : ''}
        </ul>
        <hr style="border:none;border-top:1px solid #E5E5E5;margin:24px 0 8px 0;">
        <div style="font-size:12px;color:#888;">Enviado automáticamente desde Gargurevich.Dev</div>
      </div>
    `;
    await transporter.sendMail({
      from: `"Brief Web" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: 'Nuevo Brief desde Gargurevich.Dev',
      text: `Nombre: ${name}\nEmail: ${email}\n${Object.entries(rest).map(([k,v]) => `${k}: ${v}`).join('\n')}`,
      html
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
