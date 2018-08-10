// 주제 : DAO 모듈 만들기

var pool;

exports.setConnectionPool = (connectionPool) => {
    pool = connectionPool;
};

exports.list = (pageNo = 1, pageSize = 3, handler) => {
    
    var startIndex = (pageNo - 1) * pageSize;
    
    pool.query('select bno,titl,cdt from pms2_board limit ?, ?',
            [startIndex, pageSize],
            function(err, results) {
        handler(err, results);
    });
    
}

exports.add = (data, handler) => {

    pool.query('insert into pms2_board(titl,cont,cdt) values(?,?,now())',
            [data.id, data.email, data.password],
            function(err, result) {
                handler(err, result)
    });
}

exports.update = (data, handler) => {
    
    pool.query('update pms2_board set titl=?, cont=?, cdt=now() where bno=? ',
            [data.email,  data.id],
            function(err, result) {
        handler(err, result); 
});
}

exports.remove = (data, handler) => {
    
    pool.query('delete from pms2_board where bno=?',
            [data.id],
            function(err, result) {
        
        handler(err, result)
    });
    
}