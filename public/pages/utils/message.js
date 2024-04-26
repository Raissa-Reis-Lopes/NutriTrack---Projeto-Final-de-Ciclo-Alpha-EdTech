export function showMessage(status, statusMessage, top, left){

    const messageContainer = document.getElementById('message');
    const messageContent = document.getElementById('message-content');
    
    messageContainer.classList.remove("hidden");
    messageContent.innerText = statusMessage;
    messageContent.classList.add(status);
    messageContent.classList.remove("hidden");

    // Define a posição da mensagem se os valores forem fornecidos
    if (left !== undefined) {
        messageContainer.style.left = left;
    } else {
        messageContainer.style.left = "30%";
    }

    if (top !== undefined) {
        messageContainer.style.top = top;
    } else {
        messageContainer.style.top = "0px";
    }

    setTimeout(() => {
        messageContent.classList.add("hidden");
        messageContainer.classList.add("hidden");
        messageContent.classList.remove(status);
    }, 5000);
}

/*
  Para usar essa função:

   importa onde for usar  com o  import { showMessage } from


E, tem que ter essa div no html:

 <div id="message" class="message-container">
     <div id="message-content" class="message-content hidden"></div>
 </div>

 Depois, onde vc quiser aplicar a função (por exmeplo, mostrar que um fetch funcionou, ou que o cadastro foi realizado com sucesso, ou o login, enfim....)

Para usar no local padrão do topo (exmeplo):
showMessage("success", "Teste");

Para usar definindo a posição (exemplo):
 showMessage('fail',"O nome não pode ser vazio!","30%","58%");
*/