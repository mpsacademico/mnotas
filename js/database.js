var titulo = document.getElementById('titulo');
var conteudo = document.getElementById('conteudo');
var visibilidade = document.getElementById('visibilidade');
var criar = document.getElementById('criar');

var lista = document.getElementById('lista');

var deletarTudo = document.getElementById('deletar-tudo');

var painelnota = document.getElementById('painel-nota');

var menuzinho = function(){
	var tg = event.target;	
	var id = tg.getAttribute("data-id");
	var pe = tg.parentElement;
	pe = pe.parentElement;
	var json = JSON.parse(pe.getAttribute("data-json"));	
	pe.setAttribute("class","nota-"+id+" card-content blue lighten-5");
	pe.innerHTML = '<span class="card-title">Edição da nota '+id+' <a onclick="reabrir()"><i class="material-icons right">close</i></a></span><input type="text" name="ttitulo" value="'+json.titulo+'"><textarea id="tconteudo" class="materialize-textarea">'+json.conteudo+'</textarea><btn class="btn blue" onclick=\'editar("'+id+'")\'>Editar</btn><btn class="btn red" onclick=\'remover("'+id+'")\'>Remover</btn>';
	var cardclick = document.getElementsByClassName('cardclick');
	for (var i = 0; i < cardclick.length; i++) {
		cardclick[i].style.display = 'none';
	}
}

function remover(id){
	firebase.database().ref("notas").child(id).remove();
}

function editar(id){
	var el = document.getElementsByClassName("nota-"+id)[0];
	var json = JSON.parse(el.getAttribute("data-json"));
	var titulo = el.childNodes[1].value;
	var conteudo = el.childNodes[2].value;
	var up = {};
	up["/notas/"+id] = {titulo:titulo, timestamp:json.timestamp, conteudo:conteudo};
	return firebase.database().ref().update(up);
}

function reabrir(){
	var cardclick = document.getElementsByClassName('cardclick');
	for (var i = 0; i < cardclick.length; i++) {
		cardclick[i].style.display = 'initial';
	}	
}

var menuhtml = '<a href=';

criar.addEventListener('click', function () {
    var r = criarNota(titulo.value, conteudo.value, visibilidade.value);
	painelnota.style.display = 'none';
});

deletarTudo.addEventListener('click', function () {
	firebase.database().ref("notas").remove();
});

function criarNota(titulo, conteudo, visibilidade) {
    var data = {
        titulo: titulo,
        conteudo: conteudo,
		timestamp: + new Date(),
		visibilidade: visibilidade,
		estado: "aberta",
		idusuario: 230
    };	
    return firebase.database().ref().child('notas').push(data);	
}

firebase.database().ref('notas').on('value', function (snapshot) {
    lista.innerHTML = '';
    snapshot.forEach(function (item) {	
		var date = new Date(item.val().timestamp);
		var dia = date.getDate();
		var mes = date.getMonth();
		var ano = date.getFullYear();
		var hours = date.getHours();		
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		var d = dia + '/' + (mes+1) + '/' + ano;
		var h = hours + ':' + minutes + ':' + seconds;
		var dh = d + ' às ' + h;
		lista.innerHTML += '<div class="card"><div class="card-content nota-'+item.key+'" data-json=\''+JSON.stringify(item.val())+'\'><span class="card-title" data-id='+item.key+'>'+item.val().titulo+'<a class="cardclick right" data-id='+item.key+'>(...)</a></span><small>'+dh+'</small><p>'+item.val().conteudo+'</p></div></div>';       
    });
	var cardclick = document.getElementsByClassName('cardclick');
	for (var i = 0; i < cardclick.length; i++) {
		cardclick[i].addEventListener('dblclick', menuzinho, false);
	}
});

firebase.database().ref('notas').on('value', function (snapshot) {
    snapshot.forEach(function (item) {		
		console.log(item.val().titulo + ' - ' + item.val().conteudo + ' - ' + item.val().visibilidade );
    });
});