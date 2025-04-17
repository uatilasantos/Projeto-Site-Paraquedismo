const url = new URLSearchParams(location.search)
let id = url.get('id')

async function exibirDados() {
    let token = JSON.parse(localStorage.getItem("user"));
    let api = await fetch('https://go-wash-api.onrender.com/api/auth/address/' + id, {
        method: "GET",
        headers: {

            'Authorization': 'Bearer ' + token.access_token
        }
    });

    let resposta = await api.json()

    document.getElementById('title').value = resposta.data.title;
    document.getElementById('cep').value = resposta.data.cep;
    document.getElementById('address').value = resposta.data.address;
    document.getElementById('number').value = resposta.data.number;
    document.getElementById('complement').value = resposta.data.complement;

}
exibirDados()


async function atualizarEndereco() {

    let title = document.getElementById("title").value;
    let cep = document.getElementById("cep").value;
    let address = document.getElementById("address").value;
    let number = document.getElementById("number").value;
    let complement = document.getElementById("complement").value;


    console.log("Título:", title);
    

    const url = 'https://go-wash-api.onrender.com/api/auth/address/' + id;

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
        });

        if (api.ok) {
            var response = await api.json();
            alert("Endereço atualizado com sucesso!")
            window.location = "home.html";

        } else {
            console.log(response)
            console.error("Erro ao atualizar o endereço:", response.statusText);
        }
    } catch (error) {
        console.error("Erro na função atualizarEndereco:", error);
    }
}
atualizarEndereco();

