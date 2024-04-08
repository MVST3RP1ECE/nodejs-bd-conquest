import express from "express";
import path from "path";
import appDB from "./appDB.js" ;
const PORT = 3000;
const app = express();

// static files
app.use(express.static(path.resolve("pages")));

// ----------------------------- Get requests -----------------------------
app.get("/", (req,res)=>{
    res.sendFile(path.resolve("pages/index.html"))
})

app.get("/index.html", (req,res)=>{
    res.sendFile(path.resolve("pages/index.html"))
})

app.get("/features.html", (req,res)=>{
    res.sendFile(path.resolve("pages/features.html"))
})

app.get("/planets.html", (req,res)=>{
    res.sendFile(path.resolve("pages/planets.html"))
})

app.get("/satellites.html", (req,res)=>{
    res.sendFile(path.resolve("pages/satellites.html"))
})
//------------------------------- Get requests -----------------------------
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
    // sqlite3.
    console.log(appDB.planets);
    // console.log(appDB.satellites);
})