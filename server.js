const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/send-gift', async (req, res) => {
  try {
    const { orderId, sender, receiver, phone, message } = req.body;

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'nuqtaksa8@gmail.com',
      subject: `طلب إهداء #${orderId} من ${sender}`,
      html: `
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
          <meta charset="UTF-8">
        </head>
        <body style="margin:0;padding:20px;background:#0b0b0b;color:#fff;font-family:'Cairo',Arial">
          <div style="max-width:600px;margin:0 auto;background:#151515;border-radius:18px;padding:30px">
            <h1 style="text-align:center">🎁 طلب إهداء جديد</h1>
            <p><strong>رقم الطلب:</strong> #${orderId}</p>
            <p><strong>المرسل:</strong> ${sender}</p>
            <p><strong>المهدى له:</strong> ${receiver}</p>
            <p><strong>الرقم:</strong> ${phone}</p>
            <p><strong>الرسالة:</strong></p>
            <p style="white-space:pre-wrap">${message}</p>
          </div>
        </body>
        </html>
      `
    });

    res.json({ success: true, id: result.id });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'Server is running ✅' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
