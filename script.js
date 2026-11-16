
// =====================================
// 1. APPLICATION VARIABLES
// =====================================

// Store budgeting information
let monthlyBudget = 0;
let totalExpenses = 0;
let remainingBalance = 0;
let spendingPercentage = 0;

// Store application information
const appName = "SpendWise";
const currency = "KES";

// =====================================
// 2. BUDGET CALCULATION FUNCTIONS
// =====================================

// Calculate remaining balance
function calculateBalance(budget, expenses) {
    return budget - expenses;
}

// Calculate percentage of budget spent
function calculateSpendingPercentage(budget, expenses) {
    if (budget <= 0) {
        return 0;
    }

    return (expenses / budget) * 100;
}

// =====================================
// 3. COLLECT USER INPUT
// =====================================

function collectBudgetInformation() {

    const budgetInput = prompt(
        "Enter your monthly budget (KES):"
    );

    // Check if the user cancelled
    if (budgetInput === null) {
        console.log("Budget calculation cancelled.");
        return;
    }

    const expensesInput = prompt(
        "Enter your total monthly expenses (KES):"
    );

    if (expensesInput === null) {
        console.log("Budget calculation cancelled.");
        return;
    }

    // Convert input strings into numbers
    monthlyBudget = Number(budgetInput);
    totalExpenses = Number(expensesInput);

    // Validate user input
    if (
        !Number.isFinite(monthlyBudget) ||
        !Number.isFinite(totalExpenses) ||
        monthlyBudget <= 0 ||
        totalExpenses < 0
    ) {
        alert("Please enter valid positive amounts.");
        console.log("Invalid budgeting information.");
        return;
    }

    // Calculate financial information
    remainingBalance = calculateBalance(
        monthlyBudget,
        totalExpenses
    );

    spendingPercentage = calculateSpendingPercentage(
        monthlyBudget,
        totalExpenses
    );

    // Display results
    displayBudgetResults();
}

// =====================================
// 4. DISPLAY CALCULATED RESULTS
// =====================================

function displayBudgetResults() {

    console.log("==============================");
    console.log(appName + " - Budget Report");
    console.log("==============================");

    console.log(
        "Monthly Budget: " + currency + " " + monthlyBudget
    );

    console.log(
        "Total Expenses: " + currency + " " + totalExpenses
    );

    console.log(
        "Remaining Balance: " + currency + " " + remainingBalance
    );

    console.log(
        "Budget Spent: " + spendingPercentage.toFixed(2) + "%"
    );

    if (remainingBalance < 0) {
        console.log("Status: You have exceeded your budget.");
    } else {
        console.log("Status: You are within your budget.");
    }

    console.log("==============================");

    // Update dashboard overview cards
    const overviewCards = document.querySelectorAll(
        ".overview-card h2"
    );

    if (overviewCards.length >= 3) {

        overviewCards[0].textContent =
            currency + " " + remainingBalance.toLocaleString();

        overviewCards[1].textContent =
            currency + " " + monthlyBudget.toLocaleString();

        overviewCards[2].textContent =
            currency + " " + totalExpenses.toLocaleString();
    }
}

// =====================================
// 5. CONNECT BUTTON TO JAVASCRIPT
// =====================================

const calculateButton = document.getElementById(
    "calculate-budget"
);

calculateButton.addEventListener("click", function() {
    collectBudgetInformation();
});

console.log(appName + " JavaScript loaded successfully.");
