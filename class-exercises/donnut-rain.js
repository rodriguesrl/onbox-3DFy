import * as THREE from '../imports/three.js/build/three.module.js';

let scene, camera, renderer;
let donnuts = [];

init();
mainLoop();

function positionDonnut(d) {
    d.position.y = 15;
    d.position.x = randomInRange(-15, 15);
    d.position.z = randomInRange(-15, 15);
}

function donnutRain() {
    let geometry = new THREE.TorusGeometry(1, 0.5, 5, 30);
    let material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
    let d = new THREE.Mesh(geometry, material);

    d.position.y = 20;
    d.position.x = randomInRange(-20, 20);
    d.position.z = randomInRange(-20, 20);

    scene.add(d);
    donnuts.push(d);
}

function rainAnimation() {
    donnuts.forEach(d => {
        d.position.y -= 0.1;
        if (d.position.y <= -25) {
            d.position.y = 20;
            d.position.x = randomInRange(-20, 20);
            d.position.z = randomInRange(-20, 20);
        }
    })
}

function randomInRange(from, to) {
    let x = Math.random() * (to - from);
    return x + from;
}

function init() {
    //First create scene;
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xababab);

    //Then create and position camera
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 50;

    //Finally create the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth - 30, window.innerHeight - 30);

    //Attach renderer to body
    document.body.appendChild(renderer.domElement);

}

function mainLoop() {
    if (Math.random() < 0.2 && donnuts.length < 200) {
        donnutRain();
    }


    rainAnimation();

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}