const express = require('express');
const passport = require('passport');
const path = require('path');
const sequelize = require('./config/database');

// Routes declaration
const simulationRoutes = require('./router/simulation');
const apiRoutes = require('./router/api');
const authRoutes = require('./router/auth');
const registryRoutes = require('./router/registry');
const viewRoutes = require('./router/view');


// Middlewares declaration
const authenticate = require('./middleware/authenticate');
const logs = require('./middleware/logs');
const template_suffix = require('./middleware/template_suffix');
const utility = require('./middleware/utility');

require('./config/passport')(passport);


//Config
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    if(res.xhr) res.send(''); else res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(passport.initialize());

// Middlewares initailization
app.use(logs);
app.use(template_suffix);
app.use(authenticate);
app.use(utility);

//Routes initialization
app.use('/simulations', simulationRoutes);
app.use('/api', apiRoutes);
app.use('/views', viewRoutes);
app.use('/authentification', authRoutes);
app.use('/registry', registryRoutes);

app.get('*', (req, res) => {
    if (!req.xhr && !req.path.includes('/api/')) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
});
sequelize.sync({ logging: false }).then(() => {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
});