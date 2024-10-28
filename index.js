require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(cors());

//configuração para respostas em JSON
app.use(express.json())

//Modelo banco
const User = require('./models/User');

app.get('/', (req, res) => {
    res.status(200).json({
        msg: "Essa é minha API"
    });
});

//configurando bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.post('/doc', (req, res) => {  
    const { name, price, quantity  } = req.body;
    console.log(name, price, quantity );


    if(!name){
        return res.status(422).json({msg: "name is required"})
    }

    if(!price){
        return res.status(422).json({msg: "price is required"})
    }

    if(!quantity){
        return res.status(422).json({msg: "quantity is required"})
    }

    const user = new User({
        name,
        price,
        quantity,
        
    })

    try {
        user.save()

        res.status(201).json({msg: 'Informações enviadas com sucesso'})
    } catch(erro) {
        console.log(erro)
        res.status(500).json({msg: 'Aconteceu um erro no servidor, tente novamente mais tarde'})
    }
});

//Acessando os dados
app.get('/items', async (req, res) => {
    try {
        const items = await User.find();
        res.status(200).json(items)
        console.log(items)
    } catch (error) {
        console.log('Erro ao obter itens do banco de dados:', error);
        res.status(500).json({
            msg: 'Erro ao obter itens do banco de dados'
        })
    }
})

//atualizando os dados
const Product = require('./models/User'); 

app.put('/items/:id', async (req, res) => {
    //recebe o valor do id do card atualizado
    const itemId = req.params.id;
    //recebe os valores atualizados
    const { name, price, quantity  } = req.body;
    const user = {
        name,
        price,
        quantity
    }
    console.log(user)
    console.log( itemId, name, price, quantity)
    try {
        const updatedProduct = await Product.updateOne({_id: itemId}, user);
        if(updatedProduct.nModified === 0) {
            return res.status(404).json({message: "O produto não foi encontrado"});
        }        

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o produto.' });
    }
});

//deletar item
app.delete('/items/:id', async (req, res) => {
    const deleteId = req.params.id;

    try {
        // Tenta encontrar o produto pelo ID e removê-lo 
        // usando 'Product' do update acima
        const deletedProduct = await Product.findOneAndDelete({ _id: deleteId });

        // Verifica se o produto foi encontrado e removido
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        res.status(200).json({ message: 'Produto removido com sucesso.' });
    } catch (error) {
        console.error(error); // Adicione esta linha para imprimir o erro no console
        res.status(500).json({ error: 'Erro ao deletar produto.' });
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${3000}`);
});

//conexão com o mongo Atlas
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const mongoURI = `mongodb+srv://${encodeURIComponent(dbUser)}:${encodeURIComponent(dbPassword)}@cluster0.hd69n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(mongoURI)
// Conectando ao banco de dados
mongoose.connect(mongoURI)
.then(() => {
    console.log("Conectou ao banco de dados [Conexão concluída]");
})
.catch(err => {
    console.error('Erro ao conectar ao MongoDB Atlas:', err.message);
});

























