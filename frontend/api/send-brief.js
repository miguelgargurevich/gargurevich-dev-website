
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Aquí iría la lógica para procesar el brief/contacto
    res.status(200).json({ success: true, message: 'Brief recibido correctamente.' });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
