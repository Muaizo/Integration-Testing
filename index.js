const express = require('express')
const app = express();
const appointmentsData = require('./src/appointments')

const port = 3009;

app.use(express.json())

app.use('/api/appointments', appointmentsData);

app.listen(port, () => {
    console.log("Listenning on Port", port);
})