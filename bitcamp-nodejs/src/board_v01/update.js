const mysql = require('mysql');

var con = mysql.createConnection({
	host : '13.125.254.147', 
	database : 'studydb',
	user : 'study',
	password : '1111'
})

var titl = '변경됐습니다.';
var bno = 15;
con.query(`update pms2_board set titl = ? 
			where bno = ?`, [titl, bno],
			function(err){if(err)throw err;})
			
con.end(function(err){if(err)throw err;})