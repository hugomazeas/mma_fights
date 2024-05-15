const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

const organisationsRoutes = require('./router/organisations.js');
const eventsRoutes = require('./router/events.js');
const fightersRoutes = require('./router/fighter.js');
const fightsRoutes = require('./router/fights.js');
const roundsRoutes = require('./router/rounds.js');
const simulationRoutes = require('./router/simulation.js');
const apiRoutes = require('./router/api.js');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware function to log requests
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
});
app.use((req, res, next) => {
    res.locals.template_suffix = req.xhr ? 'partial' : '';
    next();
});
app.get('/', (req, res) => {
    res.render('home');
});
app.use('/organisations', organisationsRoutes);
app.use('/organisations/:org_id/events', eventsRoutes);
app.use('/organisations/:org_id/events/:event_id/fights', fightsRoutes);
app.use('/organisations/:org_id/events/:event_id/fights/:fight_id/rounds', roundsRoutes);
app.use('/simulations', simulationRoutes);
app.use('/fighters', fightersRoutes);
app.use('/api', apiRoutes);

app.get('*', (req, res) => {
    if (!req.xhr && !req.path.includes('/api/')) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
});
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});