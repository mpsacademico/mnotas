var titulo = document.getElementById('titulo');
var conteudo = document.getElementById('conteudo');
var visibilidade = document.getElementById('visibilidade');
var criar = document.getElementById('criar');

var lista = document.getElementById('lista');

criar.addEventListener('click', function () {
    var r = criarNota(titulo.value, conteudo.value, visibilidade.value);
console.log(r);	
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
    //lista.innerHTML = '';
    snapshot.forEach(function (item) {		
		lista.innerHTML += '<div class="card"><div class="card-content"><span class="card-title">'+item.val().titulo+'<a href="#"><i class="material-icons right">more_vert</i></a></span><p>'+item.val().conteudo+'</p></div></div>';
        /*var li = document.createElement('li');		
		li.className = "collection-item";
		li.setAttribute("data-key", item.key);
        li.appendChild(document.createTextNode(item.val().titulo + ' - ' + item.val().conteudo + ' - ' + item.val().visibilidade ));
		li.innerHTML += " <a href=\"#editar\"><i class=\"material-icons\">edit</i</a><a href=\"#confirmar-deletar\"><i class=\"material-icons\">delete</i</a>";
        lista.appendChild(li);*/
    });
});