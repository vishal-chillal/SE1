$('#select_type_list').keydown(function(event){
	var keycode = event.which;
	validKeyList = [[13,add_exist],[42,edit_exist],[38,typeSelUp],[40,typeSelDown],[37,call_constructSuperType],[39,call_constructSubType],[46,deleteType]]
	function getIndex(value){
		return value[0] == keycode
	}
	funcName = validKeyList.filter(getIndex)[0][1]
	funcName();
});
function add_exist(){
	$('#input_box').val(" ");
	type = $('#select_type_list').val()
	$('#input_box').val(type);
	input_box.focus();
	update_DAG();
}
function edit_exist(){
	$('#input_box').val(" ");
	type = $('#select_type_list').val()
	$('#input_box').val(type);
	deleteType();
	input_box.focus();
	update_DAG();

}
function deleteType(){
	type =  $('#select_type_list :selected').text();
	$('#select_type_list option[value="'+type+'"]').remove();
	removeType(type);
	update_DAG();
}
function typeSelUp(){
	ind  = $("#select_type_list option:selected").index()
	if(ind == 0){
		alert("at top")
		/*alert($("#select_type_list").last().text());*/
			$("#select_type_list:last").focus();
	}

}
function typeSelDown(){

}

function call_constructSuperType(){
	$('#sub_type_construct').hide();
	$('#super_type_construct').show();
	current_type =$('#select_type_list :selected').text();
	constructSuperType();
}

function call_constructSubType(){
	$('#sub_type_construct').show();
	$('#super_type_construct').hide();
	current_type =$('#select_type_list :selected').text();
	constructSubType();
}
