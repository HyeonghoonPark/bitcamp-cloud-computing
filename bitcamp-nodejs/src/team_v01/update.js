
const mysql = require('mysql');

var con = mysql.createConnection({
    host : '13.125.254.147', 
    database : 'studydb',
    user : 'study',
    password : '1111'
})

var name = 'user001';
var num = 1;

con.connect(function(err){
    if(err)throw err;
    
    con.query('update pms2_team set max_qty = ? where name = ?',[num, name],function(err, teams){
        if(err)throw err;
        
    })
    con.end(function(err){
        if(err)throw err;
    })
})