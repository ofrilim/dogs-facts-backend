
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());  // parse the req.body jsons responses
app.use(cookieParser());  // parse the cookies
app.use(cors({credentials: true, origin: ['http://localhost:3000']}));


const addRoutes = require('./api/user/users.route');
addRoutes(app);

app.listen(PORT, () => {
  console.log('server is listening')
});


