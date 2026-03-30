const barArea = document.querySelector(".bar__area");
async function fetchData() {
  try {
    const res = await fetch("./data.json");
    const data = await res.json();
    barArea.innerHTML = ""; // remove skeleton
    createChart(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    console.log("Data fetch attempt completed.");
  }
}
fetchData();
function createChart(data) {
  const maxAmount = Math.max(...data.map((item) => item.amount));
  const todayIndex = new Date().getDay();
  const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const today = daysOfWeek[todayIndex];

  data.forEach((item) => {
    const barItem = document.createElement("li");
    barItem.classList.add("bar__item");
    barItem.setAttribute("tabindex", "0");
    barItem.setAttribute("aria-label", `${item.day}: $${item.amount}`);

    if (item.day === today) {
      barItem.classList.add("bar__item--current");
    }
    // Calculate height (scale)
    const height = (item.amount / maxAmount) * 150;

    barItem.innerHTML = `
  <div class="tooltip__amount" aria-hidden="true">$${item.amount}</div>
  <div class="bar" style="height: ${height}px;"></div>
  <div class="day__label">${item.day}</div>
      
    `;

    barArea.appendChild(barItem);
  });
}
