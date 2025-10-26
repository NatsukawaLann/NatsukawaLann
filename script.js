// Card flip animation
document.querySelector('.card').addEventListener('click', function() {
    this.classList.toggle('flipped');
});

// Add some sparkles/animation when the page loads
window.addEventListener('load', function() {
    const details = document.querySelector('.details');
    details.style.opacity = '1';
    details.style.transform = 'translateY(0)';
});

// Make the heart emoji pulse
const loveText = document.querySelector('p:contains("I love you")');
if (loveText) {
    setInterval(() => {
        loveText.style.transform = 'scale(1.1)';
        setTimeout(() => {
            loveText.style.transform = 'scale(1)';
        }, 500);
    }, 1000);
}