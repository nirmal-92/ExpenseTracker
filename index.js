/**
 * Expense tracker
 * 
 * Features and end points
 * 
 * adding a new expense/income :  /add-expense ->post
 * displaying existing expenses : /get-expenses ->get
 * editing existing entries : /edit-expense ->/put
 * deleting expenses : /delete-expense ->delete
 * 
 * budget reporting
 * creating new user
 * validating user
 * 
 * Defining schema
 * Categories,Amount,Date
 */
const bodyParser = require('body-parser')
const mongoose=require('mongoose')
const express =require('express')
const{Expense} = require('./schema.js')
const app = express()
app.use(bodyParser.json())

async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://Nirmal:6192@cluster0.1sy5sx7.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0)')
        console.log('DB connection Established')
        const port = process.env.port || 8000
        app.listen(port, function() {
            console.log(`Listening on port ${port}...`)
        })
    } catch(error) {
        console.log(error)
        console.log('')
    }
}
connectToDb()

app.post('/add-expense',async function(request,response){
    try{
        await Expense.create({
            "amount" : request.body.amount,
            "category" :request.body.category,
            "date" : request.body.date
        })
        response.status(201).json({
            "status" : "success",
            "message" : "new entry created"
        })
    }catch(error){
        response.status(201).json({
            "status" : "failure",
            "message" : "new entry created",
            "error" : error
        })
    }
})

app.get('/get-expenses', async function(request,response){
    try{
        const expenseData = await Expense.find()
        response.status(200).json(expenseData)
    }catch{
        response.status(500).json({
            "status" : "failure",
            "message" : "could not fetch entries",
            "error" : error
        })
    }
})


//localhost:8000/delete-expense/65e6aeebe6866b67ef03365a
//localhost:8000/delete-expense/<params>
app.delete('/delete-expense/:id',async function(request,response){
    try{
        const expenseData = Expense.findById(request.params.id)
        if(expenseData){
            await Expense.findByIdAndDelete(request.params.id)
            response.status(200).json({
                "status" : "success",
                "message" : "deleted entry"
            })
        }
        else{
            response.status(404).json()({
                "status" : "failure",
                "message" : "could not find document"
            })
        }
    }
    catch(error){
        response.status(404).json()({
            "status" : "failure",
            "message" : "could not find document"
        })
    }
})

app.patch('/edit-expense/:id',async function(request,response){
    const expenseEntry = await Expense.findById(request.params.id)
    try{
        const expenseEntry = Expense.findById(request.params.id)
        if(expenseEntry){
            await expenseEntry.updateOne({
                "amount" : request.body.amount,
                "category" : request.body.category,
                "date" : request.body.date
            })
            response.status(200).json({
                "status" : "success",
                "message" : "update entry success"
            })
        }
        else{
            response.status(404).json()({
                "status" : "failure",
                "message" : "could not update document"
            })
        }
    }catch(error){
        response.status(404).json()({
            "status" : "failure",
            "message" : "could not update document",
            "error" : error
        })
    }
})

app.patch('/edit-expense',async function(request,response){
    const expenseEntry = await Expense.findById(response.params.id)
    try{
        if(expenseEntry){
            await expenseEntry.updateOne({
                "amount" : request.body.amount,
                "category" : request.body.category,
                "date" : request.body.date
            })
            response.status(200).json({
                "status" : "success",
                "message" : "updated entry"
            })
        }
        else{
            response.status(200).json({
                "status" : "failure",
                "message" : "could not update document"
            })
        }
    }
    catch(error){
        response.status(200).json({
            "message" : "could not update document"
        })
    }
})

// const port=8000
// app.listen(port,function(){
//     console.log(Listening on port  ${port}...)
// })