const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/User'); // or the correct path to your User model


const app = express();






// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));



// Example route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'routes', 'index.html'));
});


// Session setup
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/plastiRewards' })
}));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/plastiRewards')
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
// Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

app.get('/dashboard', (req, res) => {
  if (req.session.userId) {
    res.sendFile(path.join(__dirname, 'public/loginPage/dashboard.html'));
  } else {
    res.redirect('/loginPage/signInPage.html');
  }
});

app.get('/api/user', async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: "Unauthorized" });

  const user = await User.findById(req.session.userId);
  res.json({ name: user.name });
});



// ⚠️ Move this line below all your routes
app.use(express.static(path.join(__dirname, 'public')));


// Handle dashboard page after login
app.get('/dashboard', (req, res) => {
  if (req.session.userId) {
    res.sendFile(path.join(__dirname, 'public/loginPage/dashboard.html'));
  } else {
    res.redirect('/loginPage/signInPage.html');
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/loginPage/signInPage.html');
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
