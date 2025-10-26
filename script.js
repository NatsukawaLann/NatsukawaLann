// Robust interactions and animations for the card
document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    const details = document.querySelector('.details');

    // Inject small helper CSS for flip and pulse so it works even if style.css doesn't
    const style = document.createElement('style');
    style.textContent = `
        .card { cursor: pointer; }
        /* flipped state overrides the base transform from style.css */
        .card.flipped { transform: translate(-50%,-50%) perspective(2000px) rotateY(180deg) !important; transition: transform .8s ease; }
        .love-pulse { display: inline-block; animation: heartBeat 1s infinite; }
        @keyframes heartBeat {
            0% { transform: scale(1); }
            25% { transform: scale(1.15); }
            50% { transform: scale(1); }
            75% { transform: scale(1.08); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // Click to toggle flipped class
    if (card) {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    }

    // Staggered fade-in for headings and paragraphs
    if (details) {
        const headings = Array.from(details.querySelectorAll('h4'));
        const paragraphs = Array.from(details.querySelectorAll('p'));

        // set initial state
        [...headings, ...paragraphs].forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(10px)';
        });

        // animate headings first, then paragraphs
        headings.forEach((h, i) => {
            setTimeout(() => {
                h.style.transition = 'opacity 600ms ease, transform 600ms ease';
                h.style.opacity = '1';
                h.style.transform = 'translateY(0)';
            }, i * 200);
        });

        paragraphs.forEach((p, i) => {
            setTimeout(() => {
                p.style.transition = 'opacity 600ms ease, transform 600ms ease';
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
            }, 400 + i * 180);
        });

        // Find the paragraph that contains "I love you" (case-insensitive) and add pulse class
        const lovePara = paragraphs.find(p => /i love you/i.test(p.textContent));
        if (lovePara) {
            // wrap emoji or entire text in span for pulsing
            const html = lovePara.innerHTML;
            // Only add once
            if (!/love-pulse/.test(html)) {
                lovePara.innerHTML = html.replace(/(💖|❤️)?$/u, '<span class="love-pulse">$1</span>');
            }
        }
    }
});