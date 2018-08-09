// 주제 : express 사용하기 - GET/POST 파라미터 처리

const express = require('express')
const app = express();

// => URL에 대해 함수를 연결한다.
app.get('/test01', (req, res) => {
    res.writeHead(200,{'Content-Type' : 'text/plain;charset=UTF-8'})
    res.write(`name=${req.query.name}\n`);
    res.write(`age=${req.query.age}\n`);
    res.end();
})

// => 서버 실행하기
app.listen(8000, () => {
    console.log('서버 실행 중...')
})