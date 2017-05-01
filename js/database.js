var titulo = document.getElementById('titulo');
var conteudo = document.getElementById('conteudo');
var visibilidade = document.getElementById('visibilidade');
var criar = document.getElementById('criar');

var lista = document.getElementById('lista');

var deletarTudo = document.getElementById('deletar-tudo');

criar.addEventListener('click', function () {
    var r = criarNota(titulo.value, conteudo.value, visibilidade.value);
console.log(r);	
});

deletarTudo.addEventListener('click', function () {
	alert(firebase.database().ref("notas").remove());
});


function criarNota(titulo, conteudo, visibilidade) {
    var data = {
        titulo: titulo,
        conteudo: conteudo,
		timestamp: + new Date(),
		visibilidade: visibilidade
    };	
    return firebase.database().ref().child('notas').push(data);	
}

firebase.database().ref('notas').on('value', function (snapshot) {
    lista.innerHTML = '';
    snapshot.forEach(function (item) {	
		var dt = new Date(item.val().timestamp);
		lista.innerHTML += '<div class="card"><div class="card-content"><span class="card-title">'+item.val().titulo+'<a href="#"><i class="material-icons right">more_vert</i></a></span><p>'+dt+'</p><p>'+item.val().conteudo+'</p></div></div>';
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
