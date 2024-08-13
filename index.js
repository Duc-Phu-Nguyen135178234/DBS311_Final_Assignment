const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', studentRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://Duc_Phu_Nguyen:Looking4themoon1@cluster0.qdp1qnx.mongodb.net/seneca_students', {
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
