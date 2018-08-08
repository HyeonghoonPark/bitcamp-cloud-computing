// 주제 : SQL 요청 처리하기 - 회원 등록하기
// [실행 URL]
// => http:localhost:8000/member/add?id=user100&email=user100@test.com&password=1111
// [출력 결과]
// 등록 성공 입니다.

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
    
    if(urlInfo.pathname !== '/member/add'){
        res.end("해당 URL을 지원하지 않습니다");
        return;
    }
    
    var id = urlInfo.query.id;
    var email = urlInfo.query.email;
    var password = urlInfo.query.password;
    console.log(id)
    console.log(email)
    console.log(password)
    
    pool.query('insert into pms2_member(mid, email, pwd) values(?, ?, ?)',
            [id, email, password],
            function(err) {
        if (err){
            res.end('DB 조회 중 예외 발생!')
            return;
        }
        
        res.end(); 
    });
   });

server.listen(8000,() => {
    console.log('서버가 시작됨!')
});






