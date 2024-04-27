
const url = "https://parseapi.back4app.com/parse/classes/chamado";

var tabela = document.querySelector("#resultados");
var form = document.querySelector("#form");

const tabelaInicial = tabela.innerHTML;
const formInicial = form.innerHTML;

const headers = {
    "X-Parse-Application-Id": "Hkw9Uo7C8QH24773DJXkZ0TMls9odoXr3SB22O2K",
    "X-Parse-REST-API-Key": "kmpdUaXw2h4wuTUV8bcnMrX6nKkYdOK8qINA22Qn",
};

const headers_json = {
    ...headers,
    "Content-Type": "application/json",
};


async function consultarChamados() {

    tabela.innerHTML = tabelaInicial;

    try {

        const keys = ["objectId", "nome", "email", "assunto", "mensagem", "resposta", "finalizado"]
        
        const resposta = await fetch(`${url}`, {
            method: "GET",
            headers: headers
        });

        const data = await resposta.json();
        const resultados = data.results;

        for (let chamado of resultados) {

            if(document.getElementById("full").checked){
                
                var novaLinha = document.createElement("tr")

                for (let key of keys) {
                    if (key in chamado) {
            
                        var celula = document.createElement("td")
            
                        celula.textContent = chamado[key];
            
                        novaLinha.appendChild(celula)
                    }
                }

            } else if (document.getElementById("naofinalizado").checked) {

                var novaLinha = document.createElement("tr")

                for (let key of keys) {
                    if (key in chamado && chamado['finalizado'] === false) {
            
                        var celula = document.createElement("td")
            
                        celula.textContent = chamado[key];
            
                        novaLinha.appendChild(celula)
                    }
                }

            }        
        
            tabela.appendChild(novaLinha)
        }

    } catch (error) {
        console.log(`Erro: ${error.message}`)
    }

}

const responder = document.querySelector("#responder");
responder.addEventListener("click", 
    async function responderChamado(event) {

        event.preventDefault();

        let objresposta = {}
        const id = document.querySelector("#idchamado");
        const resposta = document.querySelector("#res");

        try {
            

            if (resposta.value.length !== 0) {
                objresposta = {
                    'resposta' : resposta.value,
                    'finalizado' : true,
                }
            }

            const requisicao = await fetch(`${url}/${id.value}`,{
                method: "PUT",
                headers: headers_json,
                body: JSON.stringify(objresposta)

            })

            form.innerHTML = formInicial

            if (requisicao.ok) {

                alert("Objeto atualizado com sucessso!")

            } else {

                alert("Não foi possível atualizar o objeto!")
            }


        } catch (error) {
            console.log(`Erro: ${error.message}`)
        }

})


const fullchamados = document.getElementById("full");
const naofinalizados = document.getElementById("naofinalizado");

fullchamados.addEventListener("click", consultarChamados);
naofinalizados.addEventListener("click", consultarChamados);

