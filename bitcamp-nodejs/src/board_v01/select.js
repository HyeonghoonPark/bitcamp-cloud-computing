
const mysql = require('mysql');

var con = mysql.createConnection({
	host : '13.125.254.147',
	database : 'studydb',
	user : 'study',
	password : '1111'
})

con.connect(function(err){
	if(err)throw err;

	console.log("connect complete")
})

con.query(`select * from pms2_board`,function(err, results){

	if(err)throw err;
	
	for(var result of results)
		console.log(result.bno, result.titl, result.cont, result.cdt)
	
	console.log("connected select success");
		
})

con.end(function(err){
	if(err)throw err;
	
	console.log("connected end")
})

console.log("select");