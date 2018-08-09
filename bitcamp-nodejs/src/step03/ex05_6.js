// 주제 : 코드를 모듈로 분리 - 요청 핸들러를 호출하는 코드 분리

const mysql = require('mysql')
const express = require('express')

var pool = mysql.createPool({
    connectionLimit : 10, // 접속자 수
    host: '13.125.254.147', 
    //port: '3306',
    database: 'studydb',
    user: 'study',
    password: '1111'
});

// 함수를 리턴해서 값을 따로함.
const app = express();

app.get('/hello', (req, res) => {
    res.writeHead(200,{'Content-Type' : 'text/plain;charset=UTF-8'})
    
    res.write(`${req.query.name}님 안녕하세요!`);
    res.end();
})

// get 요청에 대해 핸들러를 등록하기! (post요청은 post)
app.get('/member/list', (req, res) => {
    
    var pageNo = 1;
    var pageSize = 3;
    
    if(req.query.pageNo){
        pageNo = parseInt(req.query.pageNo)
    }
    if(req.query.pageSize){
        pageSize = parseInt(req.query.pageSize)
    }
    
    var startIndex = (pageNo - 1) * pageSize;
    
    pool.query('select mid, email from pms2_member limit ?, ?',
            [startIndex, pageSize],
            function(err, results) {
        if (err){
            res.end('DB 조회 중 예외 발생!')
            return;
        }
        
        for (var row of results) {
            res.write(`${row.email}, ${row.mid}\n`);
        }
        res.end(); 
    });
    
})
app.get('/member/add', (req, res) => {
    
    res.writeHead(200,{'Content-Type' : 'text/plain;charset=UTF-8'})
   
    
    pool.query('insert into pms2_member(mid, email, pwd) values(?, ?, ?)',
            [req.query.id, req.query.email, req.query.password],
            function(err) {
        if (err){
            res.end('DB 조회 중 예외 발생!')
            return;
        }
        res.end('가입이 완료 됐습니다!'); 
    });
    
    
})
app.get('/member/update', (req, res) => {
    
    res.writeHead(200,{'Content-Type' : 'text/plain;charset=UTF-8'})
    
    
    pool.query('update pms2_member set email=? where mid=? ',
            [req.query.email, req.query.id],
            function(err, results) {
        if (err){
            res.end('DB 조회 중 예외 발생!')
            return;
        }
        res.end('변경 성공입니다!'); 
    });
    
})
app.get('/member/delete', (req, res) => {
    
    res.writeHead(200,{'Content-Type' : 'text/plain;charset=UTF-8'})
    
    pool.query('delete from pms2_member where mid = ?',
            [req.query.id],
            function(err, result) {
        if (err){
            res.end('DB 조회 중 예외 발생!')
            return;
        }
        console.log(result);
        
        res.end('삭제성공입니다!'); 
    });
    
})

app.listen(8000, ()=>{
    console.log('서버 실행 중...');
})
