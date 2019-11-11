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

exports.sendMailHTML = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      
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
                        <p>Hi! [get Name],</p>
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
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">0711190001</td>
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">Book</td>
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">3</td>
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">50</td>
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">100</td>
                            </tr>
                        </tr>
                    </table>
                    <br/>
                    <div style="overflow: hidden;">
            
                        <table style="border-collapse: collapse;margin-top: 1px;width: 300px;float: right;">
                            <tbody>
                                <tr>
                                    <td style="border: 1px solid black;padding: 5px;text-align: right;text-align: left;background: #eee;">Shipping Rate</td>
                                    <td style="border: 1px solid black;padding: 5px;text-align: right;text-align: center;">5</td>
                                </tr>
                                <tr>
                                    <td style="border: 1px solid black;padding: 5px;text-align: right;text-align: left;background: #eee;">Total Payment</td>
                                    <td style="border: 1px solid black;padding: 5px;text-align: right;text-align: center;">100</td>
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
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">AAA</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid black;padding: 5px;text-align: left;background: #eee;text-align: left;background: #eee;">Shipping Country</td>
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">AAA</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid black;padding: 5px;text-align: left;background: #eee;text-align: left;background: #eee;">Shipping Address</td>
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">AAA</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid black;padding: 5px;text-align: left;background: #eee;text-align: left;background: #eee;">Contact No.</td>
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">AAA</td>
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
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">AAA</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid black;padding: 5px;text-align: left;background: #eee;text-align: left;background: #eee;">Amount</td>
                                <td style="border: 1px solid black;padding: 5px;text-align: center;">AAA</td>
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
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sent');
        });
    });    
});