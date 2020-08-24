const express = require('express');
const router = express.Router();
const Drafts = require('../models/Draft');

router.get('/drafts', (req, res, next) => {
   Drafts.find({}).then((draft) => {
      res.send({ Drafts: draft });
   });
});

router.post('/draft', (req, res, next) => {
   Drafts.find({ _id: req.body.id }).then((draft) => {
      res.send({ Drafts: draft });
   });
});

router.post('/add-draft', (req, res) => {
   const { from, to, subject, msg, status } = req.body;
   let errors = [];
   console.log(req.body);
   if (!from || !status) {
      errors.push('Enter all required fields');
   }
   if (errors.length > 0) {
      res.send({
         errors,
      });
   } else {
      const newDraft = new Drafts({
         from,
         to,
         subject,
         msg,
         status,
      });
      newDraft.save().then((Draft) => {
         //console.log(user);
      });
      return res.send({ errors });
   }
});
module.exports = router;
