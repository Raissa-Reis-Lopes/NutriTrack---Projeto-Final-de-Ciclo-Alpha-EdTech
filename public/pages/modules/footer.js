export function footerProfile(){
    const sectionFooterProfile = document.createElement("footer");
    sectionFooterProfile.classList.add("footer")
    sectionFooterProfile.classList.add("footer_profile")
    sectionFooterProfile.innerHTML=`
    
        <span>todos os direitos reservados</span>

        <span id="open-modal-terms">Termos de uso</span>
        <span id="open-modal-privacy">Politica de Privacidade</span>
        <div >
            <img src="" alt="">
            <span id="open-modal-sac">Precisa de ajuda?</span>
        </div>
    `
    return sectionFooterProfile;
}

export function footerHome(){
    const sectionFooterHome = document.createElement("footer");
    sectionFooterHome.classList.add("footer")
    sectionFooterHome.classList.add("footer_home")
    sectionFooterHome.innerHTML=`
        <span>todos os direitos reservados</span>

        <span id="open-modal-terms">Termos de uso</span>
        <span id="open-modal-privacy">Politica de Privacidade</span>
        <div >
            <img src="" alt="">
            <span id="open-modal-sac">Precisa de ajuda?</span>
        </div>
    `
    return sectionFooterHome;
}

export function footerHistory(){
    const sectionFooterHistory = document.createElement("footer");
    sectionFooterHistory.classList.add("footer")
    sectionFooterHistory.classList.add("footer_history")
    sectionFooterHistory.innerHTML=`
        <span>todos os direitos reservados</span>

        <span id="open-modal-terms">Termos de uso</span>
        <span id="open-modal-privacy">Politica de Privacidade</span>
        <div >
            <img src="" alt="">
            <span id="open-modal-sac">Precisa de ajuda?</span>
        </div>
    `
    return sectionFooterHistory;
}