
const mysql = require('mysql');

var con = mysql.createConnection({
	host : '13.125.254.147', 
	database : 'studydb', 
	user : 'study',
	password : '1111'
})

con.connect(function(err){
	if(err)throw err;
	
	console.log('connect complete')
})

var title = '제목입니다';
var cont = '내용입니다';

con.query(`insert into pms2_board(titl, cont, cdt)
			values(?, ?, now())`,[title, cont], function(err, result){
				
				if(err)throw err;
				
				console.log("connected success");
})

con.end(function(err){
	if(err)throw err;
	
	console.log("connected finish");
	
})

console.log("board insert start")