angular.module('app_el').service("el_api_funcionario" , ['$http','config' , function($http , config){
		
		this.getAllFuncionarios = function(){
			return $http.get(config.rootUrl+"todosfuncionarios" );
		}

		this.getFuncionario = function(id){
			return $http.get(config.rootUrl+"/funcionario?id_funcionario="+id);
		}

}]);
        