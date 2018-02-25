const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const passport = require('./strategies/sql.strategies');
const sessionConfig = require('./modules/session.config'); 

// Route includes
const indexRouter = require('./routes/index.router');
const userRouter = require('./routes/user.router');
const registerRouter = require('./routes/register.router');
const showRouter = require('./routes/show.router');
const friendRouter = require('./routes/friend.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve back static files
app.use(express.static('./server/public'));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
// Routes
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/shows', showRouter);
app.use('/friends', friendRouter);

// Catch all bucket, must be last!
app.use('/', indexRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));