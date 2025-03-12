const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const schoolRoutes = require("./controller/addSchool.controller.js"); 
const getSchoolRoutes = require("./controller/getSchool.controller.js");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/",(res,req)=>{
    res.send("Welcome to the school database it is a assignment project made for educase by kavyanjali yadav!!!");
})
app.use(express.json());
app.use(schoolRoutes);
app.use(getSchoolRoutes); 

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
