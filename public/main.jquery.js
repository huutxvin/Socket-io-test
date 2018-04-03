
$(document).ready(function(){
	$('.register').show(2000);
	$('.chatForm').hide(1);
	$('#btnJoin').click(function(){
		socket.emit('client-send-name',$('#txtusername').val());
	});
    // $('#logOut').click(function(){
    // 	socket.emit('client-send-logout');
    // 	$('.chatForm').hide(1000);
    // 	$('.register').show(2000);   
    // });
    $('#btnSend').click(function(){
        var sendDate = new Date().getMilliseconds();
    	socket.emit('client-send-msg',$('#msg').val() +" " + sendDate.toString());
    });
});