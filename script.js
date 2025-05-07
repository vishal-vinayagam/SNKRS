// Initialize Three.js for 3D sneaker in hero section
let heroScene, heroCamera, heroRenderer, heroSneaker;

function initHero3DViewer() {
    // Set up the scene
    heroScene = new THREE.Scene();
    heroScene.background = new THREE.Color(0x111111);
    
    // Set up the camera
    heroCamera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight * 0.6), 0.1, 1000);
    heroCamera.position.z = 5;
    
    // Set up the renderer
    heroRenderer = new THREE.WebGLRenderer({ antialias: true });
    heroRenderer.setSize(window.innerWidth, window.innerHeight * 0.6);
    document.getElementById('sneaker-3d').appendChild(heroRenderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    heroScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    heroScene.add(directionalLight);
    
    // Create a placeholder sneaker (in a real app, you'd load a 3D model)
    const geometry = new THREE.BoxGeometry(2, 0.5, 1);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        specular: 0x111111,
        shininess: 30
    });
    heroSneaker = new THREE.Mesh(geometry, material);
    heroScene.add(heroSneaker);
    
    // Auto-rotation animation
    function animate() {
        requestAnimationFrame(animate);
        heroSneaker.rotation.x += 0.005;
        heroSneaker.rotation.y += 0.01;
        heroRenderer.render(heroScene, heroCamera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        heroCamera.aspect = window.innerWidth / (window.innerHeight * 0.6);
        heroCamera.updateProjectionMatrix();
        heroRenderer.setSize(window.innerWidth, window.innerHeight * 0.6);
    });
}

// Initialize Three.js for custom sneaker in studio
let customScene, customCamera, customRenderer, customSneaker;
let currentModel = 'jordan1';
let currentColors = {
    upper: '#000000',
    midsole: '#FFFFFF',
    outsole: '#000000',
    laces: '#000000',
    text: '#FFFFFF'
};
let currentMaterials = {
    upper: 'leather',
    lining: 'leather'
};
let currentDetails = {
    laces: 'flat',
    text: ''
};

function initCustom3DViewer() {
    // Set up the scene
    customScene = new THREE.Scene();
    customScene.background = new THREE.Color(0x333333);
    
    // Set up the camera
    customCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    customCamera.position.z = 7;
    
    // Set up the renderer
    customRenderer = new THREE.WebGLRenderer({ antialias: true });
    customRenderer.setSize(document.getElementById('custom-sneaker-3d').offsetWidth, 
                         document.getElementById('custom-sneaker-3d').offsetHeight);
    document.getElementById('custom-sneaker-3d').appendChild(customRenderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    customScene.add(ambientLight);
    
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(1, 1, 1);
    customScene.add(directionalLight1);
    
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-1, -1, -1);
    customScene.add(directionalLight2);
    
    // Create initial sneaker
    createSneakerModel();
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        customRenderer.render(customScene, customCamera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        customCamera.aspect = document.getElementById('custom-sneaker-3d').offsetWidth / 
                             document.getElementById('custom-sneaker-3d').offsetHeight;
        customCamera.updateProjectionMatrix();
        customRenderer.setSize(document.getElementById('custom-sneaker-3d').offsetWidth, 
                              document.getElementById('custom-sneaker-3d').offsetHeight);
    });
}

function createSneakerModel() {
    // Remove existing sneaker if present
    if (customSneaker) {
        customScene.remove(customSneaker);
    }
    
    // In a real app, you would load different 3D models based on selection
    // This is a simplified placeholder implementation
    
    let geometry;
    switch(currentModel) {
        case 'jordan1':
            geometry = createJordan1Geometry();
            break;
        case 'af1':
            geometry = createAF1Geometry();
            break;
        case 'yeezy':
            geometry = createYeezyGeometry();
            break;
        default:
            geometry = createJordan1Geometry();
    }
    
    const material = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color(currentColors.upper),
        specular: 0x111111,
        shininess: 30
    });
    
    customSneaker = new THREE.Mesh(geometry, material);
    customScene.add(customSneaker);
    
    updateSummary();
}

// Placeholder geometry creation functions
function createJordan1Geometry() {
    // Simplified Jordan 1 geometry
    const upper = new THREE.BoxGeometry(2, 0.8, 1.2);
    const midsole = new THREE.BoxGeometry(2.1, 0.2, 1.3);
    midsole.translate(0, -0.5, 0);
    
    const outsole = new THREE.BoxGeometry(2.1, 0.1, 1.3);
    outsole.translate(0, -0.6, 0);
    
    const geometry = new THREE.BufferGeometry();
    const upperMesh = new THREE.Mesh(upper);
    const midsoleMesh = new THREE.Mesh(midsole);
    const outsoleMesh = new THREE.Mesh(outsole);
    
    upperMesh.updateMatrix();
    midsoleMesh.updateMatrix();
    outsoleMesh.updateMatrix();
    
    geometry.merge(upperMesh.geometry, upperMesh.matrix);
    geometry.merge(midsoleMesh.geometry, midsoleMesh.matrix);
    geometry.merge(outsoleMesh.geometry, outsoleMesh.matrix);
    
    return geometry;
}

function createAF1Geometry() {
    // Simplified Air Force 1 geometry
    const upper = new THREE.BoxGeometry(2, 0.7, 1.3);
    const midsole = new THREE.BoxGeometry(2.1, 0.3, 1.4);
    midsole.translate(0, -0.5, 0);
    
    const outsole = new THREE.BoxGeometry(2.1, 0.1, 1.4);
    outsole.translate(0, -0.65, 0);
    
    const geometry = new THREE.BufferGeometry();
    const upperMesh = new THREE.Mesh(upper);
    const midsoleMesh = new THREE.Mesh(midsole);
    const outsoleMesh = new THREE.Mesh(outsole);
    
    upperMesh.updateMatrix();
    midsoleMesh.updateMatrix();
    outsoleMesh.updateMatrix();
    
    geometry.merge(upperMesh.geometry, upperMesh.matrix);
    geometry.merge(midsoleMesh.geometry, midsoleMesh.matrix);
    geometry.merge(outsoleMesh.geometry, outsoleMesh.matrix);
    
    return geometry;
}

function createYeezyGeometry() {
    // Simplified Yeezy 350 geometry
    const upper = new THREE.BoxGeometry(2.2, 0.6, 1.4);
    const midsole = new THREE.BoxGeometry(2.3, 0.4, 1.5);
    midsole.translate(0, -0.5, 0);
    
    const outsole = new THREE.BoxGeometry(2.3, 0.1, 1.5);
    outsole.translate(0, -0.7, 0);
    
    const geometry = new THREE.BufferGeometry();
    const upperMesh = new THREE.Mesh(upper);
    const midsoleMesh = new THREE.Mesh(midsole);
    const outsoleMesh = new THREE.Mesh(outsole);
    
    upperMesh.updateMatrix();
    midsoleMesh.updateMatrix();
    outsoleMesh.updateMatrix();
    
    geometry.merge(upperMesh.geometry, upperMesh.matrix);
    geometry.merge(midsoleMesh.geometry, midsoleMesh.matrix);
    geometry.merge(outsoleMesh.geometry, outsoleMesh.matrix);
    
    return geometry;
}

// Update order summary
function updateSummary() {
    document.getElementById('summary-model').textContent = 
        currentModel === 'jordan1' ? 'Jordan 1' : 
        currentModel === 'af1' ? 'Air Force 1' : 'Yeezy 350';
    
    document.getElementById('summary-colors').textContent = 
        `${currentColors.upper.toUpperCase()} Upper, ${currentColors.midsole.toUpperCase()} Midsole`;
    
    document.getElementById('summary-materials').textContent = 
        `${currentMaterials.upper === 'leather' ? 'Premium Leather' : 
          currentMaterials.upper === 'suede' ? 'Suede' : 
          currentMaterials.upper === 'canvas' ? 'Canvas' : 
          currentMaterials.upper === 'knit' ? 'Knit Fabric' : 'Breathable Mesh'}`;
}

// Setup tab functionality
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// Setup model selection
function setupModelSelection() {
    const modelOptions = document.querySelectorAll('.model-option');
    
    modelOptions.forEach(option => {
        option.addEventListener('click', () => {
            currentModel = option.getAttribute('data-model');
            createSneakerModel();
            
            // Update active state
            modelOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });
}

// Setup color selection
function setupColorSelection() {
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const color = option.getAttribute('data-color');
            const part = option.parentElement.getAttribute('data-part');
            
            currentColors[part] = color;
            createSneakerModel();
            
            // Update active state
            document.querySelectorAll(`.color-palette[data-part="${part}"] .color-option`).forEach(opt => {
                opt.classList.remove('selected');
            });
            option.classList.add('selected');
        });
    });
}

// Setup material selection
function setupMaterialSelection() {
    const materialSelects = document.querySelectorAll('.material-select');
    
    materialSelects.forEach(select => {
        select.addEventListener('change', () => {
            const part = select.getAttribute('data-part');
            currentMaterials[part] = select.value;
            updateSummary();
        });
    });
}

// Setup detail selection
function setupDetailSelection() {
    const detailSelects = document.querySelectorAll('.detail-select');
    
    detailSelects.forEach(select => {
        select.addEventListener('change', () => {
            const part = select.getAttribute('data-part');
            currentDetails[part] = select.value;
        });
    });
    
    // Custom text input
    const customText = document.getElementById('custom-text');
    customText.addEventListener('input', () => {
        currentDetails.text = customText.value;
    });
}

// Setup view controls
function setupViewControls() {
    const rotateBtn = document.getElementById('rotate-view');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    
    let isRotating = false;
    let rotationInterval;
    
    rotateBtn.addEventListener('click', () => {
        isRotating = !isRotating;
        
        if (isRotating) {
            rotateBtn.classList.add('active');
            rotationInterval = setInterval(() => {
                if (customSneaker) customSneaker.rotation.y += 0.02;
            }, 50);
        } else {
            rotateBtn.classList.remove('active');
            clearInterval(rotationInterval);
        }
    });
    
    zoomInBtn.addEventListener('click', () => {
        if (customCamera) customCamera.position.z = Math.max(3, customCamera.position.z - 0.5);
    });
    
    zoomOutBtn.addEventListener('click', () => {
        if (customCamera) customCamera.position.z = Math.min(10, customCamera.position.z + 0.5);
    });
}

// Setup order buttons
function setupOrderButtons() {
    const addToCartBtn = document.getElementById('add-to-cart');
    const checkoutBtn = document.getElementById('checkout-now');
    
    addToCartBtn.addEventListener('click', () => {
        alert('Custom sneaker added to cart! In a real app, this would save to your cart.');
    });
    
    checkoutBtn.addEventListener('click', () => {
        alert('Proceeding to checkout with your custom sneaker! In a real app, this would go to checkout.');
    });
}

// Setup feedback form
function setupFeedbackForm() {
    const form = document.getElementById('feedback-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // In a real app, you would send this data to your server
        console.log('Feedback submitted:', { name, email, subject, message });
        
        // Show success message
        alert('Thank you for your feedback! We will get back to you soon.');
        form.reset();
    });
}

// Setup newsletter form
function setupNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = form.querySelector('input').value;
        
        // In a real app, you would send this to your newsletter service
        console.log('Newsletter subscription:', email);
        
        // Show success message
        alert('Thanks for subscribing to our newsletter!');
        form.reset();
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });
    
    // Animate shoe cards
    gsap.utils.toArray('.shoe-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initHero3DViewer();
    initCustom3DViewer();
    initScrollAnimations();
    
    setupTabs();
    setupModelSelection();
    setupColorSelection();
    setupMaterialSelection();
    setupDetailSelection();
    setupViewControls();
    setupOrderButtons();
    setupFeedbackForm();
    setupNewsletterForm();
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            document.querySelector('.navbar').classList.add('scrolled');
        } else {
            document.querySelector('.navbar').classList.remove('scrolled');
        }
    });
    
    // Populate shoe grid with data
    const shoeData = [
        {
            name: "Air Jordan 1 Retro",
            desc: "Classic black/white colorway",
            price: "$220",
            image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28"
        },
        {
            name: "Adidas Superstar",
            desc: "Original white with black stripes",
            price: "$100",
            image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f"
        },
        {
            name: "Nike Air Force 1",
            desc: "Pure white low-top",
            price: "$90",
            image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a"
        },
        {
            name: "Converse Chuck 70",
            desc: "High-top black canvas",
            price: "$85",
            image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
        },
        {
            name: "New Balance 550",
            desc: "White leather with black details",
            price: "$110",
            image: "https://images.unsplash.com/photo-1605408499391-6368c628ef42"
        },
        {
            name: "Puma Suede Classic",
            desc: "Black with white Formstrip",
            price: "$75",
            image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329"
        },
        {
            name: "Reebok Classic",
            desc: "White leather with gum sole",
            price: "$80",
            image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28"
        },
        {
            name: "Vans Old Skool",
            desc: "Black/white checkerboard",
            price: "$65",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
        }
    ];
    
    const shoeGrid = document.querySelector('.showcase-grid');
    shoeGrid.innerHTML = '';
    
    shoeData.forEach(shoe => {
        const shoeCard = document.createElement('div');
        shoeCard.className = 'shoe-card';
        shoeCard.innerHTML = `
            <div class="shoe-img" style="background-image: url('${shoe.image}')"></div>
            <h3>${shoe.name}</h3>
            <p>${shoe.desc}</p>
            <span class="price">${shoe.price}</span>
        `;
        shoeGrid.appendChild(shoeCard);
    });
});