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

export function footerHome(){
    const sectionModal = document.createElement("section");
    sectionModal.innerHTML=`
    <footer class="footer footer_home">
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
