import { Router } from'express';
import { check } from 'express-validator';
import { addTask, getTasks, getTaskById, editTask, deleteTask } from '../controllers/tasks.controller';
import auth from '../middlewares/auth';
import pagination from '../middlewares/pagination';

const router = Router();

// endpoints: /api/1.0/tasks

router.get('/', auth, pagination, getTasks);

router.get('/:id', auth, getTaskById);

router.post('/', 
        auth, 
        [ 
            check('title').notEmpty().withMessage('The title is required'),
            check('description').notEmpty().withMessage('The description is required')
        ],
        addTask
    );

router.put('/:id', 
        auth,      
        [ 
            check('title').notEmpty().withMessage('The title is required'),
            check('description').notEmpty().withMessage('The description is required')
        ],
        editTask
    );

router.delete('/:id', auth, deleteTask);

export default router;