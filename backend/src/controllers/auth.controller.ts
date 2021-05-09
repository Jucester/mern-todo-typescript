import {RequestHandler} from 'express';
import {validationResult} from 'express-validator';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register : RequestHandler = async (req, res) => {
    // Using express validator to show errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try {
        const { email, password } = req.body;

        // Checking if user email is repeated so we can handle the error
        const repeated = await User.findOne({ email });

        if(repeated) {
            return res.status(200).json({
                message: 'An user with that email already exists'
            })
        }

        // If email is not repeated then add the user to database
        let user : IUser = new User(req.body); 
        const salt = await bcrypt.genSaltSync(12);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        return res.status(201).json({
            message: "User registered successfully",
            user: user.id
        });

    } catch (error) {
        console.log(error);
        res.json({
            message: 'Something went wrong. Try again.'
        })
    }
}

export const login : RequestHandler = async (req, res) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try {
         
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({
                message: 'User doest not exists'
            });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const payload = {
        
                id: user.id,
                email: user.email,
                username: user.username
            
        }

        const token = jwt.sign(
            payload,
            process.env.SECRET_KEY || 'default_token',
            {
                expiresIn: '1h'
            }
        );

        return res.status(200).json({
            message: 'User logged',
            token,
            user: payload
        });

    } catch (error) {
       console.log(error);
       res.json({
           message: 'Something went wrong. Try again.'
       })
    }
}

export const getUser : RequestHandler = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); 
        //The select function to specify what fields pass or ignore (with "-" before) to user

        res.status(200).json({
            user
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Something went wrong'
        })
    }
}