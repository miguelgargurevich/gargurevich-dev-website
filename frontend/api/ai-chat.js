// /api/ai-chat.js
// Endpoint serverless para proxy seguro a Gemini API

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }
 // prueba
  // Usa el modelo Gemini 2.0 Flash (v1beta, recomendado por Google para features nuevas)
  const GEMINI_MODEL = 'models/gemini-2.0-flash';
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'API Key no configurada en el servidor' });
  }

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify(req.body),
    });
    let data;
    try {
      data = await response.json();
    } catch (jsonErr) {
      data = {};
    }
    if (!response.ok) {
      // Encapsula el error 429 (cuota o rate limit) con un mensaje amigable
      if (response.status === 429) {
        return res.status(429).json({ error: {
          code: 429,
          message: 'La IA está temporalmente saturada o se ha superado la cuota gratuita. Por favor, intenta nuevamente en unos minutos o contáctanos si el problema persiste.'
        }});
      }
      // Encapsula cualquier error de red o fetch fallido
      if (response.status === 0 || !response.status) {
        return res.status(503).json({ error: {
          code: 503,
          message: 'No se pudo conectar con el servicio de IA. Por favor, revisa tu conexión o intenta más tarde.'
        }});
      }
      // Si Gemini devuelve un mensaje de error, muéstralo tal cual en el chat IA
      if (data && data.error && data.error.message) {
        return res.status(response.status).json({ error: {
          code: response.status,
          message: data.error.message
        }});
      }
      // Si no hay detalle, muestra un mensaje amigable y sugiere contactar soporte
      return res.status(response.status).json({ error: {
        code: response.status,
        message: 'No se pudo procesar la solicitud de IA. Por favor, intenta nuevamente más tarde o contáctanos si el problema persiste.'
      }});
    }
    return res.status(200).json(data);
  } catch (error) {
    // Error de red/fetch (por ejemplo, ECONNREFUSED, timeout, etc)
    return res.status(503).json({ error: {
      code: 503,
      message: 'No se pudo conectar con el servicio de IA. Por favor, revisa tu conexión o intenta más tarde.'
    }});
  }
}
