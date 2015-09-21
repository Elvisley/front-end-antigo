angular.module('app_el').service("el_api_treinamento" , ['$http','config' , function($http , config){

		
		this.getGastosAnuais = function(year){
			return $http.get(config.rootUrl+"gastoAnual?ano="+year);
		}

		this.getAllTreinamentosFuncionario = function(id_funcionario){
			return $http.get(config.rootUrl+"treinamentosfuncionario?id_funcionario="+id_funcionario);
		}
 	   
		this.insertTreinamento = function(obj , id_funcionario){
			return $http.post(config.rootUrl+"salvarTreinamento?id_funcionario="+id_funcionario, obj);
		}

}]);

 