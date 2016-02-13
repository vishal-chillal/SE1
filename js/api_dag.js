function add_type_entry(type){
	var letters = /^[A-Za-z][A-Za-z0-9\-]*$/
	if(!type.match(letters)){
		return -1
	}
	for(i=0;i<dict_dag.length;i++){
		if (type == dict_dag[i].type_name){
			return 1
		}
	}
	dict_dag.push({type_name:type,super_type:[],sub_type:[]})
	return 0
}

function load_DAG(){
	dict_dag = []
	input = $('#string_dag').val()
	take_dag_in(input);
	for(i=0;i<dict_dag.length;i++){
		type = dict_dag[i].type_name
		var x = document.getElementById("select_type_list");
		var option = document.createElement("option");
		option.text = type;
		option.value = type;
		x.add(option);
		if(count < 15)
			$("#select_type_list").css("height", parseInt($("#select_type_list option").length) * 20);
	}
	update_DAG();
}

function update_DAG(){
	str = put_dag_out();
	count = dict_dag.length
	$('.number').text("No. of type : "+count)
	$('#string_dag').val(str);
	make_type_list();

}

function removeType(typeName) {
	for(type in dict_dag) {
		if(dict_dag[type].type_name == typeName)
			dict_dag.splice(type, 1);
		for(superType in dict_dag[type].super_type)
			if(typeName == dict_dag[type].super_type[superType])
				dict_dag[type].super_type.splice(superType,1);
	}
}

function add_super_type_entry(type,ls){
	make_type_list();
	for(i=0;i<ls.length;i++){
		dict_dag[typeList.indexOf(type)].super_type.push(ls[i])
	}
	update_DAG();
}

function add_sub_type_entry(type,ls){
	make_type_list();
	alert(ls)
	for(i=0;i<ls.length;i++){
		dict_dag[typeList.indexOf(ls[i])].super_type.push(type)
	}
	update_DAG();
}
