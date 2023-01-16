const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const studentArray = require("./InitialData");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
app.get("/api/student", (req, res)=>{
    res.json({
        data: studentArray
    })
});

app.get("/api/student/:id", (req,res)=>{
    const index = studentArray.findIndex(element => element.id == req.params.id);
    if(index >= 0){
        const student = studentArray[index];
        res.json({
            student
        })
    }
    else{
        res.status(400).json({
            status: "Failed",
            message: "Student record not found"
        })
    }
    // console.log(req.params);
    // res.send("Ok")
});

let count = 7;
app.post('/api/student', function(req,res){
    count++;
    const new_id = count;
    const {name="",currentClass="", division=""} = req.body;
    if(name != "" && currentClass != "" && division != ""){
        const newStudent = {
            id: new_id,
            name: name,
            currentClass: currentClass,
            division: division
        };
        studentArray.push(newStudent);
        res.status(200).json({
            newStudent
        })
    }
    else{
        res.status(400).json({
            message: "bad request"
        })
    }
    
});

app.put("/api/student/:id", (req,res)=>{
    const index = studentArray.findIndex(element => element.id == req.params.id);
    if(index >= 0){
        studentArray[index] = req.body;
        res.json({
            message: "Record updated successfully!"
        })
    }
    else{
        res.status(400).json({
            status: "Failed",
            message: "Record not updated"
        })
    }
});

app.delete('/api/student/:id', function(req, res){
    const id = parseInt(req.params.id);
    const studentIndex = studentArray.findIndex(s=>s.id == id);
    if(studentIndex == -1){
        res.status(404).send('Student not found');
        return;
    }
    else{
        studentArray.splice(studentIndex, 1);
        res.sendStatus(200);
    }
})



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   