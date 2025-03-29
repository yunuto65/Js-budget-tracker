document.addEventListener("DOMContentLoaded", function () {
    let addButton = document.getElementById("addBtn");
    let titleInput = document.getElementById("titel");
    let amountInput = document.getElementById("betrag");
    let dateInput = document.getElementById("datum");
    let incomeRadio = document.getElementById("einnahme");
    let expenseRadio = document.getElementById("ausgabe");
    let monthLists = document.getElementById("monatslisten");
    let totalIncomeEl = document.querySelector(".gesamtbilanz-zeile.einnahmen span:last-child");
    let totalExpenseEl = document.querySelector(".gesamtbilanz-zeile.ausgaben span:last-child");
    let totalBalanceEl = document.querySelector(".gesamtbilanz-zeile.bilanz span:last-child");

    let transactions = [];

    addButton.addEventListener("click", function () {
        let title = titleInput.value.trim();
        let amount = parseFloat(amountInput.value);
        let date = dateInput.value;
        let type = incomeRadio.checked ? "einnahme" : "ausgabe";

        if (!title || isNaN(amount) || !date) {
            alert("Bitte alle Felder ausfüllen!");
            return;
        }

        let transaction = {
            title: title,
            amount: amount,
            date: date,
            type: type
        };

        transactions.push(transaction);
        updateUI();
        clearForm();
    });

    addBtnImport.addEventListener("click", function() {
        let [fileHandle] = window.showOpenFilePicker();
        let fileData = fileHandle.getFi
    });

    addBtnExport.addEventListener("click", function() {

    });


    function updateUI() {
        monthLists.innerHTML = "";
        let groupedTransactions = groupByMonth(transactions);
        let totalIncome = 0;
        let totalExpense = 0;

        for (let monthYear in groupedTransactions) {
            if (groupedTransactions.hasOwnProperty(monthYear)) {
                let trans = groupedTransactions[monthYear];
                let monthIncome = 0;
                let monthExpense = 0;
                let article = document.createElement("article");
                article.className = "monatsliste";

                let h2 = document.createElement("h2");

                let spanMonthYear = document.createElement("span");
                spanMonthYear.className = "monat-jahr";
                spanMonthYear.textContent = monthYear;

                let spanBalance = document.createElement("span");
                spanBalance.className = "monatsbilanz";

                let ul = document.createElement("ul");

                for (let i = 0; i < trans.length; i++) {
                    let t = trans[i];
                    let li = document.createElement("li");
                    li.className = t.type;

                    let spanDate = document.createElement("span");
                    spanDate.className = "datum";
                    spanDate.textContent = formatDate(t.date);

                    let spanTitle = document.createElement("span");
                    spanTitle.className = "titel";
                    spanTitle.textContent = t.title;

                    let spanAmount = document.createElement("span");
                    spanAmount.className = "betrag";
                    spanAmount.textContent = t.amount.toFixed(2) + " €";

                    let removeBtn = document.createElement("button");
                    removeBtn.className = "entfernen-button";
                    removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
                    removeBtn.onclick = function(transaction) {
                        return function() {
                            removeTransaction(transaction);
                        };
                    }(t);

                    li.appendChild(spanDate);
                    li.appendChild(spanTitle);
                    li.appendChild(spanAmount);
                    li.appendChild(removeBtn);
                    ul.appendChild(li);

                    if (t.type === "einnahme") {
                        monthIncome += t.amount;
                        totalIncome += t.amount;
                    } else {
                        monthExpense += t.amount;
                        totalExpense += t.amount;
                    }
                }

                let monthBalance = monthIncome - monthExpense;
                spanBalance.textContent = monthBalance.toFixed(2) + " €";
                if (monthBalance >= 0) {
                    spanBalance.classList.add("positiv");
                } else {
                    spanBalance.classList.add("negativ");
                }

                h2.appendChild(spanMonthYear);
                h2.appendChild(spanBalance);
                article.appendChild(h2);
                article.appendChild(ul);
                monthLists.appendChild(article);
            }
        }

        totalIncomeEl.textContent = totalIncome.toFixed(2) + "€";
        totalExpenseEl.textContent = totalExpense.toFixed(2) + "€";
        let totalBalance = totalIncome - totalExpense;
        totalBalanceEl.textContent = totalBalance.toFixed(2) + "€";
        if (totalBalance >= 0) {
            totalBalanceEl.classList.add("positiv");
            totalBalanceEl.classList.remove("negativ");
        } else {
            totalBalanceEl.classList.add("negativ");
            totalBalanceEl.classList.remove("positiv");
        }
    }

    function clearForm() {
        titleInput.value = "";
        amountInput.value = "";
        dateInput.value = "";
        expenseRadio.checked = true;
    }

    function removeTransaction(transactionToRemove) {
        for (let i = 0; i < transactions.length; i++) {
            if (transactions[i] === transactionToRemove) {
                transactions.splice(i, 1);
                break;
            }
        }
        updateUI();
    }

    function groupByMonth(transactions) {
        let groups = {};
        for (let i = 0; i < transactions.length; i++) {
            let t = transactions[i];
            let dateParts = t.date.split("-");
            let key = dateParts[1] + "/" + dateParts[0]; // Format: MM/YYYY
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(t);
        }
        return groups;
    }

    function formatDate(dateString) {
        let parts = dateString.split("-");
        return parts[2] + "." + parts[1] + "." + parts[0];
    }

    
});
