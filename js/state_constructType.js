current_type = ""
$('#sub_type_construct').keydown(function(event){
	var keycode = event.which;
	validKeyList = [[27,discard],[37,saveSessionSub],[32,toggleSelection]]
	function getIndex(value){
		return value[0] == keycode
	}
	funcName = validKeyList.filter(getIndex)[0][1]
	funcName();
});

$('#super_type_construct').keydown(function(event){
	var keycode = event.which;
	validKeyList = [[27,discard],[37,saveSessionSup],[32,toggleSelection]]
	function getIndex(value){
		return value[0] == keycode
	}
	funcName = validKeyList.filter(getIndex)[0][1]
	funcName();
});


function discard(){
	document.getElementById("sub_type_construct").innerHTML = "";
	document.getElementById("super_type_construct").innerHTML = "";
	$("#input_box").focus();
	$("#sub_type_construct").hide();
}
function saveSessionSub(){
	var selSuperTypes = [];
	$('#sub_type_construct :selected').each(function(i, selected){
		selSuperTypes[i] = $(selected).text();
	});
	add_super_type_entry(current_type,selSuperTypes);
	document.getElementById("sub_type_construct").innerHTML = "";
	$("#input_box").focus();
}
function saveSessionSup(){
	var selSubTypes = [];
	$('#super_type_construct :selected').each(function(i, selected){
		selSubTypes[i] = $(selected).text();
	});
	add_sub_type_entry(current_type,selSubTypes);
	document.getElementById("super_type_construct").innerHTML = "";
	$("#input_box").focus();
}
function toggleSelection(){
	alert("toggle selection");
	$('#sub_type_construct').val().select();
	$("#sub_type_construct").hide();
}
function constructSuperType(){

	document.getElementById("super_type_construct").innerHTML = "";
	type = $('#select_type_list').val()
	invalidLs = []
	make_type_list();
	invalidList = getInvalidSubTypes(current_type,dict_dag,typeList);
	checkSubLs = invalidList
	$.each( checkSubLs, function( index, value ){
		var x = document.getElementById("super_type_construct");
		var option = document.createElement("option");
		option.text = value;
		option.value = value;
		x.add(option);
		$("#super_type_construct").css("height", parseInt($("#super_type_construct option").length) * 20);
	});
	$("#super_type_construct").focus();

}
function constructSubType(){
	document.getElementById("sub_type_construct").innerHTML = "";
	type = $('#select_type_list').val()
	make_type_list();
	invalidList = getInvalidSuperTypes(current_type,dict_dag,typeList);
	checkSuperLs = invalidList;
	$.each( checkSuperLs, function( index, value ){

		var x = document.getElementById("sub_type_construct");
		var option = document.createElement("option");
		option.text = value;
		option.value = value;
		x.add(option);
		$("#sub_type_construct").css("height", parseInt($("#sub_type_construct option").length) * 20);
	});
	$("#sub_type_construct").focus()

}
