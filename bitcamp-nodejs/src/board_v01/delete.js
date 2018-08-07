
const mysql = require('mysql');

var con = mysql.createConnection({
	
	host : '13.125.254.147', 
	database : 'studydb',
	user : 'study',
	password : '1111'
	
})

var bno = 14;

con.query(`delete from pms2_board where bno = ?`,[bno], function(err, result){
	if(err)throw err;
	
	console.log('success')
})

con.end(function(err){if(err)throw err})