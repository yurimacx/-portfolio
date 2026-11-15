let transporter = null;
if (process.env.SMTP_HOST) {
  const port = Number(process.env.SMTP_PORT) || 587;
  transporter = require('nodemailer').createTransport({
    host: process.env.SMTP_HOST, port, secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}
// Assunto fixo e e-mail já validado pelo zod: sem risco de injeção de cabeçalho.
module.exports = async function notify(m) {
  if (!transporter) return;
  await transporter.sendMail({
    from: process.env.SMTP_USER, to: process.env.NOTIFY_TO, replyTo: m.email,
    subject: 'Nova mensagem do portfólio', text: `${m.name} <${m.email}>\n\n${m.body}`,
  });
};
