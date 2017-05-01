var titulo = document.getElementById('titulo');
var conteudo = document.getElementById('conteudo');
var visibilidade = document.getElementById('visibilidade');
var criar = document.getElementById('criar');

var lista = document.getElementById('lista');

var deletarTudo = document.getElementById('deletar-tudo');

criar.addEventListener('click', function () {
    var r = criarNota(titulo.value, conteudo.value, visibilidade.value);
});

deletarTudo.addEventListener('click', function () {
	alert(firebase.database().ref("notas").remove());
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
		lista.innerHTML += '<div class="card"><div class="card-content"><span class="card-title">'+item.val().titulo+'<a href="#"><i class="material-icons right">more_vert</i></a></span><p><small>'+dh+'</small></p><p>'+item.val().conteudo+'</p></div></div>';
        /*var li = document.createElement('li');		
		li.className = "collection-item";
		li.setAttribute("data-key", item.key);
        li.appendChild(document.createTextNode(item.val().titulo + ' - ' + item.val().conteudo + ' - ' + item.val().visibilidade ));
		li.innerHTML += " <a href=\"#editar\"><i class=\"material-icons\">edit</i</a><a href=\"#confirmar-deletar\"><i class=\"material-icons\">delete</i</a>";
        lista.appendChild(li);*/
    });
});

firebase.database().ref('notas').on('value', function (snapshot) {
    snapshot.forEach(function (item) {		
		console.log(item.val().titulo + ' - ' + item.val().conteudo + ' - ' + item.val().visibilidade );
    });
});