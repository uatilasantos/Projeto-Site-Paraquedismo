const url = 'https://go-wash-api.onrender.com/api/auth/address'

async function listarEndereco() {

    let token = JSON.parse(localStorage.getItem('user'));
    api = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.access_token
        }
    })


    resposta = await api.json()
    resposta.data.forEach((endereco) => {
        console.log(endereco)


        const tr = document.createElement("tr");
        tr.innerHTML = "<td>" + endereco.id + "</td> <td>" + endereco.title + "</td> <td>"
            + endereco.cep + "</td> <td>" + endereco.address + "</td> <td>" + endereco.number + "</td>"
            + "<td> <input type='button' value='Atualizar' onclick=\"window.location='atualizacao-endereco.html?id=" + endereco.id + "'\" />" +
            "<input type='button' value='Deletar' onclick=\"deletarEndereco(" + endereco.id + ")\" /> </td>";

        document.querySelector("tbody").appendChild(tr);

    })
}

listarEndereco()

//_____________________________________________________________________________________________________________

async function deletarEndereco(id) {
    if (!id) {
        console.log("Id não encontrado!");
        return;
    }

    let token = JSON.parse(localStorage.getItem("user"));
    const url = 'https://go-wash-api.onrender.com/api/auth/address/' + id;

    try {
        let response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token.access_token 
            }
        });

        if (response.ok) {
            alert("Endereço excluído com sucesso!");
            location.reload();
        } else {
            let erro = await response.json();
            console.error("Erro eo excluir o endereço:", erro);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
    alert("Endereço excluído com sucesso!");
}


//--------------------------------------------------------------------------------------------------

async function sair() {
    const url = 'https://go-wash-api.onrender.com/api/auth/logout';

    try {
        let token = JSON.parse(localStorage.getItem("user"));
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.access_token
            }
        });

        if (response.ok) {
            console.log("O logout foi realizado!");
            alert("O logout foi realizado!")
            localStorage.removeItem("user");
            window.location = "index.html"
        } else {
            let erro = await response.json();
            console.error("Erro ao realizar logout:", erro);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}
