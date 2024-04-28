export function scroller() {
    const scrollerContainer = document.createElement('div');
    scrollerContainer.classList.add("scroller");
    scrollerContainer.setAttribute("data-speed", "fast");
    scrollerContainer.innerHTML = `
    <ul class="tag-list scroller__inner">
        <li>Animado?</li>
        <li>Sem animação não há transformação!</li> 
        <li>Hoje o dia vai ser incrível!</li>
        <li>É um dia de transformação!</li>
        <li>Cada dia mais saudável!</li>
        <li>A mudança começa em mim!</li>
        <li>O sucesso é a soma de pequenos esforços repetidos dia após dia</li>
        <li>A melhor maneira de prever o futuro é criá-lo!</li>
    </ul>
    `;

    // Adicionando a animação depois de criar o elemento com a classe "scroller"
    addAnimation();

    function addAnimation() {
        scrollerContainer.setAttribute("data-animated", true);

        const scrollerInner = scrollerContainer.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);
        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });
    }

    return scrollerContainer;
}
