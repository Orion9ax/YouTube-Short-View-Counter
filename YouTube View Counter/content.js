(function() {
    const SHORT_ID = window.location.pathname.split('/').pop();
    
    if (!SHORT_ID) return;

    const API_KEY = 'AIzaSyDpHEcKD0VrFGtpHJFcIHmoXsnBzGAx_4'; // Replace with your API key

    function injectCounter(views) {
        const counter = document.createElement('div');
        counter.id = 'shorts-view-counter';
        counter.style.position = 'absolute';
        counter.style.top = '10px';
        counter.style.right = '10px';
        counter.style.padding = '5px 10px';
        counter.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        counter.style.color = '#fff';
        counter.style.borderRadius = '5px';
        counter.style.zIndex = '1000';
        counter.style.fontSize = '16px';
        counter.innerText = `Views: ${views}`;

        const videoContainer = document.querySelector('#shorts-container');
        if (videoContainer) {
            videoContainer.appendChild(counter);
        }
    }

    // Fetch actual view count from YouTube API
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${SHORT_ID}&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const views = data.items[0].statistics.viewCount;
                injectCounter(views);
            } else {
                console.error('No data found for the video ID:', SHORT_ID);
            }
        })
        .catch(err => console.error('Error fetching YouTube data: ', err));
})();

