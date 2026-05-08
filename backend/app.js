const express = require('express');
const cors = require('cors');
const PostRoutes = require('./src/routes/PostRoutes')

const app = express()

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/api/posts', PostRoutes)

module.exports = app;