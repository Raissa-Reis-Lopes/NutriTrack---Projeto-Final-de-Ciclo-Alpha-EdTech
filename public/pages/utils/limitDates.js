//Para limitar as datas dos calendários, para não pegar datas que ainda não chegaram (por exemplo, na data de nascimento, não pode selecionar uma data que ainda não chegou)
export function limitDate(inputId){
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    
    if (mm < 10) {
        mm = '0' + mm;
    }
    
    if (dd < 10) {
        dd = '0' + dd;
    }
    
    const maxDate = yyyy + '-' + mm + '-' + dd;
    
    document.getElementById(inputId).setAttribute('max', maxDate);
}

// No inputId vc coloca o id do input onde está o type date