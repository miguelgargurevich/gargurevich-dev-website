// /api/ai-chat.js
// Endpoint serverless para proxy seguro a Gemini API

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Usa el modelo más reciente disponible según la lista de modelos
  // Ejemplo recomendado: Gemini 1.5 Pro 002
  const GEMINI_MODEL = 'gemini-1.5-pro-002';
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent`;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'API Key no configurada en el servidor' });
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.error || 'Error en Gemini API' });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Error interno en el proxy de IA' });
  }
}
