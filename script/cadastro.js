// Função para salvar os dados no Local Storage
function salvar() {
    // Obtém os valores dos campos do formulário
    const nome = document.getElementById("txtNome").value;
    const curso = document.getElementById("txtCurso").value;
    const email = document.getElementById("txtEmail").value;

    // Verifica se todos os campos foram preenchidos
    if (!nome || !curso || !email) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Cria um objeto com os dados do formulário
    const usuario = {
        nome,
        curso,
        email
    };

    // Recupera os dados já armazenados no Local Storage (se existirem)
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Adiciona o novo usuário ao array
    usuarios.push(usuario);

    // Armazena o array atualizado no Local Storage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Limpa os campos do formulário
    document.getElementById("txtNome").value = "";
    document.getElementById("txtCurso").value = "";
    document.getElementById("txtEmail").value = "";

    // Atualiza a tabela com os novos dados
    listarUsuarios();
}

// Função para listar os dados na tabela
function listarUsuarios() {
    // Obtém o corpo da tabela
    const tbody = document.querySelector("#tblListar tbody");
    tbody.innerHTML = ""; // Limpa o conteúdo da tabela

    // Recupera os dados do Local Storage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Itera sobre os usuários e cria as linhas da tabela
    usuarios.forEach((usuario, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td><button onclick="excluirUsuario(${index})">Excluir</button></td>
            <td>${usuario.nome}</td>
            <td>${usuario.curso}</td>
            <td>${usuario.email}</td>
        `;

        tbody.appendChild(tr);
    });
}

// Função para excluir um usuário da lista e do Local Storage
function excluirUsuario(index) {
    // Recupera os dados do Local Storage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Remove o usuário do array
    usuarios.splice(index, 1);

    // Atualiza o Local Storage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Atualiza a tabela
    listarUsuarios();
}

// Carrega os dados quando a página é aberta
window.onload = listarUsuarios;
