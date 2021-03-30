import * as THREE from '../imports/three.js/build/three.module.js';

let scene, camera, renderer;
let saturn;
let rings = [];

init();
mainLoop();

function createSaturn() {
    let geometry = new THREE.SphereGeometry(2, 32, 32);
    let material = new THREE.MeshBasicMaterial({color: 0xdec78a});
    saturn = new THREE.Mesh(geometry, material);

    scene.add(saturn);
}

function createRings(n) {
    for(let i = 0; i < n; i++) {
        let geometry = new THREE.TorusGeometry(2.1 * (i+1), 0.9, 2, 100);

        var color = 0xa69a7b;
        if((i+1)%2 == 0) {
            color = 0x47443d;
        }


        let material =  new THREE.MeshBasicMaterial({color: color});
        let ring = new THREE.Mesh(geometry, material);

        ring.rotation.x = 2;
        ring.rotation.y = 0.3;

        scene.add(ring);
        rings.push(ring);
    }
}

function init() {
    //First create scene;
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xababab);

    //Then create and position camera
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 25;

    //Finally create the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth - 30, window.innerHeight - 30);

    //Attach renderer to body
    document.body.appendChild(renderer.domElement);

    createSaturn();
    createRings(3);
}

function mainLoop() {

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}