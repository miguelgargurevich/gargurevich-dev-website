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
    const { message, context, sentiment, sessionId, conversationContext, userSentiment } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });


    // --- FLUJO CONVERSACIONAL DINÁMICO ---
    let systemPrompt = `Eres un asistente profesional de Gargurevich.Dev, expertos en desarrollo web y soluciones digitales.\n\nEXPERTISE:\n- Desarrollo Web (Angular, Next.js, React, TypeScript)\n- E-commerce\n- Landing Pages\n- Apps a medida\n- Integración IA y DevOps\n\nINSTRUCCIONES:\n- Responde SIEMPRE en español, tono profesional, claro y consultivo.\n- Si es el primer mensaje, SOLO haz 2-3 preguntas clave para entender el proyecto (no muestres precios ni tablas aún).\n- Si ya tienes respuestas a las preguntas clave, sugiere el siguiente paso o haz una recomendación concreta.\n- SOLO muestra la tabla de precios si el usuario ya dio detalles claros de su proyecto.\n- Si el usuario pide presupuesto sin detalles, explica que necesitas más información.\n- Si el usuario responde a una pregunta, avanza a la siguiente.\n- Si el usuario está indeciso, sugiere ejemplos o casos de éxito.\n- Usa formato markdown solo para listas o tablas si es relevante.\n- No repitas siempre el mismo saludo.\n- Si el usuario ya respondió todo, ofrece agendar una llamada o enviar propuesta.\n- Si el usuario pregunta por tecnologías, explica brevemente el stack.\n- Si el usuario pregunta por tiempos, da rangos realistas según el tipo de proyecto.\n- Si el usuario pregunta por ejemplos, sugiere visitar el portafolio.\n- Si el usuario tiene bajo presupuesto, sugiere MVP o plantillas.\n- Si el usuario parece perdido, guía con preguntas simples.\n- Si el usuario ya está decidido, ofrece siguiente paso concreto.\n- NUNCA inventes precios si no tienes contexto suficiente.\n- SIEMPRE responde de forma breve y avanza paso a paso.\n`;

    let enhancedPrompt = `${systemPrompt}\n`;
    if (conversationContext) enhancedPrompt += `CONTEXTO DE LA CONVERSACIÓN:\n${conversationContext}\n`;
    else if (context) enhancedPrompt += `CONVERSACIÓN PREVIA:\n${context}\n`;

    const sentimentData = userSentiment || sentiment;
    if (sentimentData) {
      enhancedPrompt += `ANÁLISIS DE SENTIMIENTO DEL CLIENTE:\n- Sentimiento: ${sentimentData.label} (puntuación: ${sentimentData.score})\n`;
      if (sentimentData.label && sentimentData.label.includes('negative')) {
        enhancedPrompt += `- INSTRUCCIÓN: El cliente muestra sentimiento negativo. Usa un tono empático.\n`;
      } else if (sentimentData.label && sentimentData.label.includes('positive')) {
        enhancedPrompt += `- INSTRUCCIÓN: El cliente muestra entusiasmo. Mantén el tono positivo.\n`;
      }
      enhancedPrompt += `\n`;
    }
    if (sessionId) enhancedPrompt += `ID de Sesión: ${sessionId}\n`;
    enhancedPrompt += `\nMENSAJE DEL USUARIO:\n${message}\n`;

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
