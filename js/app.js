const dayEl = document.getElementById("dayValTxt");
const hourEl = document.getElementById("hourValTxt");
const minEl = document.getElementById("minuteValTxt");
const secEl = document.getElementById("secondValTxt");
const progBar = document.getElementById("progressBar");
const progStat = document.getElementById("progressStatus");
const dueEl = document.getElementById("dueTxt");

const startDate = new Date("2025-08-04T00:00:00");
const endDate = new Date("2027-02-03T00:00:00");

const totalSpan = endDate.getTime() - startDate.getTime();

function pad(n) {
  return n.toString().padStart(2, "0");
}

function updateCountdown() {
  const now = Date.now();

  if (now < startDate.getTime()) {
    const spanSec = Math.floor(totalSpan / 1000);
    const days = Math.floor(spanSec / (24 * 3600));
    const hours = Math.floor((spanSec % (24 * 3600)) / 3600);
    const minutes = Math.floor((spanSec % 3600) / 60);
    const seconds = spanSec % 60;

    dayEl.innerText = days;
    hourEl.innerText = pad(hours);
    minEl.innerText = pad(minutes);
    secEl.innerText = pad(seconds);

    progStat.style.width = "0%";
    progStat.innerText = "The countdown starts at 2025.08.04";
    progStat.classList.add("pending");
    progBar.classList.remove("completed");

    return;
  }

  if (now >= endDate.getTime()) {
    dayEl.innerText = "0";
    hourEl.innerText = "00";
    minEl.innerText = "00";
    secEl.innerText = "00";

    progStat.style.width = "100%";
    progStat.innerText = "100% Completed";
    progStat.classList.add("completed");
    progBar.classList.add("completed");

    clearInterval(timer);
    return;
  }

  const diffMs = endDate.getTime() - now;
  const secTotal = Math.floor(diffMs / 1000);

  const days = Math.floor(secTotal / (24 * 3600));
  const hours = Math.floor((secTotal % (24 * 3600)) / 3600);
  const minutes = Math.floor((secTotal % 3600) / 60);
  const seconds = secTotal % 60;

  dayEl.innerText = days;
  hourEl.innerText = pad(hours);
  minEl.innerText = pad(minutes);
  secEl.innerText = pad(seconds);

  const elapsedMs = now - startDate.getTime();
  const percent = Math.min((elapsedMs / totalSpan) * 100, 100);
  const pctDisplay = percent.toFixed(2) + "%";
  progStat.style.width = pctDisplay;
  progStat.innerText = pctDisplay;
}

updateCountdown();
const timer = setInterval(updateCountdown, 1000);
