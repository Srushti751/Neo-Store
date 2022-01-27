const express = require('express')
const router = express.Router()
const pdf = require('html-pdf');
const pdfTermTemplate = require('../documents/info.js');
const pdfTemplate = require('../documents/index.js');

router.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('routes/result.pdf', (err) => {
        console.log(__dirname)
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

//creating terms and conditions PDF

router.post('/create-Termpdf', (req, res) => {
    pdf.create(pdfTermTemplate(req.body), {}).toFile('routes/term.pdf', (err) => {
        console.log(__dirname)
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

router.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})

//Fetching terms and conditions PDF
router.get('/fetch-Termpdf', (req, res) => {
    res.sendFile(`${__dirname}/term.pdf`)
})

module.exports = router