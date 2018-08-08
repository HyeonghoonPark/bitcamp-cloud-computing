// 요청 핸들러를 관리 + 호출

const http = require('http')
const url = require('url')

// 객체를 리턴해서 다시 호출해도 전에 호출한 객체를 리턴하기 때문에
// 함수를 리턴해서 내부 변수를 따로해서 port번호를 나눠서 관리하기 쉽다.
module.exports = function(){
    return {
    reqestHandlerMap:{},
    
    add(url, handler){
        this.reqestHandlerMap[url] = handler;
    },
    
    getHandler(url){
        return this.reqestHandlerMap[url];
    }, 
    
    listen(port, callback){
        var mapper = this;
        
        const server = http.createServer((req, res)=>{
            
            var urlInfo = url.parse(req.url, true);
            
            res.writeHead(200,{
                'Content-Type' : 'text/plain;charset=UTF-8'
            })
            
            var handler = mapper.getHandler(urlInfo.pathname);
            
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
        
        server.listen(port, callback)
    }
};
}

