const url = 'https://go-wash-api.onrender.com/api/auth/address'

async function cadastroEndereco() {
    let title = document.getElementById("title").value;
    let cep = document.getElementById("cep").value;
    let address = document.getElementById("address").value;
    let number = document.getElementById("number").value
    let complement = document.getElementById("complement").value


    try {
        let token = JSON.parse(localStorage.getItem("user"));
        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "title": title,
                "cep": cep,
                "address": address,
                "number": number,
                "complement": complement,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.access_token
            }
        })

        if (api.ok) {
            let resposta = await api.json();
            alert("Cadastro realizado com sucesso!")
            window.location = "home.html";
        }
    }
    catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao conectar com o servidor. Por favor, tente novamente.");
    }
}

