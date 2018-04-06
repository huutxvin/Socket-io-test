var express = require('express');
var app     = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views','./views');
var server = require('http').Server(app);
var io     = require('socket.io')(server);
server.listen(process.env.PORT || 3000);

var arr_user=[];

io.on('connection',function(socket){
    console.log('new connection');

    socket.on('client-send-name', function(data){
       if(arr_user.indexOf(data) >= 0){
           socket.emit('server-send-join-fail');
       }else{
           arr_user.push(data);//neu dk thanh cong se them data vao
           socket.Username = data;
           socket.emit('server-send-join-success', data);
           io.sockets.emit('server-send-user-list',arr_user);
       }
    });
    // socket.on('client-send-logout', function(){
    // 	arr_user.splice(
    // 		arr_user.indexOf(socket.Username), 1
    // 		);
    // 	socket.broadcast.emit('server-send-user-log-out', arr_user);
    // });
    socket.on('client-send-msg',function(data){
    	socket.time = new Date().getMilliseconds();
        io.sockets.emit('server-send-msg',{usr:socket.Username, content:data, time:socket.time.toString()});
    });
});


app.get('/', function(req, res){
	res.render('trangchu');
});