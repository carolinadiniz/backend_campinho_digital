const express = require("express")
const mongoose = require("mongoose")
const nodemon = require("nodemon")
const Contato = require("./model/Contato")
const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

app.get('/', (req, res)=> {
    res.json({msg: "Olá Campinho!"})
})

app.post(`/contato`, async (req, res)=>{
    const {nome, email, telefone, area, linkedin, idade} = req.body
    if(!nome){
        res.status(422).json({error: 'O nome é um campo obrigatório!'})
    } 
    if(!email){
        res.status(422).json({error: 'O email é um campo obrigatório!'})
    } 
    if(!telefone){
        res.status(422).json({error: 'O telefone é um campo obrigatório!'})
    } 
    if(!area){
        res.status(422).json({error: 'O area é um campo obrigatório!'})
    } 
    if(!linkedin){
        res.status(422).json({error: 'O linkedin é um campo obrigatório!'})
    } 
    if(!idade){
        res.status(422).json({error: 'O idade é um campo obrigatório!'})
    } 
    const pessoa = {
        nome, email, telefone, area, linkedin, idade
    }
    try{
        await Contato.create(pessoa)
        //201 add something
        res.status(201).json({msg:"Novo contato inserido com sucesso!"})
    }
    catch(error){
        res.status(500).json({error:error})
    }
})

app.listen(3001)

console.log(`O meu app do campinho está no ar!`)

mongoose.connect('mongodb+srv://CarolinaDiniz:Webang111watercolor@project.kcg7wqs.mongodb.net/agendaCampinho?retryWrites=true&w=majority')
    .then(()=>{
        console.log("Banco de dados foi conectado com sucesso!")
    })
    .catch((err)=>{
        console.log(err)
    })
