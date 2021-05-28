
// Scene Init

const scene = new THREE.Scene();

// Camera Init

let camera = new THREE.OrthographicCamera( window.innerWidth / (window.innerWidth / -4), window.innerWidth / (window.innerWidth / 4), window.innerHeight / (window.innerWidth / 4), window.innerHeight / (window.innerWidth / -4), 0.1, 40 );

// Renderer Init

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth / 2, window.innerHeight / 2 );

//

function windowResize() {
    camera.aspect = 1;
    camera.updateProjectionMatrix();

    if (window.innerWidth >= 1600) {
        camera.left = window.innerWidth / -400;
        camera.right = window.innerWidth / 400;
        camera.top = window.innerHeight / 400;
        camera.bottom = window.innerHeight / -400;
        renderer.setSize( window.innerWidth / 2, window.innerHeight / 2 );
    }
    else if (window.innerWidth > 900 && window.innerWidth < 1600) {
        camera.left = window.innerWidth / (window.innerWidth / -4);
        camera.right = window.innerWidth / (window.innerWidth / 4);
        camera.top = window.innerHeight / (window.innerWidth / 4);
        camera.bottom = window.innerHeight / (window.innerWidth / -4);
        renderer.setSize( window.innerWidth / 2, window.innerHeight / 2 );
    }
    else if (window.innerWidth > 500 && window.innerWidth < 899) {
        camera.left = window.innerWidth / (window.innerWidth / -5);
        camera.right = window.innerWidth / (window.innerWidth / 5);
        camera.top = window.innerHeight / (window.innerWidth / 2.5);
        camera.bottom = window.innerHeight / (window.innerWidth / -2.5);
        renderer.setSize( window.innerWidth / 1, window.innerHeight / 2);
    }
    else {
        camera.left = window.innerWidth / (window.innerWidth / -3);
        camera.right = window.innerWidth / (window.innerWidth / 3);
        camera.top = window.innerHeight / (window.innerWidth / 1.5);
        camera.bottom = window.innerHeight / (window.innerWidth / -1.5);
        renderer.setSize( window.innerWidth / 1, window.innerHeight / 2);
    }
}

// Canvas Init

document.querySelector("#threeJsObject").appendChild( renderer.domElement );

// Light Init

const highlight = new THREE.HemisphereLight(0xffffff, 0x000000, 4);
scene.add(highlight);

//

const directionalLight1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight1.position.set(-1,-0.2,2);
scene.add( directionalLight1 );

//

const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.8 );
directionalLight2.position.set(0.8,-0.2,2);
scene.add( directionalLight2 );

//

const directionalLight3 = new THREE.DirectionalLight( 0xffffff, 4 );
directionalLight3.position.set(0,2,0);
scene.add( directionalLight3 );

//

const directionalLight4 = new THREE.DirectionalLight( 0xffffff, 4 );
directionalLight4.position.set(3,1,0)
scene.add( directionalLight4 );

// Shadow



// Scene Popullation

scene.background = new THREE.Color(0xffffff);

// Camera Positioning

camera.position.set(1.2,1,5);
camera.rotation.set(-0.2,0.2,0.05);


// Asset CodeBlock


let loader = new THREE.GLTFLoader();
loader.load('js/three.js/codeBlock.gltf', function(gltf) {
    const obj = gltf.scene
    scene.add(obj);
    
    let reverseBob = false;
    function bob() {
        //  Reverse Bobbing effect value statements
        if (obj.position.y >= 0.15) {
            reverseBob = true;
        }
        if (obj.position.y <= 0) {
            reverseBob = false;
        }

        // If reverse bobbing is false (the object is travelling upwards)
        if (reverseBob === false) {
            obj.position.y += 0.0015;
        }

        // If reverse bobbing is true (the object is travelling downwards)
        else if (reverseBob === true) {
            obj.position.y -= 0.0015;
        }
        
        requestAnimationFrame(bob);
        renderer.render(scene, camera);
    }
    bob();
});


// Shadow Plane
const loader2 = new THREE.TextureLoader();

const planeGeo = new THREE.PlaneGeometry(5,5,1)
const planeMaterial = new THREE.MeshBasicMaterial({map: loader2.load('js/three.js/codeblock-shadow.png'), side: THREE.DoubleSide, transparent: true});
const plane = new THREE.Mesh(planeGeo, planeMaterial);
    
scene.add(plane);

plane.scale.x = .9
plane.rotation.x = 1.6;
plane.position.y = -1.8;

function shadowFade() {
    if (scene.children.length == 7) {
        
        let codeBlockPosition = scene.children[6].position.y;
        let shadowOpacity = plane.material.opacity = 0.75

        plane.material.opacity = shadowOpacity - (codeBlockPosition * 3);
    }

    else {
        plane.material.opacity = 0;
    }

    requestAnimationFrame(shadowFade);
    renderer.render(scene, camera);
}
shadowFade();

// Animate

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    windowResize();
}

animate();
