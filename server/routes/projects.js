const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const ProjectModel = require('../models/ProjectModel');
const mongoose = require('mongoose');

router.post('/createProject', async(req, res) => {

    const { name, userId, description, private, members, categorie, repositorie, identifier, owner} = req.body;
    //Validações
    if (!name) {
        return res.status(422).json({ status: false, response: 'Nome precisa ser informado!' });
    }
    if (!userId) {
        return res.status(422).json({ status: false, response: 'Identificador do usuario precisa ser informado!' });
    }
    if (!owner) {
        return res.status(422).json({ status: false, response: 'Responsável pelo projeto não informado!' });
    }
    if (private === null) {
        return res.status(422).json({ status: false, response: 'Tipo de projeto não especificado!' });
    }
        //Procurando usuario
        const user = await UserModel.findById(userId, '-password');
        if (!user) {
            return res.status(404).json({ status: false, response: "Usuario não encontrado!" });
        }

        var currentdate = new Date().toString().split(" (")[0];

        //Criando projeto
        const project = new ProjectModel({
            name: name,
            owner: owner,
            description: description,
            members: members,
            private: private,
            categorie: categorie.name,
            identifier: identifier,
            repositorie: repositorie,
            created_at: currentdate,
            updated_at: currentdate,
        });
        
        try {
            await project.save();
            res.status(201).json({ status: true, response: 'Projeto criado com sucesso!' });
        } catch (error) {
            res.status(500).json({ status: false, response: 'Ocorreu um erro no servidor, tente novamente mais tarde!' });
        }
});
router.post('/getProjects', async(req, res) => {
    const { userId } = req.body;
    try {
        // const dados = await ProjectModel.find({
        //     "members": mongoose.Types.ObjectId(userId)
        // });
        const dados = await ProjectModel.find(
            { members: { $all: [ userId ] } }
        )

        res.status(200).json({ status: true, response: dados });
    } catch (error){
        res.status(400).json({ status: false, response: 'Ocorreu um erro ao buscar projetos, por favor tente novamente mais tarde!' });
    }
});

module.exports = router;