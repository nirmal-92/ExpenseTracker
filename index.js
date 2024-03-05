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
        await mongoose.connect('mongodb+srv://Nirmal:6192@cluster0.1sy5sx7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0)')
        const port = 8000
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

// const port=8000
// app.listen(port,function(){
//     console.log(Listening on port  ${port}...)
// })
//mongodb+srv://Nirmal:6192@cluster0.1sy5sx7.mongodb.net/