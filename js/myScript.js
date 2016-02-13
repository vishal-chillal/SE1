var types_option = []
var current_super= []
var current_DAG = ""

$(document).ready(function(){
	includeJs('js/state_addEdit.js');
	includeJs('js/state_selectType.js');
	includeJs('js/dag.js');
	includeJs('js/api_dag.js');
	includeJs('js/state_constructType.js');
	$('#input_box').focus();
	$("#string_dag").val("[]")
	$('#button_load').click(function(){
		$('#select_type_list').empty()
		load_DAG();
	})
	$('#sub_type_construct').hide();
	$('#super_type_construct').hide();

});
/*function to include other js files*/
function includeJs(path)
{
	var imported = document.createElement('script');
	imported.src = path;
	document.head.appendChild(imported);
}

function helpAddEdit(){
	$('.help_session1').show();
	$('.help_session2').hide();
	$('.help_session3').hide();

}
function helpTypeSel(){
	$('.help_session1').hide();
	$('.help_session2').show();
	$('.help_session3').hide();

}
function helpSubSuperCons(){
	$('.help_session1').hide();
	$('.help_session2').hide();
	$('.help_session3').show();

}
