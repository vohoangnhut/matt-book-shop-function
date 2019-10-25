const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: `book.store.sg.x@gmail.com`,
        pass: `Nhut54321`
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      
        // getting dest email by query string
        const _to = req.query.to;
        const _subject = req.query.subject;
        const _body = req.query.body;

        const mailOptions = {
            from: 'Matt <book.store.sg.x@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: _to,
            subject: _subject,
            html: _body // email content in HTML
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });    
});