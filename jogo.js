var timerId = null; // Variável que armazerna a chamada da função timeout

function iniciarJogo(){

	var url = window.location.search; // Isso irá retornar a queryString da url (Os valores apos o "?" contando com o proprio "?")

	var nivel = url.replace("?",""); // A função replace vai pegar o sinal "?" e substituir por um valor vazio ""

	/*

	O nivel do jogo vai definir a quantidade de tempo para estourar os balões
	
	Nivel 1 | Fácil   - 120 segundos
	Nivel 2 | Normal  - 60 segundos
	Nivel 3 | Difícil - 30 segundos 

	*/


	var segundos = 0;


	if(nivel == 1){

		segundos = 120;

	}

	if(nivel == 2){

		segundos = 60;

	}

	if(nivel == 3){

		segundos = 30;

	}


	// Inserindo os segundos na tabela
	document.getElementById('cronometro').innerHTML = segundos; // Com o atributo innerHTML eu consigo colocar valores DENTRO da minha tag HTML

	//quantidade de baloes e chamada da função
	var qtde_baloes = 80;
	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;

	//quantidade de baloes estourados
	qtde_baloes_estourados = 0;
	document.getElementById('baloes_estourados').innerHTML = qtde_baloes_estourados;

	criar_baloes(qtde_baloes);


	//Chamada da contagem do tempo
	contagem (segundos);
}

// CONTAGEM DO TEMPO
function contagem (segundos){

	if(segundos == -1){
		clearTimeout(timerId); // Para a execução da função setTimeout e retorna false para função toda
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos; 

	segundos = segundos - 1; // Os segundos vão sendo decrementados aqui
	timerId = setTimeout("contagem("+segundos+")", 1000); // A função steTimeout chama a função contagem a cada 1s 

}

// CRIAÇÃO DOS BALÕES 

function criar_baloes(qtde_baloes){
	
	for(var i = 1; i<=qtde_baloes; i++){

		var balao = document.createElement("img"); // creatElement cria uma Tag HTML
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		balao.style.padding ='5px';
		balao.id = 'b'+i;

		balao.onclick = function(){ estourar(this); };

		document.getElementById('cenario').appendChild(balao); // Transformo a imagem balão como filha da tag cenario

	}

}

// ESTOURAR BALÕES 
function estourar(e){
	var id_balão = e.id;
	document.getElementById(id_balão).src = 'imagens/balao_azul_pequeno_estourado.png';
	document.getElementById(id_balão).setAttribute("onclick", "");

	pontuacao(-1);
}



//PONTUAÇAO
function pontuacao(acao){
	var inteiro = document.getElementById('baloes_inteiros').innerHTML;
	var estourado = document.getElementById('baloes_estourados').innerHTML;

	//Como eu estou recuperando valores textuais eu preciso transforma-los em inteiros
	inteiro = parseInt(inteiro);
	estourado = parseInt(estourado);

	inteiro = inteiro + acao;
	estourado = estourado - acao;

	document.getElementById('baloes_inteiros').innerHTML = inteiro;
	document.getElementById('baloes_estourados').innerHTML = estourado;

	situacao_jogo(inteiro);

}

//SITUAÇÃO JOGO
function situacao_jogo(i){
	if(i == 0){
		var t = timerId - 1;
		alert('Parabens! Você estorou todos os baloes em '+t+ ' segundos');
		parar_jogo(); 
	}
}

//PARAR O JOGO(){
function parar_jogo(){
	clearTimeout(timerId);
}

function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}

// GAME OVER
function game_over(){
	alert('GAME OVER!');
	remove_eventos_baloes();
}
