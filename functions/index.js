const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
const firebase = require('firebase');
const settings = { timestampsInSnapshots: true };
const config = {
    apiKey: 'AIzaSyDiDG_2F7eDYQChxPBFFli3yzO0X-CtWEE',
    authDomain: 'book-store-sg-x.firebaseapp.com',
    databaseURL: 'https://book-store-sg-x.firebaseio.com',
    projectId: 'book-store-sg-x',
    storageBucket: 'book-store-sg-x.appspot.com',
    messagingSenderId: '453359978560',
    appId: '1:453359978560:web:e0f0c40042025dd780b7a5',
    measurementId: 'G-YH3ZSZ5XYN'
}
firebase.initializeApp(config);
const db = firebase.firestore();
firebase.firestore().settings(settings);
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
            if (erro) {
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });
});

exports.sendMailHTML = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        getInfo(req.query.id).then(data => {
            // getting dest email by query string
            const _to = req.query.to;
            const _subject = req.query.subject;
            //const _body = req.query.body;

            const mailOptions = {
                from: 'Matt <book.store.sg.x@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
                to: _to,
                subject: _subject,
                html:
                    `<html>
            <body>
                <div style="width: 800px;margin: 0 auto;">
                    <div>
                        <p>Hi! ${data.shipping.name},</p>
                        <br/>
                        <p>Thank you for your purchase. Your payment for the purchase has been completed. Please check the order/shipping information</p>
                        <br/>
                        <p>1. Order Information</p>
                    </div>
                    <table style="border-collapse: collapse;clear: both;width: 100%;margin: 30px 0 0 0;border: 1px solid black;">
            
                        <thead>
                            <tr>
                                <th style="border: 1px solid black;padding: 5px;background: #eee;">Invoice No.</th>
                                <th style="border: 1px solid black;padding: 5px;background: #eee;">Product Name</th>
                                <th style="border: 1px solid black;padding: 5px;background: #eee;">Quantity</th>
                                <th style="border: 1px solid black;padding: 5px;background: #eee;">Unit Price</th>
                                <th style="border: 1px solid black;padding: 5px;background: #eee;">Total Price</th>
                            </tr>
                        </thead>
            
                        <tr>
                            <tr>
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">${data.inv_no.date}${data.inv_no.no}</td>
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">${data.product_name}</td>
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">${data.quantity}</td>
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">${data.unit_price}</td>
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">${data.total_price}</td>
                            </tr>
                        </tr>
                    </table>
                    <br/>
                    <div style="overflow: hidden;">
            
                        <table style="border-collapse: collapse;margin-top: 1px;width: 300px;float: right;">
                            <tbody>
                                <tr>
                                    <td style="border: 1px solid black;padding: 5px;text-align: right;text-align: left;background: #eee;">Shipping Rate</td>
                                    <td style="border: 1px solid black;padding: 5px;text-align: right;text-align: center;">${data.shipping_rate}</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid black;padding: 5px;text-align: right;text-align: left;background: #eee;">Total Payment</td>
                                    <td style="border: 1px solid black;padding: 5px;text-align: right;text-align: center;">${data.total_payment}</td>
                                </tr>
                            </tbody>
                        </table>
            
                    </div>
                    <div>
                        <p>2. Delivery Information</p>
                        <br/>
                    </div>
                    <table style="border-collapse: collapse;clear: both;width: 100%;margin: 30px 0 0 0;border: 1px solid black;">
                        <tbody>
                            <tr>
                                <td style="border: 1px solid black;padding: 5px;text-align: left;background: #eee;text-align: left;background: #eee;">Name</td>
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">${data.shipping.name}</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid black;padding: 5px;text-align: left;background: #eee;text-align: left;background: #eee;">Shipping Country</td>
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">${data.shipping.country}</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid black;padding: 5px;text-align: left;background: #eee;text-align: left;background: #eee;">Shipping Address</td>
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">${data.shipping.address} ${data.shipping.postal_code}</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid black;padding: 5px;text-align: left;background: #eee;text-align: left;background: #eee;">Contact No.</td>
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">${data.shipping.contact_no}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <br/>
                        <p>3. Payment Information</p>
                    </div>
                    <table style="border-collapse: collapse;clear: both;width: 100%;margin: 30px 0 0 0;border: 1px solid black;">
                        <tbody>
                            <tr>
                                <td style="border: 1px solid black;padding: 5px;text-align: left;background: #eee;text-align: left;background: #eee;">Payment Mothod</td>
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">Paypal</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid black;padding: 5px;text-align: left;background: #eee;text-align: left;background: #eee;">Amount</td>
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">${data.total_payment}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    <div>
                        <p>Please do not reply to this e-mail as we are not able to respond to this messages sent to this e-mail address.</p>
                        <br/>
                        <p>Thank You,</p>
                        <p>thelandlordclub</p>
                    </div>
                </div>
            </body>
            
            </html>`
            };

            // returning result
            return transporter.sendMail(mailOptions, (erro, info) => {
                if (erro) {
                    return res.send(erro.toString());
                }
                return res.send('Sent');
            });
        });
    });
});

var getInfo = function (documentId) {
    return new Promise((resolve, reject) => {
        db.collection("order")
            .doc(documentId)
            .get()
            .then(doc => {
                if (doc.exists) {
                    resolve(doc.data());
                }
            })
            .catch(error => {
                reject(error); // the request failed
            });
    });
};