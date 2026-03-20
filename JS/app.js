// Guarda as informações do Form
const formCadastro = document.querySelector("#formCadastro");

// Adiciona um ouvinte do evento submit do form
formCadastro.addEventListener("submit", (envio) => {
    // Previne o padrão do formulário, de recarregar
    envio.preventDefault();

    alert("Cadastro efetuado com sucesso !");

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
            console.log(dados);
            
        })
        // Se houver erro, captura.
        .catch(erro => {
            console.error("CEP Inválido");
        });    
};
