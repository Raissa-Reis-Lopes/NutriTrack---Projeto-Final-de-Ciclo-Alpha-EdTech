// here will stay the functions that will validated the inputs such as emails, names, cpf....

export function emailValid(email) {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return valid.test(email);
  }
  
  export function nameValid(name) {
    const valid = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return valid.test(name);
  }

  export function passwordValid(password) {
    const valid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,15}$/;
    return valid.test(password);
  }

  export function cpfValid(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) return false;
  
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
  
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (12 - i);
    }
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
  
    return true;
  }
  
  export function heightValid(height) {
    const maxHeightCm = 300; // Define o limite máximo de altura em centímetros
  
    // Verifica se a altura é um número e está dentro do limite máximo
    return !isNaN(height) && height > 0 && height <= maxHeightCm;
  }

  export function weightValid(weight) {
    const maxWeight = 500; // Define o limite máximo de peso em quilogramas
  
    // Verifica se o peso é um número com até duas casas decimais e está dentro do limite máximo
    const weightRegex = /^\d+(\.\d{1,2})?$/; // Regex para validar números com até duas casas decimais
    return weightRegex.test(weight) && !isNaN(weight) && weight > 0 && weight <= maxWeight;
  }


  // escape function
  export function escapeHtml(html) {
    const escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };
    return html.replace(/[&<>"'\/]/g, function(match) {
        return escapeMap[match];
    });
}