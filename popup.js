document.getElementById('randomTimestamp').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: jumpToRandomTimestamp
        });
    });
});
  
document.getElementById('randomChapter').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: jumpToRandomChapter
        });
    });
});
  
toggleButton.addEventListener('click', () => {
    // Kiểm tra trạng thái hiện tại của nút
    if (toggleButton.classList.contains('on')) {
      // Nếu đang bật, tắt nút
      toggleButton.classList.remove('on');
      toggleButton.textContent = 'OFF';
      toggleButton.style.backgroundColor = 'red'; // Đổi màu về đỏ
      
    } else {
      // Nếu đang tắt, bật nút
      toggleButton.classList.add('on');
      toggleButton.textContent = 'ON';
      toggleButton.style.backgroundColor = 'green'; // Đổi màu sang xanh
    }
});

function jumpToRandomTimestamp() {
    const video = document.querySelector('video');
    if (video) {
        const randomTime = Math.random() * video.duration;
        console.log('Jumping to random time:', randomTime, 'out of', video.duration);
        video.currentTime = randomTime;
    } else {
        alert('No video found on this page.');
    }
}

function jumpToRandomChapter() {
    console.log("Jumping to random chapter");
    const chaptersFinal = [];

    const chapters = Array.from(document.querySelectorAll('div#time')).map(el => el.innerText);

    chapters.forEach((el) => {
        let timeParts = el.split(':');
        let tmp = 0;
        if (timeParts.length === 3) {
            const hours = parseInt(timeParts[0]);
            const minutes = parseInt(timeParts[1]);
            const seconds = parseInt(timeParts[2]);
            tmp =  hours * 3600 + minutes * 60 + seconds;
        } else if (timeParts.length === 2) {
            const minutes = parseInt(timeParts[0]);
            const seconds = parseInt(timeParts[1]);
            tmp = minutes * 60 + seconds;
        }
        chaptersFinal.push(tmp);
    })

    console.log(chapters);
    console.log(chaptersFinal);
    
    if (chaptersFinal.length > 0) {
        const randomChapter = chaptersFinal[Math.floor(Math.random() * chaptersFinal.length)];
        console.log("Chapters found:", chaptersFinal);
        const video = document.querySelector('video');
        if (video) {
            video.currentTime = randomChapter;
        } else {
            alert('No video found on this page.');
        }
    } else {
        alert('No chapters found in this video.');
    }
}
  
  