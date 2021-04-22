const forgotPasswordTemplate = {
    subject: "Strapi: Reset your password",
    html: `<p>We heard that you lost your password. Sorry about that!</p>
        <p>But don’t worry! You can use the following link to reset it:</p>
        <p><a href="<%= url %>">Reset password</a></p>
        <p>Thanks!</p>`,
    text: `We heard that you lost your password. Sorry about that!
    But don’t worry! You can use the following link to reset it:
    <%= url %>
    Thanks!`
}

module.exports = ({ env }) => ({
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
    forgotPassword: {
      emailTemplate: forgotPasswordTemplate
    }
  },
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  cron: {
    enabled: true
  }
});
