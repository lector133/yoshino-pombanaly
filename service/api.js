const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const api = axios.default.create({baseURL: process.env.URLPANEL});

module.exports = api;