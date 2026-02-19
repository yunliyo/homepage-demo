// Typewriter effect
const text = "Hi, I'm Yunli";
const typewriter = document.getElementById('typewriter');
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typewriter.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    } else {
        // Keep the cursor blinking
        typewriter.classList.add('typewriter');

        // Update meta title dynamically after typewriter completes
        document.title = typewriter.textContent.trim();

        // Update meta description from value proposition
        const valueProp = document.querySelector('.value-prop');
        if (valueProp) {
            let metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', valueProp.textContent.trim());
            }
        }

        // Update Open Graph meta tags
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', typewriter.textContent.trim());
        }

        let ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc && valueProp) {
            ogDesc.setAttribute('content', valueProp.textContent.trim());
        }

        // Update Twitter Card meta tags
        let twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) {
            twitterTitle.setAttribute('content', typewriter.textContent.trim());
        }

        let twitterDesc = document.querySelector('meta[name="twitter:description"]');
        if (twitterDesc && valueProp) {
            twitterDesc.setAttribute('content', valueProp.textContent.trim());
        }

        console.log('📄 Meta tags updated dynamically!');
    }
}

// Start typewriter effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Store original content on page load
function storeOriginalContent() {
    const elementsToTranslate = document.querySelectorAll(
        '.value-prop, .elevator-pitch, .section-title, .skill-item, .ability-title, .ability-description, .language-name, .language-level, .achievement-item, .testimonial-text, .hobby-name, .hobby-description, .cta-button'
    );

    elementsToTranslate.forEach((element, index) => {
        originalContent[index] = element.textContent.trim();
    });
}