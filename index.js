require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        msg: "Essa é minha API"
    });
});

//configurando bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.post('/doc', (req, res) => {  
    const { name, email, address, payment } = req.body;
    console.log(name, email, address, payment);

    res.status(200).json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${3000}`);
});

//conexão com o mongo Atlas
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS


const mongoURI = `mongodb+srv://${encodeURIComponent(dbUser)}:${encodeURIComponent(dbPassword)}@cluster0.eynecus.mongodb.net/?retryWrites=true&w=majority`;

// Conectando ao banco de dados
mongoose.connect(mongoURI)
.then(() => {
    console.log("Conectou ao banco de dados [Conexão concluída]");
})
.catch(err => {
    console.error('Erro ao conectar ao MongoDB Atlas:', err.message);
});
