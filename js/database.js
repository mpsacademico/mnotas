var titulo = document.getElementById('titulo');
var conteudo = document.getElementById('conteudo');
var visibilidade = document.getElementById('visibilidade');
var criar = document.getElementById('criar');

var lista = document.getElementById('lista');

criar.addEventListener('click', function () {
    var r = criarNota(titulo.value, conteudo.value, visibilidade.value);	
});

function criarNota(titulo, conteudo, visibilidade) {
    var data = {
        titulo: titulo,
        conteudo: conteudo,
		visibilidade: visibilidade
    };
    return firebase.database().ref().child('notas').push(data);
}

firebase.database().ref('notas').on('value', function (snapshot) {
    lista.innerHTML = '';	
    snapshot.forEach(function (item) {		
        var li = document.createElement('li');
		li.className = "collection-item";
        li.appendChild(document.createTextNode(item.val().titulo + ' - ' + item.val().conteudo + ' - ' + item.val().visibilidade ));
		li.innerHTML += " <a class=\"waves-effect waves-light btn\" href=\"#modal1\">Editar</a>";
        lista.appendChild(li);
    });
});