import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const signin = async (req, res) => {
    const { email,  password } = req.body

    try {
        const existingUser = await User.findOne({ email })

        if(!existingUser) return res.status(404).json({message: "Usuário  não encontrado."})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.status(404).json({ message: "Credenciais incorretas." })

        const token = jwt.sign({ email: existingUser.email, id:  existingUser._id }, 'test', { expiresIn: "1h" })

        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: "Algo deu erro, tente novamente mais tarde." })
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body

    try {
        const existingUser = await User.findOne({ email })

        if(existingUser) return res.status(400).json({message: "Usuário  já cadastrado."})

        if(password != confirmPassword) return res.status(400).json({ message: "As senhas tem que ser iguais." })

        const hashedPassowrd = await bcrypt.hash(password, 12)

        const result = await User.create({ email, password: hashedPassowrd, name: `${firstName} ${lastName}` })

        const token = jwt.sign({ email: result.email, id:  result._id }, 'test', { expiresIn: "1h" })

        res.status(200).json({ result: result, token })
    } catch (error) {
        res.status(500).json({ message: "Algo deu erro, tente novamente mais tarde." })
    }
}