let Einnahme = 0;
let Ausgabe = 0;
let Bilanz = 0;
let transactions = []; 

function addTransaction() {
    let Titel = document.getElementById("titel").value.trim();
    let Betrag = parseInt(document.getElementById("betrag").value.trim());
    let Date = document.getElementById("datum").value;
    let Auswahl = document.getElementById("einnahme").checked ? "Einnahme" : "Ausgabe";

    if (!Titel || isNaN(Betrag) || !Date) {
        alert("Bitte alle Felder korrekt ausfüllen!");
        return;
    }

    transactions.push({ Titel, Betrag, Date, Auswahl });

    if (Auswahl === "Einnahme") {
        Einnahme += Betrag;
    } else {
        Ausgabe += Betrag;
    }

    Bilanz = Einnahme - Ausgabe;

}

function saveData() {
    let csv = "Titel,Betrag,Datum,Typ\n";
    transactions.forEach(t => {
        csv += `${t.Titel},${t.Betrag},${t.Date},${t.Auswahl}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const a = Object.assign(document.createElement("a"), { 
        href: URL.createObjectURL(blob), 
        download: "transaktionen.csv" 
    });
    a.click();
    URL.revokeObjectURL(a.href);
}

