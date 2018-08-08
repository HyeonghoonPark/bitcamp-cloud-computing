// 주제 : SQL 요청 처리하기 - 회원 삭제하기
// [실행 URL]
// => http:localhost:8000/member/delete?id=user100
// [출력 결과]
// 삭제 성공 입니다.

const http = require('http')
const url = require('url')
const mysql = require('mysql')

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
    if(urlInfo.pathname === '/favicon.ico'){
        res.end();
        return;
    }
    
    if(urlInfo.pathname !== '/member/delete'){
        res.end("해당 URL을 지원하지 않습니다");
        return;
    }
    
    var id = urlInfo.query.user;
    console.log(id);
    
    pool.query('delete from pms2_member where mid = ?',
            [id],
            function(err) {
        if (err){
            res.end('DB 조회 중 예외 발생!')
            return;
        }
        
        res.end('삭제성공입니다!'); 
    });
    
});

server.listen(8000,() => {
    console.log('서버가 시작됨!')
})