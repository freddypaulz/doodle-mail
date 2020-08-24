const express = require('express');

const mongoose = require('mongoose');

const passport = require('passport');

//Passport Config
require('./config/passport')(passport);

mongoose
   .connect(
      'mongodb+srv://freddypaulz:mongo123@cluster0-6kohd.mongodb.net/doodle_mail?retryWrites=true&w=majority',
      {
         useNewUrlParser: true,
         useCreateIndex: true,
         useUnifiedTopology: true,
         useFindAndModify: false,
      }
   )
   .then(() => {
      console.log('DB connected');
   })
   .catch((err) => {
      console.log(err);
   });

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', require('./routes/users'));
app.use('/mails', require('./routes/mails'));
app.use('/drafts', require('./routes/drafts'));

app.listen(PORT, () => {
   console.log(`App listening on port ${PORT}!`);
});
