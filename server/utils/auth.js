import dotenv from 'dotenv';
dotenv.config();


async function verifyCaptcha(token, action) {
  const url = "https://www.google.com/recaptcha/api/siteverify";
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`
  });

  const data = await response.json();
  if(data.action !== action) return {success: false}
  return { success: true, score: data.score };
}

export  {verifyCaptcha} ;

