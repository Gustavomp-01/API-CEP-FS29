// Guarda as informações do Form
const formCadastro = document.querySelector("#formCadastro");

// Adiciona um ouvinte do evento submit do form
formCadastro.addEventListener("submit", (envio) => {
    // Previne o padrão do formulário, de recarregar
    envio.preventDefault();

    alert("Cadastro efetuado com sucesso !");

    // Limpa os campos do form
            formCadastro.reset();

} );



// Guarda as Informações do Input CEP
const cep = document.querySelector("#cep");

// Adiciona um EventListener de Input (Quando o Usuário digitar o CEP)

cep.addEventListener("input", () =>{
    if(cep.value.length == 8){
        buscarCEP();
    }else{
        console.log("O CEP precisa ter 8 números");
    }
    
});


function buscarCEP(){

    // URL do ViaCEP (O link virá assim: https://viacep.com.br/ws/01001000/json/) Porém, esse CEP genérico não pode estar lá
    // Então usamos o template string `${}` para por o CEP digitado pelo usuário.

    const url = `https://viacep.com.br/ws/${cep.value}/json/`;

    // Envia o CEP para a API ViaCEP
    fetch(url)
        // Se tiver retorno, converte para JSON.
        .then(response => response.json())
        // Mostra os dados.
        .then(dados => {
            
            if(dados.erro){
                console.error("CEP Inválido: ", dados.erro);

                // Limpa os campos do endereço
                formCadastro.logradouro.value = "";
                formCadastro.bairro.value = "";
                formCadastro.cidade.value = "";
                formCadastro.uf.value = "";
                formCadastro.numero.value = "";
                formCadastro.complemento.value = "";
                return;
            }
            // Preenche os campos do form
            formCadastro.logradouro.value = dados.logradouro;
            formCadastro.bairro.value = dados.bairro;
            formCadastro.cidade.value = dados.localidade;
            formCadastro.uf.value = dados.uf;

            // Coloca o foco (Barra de escrita) no campo número.
            formCadastro.numero.focus();


            
        })
        // Se houver erro, captura.
        .catch(erro => {
            console.error("CEP Inválido: ", dados.erro);
        });    
};
