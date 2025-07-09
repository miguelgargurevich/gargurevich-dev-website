// /api/ai-chat.js
// Endpoint serverless para proxy seguro a Gemini API

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }
  // Usa el modelo Gemini 2.0 Flash (v1, recomendado para features nuevas)
  const GEMINI_MODEL = 'gemini-2.0-flash';
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent`;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'API Key no configurada en el servidor' });
  }

  try {
    // Construir prompt enriquecido (sin traducciones)
    const { message, locale = 'es', context, sentiment, sessionId, conversationContext, userSentiment } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    // Prompt base profesional (ajusta aquí tu prompt largo)
    let systemPrompt = 'Eres un asistente profesional de Gargurevich Dev, Desarrolladores Web & Especialistas en Soluciones Digitales.\n\nEXPERTISE:\n- Desarrollo Web (HTML, CSS, JavaScript, React, Next.js, Angular)\n- Soluciones de E-commerce\n- Landing Pages\n- Aplicaciones Móviles\n- Sistemas a Medida\n\nINSTRUCCIONES CRÍTICAS:\n- Responde en español de manera profesional y técnica\n- OBLIGATORIO: TODAS las estimaciones de precios deben estar SIEMPRE en Dólares Estadounidenses (USD)\n- OBLIGATORIO: Sigue SIEMPRE el formato específico con preguntas rápidas, tabla de estimaciones y opciones económicas\n- Usa formato en negrita para precios usando **$X,XXX USD**\n- Mantén un tono consultivo y experto';

    let enhancedPrompt = `${systemPrompt}\n\nEstimado usuario,\n\n`;
    if (conversationContext) enhancedPrompt += `CONTEXTO DE LA CONVERSACIÓN:\n${conversationContext}\n\n`;
    else if (context) enhancedPrompt += `CONTEXTO DE CONVERSACIÓN PREVIA:\n${context}\n\n`;

    const sentimentData = userSentiment || sentiment;
    if (sentimentData) {
      enhancedPrompt += `ANÁLISIS DE SENTIMIENTO DEL CLIENTE:\n- Sentimiento: ${sentimentData.label} (puntuación: ${sentimentData.score})\n`;
      if (sentimentData.label && sentimentData.label.includes('negative')) {
        enhancedPrompt += `- INSTRUCCIÓN ESPECIAL: El cliente muestra sentimiento negativo. Usa un tono empático.\n`;
      } else if (sentimentData.label && sentimentData.label.includes('positive')) {
        enhancedPrompt += `- INSTRUCCIÓN ESPECIAL: El cliente muestra sentimiento positivo. Mantén el entusiasmo.\n`;
      }
      enhancedPrompt += `\n`;
    }
    if (sessionId) enhancedPrompt += `ID de Sesión: ${sessionId}\n\n`;
    enhancedPrompt += `Consulta del cliente: ${message}`;

    // Construir body para Gemini
    const body = {
      contents: [
        { role: 'user', parts: [{ text: enhancedPrompt }] }
      ]
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    let data;
    try {
      data = await response.json();
    } catch (jsonErr) {
      data = {};
    }
    if (!response.ok) {
      if (response.status === 429) {
        return res.status(429).json({ error: {
          code: 429,
          message: 'La IA está temporalmente saturada o se ha superado la cuota gratuita. Por favor, intenta nuevamente en unos minutos o contáctanos si el problema persiste.'
        }});
      }
      if (response.status === 0 || !response.status) {
        return res.status(503).json({ error: {
          code: 503,
          message: 'No se pudo conectar con el servicio de IA. Por favor, revisa tu conexión o intenta más tarde.'
        }});
      }
      if (data && data.error && data.error.message) {
        return res.status(response.status).json({ error: {
          code: response.status,
          message: data.error.message
        }});
      }
      return res.status(response.status).json({ error: {
        code: response.status,
        message: 'No se pudo procesar la solicitud de IA. Por favor, intenta nuevamente más tarde o contáctanos si el problema persiste.'
      }});
    }

    // Post-procesado básico (puedes expandir según tu ejemplo)
    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    // Reemplazos de nombre y precios (puedes expandir)
    text = text.replace(/€(\d+)/g, '$$$1 USD');
    text = text.replace(/(\d+)\s*€/g, '$$$1 USD');
    text = text.replace(/(\d+)\s*(euros?|EUR)/gi, '$$$1 USD');
    text = text.replace(/(\d+)\s*(pesos?|MXN|CLP|ARS)/gi, '$$$1 USD');
    text = text.replace(/\$(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?!USD)/g, '$$$1 USD');
    text = text.replace(/\$(\d+(?:,\d{3})*(?:\.\d{2})?)\s*-\s*\$(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?!USD)/g, '$$$1 - $$$2 USD');

    // Puedes añadir más limpieza aquí

    return res.status(200).json({ response: text });
  } catch (error) {
    return res.status(503).json({ error: {
      code: 503,
      message: 'No se pudo conectar con el servicio de IA. Por favor, revisa tu conexión o intenta más tarde.'
    }});
  }
}
