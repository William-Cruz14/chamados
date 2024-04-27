const url = "https://parseapi.back4app.com/parse/classes/chamado";

const enviar = document.querySelector("#enviar");

const headers = {
    "X-Parse-Application-Id": "Hkw9Uo7C8QH24773DJXkZ0TMls9odoXr3SB22O2K",
    "X-Parse-REST-API-Key": "kmpdUaXw2h4wuTUV8bcnMrX6nKkYdOK8qINA22Qn",
};

const headers_json = {
    ...headers,
    "Content-Type": "application/json",
};


enviar.addEventListener("click",
    async function criarChamado(event) {

        const nome = document.querySelector("#nome");
        const email = document.querySelector("#email");
        const assunto = document.querySelector("#assunto");
        const mensagem = document.querySelector("#mensagem");

        event.preventDefault();

        try {

            const chamado = {
                'nome' : nome.value,
                'email' : email.value,
                'assunto': assunto.value,
                'mensagem' : mensagem.value,
                'resposta' : "",
                'finalizado' : false
            }

            const call = await fetch(url, {
                method: "POST",
                headers: headers_json,
                body: JSON.stringify(chamado),
            });

            if (call.status === 201) {

                alert('Chamado criado com sucesso!');

                nome.value = "";
                email.value = "";
                assunto.value = "";
                mensagem.value = "";

            } else {
                console.log(call.body)
            }


        } catch (error) {
            console.log(`Erro: ${error.message}`)
        }


});