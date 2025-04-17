const url = "https://go-wash-api.onrender.com/api/login";

async function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let loginButton = document.querySelector('.btn-login');

    if (!email || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    loginButton.disabled = true;
    loginButton.value = "Carregando...";


    try {
        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "email": email,
                "user_type_id": 1,
                "password": password,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (api.ok) {
            let resposta = await api.json();
            localStorage.setItem("user", JSON.stringify(resposta));
            alert("Login realizado com sucesso");
            window.location.href = "home.html";
            return
        }
        let responseError = await api.json();
        console.error("Erro no cadastro!!!",responseError);
        if(responseError.data.errors){
            alert(responseError.data.errors)
        }
    } finally {
        loginButton.disabled = false;
        loginButton.value = "Entrar";
    }
}