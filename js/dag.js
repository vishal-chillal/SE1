var input = "[(A,[B,C]),(B,[C,D]),(C,[]),(D,[])]"
var input_cycle = "[(A,[B,C]),(B,[C,D]),(C,[]),(D,[A])]"
var typeList = []
var invalidLs = []
var dict_dag = [];
function take_dag_in(input){
	var my_str = input;
	my_str = input.substring(1,(input.length)-1)
	my_str = my_str.split("),");
	for(i=0;i<my_str.length-1;i++)
	make_entries_from_dag(my_str[i].substring(1,(my_str[i].length)-1))
	var last = my_str[my_str.length-1]
	make_entries_from_dag(last.substring(1,last.length-2))
	make_super_types_entries();
	return my_str;
}
function make_super_types_entries(){
	for(i=0;i<dict_dag.length;i++){
		var sup_type = dict_dag[i].super_type;
		for(j=0;j<sup_type.length;j++)
		for (k=0;k<dict_dag.length;k++)
		if(dict_dag[k].type_name == sup_type[j])
			dict_dag[k].sub_type.push(dict_dag[i].type_name)
	}
}
function make_entries_from_dag(str){
	my_tup = str.split(",[")
	var super_type = my_tup[1].split(",");
	if (my_tup[1] != '')
		dict_dag.push({type_name:my_tup[0],super_type:super_type,sub_type:[]})
	else
		dict_dag.push({type_name:my_tup[0],super_type:[],sub_type:[]})
}
function put_dag_out(){
	var out_dag = "[";
	for(i=0;i<dict_dag.length;i++){
		var tmp_str1 = "(";
		tmp_str1 = tmp_str1 + dict_dag[i].type_name+",[";
		for(j=0;j<dict_dag[i].super_type.length;j++){
			if (j != dict_dag[i].super_type.length-1)
				tmp_str1 = tmp_str1 + dict_dag[i].super_type[j]+",";
			else
				tmp_str1 = tmp_str1 + dict_dag[i].super_type[j];
		}
		if (i != dict_dag.length-1)
			tmp_str1 = tmp_str1 + "]),"
		else
			tmp_str1 = tmp_str1 + "])"
		out_dag = out_dag + tmp_str1;
	}
	out_dag = out_dag + "]"
	return out_dag
}
function detectCycle(){
	type = $('#select_type_list').val()
	var vertex = [];
	var visiting = [];
	var visited = [];
	for (x=0;x<dict_dag.length;x++)
	vertex.push(dict_dag[x].type_name)
	while (vertex.length > 0){
		current  = vertex[0];
		if (dfs(current,vertex,visiting,visited))
			return true
	}
	return false
}
function dfs(current,vertex,visiting,visited){
	mov_vertex(current,vertex,visiting);
	neighbor_list = getNeighbor(current);
	for (i=0;i<neighbor_list.length;i++){
		if ((isInArr(neighbor_list[i],visited))==true)
			continue;
		if ((isInArr(neighbor_list[i],visiting))==true)
			return true;
		if (dfs(neighbor_list[i],vertex,visiting,visiting)== true)
			return true
	}
	mov_vertex(current,visiting,visited)
	return false;
}

function mov_vertex(current,source,destination){
	index = source.indexOf(current);
	if (index > -1)
		source.splice(index, 1)
	destination.push(current)
}
function getNeighbor(name){
	for (y=0;y<dict_dag.length;y++)
	if (dict_dag[y].type_name == name)
		return (dict_dag[y].sub_type);
}
function isInArr(node,visited){
	for(k=0;k<visited.length;k++)
	if (node == visited[k])
		return true;
	return false;
}
function removeType(typeName) {
	for(type in dict_dag) {
		if(dict_dag[type].type_name == typeName)
			dict_dag.splice(type, 1);
		for(superType in dict_dag[type].super_type)
			if(typeName == dict_dag[type].super_type[superType])
				dict_dag[type].super_type.splice(superType,1);
		for(superType in dict_dag[type].sub_type)
			if(typeName == dict_dag[type].sub_type[superType])
				dict_dag[type].sub_type.splice(superType,1);
	}
}
function add_type_entry(type){
	for(i=0;i<dict_dag.length;i++){
		if (type == dict_dag[i].type_name){
			return -1
		}
	}
	dict_dag.push({type_name:type,super_type:[],sub_type:[]})
	return 1
}

function getInvalidSuperTypes(type,dict_dag,typeList){
	for(supType in dict_dag[typeList.indexOf(type)].super_type)
		if(dict_dag[typeList.indexOf(type)].super_type[supType]!=''){
			invalidLs.push(dict_dag[typeList.indexOf(type)].super_type[supType]);
			invalidLs.concat(getInvalidSuperTypes(dict_dag[typeList.indexOf(type)].super_type[supType],dict_dag,typeList));
		}
		invalidLs = invalidLs.concat(dict_dag[typeList.indexOf(type)].sub_type);
		 ls = typeList.filter(function(x){return invalidLs.indexOf(x)< 0})
		 return ls

}

function getInvalidSubTypes(type,dict_dag,typeList){
	for(subType in dict_dag[typeList.indexOf(type)].sub_type)
		if(dict_dag[typeList.indexOf(type)].sub_type[subType]!=''){
			invalidLs.push(dict_dag[typeList.indexOf(type)].sub_type[subType]);
			invalidLs.concat(getInvalidSubTypes(dict_dag[typeList.indexOf(type)].sub_type[subType],dict_dag,typeList));
		}
		 invalidLs = invalidLs.concat(dict_dag[typeList.indexOf(type)].super_type);
		 ls = typeList.filter(function(x){return invalidLs.indexOf(x)< 0})
		 return ls
}
function make_type_list(){
	typeList=[]
	for(i=0;i<dict_dag.length;i++){
		typeList.push(dict_dag[i].type_name)
	}
}
