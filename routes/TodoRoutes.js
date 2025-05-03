const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const Subtodo = require('../models/Subtodo');

// Define routes
router.get('/get-todos', async (req, res) => {
    // Logic to get all todos
    try {
        const todos = await Todo.find();
        if(todos.length === 0)
        {
            return res.status(404).send("No todos as of now!")
        }

        res.status(200).send(todos)
    } catch (error) {
        res.status(500).send({"Error Message": error})         
    }
});



router.post('/add-todo', async (req, res) => {
    try {
      const { title } = req.body;
  
      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }
  
      const lastTodo = await Todo.findOne().sort({ id: -1 }).exec();
      const newId = lastTodo ? lastTodo.id + 1 : 1;
  
      const newTodo = new Todo({
        id: newId,
        title,
        completed: false
      });
  
      const savedTodo = await newTodo.save();
      res.status(201).json(savedTodo);
  
    } catch (err) {
      console.error("Error adding todo:", err);
      res.status(500).json({ message: "Failed to create todo" });
    }
  });


router.put('/update-todo/:id', async (req,res)=>{
    try{

        const todoId = parseInt(req.params.id)
        
        const todo = await Todo.findOne({id:todoId})

        if(!todo){
            return res.status(404).send("No Such todo exists to be updated!")
        }

        // Getting all the subtodos for thhis todo:-
        const subtodos = await Subtodo.find({ todoId: todoId });

        if(subtodos.length === 0){
            return res.status(409).send({"message":"There need to be atleast one subtodo for the status of todo to get updated!"})
        }

        const isAllSubtodoCompleted = subtodos.every(subtodo => subtodo.completed)

        if(! isAllSubtodoCompleted)
        {
            return res.status(409).send({"message":"One or more subtodo is incompleted, cannot update the status!"})
        }


        todo.completed = true
        await todo.save();
        res.status(201).send({"message":"This Todo is completed, consider deleting it!"}) 
       


    }
    catch(error){
          res.status(400).send({"Error":error})
    }
})

router.delete('/delete-todo/:id', async (req,res)=>{
    const todoId = parseInt(req.params.id)
    const todo = await Todo.findOne({id:todoId})

    if(!todo)
    {
        return res.status(404).send({"message":"No such todo to be deleted"})
    }
    
    const subtodos = await Subtodo.find({todoId:todoId})
    
    const isAllSubtodoCompleted = subtodos.every(subtodo => subtodo.completed)

    if(!isAllSubtodoCompleted)
    {
       return res.status(409).send({"message":"Complete all the subtodos before deleting this todo!"})
    }
    
    await Subtodo.deleteMany({ todoId: todoId })
    await Todo.deleteOne({id:todoId})
    res.status(200).send({"message":"Deleted Successfully!"})
})


// For getting all the subotodos of a todo:-
router.get('/get-subtodos/:id', async (req,res)=>{
    try{

        const todoId = parseInt(req.params.id)
        
        const todo = await Todo.findOne({ id: todoId }).populate('subtodos')
        // Imp:- await Todo.findOne({id:todoId}) will give us just that todo task, but, .populate('subtodos') will give us all the subtodos as well. 
        console.log('Reaching here');
        
        if(!todo)
            {
                return res.status(404).send({"message":"No such todo found!"})
            }
            
        if(todo.subtodos.length === 0)
            {
                    return res.status(200).send({"message":"No sub-todo found for this todo!"})
            }

        res.status(200).send(todo.subtodos)

    }

    catch(error){
      res.status(400).send({"Error:":error })
    }
})  



module.exports = router;  // Export the router
