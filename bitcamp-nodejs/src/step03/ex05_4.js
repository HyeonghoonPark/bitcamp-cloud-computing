// 주제 : 코드를 모듈로 분리 - 요청 핸들러를 관리하는 코드 분리


const http = require('http')
const url = require('url')
const mysql = require('mysql')
const express = require('./express01')

var pool = mysql.createPool({
    connectionLimit : 10, // 접속자 수
    host: '13.125.254.147', 
    //port: '3306',
    database: 'studydb',
    user: 'study',
    password: '1111'
});


const server = http.createServer((req, res)=>{
    
    var urlInfo = url.parse(req.url, true);

    res.writeHead(200,{
        'Content-Type' : 'text/plain;charset=UTF-8'
    })
    
    var handler = express.getHandler(urlInfo.pathname);
    
    if(handler){
        try{
        handler(urlInfo, req, res);
        }catch(err){
            res.end('실행 중 오류 발생!')
        }
    }else{
        res.end('해당 URL을 지원하지 않습니다.')
        return;
    }
    
    
});

server.listen(8000,() => {
    console.log('서버가 시작됨!')
})

express.add('/hello', (urlInfo, req, res) => {
    res.write(`${urlInfo.query.name}님 안녕하세요!`);
    res.end();
})

express.add('/member/list', (urlInfo, req, res) => {
    
    var pageNo = 1;
    var pageSize = 3;
    
    if(urlInfo.query.pageNo){
        pageNo = parseInt(urlInfo.query.pageNo)
    }
    if(urlInfo.query.pageSize){
        pageSize = parseInt(urlInfo.query.pageSize)
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
express.add('/member/add', (urlInfo, req, res) => {
    
    pool.query('insert into pms2_member(mid, email, pwd) values(?, ?, ?)',
            [urlInfo.query.id, urlInfo.query.email, urlInfo.query.password],
            function(err) {
        if (err){
            res.end('DB 조회 중 예외 발생!')
            return;
        }
        res.end('가입이 완료 됐습니다!'); 
    }); 
    
})
express.add('/member/update', (urlInfo, req, res) => {
    
    pool.query('update pms2_member set email=? where mid=? ',
            [urlInfo.query.email, urlInfo.query.id],
            function(err, results) {
        if (err){
            res.end('DB 조회 중 예외 발생!')
            return;
        }
        res.end('변경 성공입니다!'); 
    });
    
})
express.add('/member/delete', (urlInfo, req, res) => {
    
    pool.query('delete from pms2_member where mid = ?',
            [urlInfo.query.id],
            function(err, result) {
        if (err){
            res.end('DB 조회 중 예외 발생!')
            return;
        }
        console.log(result);
        
        res.end('삭제성공입니다!'); 
    });
    
})
