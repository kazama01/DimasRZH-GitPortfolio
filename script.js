
// Main Logic
document.addEventListener('DOMContentLoaded', () => {
    initContent();
    initCanvas();
    initGlitchSystem();
    initSkillGlitchSystem();
    initShuffleSystem();
    initObservers();
});

function initContent() {
    // 1. Populate Hero
    document.querySelector('.bio-text').textContent = portfolioData.profile.summary;

    // 2. Populate Projects
    const projectsContainer = document.getElementById('projects-container');

    portfolioData.projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.id = project.id;

        let mediaContent = '';
        if (project.video && (project.video.includes('youtube.com') || project.video.includes('youtu.be'))) {
            const videoId = getYouTubeID(project.video);

            // Priority: Image Asset > YouTube Thumbnail
            // If project.image exists and isn't empty, use it. Otherwise fetch from YouTube.
            const useLocalImage = project.image && project.image.trim() !== '';
            const imgSrc = useLocalImage ? project.image : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            const imgOnError = useLocalImage ? '' : `onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'"`;

            mediaContent = `
        <div class="project-media video-container" data-video-id="${videoId}">
            <img src="${imgSrc}" 
                 ${imgOnError}
                 alt="${project.title}" class="thumb">
            <div class="play-overlay"><i class="fas fa-play play-btn"></i></div>
        </div>
`;

        } else if (project.image) {
            mediaContent = `<div class="project-media"><img src="${project.image}" alt="${project.title}"></div>`;
        } else {
            // Use placeholder if no video
            mediaContent = `
    <div class="project-media">
        <div style="width:100%;height:100%;background:linear-gradient(45deg, #1a1a1a, #000);display:flex;align-items:center;justify-content:center;color:#333;">
            <i class="fas fa-cube fa-3x"></i>
        </div>
    </div>
    `;
        }

        card.innerHTML = `
            ${mediaContent}
<div class="project-info">
    <span class="project-cat">${project.category.toUpperCase()}</span>
    <h3 class="project-title">${project.title}</h3>
    <p>${project.description}</p>
    <div class="project-tags">
        ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>
    
    <div style="margin-top: 1.5rem;">
        ${project.link ?
                `<a href="${project.link}" target="_blank" class="cyber-btn" style="padding: 0.5rem 1rem; font-size: 0.8rem;">
                <span class="btn-content">VIEW PROJECT <i class="fas fa-external-link-alt"></i></span>
                <span class="btn-glitch"></span>
            </a>` :
                `<span class="cyber-btn disabled" style="padding: 0.5rem 1rem; font-size: 0.8rem;">
                <span class="btn-content">NO LINK <i class="fas fa-lock"></i></span>
                <span class="btn-glitch"></span>
            </span>`
            }
    </div>
</div>
`;
        projectsContainer.appendChild(card);
    });

    // Event Delegation for Video Play
    projectsContainer.addEventListener('click', (e) => {
        const playBtn = e.target.closest('.play-overlay');
        if (playBtn) {
            const container = playBtn.parentElement;
            const videoId = container.dataset.videoId;
            if (videoId) {
                const originParam = window.location.protocol.startsWith('http') ? `&origin=${window.location.origin}` : '';
                container.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1${originParam}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
            }
        }
    });

    // 3. Populate Skills
    const skillsContainer = document.getElementById('skills-container');
    for (const [category, skills] of Object.entries(portfolioData.skills)) {
        if (skills.length === 0) continue;
        const group = document.createElement('div');
        // Category triggers its own children
        group.className = 'skill-category reveal stagger-parent';
        group.innerHTML = `
    <h3>${category.toUpperCase()}</h3>
        <div class="skill-list">
            ${skills.map(skill => `<div class="skill-item reveal skill-glitch-target">${skill}</div>`).join('')}
        </div>
`;
        skillsContainer.appendChild(group);
    }

    // 4. Populate Experience
    const expContainer = document.getElementById('experience-container');
    portfolioData.experience.forEach(exp => {
        const item = document.createElement('div');
        // Use .shuffle-reveal instead of .reveal-slide-in for history items
        item.className = 'timeline-item reveal shuffle-reveal';

        if (exp.period.toLowerCase().includes('present')) {
            item.classList.add('current-job');
        }

        item.innerHTML = `
            <div class="timeline-date shuffle-target">${exp.period}</div>
            <div class="timeline-role shuffle-target">${exp.role}</div>
            <div class="timeline-company shuffle-target">${exp.company}</div>
            <p class="shuffle-target">${exp.description}</p>
        `;
        expContainer.appendChild(item);
    });
}

// Canvas Particles (Japanese Ember Effect)
function initCanvas() {
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2;
            this.color = Math.random() > 0.9 ? '#ff2a2a' : '#555'; // Red or Grey
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw connection lines
        ctx.strokeStyle = 'rgba(100, 100, 100, 0.05)';
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
            particles[i].update();
            particles[i].draw();
        }

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();
}

// --- SVG GLITCH SYSTEM ---
const glitchFilters = new Map();

function initGlitchSystem() {
    const cards = document.querySelectorAll('.project-card');
    const svgContainer = document.createElement('div');
    svgContainer.style.cssText = 'position: absolute; width: 0; height: 0; overflow: hidden; pointer-events: none;';
    document.body.appendChild(svgContainer);

    cards.forEach((card, index) => {
        const id = `glitch-filter-${index}`;

        // DATAMOSH FILTER: Sharp Horizontal Tearing
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.innerHTML = `
            <defs>
                <filter id="${id}" x="-20%" y="-20%" width="140%" height="140%">
                    <!-- 1. Noise: Low X freq (long lines), High Y freq (scanlines) -->
                    <feTurbulence type="turbulence" baseFrequency="0.002 0.2" numOctaves="1" result="noise" seed="${index}" />
                    
                    <!-- 2. Displacement: High scale for tearing -->
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" result="displaced" />
                    
                    <!-- 3. RGB Split -->
                    <feOffset in="displaced" dx="0" dy="0" result="red_offset" />
                    <feColorMatrix in="red_offset" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red_channel" />
                        
                    <feOffset in="displaced" dx="0" dy="0" result="blue_offset" />
                    <feColorMatrix in="blue_offset" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue_channel" />
                        
                    <feColorMatrix in="displaced" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green_channel" />
                        
                    <feBlend in="red_channel" in2="green_channel" mode="screen" result="rg_blend" />
                    <feBlend in="rg_blend" in2="blue_channel" mode="screen" result="final_blend" />
                </filter>
            </defs>
        `;
        svgContainer.appendChild(svg);

        const filter = {
            turbulence: svg.querySelector('feTurbulence'),
            displacement: svg.querySelector('feDisplacementMap'),
            redOffset: svg.querySelector('[result="red_offset"]'),
            blueOffset: svg.querySelector('[result="blue_offset"]'),
            id: id
        };
        glitchFilters.set(card, filter);

        // Hide initially
        card.style.opacity = '0';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger: 150ms * index in this batch + random small jitter
                const delay = (i * 150) + (Math.random() * 100);
                setTimeout(() => {
                    playGlitchReveal(entry.target);
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach(card => observer.observe(card));
}

// function triggerGlitchSequence() { ... } REMOVED

function playGlitchReveal(card) {
    const filter = glitchFilters.get(card);
    if (!filter) return;

    card.style.opacity = '1';
    card.style.filter = `url(#${filter.id})`;

    // Randomize Duration: 800ms to 1500ms (was fixed 1200)
    const duration = 800 + Math.random() * 700;

    // Randomize Decay/Snap: 0.2 (very sharp) to 0.6 (softer)
    const intensityPower = 0.2 + Math.random() * 0.4;

    const startTime = performance.now();

    // Randomize initial noise pattern
    let seed = Math.floor(Math.random() * 100);

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        let progress = elapsed / duration;

        if (progress < 1) {
            // Intensity Curve: Starts MAX, decays non-linearly
            const intensity = 1 - Math.pow(progress, intensityPower);

            // 1. Horizontal Tearing (Displacement)
            // Huge scale at start (shredding), 0 at end
            const maxDisplacement = 150;
            const currentScale = maxDisplacement * intensity;

            // 2. Scanline Stutter (Noise Frequency)
            // Vary the Y-frequency to simulate "tracking" issues
            const freqY = 0.1 + (Math.random() * 0.8 * intensity);
            const freqX = 0.002; // Keep X low for "stripes"

            // 3. RGB Separation
            // Massive separation at peak intensity
            const colorShift = (Math.random() * 20 - 10) * intensity;

            // Update Filter
            // Strobe seed every few frames for "jerky" low-bitrate feel
            if (elapsed % 60 < 20) {
                seed = Math.floor(Math.random() * 1000);
            }

            filter.turbulence.setAttribute('seed', seed);
            filter.turbulence.setAttribute('baseFrequency', `${freqX} ${freqY}`);
            filter.displacement.setAttribute('scale', currentScale);

            filter.redOffset.setAttribute('dx', colorShift);
            filter.blueOffset.setAttribute('dx', -colorShift); // Oppose blue

            requestAnimationFrame(animate);
        } else {
            // Clean finish
            card.style.filter = 'none';
        }
    }
    requestAnimationFrame(animate);
}

// --- SKILL GLITCH SYSTEM (Digital/Blocky) ---
const skillGlitchFilters = new Map();

function initSkillGlitchSystem() {
    const skills = document.querySelectorAll('.skill-glitch-target');
    if (skills.length === 0) return;

    const svgContainer = document.createElement('div');
    svgContainer.style.cssText = 'position: absolute; width: 0; height: 0; overflow: hidden; pointer-events: none;';
    document.body.appendChild(svgContainer);

    skills.forEach((skill, index) => {
        const id = `skill-glitch-${index}`;

        // DIGITAL GLITCH FILTER: Blocky, Noise, RGB Offset
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.innerHTML = `
            <defs>
                <filter id="${id}" x="-20%" y="-20%" width="140%" height="140%">
                    <!-- High freq noise for digital grain -->
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise" seed="${index}" />
                    
                    <!-- Color Matrix for RGB split (Cyan/Red) -->
                    <feColorMatrix in="SourceGraphic" type="matrix" 
                        values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
                    <feColorMatrix in="SourceGraphic" type="matrix" 
                        values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="cyan" />
                    
                    <!-- Displace Red Channel -->
                    <feDisplacementMap in="red" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="R" result="displacedRed" />
                    
                    <!-- Displace Cyan Channel (opposing) -->
                    <feDisplacementMap in="cyan" in2="noise" scale="0" xChannelSelector="G" yChannelSelector="G" result="displacedCyan" />
                    
                    <feBlend in="displacedRed" in2="displacedCyan" mode="screen" result="blended" />
                </filter>
            </defs>
        `;
        svgContainer.appendChild(svg);

        skillGlitchFilters.set(skill, {
            filterId: id,
            turbulence: svg.querySelector('feTurbulence'),
            redDisplacement: svg.querySelector('[result="displacedRed"]'),
            cyanDisplacement: svg.querySelector('[result="displacedCyan"]')
        });

        // Initial state: Hidden
        skill.style.opacity = '0';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger slightly
                setTimeout(() => {
                    playSkillGlitch(entry.target);
                }, Math.random() * 400);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skills.forEach(skill => observer.observe(skill));
}

function playSkillGlitch(element) {
    const data = skillGlitchFilters.get(element);
    if (!data) return;

    // Ensure positioning for blocks
    element.style.position = 'relative';
    // element.style.overflow = 'hidden'; // REMOVED: Allow blocks to spill out
    element.style.filter = `url(#${data.filterId})`;

    // Quick digital sequence
    const duration = 600;
    const startTime = performance.now();
    let frameCount = 0;

    // --- Block Spawning Logic ---
    const blockCount = Math.floor(Math.random() * 16) + 50; // 5 to 20
    for (let i = 0; i < blockCount; i++) {
        const block = document.createElement('div');
        block.classList.add('glitch-block');

        // Random Properties
        const w = Math.random() * 100 + 20; // WIDER: 20% to 120%
        const h = Math.random() * 40 + 5; // TALLER: 5px to 45px

        // Position: Allow extending outside (-30% to 130%)
        const top = Math.random() * 160 - 30;
        const left = Math.random() * 160 - 30;

        // Colors
        const colors = ['var(--accent-red)', 'var(--accent-cyan)', '#ffffff', '#000000'];
        block.style.background = colors[Math.floor(Math.random() * colors.length)];

        block.style.width = `${w}%`;
        block.style.height = `${h}px`;
        block.style.top = `${top}%`;
        block.style.left = `${left}%`;

        // Randomize Opacity & Blending for "Sketchy" feel
        if (Math.random() > 0.5) {
            // Solid "Blocking" Block
            block.style.opacity = '1';
            block.style.mixBlendMode = 'normal';
        } else {
            // Blending Block
            block.style.opacity = Math.random() * 0.4 + 0.6; // 0.6 to 1.0
            block.style.mixBlendMode = 'overlay';
        }

        element.appendChild(block);

        // Remove block at random time during animation
        setTimeout(() => {
            block.remove();
        }, Math.random() * duration);
    }


    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        let progress = elapsed / duration;

        if (progress < 1) {
            frameCount++;

            // 1. Flicker/Strobe Opacity (Every 4th frame)
            if (frameCount % 4 === 0) {
                element.style.opacity = Math.random() > 0.5 ? '1' : '0.2';
            } else {
                element.style.opacity = '1';
            }

            // 2. Jerky Displacement
            const intensity = 1 - progress;
            const seed = Math.floor(Math.random() * 100);

            if (Math.random() > 0.3) {
                data.turbulence.setAttribute('seed', seed);
                const scale = (Math.random() * 20) * intensity;
                data.redDisplacement.setAttribute('scale', scale);
                data.cyanDisplacement.setAttribute('scale', -scale);
            }

            requestAnimationFrame(animate);
        } else {
            // Clean End
            element.style.opacity = '1';
            element.style.filter = 'none';
            // Cleanup any remaining blocks (just in case)
            const remaining = element.querySelectorAll('.glitch-block');
            remaining.forEach(b => b.remove());
        }
    }
    requestAnimationFrame(animate);
}

function initObservers() {
    // 1. Setup Animation Classes
    // 2. Intersection Observer (Generic Reveal)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small random delay for natural feel if multiple appear at once
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, Math.random() * 150);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe all elements with .reveal class
    // Note: Project cards use their own Glitch System observer
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Shader Trigger Observer
    const projectSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (window.startShaderSequence) {
                    window.startShaderSequence();
                } else {
                    // Queue it
                    window.shaderSequenceRequested = true;
                }
                projectSectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    if (projects) projectSectionObserver.observe(projects);

    // 3. Scroll Spy for Nav
    const sections = document.querySelectorAll('section');

    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Offset for sticky header/visual comfort
            if (window.pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

function getYouTubeID(url) {
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}



// --- TEXT SHUFFLE SYSTEM ---
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    // Helper to fade in opacity if needed
    reveal() {
        this.el.style.opacity = '1';
        this.el.style.transition = 'opacity 0.1s';
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

function initShuffleSystem() {
    const items = document.querySelectorAll('.shuffle-reveal');
    if (items.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;

                // Reveal the container
                item.classList.add('active');

                // Find text targets within
                const targets = item.querySelectorAll('.shuffle-target');
                targets.forEach((target, index) => {
                    const scrambler = new TextScramble(target);
                    const originalText = target.textContent;

                    // Delay based on index for cascade effect
                    setTimeout(() => {
                        scrambler.reveal(); // Make visible just before starting
                        scrambler.setText(originalText);
                    }, index * 200);
                });

                observer.unobserve(item);
            }
        });
    }, { threshold: 0.2 });

    items.forEach(item => observer.observe(item));
}
