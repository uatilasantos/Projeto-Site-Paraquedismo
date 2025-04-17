const url = 'https://go-wash-api.onrender.com/api/user'

async function cadastro() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let birthday = document.getElementById('birthday').value;
    let terms = document.getElementById('terms').checked;  
    let cpf_cnpj = document.getElementById('cpf_cnpj').value;
    let password = document.getElementById('password').value;

    if(!terms){
        alert('Preencha os termos')
        return(false)
    }

    if(name === ""){
        alert('Preenha seu nome')
        return(false)
    }

    if(email === ""){
        alert("Preencha o campo email.")
        return(false)
    }

    if(cpf_cnpj === ""){
        alert("Preencha o campo CPF/CNPJ")
        return(false)
    }

    try { 
        let api = await fetch(url, { 
            method:"POST", 
            body:JSON.stringify(
                {
                    "name": name,
                    "email": email,
                    "user_type_id":1, 
                    "password": password,
                    "cpf_cnpj": cpf_cnpj,
                    "terms": terms,
                    "birthday":birthday
                }
            ),
            headers: {
                'Content-Type':'application/json'
            } 
        }) 

        if (api.ok) {
            let response = await api.json(); 
            console.log(response);
            alert("Cadastro realizado com sucesso!")
            alert("Está Preparado para uma grande aventura?")
            alert("Então da uma olhadinha no seu e-mail para confirmar seu cadastro!"); 
            window.location="index.html"; 
            return;

        } else {
            let responseErro = await api.json();
            console.log("Resposta de erro da API:", responseErro); 
            if (responseErro.data && responseErro.data.errors) {
                if (responseErro.data.errors.cpf_cnpj) {
                    console.log("Erro - CPF/CNPJ já cadastrado.");
                    alert("CPF ou CNPJ já cadastrado em nossa base, informe um número válido.")
                }
                if (responseErro.data.errors.email) {
                    console.log("Erro - E-mail já cadastrado.");
                    alert("E-mail já cadastrado em nossa base, informe um e-mail válido.");
                }
            } else {
                console.error("Erro na resposta da API:", responseErro); 
                alert("Erro ao realizar o cadastro: " + (responseErro.message || "Erro desconhecido"));
            }
        }

    } catch (error) { 
        console.error("Erro na requisição:", error); 
        alert("Erro ao conectar com o servidor. Por favor, tente novamente.");
    }
    
}