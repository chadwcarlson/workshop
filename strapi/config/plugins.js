module.exports = ({ env }) => ({
    email: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('PLATFORM_SMTP_HOST', 'smtp.example.com'),
        port: env('PLATFORM_SMTP_PORT', 25),
      },
      settings: {
        defaultFrom: 'no-reply@strapi.io',
        defaultReplyTo: 'no-reply@strapi.io',
      }
    }
  });
