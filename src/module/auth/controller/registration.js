import userModel from '../../../../DB/model/user.model.js';
import { sendEmail } from '../../../services/email.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../../../services/asyncHandler.js';
import { findById, findByIdAndDelete, findOneAndUpdate, findOne, find, findByIdAndUpdate, create, findOneAndDelete } from '../../../../DB/DBMethods.js';
const getUserPop = [

    {
        path: "cartSchema",
        populate: [
            { path: "productId" },

        ],

    },
];
export const signUp = asyncHandler(async (req, res, next) => {
    console.log('gg');
    const { userName, email, password } = req.body;

    const user = await findOne({ model: userModel, condition: { email }, select: "email" })
    console.log(user);
    if (user) {
        res.status(409).json({ message: "This email already register" })
    } else {
        let addUser = new userModel({ userName, email, password });
        // let token = jwt.sign({ id: addUser.id, isLoggedIn: true }, process.env.EMAIL_TOKEN, { expiresIn: '1h' })
        // let refreshToken = jwt.sign({ id: addUser._id, isLoggedIn: true }, process.env.EMAIL_TOKEN, { expiresIn: 60 * 60 * 24 })

        // let link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
        // let refreshLink = `${req.protocol}://${req.headers.host}/auth/refreshToken/${refreshToken}`

        // let message = `please verify your email <a href="${link}" > here </a>
        //                     <br/>
        //                     to refresh token please click <a href="${refreshLink}" > here </a>
        //                     `
        // let emailRes = await sendEmail(email, "confirm to register", message);
        // console.log(emailRes);
        // if (emailRes.accepted.length) {


            let savedUser = await addUser.save()
            res.status(201).json({ message: "added successfully", savedUser })
        // } else {
        //     res.status(404).json({ message: "invalid email" })
        // }
    }

})
export const logIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await findOne({ model: userModel, condition: { email } })
    if (!user) {
        res.status(404).json({ message: "You have to register first" })

    } else {
        let compare = bcrypt.compareSync(password, user.password, parseInt(process.env.SALTROUND))
        if (compare) {
            if (!user.confirmEmail) {
                res.status(400).json({ message: "You have to confirm email first" })

            } else {
                let token = jwt.sign({ id: user._id, isLoggedIn: true }, process.env.EMAIL_TOKEN, { expiresIn: 60 * 60 * 24 * 2 })
                res.status(200).json({ message: "welcome", token, id: user._id })
            }
        } else {
            res.status(400).json({ message: "in valid password" })
        }
    }
})
export const confirmEmail = asyncHandler(async (req, res, next) => {
    let { token } = req.params
    let decoded = jwt.verify(token, process.env.EMAIL_TOKEN)
    if (!decoded && !decoded.id) {
        res.status(400).json({ message: "invalid token data" })

    } else {
        const updatedUser = await findOneAndUpdate({ model: userModel, condition: { _id: decoded.id, confirmEmail: false }, data: { confirmEmail: true }, options: { new: true } })
        if (updatedUser) {
            res.redirect("http://localhost:4200/logIn")
        } else {
            res.status(404).json({ message: "invalid data token" })
        }
    }

})
export const resendConfirmEmail = asyncHandler(async (req, res, next) => {
    const { token } = req.params
    let decoded = jwt.verify(token, process.env.EMAIL_TOKEN)
    if (!token) {
        res.status(400).json({ message: "invalid token data" })

    } else {
        const email = await findById({ model: userModel, condition: { _id: decoded.id }, select: "email" })
        let token = jwt.sign({ id: decoded.id, isLoggedIn: true }, process.env.EMAIL_TOKEN, { expiresIn: '1h' })
        let refreshToken = jwt.sign({ id: decoded._id, isLoggedIn: true }, process.env.EMAIL_TOKEN, { expiresIn: 60 * 60 * 24 })

        let link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
        let refreshLink = `${req.protocol}://${req.headers.host}/auth/refreshToken/${refreshToken}`

        let message = `please verify your email <a href="${link}" > here </a>
                        <br/>
                        to refresh token please click <a href="${refreshLink}" > here </a>
                        `
        await sendEmail(email, "confirm to register", message);

    }
})
export const getUserRole = asyncHandler(async (req, res, next) => {
    const { token } = req.params

    let decoded = jwt.verify(token, process.env.EMAIL_TOKEN)

    if (!decoded && !decoded.id) {
        res.status(400).json({ message: "invalid token data" })

    } else {
        const user = await findById({ model: userModel, condition: decoded.id, populate: [...getUserPop] })
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ message: "user not found" })
        }
    }
})

