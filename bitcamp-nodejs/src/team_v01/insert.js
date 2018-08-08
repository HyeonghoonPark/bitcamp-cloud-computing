

const mysql = require('mysql');


var con = mysql.createConnection({
    host : '13.125.254.147', 
    database : 'studydb',
    user : 'study',
    password : '1111'
})

var name = 'user001';
var dscrt = 'test';
var max_qty = 5;

con.connect(function(err){
    if(err)throw err;
    
    con.query('insert into pms2_team(name, dscrt, max_qty, sdt) values(?,?,?,now())',[name, dscrt, max_qty],function(err){
        if(err)throw err;
        
        console.log("insert 성공")
    })
    
    con.end(function(err){
        if(err)throw err;
    })
})