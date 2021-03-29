import * as THREE from '../imports/three.js/build/three.module.js';

let scene, camera, renderer;
let mesh;

init();
mainLoop();

function init() {
    //First create scene;
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xababab);

    //Then create and position camera
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 5;

    //Creating a mesh and adding to scene
    let geometry = new THREE.BoxGeometry(1,1,1);
    let material = new THREE.MeshBasicMaterial({color: 0x00a1cb})
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //Add axes helper
    let axes = new THREE.AxesHelper(5);
    scene.add(axes);

    //Finally create the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Attach renderer to body
    document.body.appendChild(renderer.domElement);
    
}

function mainLoop() {
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}