function updateClockAndDate() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();

    document.getElementById('zegar').textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById('data').textContent = `${day}-${month}-${year}`;
}

let intervalId;
let elapsedTime = 0;
let lastVisibleTime = 0;

function startTimer() {
    const savedStartTime = localStorage.getItem('startTime');
    if (savedStartTime) {
        elapsedTime = parseInt(savedStartTime, 10);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    if (document.visibilityState === 'visible') {
        handleVisibilityChange();
    }
}

function handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
        lastVisibleTime = Date.now();
        intervalId = setInterval(updateElapsedTime, 1000);
    } else {
        clearInterval(intervalId);
        elapsedTime += Date.now() - lastVisibleTime;
        localStorage.setItem('startTime', elapsedTime.toString());
    }
}

function updateElapsedTime() {
    const totalElapsed = elapsedTime + (Date.now() - lastVisibleTime);
    const seconds = Math.floor((totalElapsed / 1000) % 60).toString().padStart(2, '0');
    const minutes = Math.floor((totalElapsed / (1000 * 60)) % 60).toString().padStart(2, '0');
    const hours = Math.floor((totalElapsed / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
    document.getElementById('czasPobytu').textContent = `Czas pobytu: ${hours}:${minutes}:${seconds}`;
}

function updateVisitCount() {
    let visitCount = localStorage.getItem('visitCount');
    if (visitCount) {
        visitCount = parseInt(visitCount, 10) + 1;
    } else {
        visitCount = 1;
    }
    localStorage.setItem('visitCount', visitCount.toString());
    document.getElementById('licznikOdwiedzin').textContent = `Liczba odwiedzin: ${visitCount}`;
}

updateClockAndDate();
setInterval(updateClockAndDate, 1000);
startTimer();
updateVisitCount();