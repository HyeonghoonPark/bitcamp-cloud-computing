// 주제 : DAO 모듈 만들기

const mysql = require('mysql')
const express = require('express')
const Router = express.Router();
const memberdao = require('./memberdao')

var pool = mysql.createPool({
    connectionLimit : 10, // 접속자 수
    host: '13.125.254.147', 
    //port: '3306',
    database: 'studydb',
    user: 'study',
    password: '1111'
});

memberdao.setConnectionPool(pool);


// get 요청에 대해 핸들러를 등록하기! (post요청은 post)
Router.get('/list', (req, res) => {
    
    console.log('ccc');
    
    var pageNo = 1;
    var pageSize = 3;
    
    if(req.query.pageNo){
        pageNo = parseInt(req.query.pageNo)
    }
    if(req.query.pageSize){
        pageSize = parseInt(req.query.pageSize)
    }
    
    memberdao.list(pageNo, pageSize, (err, results) => {
        if (err){
            res.end('DB 조회 중 예외 발생!')
            return;
        }
        
        console.log(results)
      
        res.render('list', {list : results})
        
    });
})
Router.get('/view', (req, res) => {
    
   
    memberdao.view(req.query, (err, result) => {
        
        if (err){
            res.end(err)
            return;
        }
        
        console.log(result);
        
        res.writeHead(302, {"Location":`/member/view.html?id=${result[0].mid}&email=${result[0].email}&pwd=${result[0].pwd}`});

        res.end();

    })
    
    
})

Router.post('/add', (req, res) => {
    
    memberdao.add(req.body, (err, result) => {
        
        if (err){
            res.end(err)
            return;
        }
        
        res.writeHead(302, {"Location":`/member/list`});

        
        res.end('가입이 완료 됐습니다!'); 
        
    })
    
})
Router.post('/update', (req, res) => {
    

    memberdao.update(req.body, (err,result) => {
        
        if (err){
            res.end('DB 조회 중 예외 발생!')
            return;
        }
        
        res.writeHead(302, {"Location":`/member/list`});
        
        res.end('변경 성공입니다!'); 

    })
    
})
Router.post('/remove', (req, res) => {
    
    
    memberdao.remove(req.body , (err, result) => {
        
        if (err){
            res.end('DB 조회 중 예외 발생!')
            return;
        }
        console.log(result);
        
        res.writeHead(302, {"Location":`/member/list`});
        
        res.end(); 
        
        
    })
    
})


module.exports = Router;