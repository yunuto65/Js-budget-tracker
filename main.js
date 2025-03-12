let Einnahme = 0;
let Ausgabe = 0;
let Bilanz = 0;
let transactions = [];

document.getElementById("addBtn").addEventListener("click", function () {
    let Titel = document.getElementById("titel").value.trim();
    let Betrag = parseFloat(document.getElementById("betrag").value.trim());
    let inputDate = document.getElementById("datum").value;
    let Auswahl = document.getElementById("einnahme").checked ? "Einnahme" : "Ausgabe";

    let [jahr, monat, tag] = inputDate.split("-");
    let Date = `${tag}.${monat}.${jahr}`;

    addTransaction(Titel, Betrag, Date, Auswahl);
});

function addTransaction(Titel, Betrag, Date, Auswahl) {
    if (!Titel || isNaN(Betrag) || !Date) {
        alert("Bitte alle Felder korrekt ausfüllen!");
        return;
    }

    if (Auswahl === "Einnahme") {
        Einnahme += Betrag;
    } else {
        Ausgabe += Betrag;
    }

    Bilanz = Einnahme - Ausgabe;

    transactions.push({ Titel, Betrag, Date, Auswahl, Einnahme, Ausgabe, Bilanz });

    console.log(Titel, Betrag, Date, Auswahl, Einnahme, Ausgabe, Bilanz);

    let Monatslisten = document.querySelector("#monatslisten");

    
    let newMonatsliste = document.createElement("article");
    newMonatsliste.classList.add("monatsliste");

    Monatslisten.appendChild(newMonatsliste);

    
    let h2Article = document.createElement("h2");
    let spanInh2 = document.createElement("span");

    let monatZahl = Date.slice(3, 5);
    let monatName;
    switch (monatZahl) {
        case "01": monatName = "Januar"; break;
        case "02": monatName = "Februar"; break;
        case "03": monatName = "März"; break;
        case "04": monatName = "April"; break;
        case "05": monatName = "Mai"; break;
        case "06": monatName = "Juni"; break;
        case "07": monatName = "Juli"; break;
        case "08": monatName = "August"; break;
        case "09": monatName = "September"; break;
        case "10": monatName = "Oktober"; break;
        case "11": monatName = "November"; break;
        case "12": monatName = "Dezember"; break;
        default: monatName = "Ungültiger Monat"; break;
    }

    spanInh2.textContent = `${monatName} ${Date.slice(6)}`;
    spanInh2.classList.add("monat-Jahr");

    
    if (Auswahl === "Einnahme") {
        spanInh2.classList.add("monatsbilanz", "positiv");
    } else {
        spanInh2.classList.add("monatsbilanz", "negativ");
    }

    h2Article.appendChild(spanInh2);
    newMonatsliste.appendChild(h2Article);

    
    let ulArticle = document.createElement("ul");

    
    let liInul = document.createElement("li");
    liInul.classList.add(Auswahl.toLowerCase()); 
    liInul.innerHTML = `
        <span class="datum">${Date}</span>
        <span class="titel">${Titel}</span>
        <span class="betrag">${Betrag.toFixed(2)} €</span>
        <button class="entfernen-button"><i class="fas fa-trash"></i></button>
    `;
    
    ulArticle.appendChild(liInul); 
    newMonatsliste.appendChild(ulArticle); 
}






