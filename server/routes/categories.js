const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const mongoose = require('mongoose');

router.post('/getCategories', async(req, res) => {
    const { userId } = req.body;
    try {
        const dados = await UserModel.find({
            "_id": mongoose.Types.ObjectId(userId)
        });
        res.status(200).json({ status: true, response: dados[0].categories });
    } catch (error){
        res.status(400).json({ status: false, response: 'Ocorreu um erro ao buscar as categorias, por favor tente novamente mais tarde!' });
    }
});
router.post('/newCategorie', async(req, res) => {
    const { userId, categorieName } = req.body;
    try {
        let exist = false
        const user = await UserModel.find({
            "_id": mongoose.Types.ObjectId(userId)
        });
        let setCategories = user[0].categories
        if (setCategories.length >= 1){
            for( let i =0; i < setCategories.length; i++) {
                if (setCategories[i] === categorieName) {
                    exist = true
                }
            }
            if (!exist) {
                setCategories.push({ name: categorieName })
            }
        } else {
            setCategories[0] = { name: categorieName }
        }
        const dados = await UserModel.updateOne(
            {"_id": mongoose.Types.ObjectId(userId)},
            {$set: {
                categories: setCategories
            }}
        );
        res.status(200).json({ status: true, response: 'Categoria criada com sucesso!', dados: setCategories });
    } catch (error){
        res.status(400).json({ status: false, response: 'Ocorreu um erro ao criar categoria, por favor tente novamente mais tarde!' });
    }
});
router.post('/editCategorieName', async(req, res) => {
    const { userId, oldCategorieName, newCategorieName } = req.body;
    try {
        let exist = false
        const user = await UserModel.find({
            "_id": mongoose.Types.ObjectId(userId)
        });

        let setCategories = user[0].categories
        
            for( let i =0; i < setCategories.length; i++) {
                if (setCategories[i].name === oldCategorieName) {
                    setCategories[i].name = newCategorieName 
                }
            }
            
        const dados = await UserModel.updateOne(
            {"_id": mongoose.Types.ObjectId(userId)},
            {$set: {
                categories: setCategories
            }}
        );
        res.status(200).json({ status: true, response: 'Categoria editada com sucesso!', dados: setCategories });
    } catch (error){
        res.status(400).json({ status: false, response: 'Ocorreu um erro ao editar categoria, por favor tente novamente mais tarde!' });
    }
});
router.post('/deleteCategorie', async(req, res) => {
    const { userId, categorieName } = req.body;
    try {
        const user = await UserModel.find({
            "_id": mongoose.Types.ObjectId(userId)
        });

        let setCategories = user[0].categories
        let newArray = setCategories.filter(data => data.name !== categorieName)
            
        const dados = await UserModel.updateOne(
            {"_id": mongoose.Types.ObjectId(userId)},
            {$set: {
                categories: newArray
            }}
        );
        res.status(200).json({ status: true, response: 'Categoria removida com sucesso!', dados: newArray });
    } catch (error){
        res.status(400).json({ status: false, response: 'Ocorreu um erro ao remover categoria, por favor tente novamente mais tarde!' });
    }
});

module.exports = router;