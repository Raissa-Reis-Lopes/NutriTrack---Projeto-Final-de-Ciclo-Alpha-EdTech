export function showMessage(status, statusMessage){
    
    message.innerText = statusMessage;
    message.classList.add(status);
    message.classList.remove("hidden");

    setTimeout(() => {
        message.classList.add("hidden");
        message.classList.remove(status);
    }, 5000);
}


/*
// Para usar essa função:

// importa no arquivo que for usar e tem que ter essa div no html:

 <div id="message" class="message-container">
     <div id="message-content" class="message-content hidden"></div>
 </div>

// Depois, onde vc quiser aplicar a função (por exmeplo, mostrar que um fetch funcionou, ou que o cadastro foi realizado com sucesso, ou o login, enfim....)
// const message = document.getElementById ("message-content");

// showMessage("success", "Teste");

*/