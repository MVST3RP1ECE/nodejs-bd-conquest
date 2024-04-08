import sqlite3 from "sqlite3";
import path from "path";
sqlite3.verbose();

const db = new sqlite3.Database(path.resolve("solar_system_planets.db"),sqlite3.OPEN_READWRITE, (err)=>{
    if(err){
        console.log(err.message);
    }
    console.log("Connected to DB");
});

// Ai generated --------------------------------------------------------

// function displayTableContents() {
//     // Создаем подключение к базе данных
//     let db = new sqlite3.Database('solar_system_planets.db');
  
//       // Выполняем запрос на выборку всех данных из таблицы
//       db.all("SELECT * FROM planets", (err, rows) => {
//           if (err) {
//               console.error(err.message);
//           }
//           // Выводим результат
//           rows.forEach((row) => {
//               console.log(row);
//           });
//       });
  
//     // Закрываем подключение к базе данных
//     db.close();
//   }
  
//   // Вызываем функцию для отображения содержимого таблицы
//   displayTableContents();

// Ai generated --------------------------------------------------------


// db.serialize(()=>{
//     db.each("SELECT id, name FROM planets", (err, row)=>{
//         if(err){
//             console.log(err.message);
//         }
//         console.log(row.id + "\t" + row.name);
//         console.log("--------------------------------------");
//     });
    
//     db.each("SELECT * FROM features", (err,row)=>{
//         if(err){
//             console.log(err.message);
//         }
//         console.log(/*row.id + " "*/ + row.planet_id + " " + row.mass + " " + 
//                     row.diameter + " " + row.gravity + " " + row.escape_v + " " +
//                      row.day + " " + row.perihelion + " " + row.aphelion + " " + 
//                      row.o_period + " " + row.orbital_v + " " + row.tilt + " " + row.temperature + " " +
//                      row.pressure + " " + row.magnetic + " " + row.atmosphere);
//         console.log("---------------------------------------------------------------------------------------");
//     });

//     db.all("SELECT * FROM satellites", function(err, allRows){
//         if(err){
//             console.log(err.message);
//         }
//         console.log(allRows);
//     })
//     db.all("SELECT * FROM sqlite_sequence", (err,allRows)=>{
//         if(err){
//             console.log(err.message);
//         }
//         console.log(allRows);
//     })
// }); 

function dataFromPlanets(){
    return db.all("SELECT * FROM planets", (err, allRows)=>{
        if(err){
            console.log(err.message);
            return 0;
        }
        // console.log(allRows);
    })
}

// На промисах 1 вариант

// function dataFromPlanets(){
//     return new Promise((resolve, reject)=>{
//         db.all("SELECT * FROM planets", [], (err, allRows)=>{
//             if (err) {
//                 console.log(err.message);
//                 reject(err)
//             }
//             resolve(allRows);
//         })
//     })
// }

// function dataFromPlanets(){
//     return new Promise((resolve, reject) => {
//          let res = db.all("SELECT * FROM planets", (err, allRows)=>{
//             if (err) {
//                 console.log(err.message);
//                 reject(err)
//             }  
//             console.log(allRows);
//             return allRows;
//         })
//         console.log(res);
//         resolve(res);
//     })
// }

function dataFromSatellites(){
    return new Promise((resolve, reject) =>{ 
        let res = db.each(("SELECT id, planet_id, name, date FROM satellites"), (err,row)=>{
        if (err) {
            console.log(err.message);
            reject(err);
        }
        // console.log(row.id + " " + row.planet_id + " " + row.name + " " + row.date);
        return [row.id, row.planet_id, row.name, row.date]
    })
    resolve(res)
    })
}

export default {
    planets: dataFromPlanets(),
    satellites: dataFromSatellites(),
};

db.close((err)=>{
    if(err){
        console.log(err.message);
    }
    console.log("DB connection is closed!");
})