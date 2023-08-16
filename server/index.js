require("dotenv").config();
const express = require('express');
const dbConnect = require("./db/dbConnect");
const cors = require('cors');

const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post');
const paymentRoute = require('./routes/payment');

const app = express();

dbConnect();

// middleware
app.use(cors({ Credential: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static('public'))


app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/checkout-session', paymentRoute);

let port = process.env.PORT;
if (port == null || port == "") {
    port = 4000;
}
app.listen(port, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});