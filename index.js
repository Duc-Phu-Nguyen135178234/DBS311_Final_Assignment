const express = require('express');
const mongoose = require('mongoose');
const path=require('path');
const dotenv = require('dotenv'); // Declare environment
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;




app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
// Middleware
app.use(bodyParser.json());

// Set up Handlebars
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        incrementedIndex: function (index) {
            return index + 1;
        }
    }
}));

app.set('view engine', 'hbs');



// Routes
app.use('/api', studentRoutes);

app.get('/', (req, res) => {
    res.redirect('/api/chart');
});


dotenv.config(); // Load environment variables
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connected to MongoDB");
})
.catch((error) => {
    console.log("Error connecting to MongoDB:", error);
});

// Start the server
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
