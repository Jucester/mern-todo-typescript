import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import Task, { ITask } from '../models/Task';

export const addTask : RequestHandler = async (req, res) => {
    
    // Using express validator to show errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array()
        })
    }

    try {

        const { title, description } = req.body;

        const task = new Task({
            title,
            description,
            userId: req.user.id
        });

        await task.save();

        return res.status(201).json({
            message: 'Task saved succesfully'
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            message: "Something went wrong. Try again."
        })
    }
}

export const getTasks : RequestHandler = async (req, res) => {
    // Get params for pagination query
    const { page, size } = req.pagination;

    try {
       const tasks = await Task.find({
           userId: req.user.id
       }).skip(page * size).limit(size).sort({
           createdAt: -1
       });

       if (!tasks) {
           return res.json({
               message: "Tasks list is empty"
           })
       } else {
           return res.json({
               message: "Query success",
               page,
               size,
               tasks
           })
       }

    } catch (error) {
       console.log(error) 
    }
}

export const getTaskById : RequestHandler = async (req, res) => {

    try {
        const { id } = req.params;

        const task = await Task.findById( id );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        return res.status(200).json({
            message: "Task Found",
            task
        })

    } catch (error) {
        console.log(error);
    }
}

export const editTask : RequestHandler = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array()
        })
    }

    try {
        
        const { title, description} = req.body;
        const { id }  = req.params ;
        
        let task = await Task.findById( id );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }

        if (task.userId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        task = await Task.findByIdAndUpdate({ _id : id }, { title, description });

        return res.status(201).json({
            message: 'Task updated successfully',
            task
        });

    } catch (error) {
        console.log(error);
    }
}

export const deleteTask : RequestHandler = async (req, res) => {
    try {
       const { id } = req.params;

       let task = await Task.findById( id );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }

        if (task.userId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        await Task.findByIdAndRemove( id );

        return res.status(200).json({
            message: 'Task deleted',
            task
        })


    } catch (error) {
       console.log(error);
    }
}