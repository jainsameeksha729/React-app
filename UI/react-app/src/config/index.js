const defaultEnv = require("./default.json");

module.exports = {
    BASE_URL: process.env.REACT_APP_API_URL || defaultEnv.BASE_URL
}