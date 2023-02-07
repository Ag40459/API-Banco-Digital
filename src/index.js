const express = require('express');
const { validateCPF } = require('./functions/validateCPF');
const { validateEmail } = require('./functions/validateEmail');
const router = require('./routes/router');
const app = express();
app.use(express.json());


const nome = (nome, email) => (sobrenome, idade) => {
    console.log(nome, sobrenome, email, idade);
}

nome('agenor', 'agenortorres10@gmail.com')('Torres', 'idade: 37')

// console.log(validateEmail('agenor@agenor.com'));

app.use(router);
app.listen(3000);