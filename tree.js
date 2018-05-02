if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elementoDePesquisa, pontoInicial) {
  
      var k;
  
      //1. Deixe-o ser o resultado da chamada de toObject
      // passando o valor de this como argumento.
      if (this == null) {
        throw new TypeError('"this" é nulo (null) ou não foi definido (undefined');
      }
  
      var O = Object(this);
  
      // 2. Deixar o tamanhoValor ser o resultado da
      // chamada do método interno Get de 0 com o
      // argumento "length"
      // 3. Deixar o  tamanhoValor ser um ToUint32(tamanhoValor).
      var tamanho = O.length >>> 0;
  
      // 4. se o tamanho é 0, retorna -1.
      if (tamanho === 0) {
        return -1;
      }
  
      // 5. Se o argumento pontoInicial for passado, use o ToInteger(pontoInicial); senao use 0.
      var n = + pontoInicial || 0;
  
      if (Math.abs(n) === Infinity) {
        n = 0;
      }
  
      //6. Se n >= tamanho, retorna -1.
      if (n >= tamanho) {
        return -1;
      }
  
      // 7. Se n>= 0, entao k seja n.
      // 8. Senao, n<0, k seja tamanho - abs(n).
      // Se k é menor que 0, entao k seja 0.
      k = Math.max(n >= 0 ? n : tamanho - Math.abs(n), 0);
  
      // 9. Repita, enquanto k < tamanho
      while (k < tamanho) {
        // a. Deixe Pk ser ToString(k).
        //    isto é implicito para operandos LHS de um operador
  
        // b. Deixe o kPresent  ser o resultado da chamada do método interno de 0 com argumento Pk
        //      Este passo pode ser combinado com c.
        // c. Se kPresent é true, entao
        //    i.  Deixe o  elementK ser o resultado da chamada do metodo interno Get de 0 com argumento ToString(k)
        //   ii.  Deixe o resultado ser aplicado pelo Algoritmo de
        //        Comparação de Igualdade Estrita (Strict Equality Comparison) para o elementoDePesquisa e elementK
        //  iii.  caso verdadeiro, retorne k.
        if (k in O && O[k] === elementoDePesquisa) {
          return k;
        }
        k++;
      }
      return -1;
    };
  }

angular.module("arvoreModule", []).controller("arvoreController", ["$scope", "$http", function($scope, $http){
    var tree = new Object();
    var elemento = new Object();
    this.initiateTree = function(){ 
       tree.value = null;
       tree.right = null;
       tree.left = null;
       tree.prev = null;
       $scope.path = new Array();
    }
    this.inserir = function(){
        console.log(this.x.value);
        var element = new Object();
        element.value = parseInt(this.x.value);
        //element.value = this.x.value;
        element.right = null;
        element.left = null;
        element.prev = null;
        if(tree.value == null){
           tree = element;
           populaPath(element.value, "Inserido como Raiz da Arvore.", null);
        }else{
            var aux = tree;
            while(aux != null){
                if(element.value > aux.value){
                    if(aux.right == null){
                        aux.right = element;
                        aux.right.prev = aux;
                        console.log(tree);
                        populaPath(element.value, "Adicionado à direita de ", aux.value);
                        return ;
                    }
                    aux = aux.right;
                }else if(element.value < aux.value){
                    if(aux.left == null){
                        aux.left = element;
                        aux.left.prev = aux;
                        console.log(tree);
                        populaPath(element.value, "Adicionado à esquerda de", aux.value);
                        return ;
                    }
                    aux = aux.left;
                }else{
                    alert("Elemento já adicionado anteriormente.");
                    console.log(tree);
                    return ;
                }

            }
        }
        console.log(tree);
    }
    this.listOrdem = function(){
        $scope.ordem = new Array();
        if(tree.value == null){
            alert("Arvore vazia.");
            return ;
        }
        recursiveOrdem(tree);
        console.log($scope.ordem);
    }
    this.listPreOrdem = function(){
        $scope.preordem = new Array();
        if(tree.value == null){
            alert("Arvore vazia.");
            return ;
        }
        recursivePreOrdem(tree);
        console.log($scope.preordem);
    }
    this.listPosOrdem = function(){
        $scope.posordem = new Array();
        if(tree.value == null){
            alert("Arvore vazia.");
            return ;
        }
        recursivePosOrdem(tree);
        console.log($scope.posordem);
    }

    function recursiveOrdem(element){
        if(element.left != null){
            recursiveOrdem(element.left);
        }
        if($scope.ordem.indexOf(element.value) < 0){
            $scope.ordem.push(element.value);
        }
        if(element.right != null){
            recursiveOrdem(element.right);
        }
    }

    function recursivePreOrdem(element){
        if($scope.preordem.indexOf(element.value) < 0){
            $scope.preordem.push(element.value);
        }
        if(element.left != null){
            recursivePreOrdem(element.left);
        }
        if(element.right != null){
            recursivePreOrdem(element.right);
        }
    }

    function recursivePosOrdem(element){
        if(element.left != null){
            recursivePosOrdem(element.left);
        }
        if(element.right != null){
            recursivePosOrdem(element.right);
        }
        if($scope.posordem.indexOf(element.value) < 0){
            $scope.posordem.push(element.value);
        }
    }

    this.remover = function(){
        if(tree.value == null){
            alert("A arvore está vazia.");
            return ;
        }
        if(this.x == undefined){
            alert("Digite um valor.");
            return ;
        }
        $scope.ordem = new Array();
        recursiveOrdem(tree);
        if($scope.ordem.indexOf(parseInt(this.x.value)) < 0){
            alert("Valor não encontrado na arvore.");
            return ;
        }
        searchValue(tree, parseInt(this.x.value));
        console.log(elemento);
        removerElemento(elemento);
        //console.log(elemento);
        console.log(tree);
        
        //console.log(teste());
    }

    function searchValue(element, x){
        if(element.left != null){
            searchValue(element.left, x);
        }
        if(element.value == x){
            elemento = element;
        }
        if(element.right != null){
            searchValue(element.right, x);
        }
        /*var aux = $scope.tree;
        var tried = new Array();
        while(aux.left != null){
            aux = aux.left;
        }
        while(true){
            if(tried.indexOf(aux.value) < 0){
                tried.push(aux.value);
            }
            if(aux.value == x){
                return aux;
            }
        }*/
    }

    function removerElemento(element){
        var prev = element.prev;
        if(element.right == null && element.left == null){
            if(prev.value > element.value){
                prev.left = null;
            }else{
                prev.right = null;
            }
            populaPath(element.value, "Removido da arvore sem mover outros elementos.", null);
            //element = null
            console.log(prev);
        }else
        if(element.right == null && element.left != null){
            if(prev.value > element.value){
                prev.left = prev.left.left;
                populaPath(element.value, "Removido da arvore e substituido por ", prev.left.value);
            }else{
                prev.right = prev.right.left;
                populaPath(element.value, "Removido da arvore e substituido por ", prev.right.value);
            }
            console.log(element);
        }else
        if(element.left == null && element.right != null){
            if(prev.value > element.value){
                prev.left = prev.left.right;
                populaPath(element.value, "Removido da arvore e substituido por ", prev.left.value);
            }else{
                prev.right = prev.right.right;
                populaPath(element.value, "Removido da arvore e substituido por ", prev.right.value);
            }
            console.log(element);
        }else{
            var aux = element.right;
            while(aux.left != null){
                aux = aux.left;
            }
            if(aux.right != null){
                aux.prev.left = aux.right;
            }else{
                aux.prev.left = null;
            }
            if(prev != null){
                if(prev.value > element.value){
                    prev.left = aux;
                }else{
                    prev.right = aux;
                }
            }
            populaPath(element.value, "Removido e substituido por ", aux.value);
            aux.prev = prev;
            aux.left = element.left;
            if(aux.value != element.right.value){
                aux.right = element.right;
            }
            element = null;
            console.log(element);
        }
        while(prev.prev != null){
            prev = prev.prev;
        }
        tree = prev;

    }

    function populaPath(valor, msg, valorant){
        var path = new Object();
        path.valor = valor;
        path.msg = msg;
        path.valorant = valorant;
        $scope.path.push(path);
    } 
}])