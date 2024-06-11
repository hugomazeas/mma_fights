const express = require('express');
const passport = require('passport');
const path = require('path');
const sequelize = require('./config/database');
const organisationsRoutes = require('./router/organisations');
const eventsRoutes = require('./router/events');
const fightersRoutes = require('./router/fighter');
const fightsRoutes = require('./router/fights');
const roundsRoutes = require('./router/rounds');
const simulationRoutes = require('./router/simulation');
const apiRoutes = require('./router/api');
const authRoutes = require('./router/auth');
const registryRoutes = require('./router/registry');


const authenticate = require('./middleware/authenticate');
const logs = require('./middleware/logs');
const template_suffix = require('./middleware/template_suffix');
const utility = require('./middleware/utility');

require('./config/passport')(passport);


const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(passport.initialize());

app.use(logs);
app.use(template_suffix);
app.use(authenticate);
app.use(utility);


app.use('/organisations', organisationsRoutes);
app.use('/organisations/:org_id/events', eventsRoutes);
app.use('/organisations/:org_id/events/:event_id/fights', fightsRoutes);
app.use('/organisations/:org_id/events/:event_id/fights/:fight_id/rounds', roundsRoutes);
app.use('/simulations', simulationRoutes);
app.use('/fighters', fightersRoutes);
app.use('/api', apiRoutes);
app.use('/authentification', authRoutes);
app.use('/registry', registryRoutes);
app.get('/registry', async function (req, res) {
    res.render('registry');
});

app.get('*', (req, res) => {
    if (!req.xhr && !req.path.includes('/api/')) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
});
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
});