
const mysql = require('mysql');

var con = mysql.createConnection({
    host : '13.125.254.147', 
    database : 'studydb',
    user : 'study',
    password : '1111'
})

con.connect(function(err){
    if(err)throw err;
    
    con.query('select * from pms2_team',function(err, teams){
        if(err)throw err;
        
        for(var team of teams){
            console.log(team.name, team.dscrt, team.max_qty, team.sdt)
        }
    })
    con.end(function(err){
        if(err)throw err;
    })
})