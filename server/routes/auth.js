const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const signUpTemplate = require('../models/SignUpTemplate')
const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken');

router.post('/signup', async(req, res) => {
    const { name, email, password, created_at } = req.body;
    const salt = await bcrypt.genSalt(12);
    const passwordHach = await bcrypt.hash(password, salt);
    const currentdate = new Date().toString().split(" (")[0];
    const firstName = name.split(" ")
    const hashCode = "#" + firstName[0] + Math.floor(Date.now() * Math.random()).toString(36)
    const signedUpUser = new signUpTemplate({
        name,
        email,
        password: passwordHach,
        role: "authenticated",
        hashCode: hashCode.toUpperCase(),
        created_at: currentdate,
        updated_at: currentdate,
    })
    try {
        await signedUpUser.save()
        res.status(200).json({ status: true, response: 'Usuário criado com sucesso!' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: false, response: 'Ocorreu um erro ao cadastrar, tente novamente mais tarde!' });
    }
})
router.post('/signin', async(req, res) => {
    const { email, password} = req.body;
    console.log(req.body)
    if (!email) {
        return res.json({ status: false, message: "Email é obrigatório!" })
    }
    if (!password) {
        return res.json({ status: false, message: "A senha é obrigatória" })
    }
    //checar se o usuario existe
    const user = await UserModel.findOne({ email: email });
    if (!user) {
        return res.json({ status: false, message: "Usuario não encontrado!" })
    }

    //Verificando password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        return res.json({ status: false, message: "Senha incorreta!" })
    }

    try {

        const secret = process.env.SECRET;

        const token = jwt.sign({
                id: user._id
            },
            secret, {}
        );
        res.json({ status: true, user: { id: user._id, email: user.email, name: user.name }, token: token });

    } catch (error) {
        res.json({ message: 'Ocorreu um erro no servidor, tente novamente mais tarde!' });
    }
})
module.exports = router