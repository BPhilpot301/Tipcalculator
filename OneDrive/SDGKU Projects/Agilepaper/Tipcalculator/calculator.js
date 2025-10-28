// Simple helper: format numbers as US dollars.
function toMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
}

// Get elements once
const billInput = document.getElementById("bill");
const tipSelect = document.getElementById("tip");
const customWrap = document.getElementById("custom-tip-wrap");
const customInput = document.getElementById("customTip");
const peopleInput = document.getElementById("people");
const calcBtn = document.getElementById("calcBtn");
const clearBtn = document.getElementById("clearBtn");
const tipAmountEl = document.getElementById("tipAmount");
const totalAmountEl = document.getElementById("totalAmount");
const perPersonEl = document.getElementById("perPerson");
const errorEl = document.getElementById("error");

// Show/hide custom % input
tipSelect.addEventListener("change", () => {
  customWrap.classList.toggle("hidden", tipSelect.value !== "custom");
});

// Calculate button logic
calcBtn.addEventListener("click", () => {
  errorEl.textContent = "";

  // Read values as numbers
  const bill = Number(billInput.value);
  let tipPercent;

  if (tipSelect.value === "custom") {
    const custom = Number(customInput.value);
    tipPercent = custom / 100; // convert from % to decimal
    if (isNaN(custom) || custom < 0) {
      errorEl.textContent = "Enter a valid custom tip percentage (0 or more).";
      return;
    }
  } else {
    tipPercent = Number(tipSelect.value); // already a decimal (e.g., 0.15)
  }

  const people = Number(peopleInput.value || 1);

  // Basic validation
  if (isNaN(bill) || bill <= 0) {
    errorEl.textContent = "Bill must be a number greater than 0.";
    return;
  }
  if (isNaN(people) || people < 1) {
    errorEl.textContent = "People must be at least 1.";
    return;
  }

  // Math
  const tipAmount = bill * tipPercent;
  const totalAmount = bill + tipAmount;
  const perPerson = totalAmount / people;

  // Update UI
  tipAmountEl.textContent = toMoney(tipAmount);
  totalAmountEl.textContent = toMoney(totalAmount);
  perPersonEl.textContent = toMoney(perPerson);
});

// Clear button logic
clearBtn.addEventListener("click", () => {
  document.getElementById("tip-form").reset();
  customWrap.classList.add("hidden");
  tipAmountEl.textContent = "$0.00";
  totalAmountEl.textContent = "$0.00";
  perPersonEl.textContent = "$0.00";
  errorEl.textContent = "";
});
