// Wachten tot het venster en alle inhoud geladen zijn
window.addEventListener("load", function () {
    // Canvas en context ophalen
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    // Variabele om bij te houden of er wordt getekend
    let painting = false;

    // Canvas grootte instellen op de grootte van het venster
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // Functie om te starten met tekenen bij het vastpakken van de muisknop
    function startPosition(e) {
        painting = true;
        draw(e);
    }

    // Functie om te stoppen met tekenen bij het loslaten van de muisknop
    function finishedPosition() {
        painting = false;
        ctx.beginPath(); // Een nieuw pad starten voor een eventuele volgende lijn
    }

    // Functie om te tekenen (wordt aangeroepen bij beweging van de muis)
    function draw(e) {
        if (!painting) return; // Als er niet wordt getekend, stop de functie

        // Lijneigenschappen instellen
        ctx.lineWidth = 10;
        ctx.lineCap = "round";

        // Lijn tekenen vanaf het vorige punt naar het huidige punt van de muis
        ctx.lineTo(e.clientX, e.clientY);

        // Lijn daadwerkelijk tekenen op het canvas
        ctx.stroke();

        // Een nieuw pad beginnen vanaf het huidige punt voor een eventuele volgende lijn
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY); // Naar het huidige punt van de muis bewegen zonder daadwerkelijk te tekenen
    }

    // Event listeners toevoegen voor muisinteractie op het canvas
    canvas.addEventListener("mousedown", startPosition); // Muisknop ingedrukt houden
    canvas.addEventListener("mouseup", finishedPosition); // Muisknop loslaten
    canvas.addEventListener("mousemove", draw); // Muis bewegen
});