const express = require('express');
const app = express();
const port = 3000;

const organisationsRoutes = require('./router/organisations.js');
const eventsRoutes = require('./router/events.js');
const fightersRoutes = require('./router/fighter.js');
const fightsRoutes = require('./router/fights.js');
const roundsRoutes = require('./router/rounds.js');
const simulationRoutes = require('./router/simulation.js');

app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware function to log requests
app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/organisations', organisationsRoutes);
app.use('/organisations/:org_id/events', eventsRoutes);
app.use('/organisations/:org_id/events/:event_id/fights', fightsRoutes);
app.use('/organisations/:org_id/events/:event_id/fights/:fight_id/rounds', roundsRoutes);
app.use('/simulations', simulationRoutes);
app.use('/fighters', fightersRoutes);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

