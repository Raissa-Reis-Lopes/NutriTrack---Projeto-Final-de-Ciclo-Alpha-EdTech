export function footerProfile(){
    const sectionModal = document.createElement("section");
    sectionModal.innerHTML=`
    <footer class="footer footer_profile">
        <span>all rights reserved</span>
        <span id="open-modal-terms">Termos de uso</span>
        <span id="open-modal-privacy">Politica de Privacidade</span>
        <div >
            <img src="" alt="">
            <span id="open-modal-sac">Precisa de ajuda?</span>
        </div>
    </footer>
    `
    return sectionModal;
}

export function createFooterProfile(){
    // Para os modais: Pegar a seção onde ele fica, chamar a função para obter o modal, adicionar ao container:
    const privacyModalContainer = document.getElementById('privacy_policy_container');
    const privacyModal = privacyPolicyModal();
    privacyModalContainer.appendChild(privacyModal);

    const termsContainer = document.getElementById("terms_container");
    const terms = termsModal();
    termsContainer.appendChild(terms);

    const sacContainer = document.getElementById("sac_container");
    const sac = sacModal();
    sacContainer.appendChild(sac);

    const deleteAccountContainer = document.getElementById("delete_account_container");
    const deleteAccountFuntion = deleteAccountModal();
    deleteAccountContainer.appendChild(deleteAccountFuntion);

     //Adicionar um ouvinte de evento para deletar a conta do usuário
     const btnDelete = document.getElementById('deleteAccount');
     btnDelete.addEventListener('click', deleteAccount)

     const footerContainer = document.getElementById("footer_container");
     const footer = footerProfile();
     footerContainer.appendChild(footer);


    //OBSERVAÇÃO, ESSE FUNCÃO TEM QUE VIR SÓ DEPOIS QUE PEGAR TODOS OS MODAIS
    createModalEvents();

}