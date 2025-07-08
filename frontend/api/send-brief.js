
export default function handler(req, res) {
  if (req.method === 'POST') {
    res.status(200).json({ success: true, message: 'Brief recibido correctamente.' });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
