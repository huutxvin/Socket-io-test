
$(document).ready(function(){
	$('#btnJoin').click(function(){
		socket.emit('client-send-name',$('#txtusername').val());
	});
    $('#btnSend').click(function(){
        var sendDate = new Date().getMilliseconds();
    	socket.emit('client-send-msg',$('#msg').val() +" " + sendDate.toString());
    });
});