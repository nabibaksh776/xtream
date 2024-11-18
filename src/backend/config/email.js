export const smtpConfig = {
  host: process.env.NEXT_PUBLIC_SMTP_HOST,
  port: process.env.NEXT_PUBLIC_SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
      user: process.env.NEXT_PUBLIC_SMTP_USER,
      pass: process.env.NEXT_PUBLIC_SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Ignore self-signed certificates
  }
};
