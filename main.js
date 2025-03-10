let Einnahme = 0;
let Ausgabe = 0;
let Bilanz = 0;


function addData(){
    let Titel = document.getElementById("titel").value.trim();
    let Betrag = document.getElementById("betrag").value.trim();
    let Date = document.getElementById("datum").value;
    let Auswahl = document.getElementById("einnahme").checked ? "Einnahme" : "Ausgabe";

    console.log(Titel,Betrag,Date,Auswahl);

    if(Auswahl == Einnahme)
        {
            Einnahme += Betrag
        }
    else if(Auswahl == Ausgabe)
        {
            Ausgabe += Betrag
        }

        Bilanz = Ausgabe - Einnahme
}

