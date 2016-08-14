angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ConversorCtrl', function($scope, $cordovaSocialSharing) {
  
  $scope.historico = [];

  if(hasData('historicoSimples')){
    $scope.historico = angular.fromJson(loadData('historicoSimples'));
  }

  $scope.dados = {
    entrada: "",
    saida: 0
  }

  $scope.opcoes = [
    {nome:"g/100g (%)", valor:1},
    {nome:"g/kg", valor:10},
    {nome:"mg/dm³", valor:10000},
    {nome:"kg/ha", valor:20000},
    {nome:"t/ha", valor:20}
  ];

  $scope.opcao = {
    de: $scope.opcoes[0],
    para: $scope.opcoes[0]
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // $scope.opcoesDe.model = $scope.opcoesDe.availableOptions[0];
  // $scope.opcoesPara.model = $scope.opcoesPara.availableOptions[0];

  $scope.converter = function(){
    
    var entrada = parseFloat($scope.dados.entrada);
    
    if(!entrada){
      return;
    }
    
    var aux = entrada*($scope.opcao.para.valor/$scope.opcao.de.valor);
    $scope.dados.saida = aux.toLocaleString();

    var hEntry = $scope.dados.entrada.toLocaleString() + " " +  $scope.opcao.de.nome + " = " + $scope.dados.saida + " " + $scope.opcao.para.nome;
    $scope.historico.unshift(hEntry);
    $scope.dados.entrada = "";
    saveData('historicoSimples',angular.toJson($scope.historico));
  }

  $scope.copiarHistorico = function(){
    var string = $scope.historico.join('\n') + "\n\nEnviado de SoloConversor";
    $cordovaSocialSharing
        .share(string, "Solo Conversor - Histórico", null, null);
  }

  $scope.limparHistorico = function(){
    clearData('historicoSimples');
    $scope.historico = [];
  }

})

.controller('ConversorComplexoCtrl', function($scope, $cordovaSocialSharing) {

  $scope.historico = [];

  $scope.dados = {
    entrada: "",
    saida: 0
  }

  if(hasData('historicoCompleto')){
    $scope.historico = angular.fromJson(loadData('historicoCompleto'));
  }

  $scope.opcoes = [
    {
      elemento: 'N',
      valores: [
        {nome:"cmolc",valor:1},
        {nome:"g N",valor:0.1401},
        {nome:"g NO3",valor:0.6201},
        {nome:"g NH4",valor:0.1804}
      ]
    },
    {
      elemento: 'P',
      valores: [
        {nome:"cmolc",valor:1},
        {nome:"g P",valor:0.1032},
        {nome:"g P2O5",valor:0.2367},
        {nome:"g PO4",valor:0.3166}
      ]
    },
    {
      elemento: 'K',
      valores: [
        {nome:"cmolc",valor:1},
        {nome:"g K",valor:0.3909},
        {nome:"g K2O",valor:0.4709}
      ]
    },
    {
      elemento: 'Ca',
      valores: [
        {nome:"cmolc",valor:1},
        {nome:"g Ca",valor:0.2004},
        {nome:"g CaO",valor:0.2804},
        {nome:"g CaCo3",valor:0.50045}
      ]
    },
    {
      elemento: 'Mg',
      valores: [
        {nome:"cmolc",valor:1},
        {nome:"g Mg",valor:0.1215},
        {nome:"g MgO",valor:0.2015},
        {nome:"g MgCO3",valor:0.4216}
      ]
    },
    {
      elemento: 'S',
      valores: [
        {nome:"cmolc",valor:1},
        {nome:"g S",valor:0.1603},
        {nome:"g S04",valor:0.4803},
        {nome:"g CaSO4",valor:0.6807}
      ]
    }
  ];

  $scope.opcao = {
    elemento: $scope.opcoes[0],
    de: $scope.opcoes[0].valores[0],
    para: $scope.opcoes[0].valores[0]
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  $scope.elementoChange = function(){
    $scope.opcao.de = $scope.opcao.elemento.valores[0];
    $scope.opcao.para = $scope.opcao.elemento.valores[0];
  }

  $scope.converter = function(){

    var entrada = parseFloat($scope.dados.entrada);
    
    if(!entrada){
      return;
    }
    
    var aux = entrada*($scope.opcao.para.valor/$scope.opcao.de.valor);
    $scope.dados.saida = aux.toLocaleString();

    var hEntry = entrada.toLocaleString() +" "+ $scope.opcao.de.nome + " = " + $scope.dados.saida + " " + $scope.opcao.para.nome;
    $scope.historico.unshift(hEntry);
    $scope.dados.entrada = "";
    saveData('historicoCompleto',angular.toJson($scope.historico));
  }

  $scope.copiarHistorico = function(){
    var string = $scope.historico.join('\n') + "\n\nEnviado de SoloConversor";
    $cordovaSocialSharing
        .share(string, "Solo Conversor - Histórico", null, null);
  }

  $scope.limparHistorico = function(){
    clearData('historicoCompleto');
    $scope.historico = [];
  }

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

// Camada storage, sera substituido por sqlLite
function hasData(name){
  if(typeof(Storage) == "undefined"){
    alert('Seu browser não suporta web storage.');
    return;
  }
  return localStorage.getItem(name) !== null;
}

function saveData(name,value){
  if(typeof(Storage) == "undefined"){
    alert('Seu browser não suporta web storage.');
    return;
  }
  localStorage.setItem(name, value);
}

function loadData(name){
  if(typeof(Storage) == "undefined"){
    alert('Seu browser não suporta web storage.');
    return;
  }
  return localStorage.getItem(name);
}

function clearData(name){
  localStorage.removeItem(name);
}