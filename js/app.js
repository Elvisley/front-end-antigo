var appElvis = angular.module('app_el' , ['ui.utils.masks','chart.js']);

appElvis.controller( 'ctrl_funcionario', ["$scope" ,'el_api_funcionario' , 'el_api_treinamento' ,function($scope , el_api_funcionario , el_api_treinamento){

	$scope.message = {};
    $scope.grafico = true;
	$scope.listar = true;
	$scope.loading = false;
	$scope.funcionarios = [];
	$scope.treinamentos = [];
	$scope.valorTotalGastoAno = 0.00;
	$scope.valorDisponivel = 3000.00;
	$scope.codigo_cliente_selecionado = false;
	$scope.anodigitado = new Date().getFullYear();
	
	var carregarFuncionarios = function () {
		$scope.message = {};
		el_api_funcionario.getAllFuncionarios().success(function (data) { 
			$scope.funcionarios = data;
		}).error(function (data, status) {
			console.log(data);
		});
	};
	
	$scope.buscarInformacoesTreinamentosFuncionario = function(obj){
		$scope.message = {};
		$scope.valorTotalGastoAno = 0.00;
		$scope.loading = true;
		$scope.codigo_cliente_selecionado = obj.id;
		$scope.nome_funcionario_selecionado = obj.name;
		$scope.listar = true;
		
		el_api_treinamento.getAllTreinamentosFuncionario(obj.id).success(function (data) {

			 $scope.treinamentos = data.filter(function (treino) {
				if (treino.year == $scope.anodigitado ){
					$scope.valorTotalGastoAno = parseFloat($scope.valorTotalGastoAno) + parseFloat(treino.value) ;
					return data;
				} 
			 });

			 $scope.loading = false;
			
		}).error(function (data, status) {
			console.log(data);
		});
	}

	$scope.cadastrarTreinamento = function(){
		$scope.message = {};
		$scope.listar = !$scope.listar;
	}

	$scope.salvarTreinamento = function(obj){
		
		obj.year = obj.month_year.getFullYear();
		obj.month = obj.month_year.getMonth() + 1;
		
		delete(obj.month_year);
		
		el_api_treinamento.insertTreinamento(obj , $scope.codigo_cliente_selecionado).success(function (data) {
			var obj = {};
			obj.id = $scope.codigo_cliente_selecionado;
			obj.name = $scope.nome_funcionario_selecionado;
			$scope.buscarInformacoesTreinamentosFuncionario(obj);
		}).error(function (data, status) {
			$scope.message.type = "danger";
			$scope.message.text = data;
			$scope.message.error = true;
		});

	}

	$scope.visualizarDashboard = function(){
		$scope.message = {};
		if($scope.grafico == false){
		 	carregarGrafico($scope.anodigitado);
		}

		$scope.grafico = !$scope.grafico;
		$scope.codigo_cliente_selecionado = false;

	}

	
	var carregarGrafico = function(year){
		$scope.labels = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
							'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

		  el_api_treinamento.getGastosAnuais(year).success(function (data) {  

			  var arra = [0,0,0,0,0,0,0,0,0,0,0,0];

			  $(arra).each(function(index, task){

				  if(data[index+1] != null){
					  arra[index] = data[index+1];
				  }
			  });

			  $scope.data = [ arra ];

		  }).error(function (data, status) {
			console.log(data);
		  });
	}
	
	$scope.buscarGastoAno = function(ano){
		if($scope.codigo_cliente_selecionado != false){
			var obj = {};
			obj.id = $scope.codigo_cliente_selecionado;
			obj.name = $scope.nome_funcionario_selecionado;
			$scope.buscarInformacoesTreinamentosFuncionario(obj);	
		}else{
			carregarGrafico(ano);
		}		

	}
	
	carregarGrafico($scope.anodigitado);
	carregarFuncionarios();
	
}]);

