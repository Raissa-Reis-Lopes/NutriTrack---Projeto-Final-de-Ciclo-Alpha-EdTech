export function loader(){
    const div = document.createElement('div');
    div.classList.add("pan-loader");
    div.innerHTML= `
    <div class="loader"></div>
    <div class="pan-container">
      <div class="pan"></div>
      <div class="handle"></div>
    </div>
    <div class="shadow"></div>
    `
    return div;

}