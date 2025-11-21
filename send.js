// ملف الإرسال - يرسل للإيميل عبر Google Apps Script

const GAS_URL = 'https://script.google.com/macros/s/AKfycbwNgKhmMm6D38Z2v5h83VmbzRkXMgyCpEBfoy3c0Ss6fVxYk0ycW0C1LdGsRHY5M_9JKA/exec';
const SECRET_TOKEN = 'Kk-056650';

async function submitForm() {
  const form = document.getElementById('giftForm');
  const orderId = document.getElementById('orderId').value;
  const sender = document.getElementById('sender').value;
  const receiver = document.getElementById('receiver').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;

  // التحقق من البيانات
  if (!orderId.trim() || !sender.trim() || !receiver.trim() || 
      !phone.trim() || !message.trim()) {
    return { ok: false };
  }

  // إرسال
  try {
    const formData = new FormData(form);
    // أضف التوكن
    formData.append('secret', SECRET_TOKEN);

    const response = await fetch(GAS_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    });

    return { ok: true };
  } catch (err) {
    console.error('Submission error:', err);
    return { ok: false };
  }
}