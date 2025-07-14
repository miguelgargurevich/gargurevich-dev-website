


// Endpoint dummy: solo responde con error y mensaje de migración
export default function handler(req, res) {
  res.status(410).json({
    error: 'Este endpoint ha sido deshabilitado. Ahora el envío de formularios se realiza directamente vía FormSubmit desde el frontend.'
  });
}
