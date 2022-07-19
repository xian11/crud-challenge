const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true})) 

const MongoClient = require('mongodb').MongoClient;

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

var db;
MongoClient.connect('mongodb+srv://bohyun:chlqhbo3278@boilerplate.kfozn.mongodb.net/?retryWrites=true&w=majority', function(에러, client){
    if (에러) return console.log(에러);

    db = client.db('server');

    app.listen('8080', function(){
      console.log('listening on 8080')
    });
  });

app.get('/', function(req,res){
    // res.send('하이');
    res.render('index.ejs')
});

app.get('/write', function(req,res){
    res.render('write.ejs')
});

app.post('/add', function(req,res){
    db.collection('counter').findOne({ name : 'post_count' }, function(err,result){
        
        let total_post = result.totalPost;
        db.collection('post').insertOne({ _id : total_post + 1, 제목 : req.body.title, 내용 : req.body.content},(err, result) => {
            res.send('저장이 완료되었습니다');
            db.collection('counter').updateOne({ name : "post_count" },{ $inc : {totalPost:1} }, function(err,result){
                if(err) return console.log(err);
            });
        });

    });
});

app.get('/list', function(req,res){
    db.collection('post').find().toArray(function(err,result){
        res.render('list.ejs', { posts : result });
    });
});

app.delete('/delete', function(req,res){
    req.body._id = parseInt(req.body._id);
    db.collection('post').deleteOne(req.body, function(err,result){
        console.log('delete complete');
        res.status(200).send({ message : '성공했습니다' });
    });
});

app.get('/detail/:id', function(req,res){
    db.collection('post').findOne({_id : parseInt(req.params.id)}, function(err,result){
            if (result == null) {
                res.send('존재하지 않는 게시물입니다')
            } else {
                res.render('edit.ejs', { post : result });
            }
        res.render('detail.ejs', { data : result });
    });
});

app.get('/edit/:id', function(req,res){
        db.collection('post').findOne({_id : parseInt(req.params.id)}, function(err,result){
            console.log(result);
                res.render('edit.ejs', { post : result });

            // if (result == null) {
            //     res.send('err')
            // } else {
            //     res.render('edit.ejs', { post : result });
            // }
            
        });

});

app.put('/edit', function(req,res){
    //여기서의 req.body.id는 edit.ejs에서 display:none인 input에서온것
    db.collection('post').updateOne(
        {_id : parseInt(req.body.id)},
        {$set : { 제목:req.body.title, 내용:req.body.content } }
        ,function(err,result){
            //res.redirect();해도됨
            res.send("<script>alert('수정이 완료되었습니다.');location.href='/list';</script>");
        });
});