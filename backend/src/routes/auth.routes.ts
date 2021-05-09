import { Router } from 'express';
import { register, login, getUser } from '../controllers/auth.controller';
import { check } from 'express-validator';
import auth from '../middlewares/auth';

const router = Router();

router.post('/signUp', 
    [
        check('username')
            .notEmpty()
            .withMessage('Username is required')
            .bail()
            .isLength({ min: 3, max: 20})
            .withMessage('Username must be min 3 characters or max 20 characters'),
        check('email')
            .notEmpty()
            .withMessage('Email is required')
            .bail()
            .isEmail()
            .withMessage('Enter a valid email'),
        check('password')
            .notEmpty()
            .withMessage('Password is required')
            .bail()
            .isLength({ min: 6 })
            .withMessage('Password must have 6 characters min')
    ], 
    register
);
router.post('/signIn', 
    [
        check('email')
            .notEmpty()
            .withMessage('Email is required')
            .bail()
            .isEmail()
            .withMessage('Enter a valid email'),
        check('password')
            .notEmpty()
            .withMessage('Password is required')
            .bail()
            .isLength({ min: 6 })
            .withMessage('Password must have 6 characters min')
    ], 
    login
);

router.get('/user', auth, getUser);

// router.get('/logout', auth, logout);

export default router;