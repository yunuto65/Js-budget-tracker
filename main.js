document.addEventListener("DOMContentLoaded", function () {
    var addButton = document.getElementById("addBtn");
    var titleInput = document.getElementById("titel");
    var amountInput = document.getElementById("betrag");
    var dateInput = document.getElementById("datum");
    var incomeRadio = document.getElementById("einnahme");
    var expenseRadio = document.getElementById("ausgabe");
    var monthLists = document.getElementById("monatslisten");
    var totalIncomeEl = document.querySelector(".gesamtbilanz-zeile.einnahmen span:last-child");
    var totalExpenseEl = document.querySelector(".gesamtbilanz-zeile.ausgaben span:last-child");
    var totalBalanceEl = document.querySelector(".gesamtbilanz-zeile.bilanz span:last-child");

    var transactions = [];

    addButton.addEventListener("click", function () {
        var title = titleInput.value.trim();
        var amount = parseFloat(amountInput.value);
        var date = dateInput.value;
        var type = incomeRadio.checked ? "einnahme" : "ausgabe";

        if (!title || isNaN(amount) || !date) {
            alert("Bitte alle Felder ausfüllen!");
            return;
        }

        var transaction = {
            title: title,
            amount: amount,
            date: date,
            type: type
        };

        transactions.push(transaction);
        updateUI();
        clearForm();
    });

    function updateUI() {
        monthLists.innerHTML = "";
        var groupedTransactions = groupByMonth(transactions);
        var totalIncome = 0;
        var totalExpense = 0;

        for (var monthYear in groupedTransactions) {
            if (groupedTransactions.hasOwnProperty(monthYear)) {
                var trans = groupedTransactions[monthYear];
                var monthIncome = 0;
                var monthExpense = 0;
                var article = document.createElement("article");
                article.className = "monatsliste";

                var h2 = document.createElement("h2");

                var spanMonthYear = document.createElement("span");
                spanMonthYear.className = "monat-jahr";
                spanMonthYear.textContent = monthYear;

                var spanBalance = document.createElement("span");
                spanBalance.className = "monatsbilanz";

                var ul = document.createElement("ul");

                for (var i = 0; i < trans.length; i++) {
                    var t = trans[i];
                    var li = document.createElement("li");
                    li.className = t.type;

                    var spanDate = document.createElement("span");
                    spanDate.className = "datum";
                    spanDate.textContent = formatDate(t.date);

                    var spanTitle = document.createElement("span");
                    spanTitle.className = "titel";
                    spanTitle.textContent = t.title;

                    var spanAmount = document.createElement("span");
                    spanAmount.className = "betrag";
                    spanAmount.textContent = t.amount.toFixed(2) + " €";

                    var removeBtn = document.createElement("button");
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

                var monthBalance = monthIncome - monthExpense;
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
        var totalBalance = totalIncome - totalExpense;
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
        for (var i = 0; i < transactions.length; i++) {
            if (transactions[i] === transactionToRemove) {
                transactions.splice(i, 1);
                break;
            }
        }
        updateUI();
    }

    function groupByMonth(transactions) {
        var groups = {};
        for (var i = 0; i < transactions.length; i++) {
            var t = transactions[i];
            var dateParts = t.date.split("-");
            var key = dateParts[1] + "/" + dateParts[0]; // Format: MM/YYYY
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(t);
        }
        return groups;
    }

    function formatDate(dateString) {
        var parts = dateString.split("-");
        return parts[2] + "." + parts[1] + "." + parts[0];
    }
});
