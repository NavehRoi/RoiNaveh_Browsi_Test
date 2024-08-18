const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

//API routes with a base path of /api
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('Domain Management API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});