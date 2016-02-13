/*key event handling starts*/
count = 0
$('#input_box').keydown(function(event){

	var keycode = event.which;
	validKeyList = [[13,add_type],[38,changeState],[40,changeState]]
	function getIndex(value){
		return value[0] == keycode
	}
	funcName = validKeyList.filter(getIndex)[0][1]
	funcName();
});

function add_type(){
	type = $('#input_box').val()
	out = add_type_entry(type);
	put_msg(out,type);
	if(out == 0){
		var x = document.getElementById("select_type_list");
		var option = document.createElement("option");
		option.text = type;
		option.value = type;
		x.add(option);
		if(count < 15)
			$("#select_type_list").css("height", parseInt($("#select_type_list option").length) * 20);
	}
	update_DAG();
	return
}

function changeState(){
	add_type();
	$("#select_type_list:last").focus();
	/*$('.list_type').hide();*/
	return
}
function put_msg(val,Type){
	msg_add_edit = [[0,Type+" added to list"],[-1,Type+" Invalid type name"],[1,Type+" already exist type"]]
	function getIndexMsg(value){
		return value[0] == val
	}
	msg = msg_add_edit.filter(getIndexMsg)[0][1]
	$('.msg').text("msg : "+msg );
}
