const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const ProjectModel = require('../models/ProjectModel');
const mongoose = require('mongoose');

router.get('/getUsers', async(req, res) => {
    try {
        const dados = await UserModel.find();
        res.status(200).json({ status: true, response: dados });
    } catch (error){
        res.status(400).json({ status: false, response: 'Ocorreu um erro ao buscar projetos, por favor tente novamente mais tarde!' });
    }
});

module.exports = router;