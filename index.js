const express = require('express');
const app = express();
const db = require('./database/index.js');
const PORT = process.env.PORT || 5000;

const tripsRoute = require('./routes/trips.js');
const usersRoute = require('./routes/users.js');
const messagesRoute = require('./routes/messages.js');
const commentsRoute = require('./routes/comments.js');

app.use(express.json());
app.use((req, res, next) => {
    console.log(`A ${req.method} for ${req.originalUrl}`);
    next();
});

app.use('/trips', tripsRoute);
app.use('/users', usersRoute);
app.use('/messages', messagesRoute);
// app.use('/comments', commentsRoute);

app.get('/', (req, res) => {
    res.status(200).send('Hello friend!');
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
