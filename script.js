document.addEventListener("DOMContentLoaded", () => {
  const barArea = document.querySelector(".bar__area");

  if (!barArea) {
    console.error("bar__area not found");
    return;
  }

  fetchData(barArea);
});

async function fetchData(barArea) {
  try {
    const res = await fetch("./data.json");

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    barArea.innerHTML = "";
    createChart(data, barArea);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    console.log("Data fetch attempt completed.");
  }
}

function createChart(data, barArea) {
  const maxAmount = Math.max(...data.map((item) => item.amount));

  const todayIndex = new Date().getDay();
  const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const today = daysOfWeek[todayIndex];

  data.forEach((item) => {
    const barItem = document.createElement("li");
    barItem.className = "bar__item";
    barItem.setAttribute("tabindex", "0");
    barItem.setAttribute("aria-label", `${item.day}: $${item.amount}`);

    if (item.day === today) {
      barItem.classList.add("bar__item--current");
    }

    const height = (item.amount / maxAmount) * 150;

    const tooltip = document.createElement("div");
    tooltip.className = "tooltip__amount";
    tooltip.setAttribute("aria-hidden", "true");
    tooltip.textContent = `$${item.amount}`;

    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${height}px`;

    const label = document.createElement("div");
    label.className = "day__label";
    label.textContent = item.day;

    barItem.append(tooltip, bar, label);
    barArea.appendChild(barItem);
  });
}
