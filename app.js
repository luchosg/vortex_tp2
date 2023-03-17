const express = require('express');
require('dotenv').config();

const employeesRoutes = require('./routes/employees-routes');
const assetsRoutes = require('./routes/assets-routes');

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());

app.use('/employees', employeesRoutes);
app.use('/assets', assetsRoutes);
app.use((error, req, res, next) => {
    res.status(error.statusCode).json({error: error.message});
})

app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);