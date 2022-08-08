const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const usersRoutes = require('./routes/users');
const categorieRoutes = require('./routes/categories');
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use('/auth', authRoutes);
app.use('/project', projectRoutes);
app.use('/users', usersRoutes);
app.use('/categorie', categorieRoutes);

dotenv.config()
mongoose.connect(process.env.DATABASE_ACCESS).then(() => {
    console.log("Database connected!")
        // Port para quando for postar
        // app.listen(process.env.PORT || 3000, function() {
        //     console.log("Node application listening on port %d in %s mode", this.address().port, app.settings.env);
        // });
    app.listen(4000)
}).catch((err) => console.log("Error: ", err));