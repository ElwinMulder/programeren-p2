function genereerTafel(getal) {
    const container = document.getElementById('tafelContainer');

    container.innerHTML = '';
    
    for (let i = 1; i <= 10; i++) {
    
    const resultaat = i * getal;

    container.innerHTML += i + " x " + getal + " = " + resultaat + "<br>" 


    }
}