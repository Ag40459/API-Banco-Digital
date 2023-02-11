const express = require('express');
const router = require('./routes/router');
const app = express();
app.use(express.json());


const nome = (nome, email) => (sobrenome, idade) => {
    console.log(nome, sobrenome, email, idade);
}

nome('agenor', 'agenortorres10@gmail.com')('Torres', 'idade: 37')

app.use(router);
app.listen(3000);