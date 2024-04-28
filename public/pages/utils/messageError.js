export function messageError(divId, message, time, fontSize){
    const messageContainer = document.getElementById(divId);
    messageContainer.innerText = message;
    messageContainer.classList.add("erro");
    
    if (fontSize !== undefined) {
        messageContainer.style.fontSize = fontSize;
    } else {
        messageContainer.style.fontSize = "1rem";
    }

    if (time !== undefined) {
        time = time;
    } else {
        time = 3000;
    }


    // Exibe a mensagem de erro por dois segundos e apaga
    setTimeout(() => {
        messageContainer.innerText = ""; // Limpa o texto da mensagem
        messageContainer.classList.remove("erro"); // Remove a classe de erro, se necessário
    }, time);

}

//Para usar essa função, cria uma div vazia com um id onde irá aparecer a mensagem, passa o esse id e a mensagem que quer como parâmetro
// o tempo em milissegundos, por exmeplo 3000 (para 3 segundos) e o tamanho da fonte da mensagem são opicionais,

