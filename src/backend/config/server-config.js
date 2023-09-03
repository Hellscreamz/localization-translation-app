require('dotenv').config();

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 5 * 60 * 1000, // 5 minutes (in milliseconds)
    },
};

const corsOptions = {
    origin: process.env.FE_ORIGIN,
    optionsSuccessStatus: 200
};

module.exports = {
    sessionOptions: sessionOptions,
    corsOptions: corsOptions
}