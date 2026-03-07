function initInfiniteGrid() {
    // Evitar múltiples instancias
    if (document.getElementById('infinite-grid-bg')) return;

    const container = document.createElement('div');
    container.id = 'infinite-grid-bg';
    container.style.position = 'fixed';
    container.style.inset = '0';
    container.style.zIndex = '-1';
    container.style.backgroundColor = '#ffffff'; // Fondo blanco
    container.style.overflow = 'hidden';
    container.style.pointerEvents = 'none';

    // Celestito suave para la grilla (Tailwind sky-300: #7dd3fc)
    const strokeColor = encodeURIComponent('#7dd3fc');
    const svgPattern = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='${strokeColor}' stroke-width='1.5'/%3E%3C/svg%3E`;

    // Capa de fondo muy suave
    const layer1 = document.createElement('div');
    layer1.style.position = 'absolute';
    layer1.style.inset = '0';
    layer1.style.backgroundImage = `url("${svgPattern}")`;
    layer1.style.opacity = '0.3';

    // Capa destacada que sigue al mouse
    const layer2 = document.createElement('div');
    layer2.style.position = 'absolute';
    layer2.style.inset = '0';
    layer2.style.backgroundImage = `url("${svgPattern}")`;
    layer2.style.opacity = '1.0';

    // Orbes decorativos celestitos (blanco con celestito suave)
    const orbs = document.createElement('div');
    orbs.style.position = 'absolute';
    orbs.style.inset = '0';
    orbs.innerHTML = `
        <div style="position:absolute; right:-20%; top:-20%; width:40%; height:60%; border-radius:50%; background-color:rgba(186, 230, 253, 0.4); filter:blur(120px);"></div>
        <div style="position:absolute; right:10%; top:-10%; width:20%; height:30%; border-radius:50%; background-color:rgba(14, 165, 233, 0.15); filter:blur(100px);"></div>
        <div style="position:absolute; left:-10%; bottom:-20%; width:40%; height:60%; border-radius:50%; background-color:rgba(186, 230, 253, 0.4); filter:blur(120px);"></div>
    `;

    container.appendChild(orbs);
    container.appendChild(layer1);
    container.appendChild(layer2);
    document.body.prepend(container);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let offsetX = 0;
    let offsetY = 0;
    const speed = 0.5;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        offsetX = (offsetX + speed) % 40;
        offsetY = (offsetY + speed) % 40;

        const bgPos = `${offsetX}px ${offsetY}px`;
        layer1.style.backgroundPosition = bgPos;
        layer2.style.backgroundPosition = bgPos;

        layer2.style.maskImage = `radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black, transparent)`;
        layer2.style.webkitMaskImage = layer2.style.maskImage;

        requestAnimationFrame(animate);
    }
    animate();
}

document.addEventListener("DOMContentLoaded", initInfiniteGrid);
