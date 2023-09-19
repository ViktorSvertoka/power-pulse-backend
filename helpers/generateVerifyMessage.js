const generateVerifyMessage = verificationToken =>
  `<html>
      <head>
        <style>
          body {
            font-size: 24px;
          }
          .container {
            max-width: 70%;
            margin: 0 auto;
            padding: 20px;
            background: #040404;
            font-family: "Cormorant Garamond", serif;
            border-radius: 12px;
            border: 1px solid rgba(239, 237, 232, 0.20);
            }
          h2 {
            font-size: 28px;
            margin-bottom: 10px;
            text-align: center;
          }
          a{
            display: block;
            font-size: 20px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class='container'>
          <h2>Hello from Backend, here\`s you verify link 👇️️️️️️</h2>
          <br />
          <a target="_blank" href="${process.env.BASE_URL}/api/auth/verify/${verificationToken}">Click for verify email</a>
        </div>
      </body>
    </html>`;

module.exports = generateVerifyMessage;
