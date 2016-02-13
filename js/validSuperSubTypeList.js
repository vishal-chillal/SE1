function makeTypeList(){
	var typeList = []
	for(i=0;i<dict_dag.length;i++){
		typeList.push(dict_dag[i].type_name)
	}
	return typeList
}

function getInvalidSubTypes(type) {
	typeList = makeTypeList();
	for( subType in dict_dag[typeList.indexOf(type)].sub_type)
		if(dict_dag[typeList.indexOf(type)].sub_type[subType] != '') {
			invalidLs.push(dict_dag[typeList.indexOf(type)].sub_type[subType]);
			invalidLs.concat(getInvalidSubTypes(dict_dag[typeList.indexOf(type)].sub_type[subType]));
		}
	var diff = $(typeList).not(invalidLs).get();
	return diff
}

function getInvalidSuperTypes(type) {
	typeList = makeTypeList();
	for( superType in dict_dag[typeList.indexOf(type)].super_type)
		if(dict_dag[typeList.indexOf(type)].super_type[superType] != '') {
			invalidLs.push(dict_dag[typeList.indexOf(type)].super_type[superType]);
			invalidLs.concat(getInvalidSuperTypes(dict_dag[typeList.indexOf(type)].super_type[superType]));
		}
	var diff = $(typeList).not(invalidLs).get();
	return diff;
}

invalidLs = []
