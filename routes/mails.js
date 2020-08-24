const express = require('express');
const router = express.Router();
const Mails = require('../models/Mail');

router.get('/mails', (req, res, next) => {
   Mails.find({}).then((mail) => {
      res.send({ Mails: mail });
   });
});

router.post('/mail', (req, res, next) => {
   Mails.find({ _id: req.body.id }).then((mail) => {
      res.send({ Mails: mail });
   });
});

router.post('/add-mail', (req, res) => {
   const { from, to, subject, msg, status } = req.body;
   let errors = [];
   console.log(req.body);
   if (!from || !to || !status) {
      errors.push('Enter all required fields');
   }
   if (errors.length > 0) {
      res.send({
         errors,
      });
   } else {
      const newMail = new Mails({
         from,
         to,
         subject,
         msg,
         status,
      });
      newMail.save().then((Mail) => {
         //console.log(user);
      });
      return res.send({ errors });
   }
});

router.post('/edit-mail', (req, res) => {
   const { _id } = req.body;
   let errors = [];
   if (_id) {
      Mails.findOneAndUpdate(
         { _id },
         {
            status: 'read',
         }
      ).then((Mail) => {
         if (!Mail) {
            errors.push('Item Not found');
            res.send({ errors });
         } else {
            res.send({ Mail, errors });
         }
      });
   }
});

module.exports = router;
