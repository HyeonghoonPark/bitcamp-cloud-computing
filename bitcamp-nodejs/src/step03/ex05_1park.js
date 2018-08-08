// 주제 : 여러개의 요청 처리하기 - 회원 목록 조회/등록/변경/삭제하기
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
    res.writeHead(200, {'Content-Type' : 'text/plain;charset=UTF-8'})
    
    var id = urlInfo.query.id;
    var email = urlInfo.query.email;
    var password = urlInfo.query.password;
    
    pool.getConnection(function(err, con){
        
        if(err)throw err;
        
        console.log('ConnectionPool Linked');
        
        if(urlInfo.pathname === '/favicon.ico'){
            res.end();
            return;
        }
        
        if(urlInfo.pathname === '/member/list'){
           
            var pageNo = 1;
            var pageSize = 3;
            
            if(urlInfo.query.pageNo){
                pageNo = parseInt(urlInfo.query.pageNo)
            }
            if(urlInfo.query.pageSize){
                pageSize = parseInt(urlInfo.query.pageSize)
            }
            
            var startIndex = (pageNo - 1) * pageSize;
            
            con.query('select mid, email from pms2_member limit ?, ?',
                    [startIndex, pageSize],
                    function(err, results) {
                if (err){
                    res.end('DB 조회 중 예외 발생!')
                    return;
                }
                
                console.log(results)
                for (var row of results) {
                    res.write(`${row.email}, ${row.mid}\n`);
                }
                con.release(); 
                res.end();
            });
            
        }  else if(urlInfo.pathname === '/member/add'){
            
            con.query('insert into pms2_member(mid, email, pwd) values(?, ?, ?)',
                    [id, email, password],
                    function(err) {
                if (err){
                    res.end('DB 조회 중 예외 발생!')
                    return;
                }
                
                con.release(); 
                res.end('가입이 완료 됐습니다!');
            }); 
            
        } else if(urlInfo.pathname === '/member/update'){
            
            con.query('update pms2_member set email=? where mid=? ',
                    [email, id],
                    function(err, results) {
                if (err){
                    res.end('DB 조회 중 예외 발생!')
                    return;
                }
                
                con.release(); 
                res.end('변경 성공입니다!');
            });
            
        }else if(urlInfo.pathname === '/member/delete'){
            console.log(id);
            pool.query('delete from pms2_member where mid = ?',
                    [id],
                    function(err, result) {
                if (err){
                    res.end('DB 조회 중 예외 발생!')
                    return;
                }
                
                console.log(result);
                
                con.release(); 
                res.end('삭제성공입니다!');
            });
            
        }else{
            res.end("해당 url을 지원하지 않습니다.")
            return;
        }
        
        
        
    });
    
   
});

server.listen(8000,() => {
    console.log('서버가 시작됨!')
})