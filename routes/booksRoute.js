import express from "express";
import {Book} from "../models/bookModel.js" 

const router = express.Router();

// GET all books from database
router.get('/', async (req, res)=>{
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });

    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }

})

//GET one book by ID
router.get('/:id', async (req, res)=>{
    try {

        const { id } = req.params;
        const book = await Book.findById(id);
        if(!book){
            return res.status(404).json({message: "Book not found"});
        }
        return res.status(200).json(book);

    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }

})


//POST a book to database
router.post('/', async (req, res)=> {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishedYear ||
            !req.body.ISBN
        ){
            return res.status(400).send({
                message: "Send all required fields: title, author, publishedYear, ISBN"
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishedYear: req.body.publishedYear,
            ISBN: req.body.ISBN,
        }

        const book = await Book.create(newBook);
        return res.status(201).send(book);

    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
} )

//PUT to update an existing book
router.put('/:id', async (req, res) => {
    try{
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishedYear ||
            !req.body.ISBN
        ){
            return res.status(400).send({
                message: "Send all required fields: title, author, publishedYear, ISBN"
            });
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).json({message: "Book not found"});
        }
        return res.status(200).json({message: "Book updated successfully"});
        
    }catch(error){
        res.status(500).send({message: error.message});
    }
})

//DELETE an existing book
router.delete('/:id', async (req, res)=> {
    try{

        const {id} =req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message: "Book not found"});
        }
        return res.status(200).json({message: "Book deleted successfully"});

    }catch(error){
        res.status(500).send({message: error.message});
    }

})

export default router;
