import * as THREE from '../imports/three.js/build/three.module.js';
import * as siteplan from '../assets/SampleSiteplan.js';

let scene, camera, renderer;
let drawings = [];
let mockSiteplan = siteplan.getMockSiteplan();
console.log(mockSiteplan);
init();
mainLoop();

function normalizePoint(coord, zero, scale) {
    return { x: (coord.Lat - zero.Lat) * scale, y: (coord.Lng - zero.Lng) * scale }
}

function createBuildings() {
    let scale = 10000;
    let zero = mockSiteplan.Markups[0].LatLngs[0];

    mockSiteplan.Markups.forEach(markup => {
        if(markup.Type !== 3) {
            return;
        }
        let color = 0xa5abb5;
        if(markup.Category === 1) {
            color = 0xffffff
        }
        let shape = new THREE.Shape();
        markup.LatLngs.forEach(coord => {
            if(coord === markup.LatLngs[0]) {
                let point = normalizePoint(coord, zero, scale);
                shape.moveTo(point.x, point.y);
            } else {
                let point = normalizePoint(coord, zero, scale);
                shape.lineTo(point.x, point.y);
            }
        })
        let point = normalizePoint(markup.LatLngs[0], zero, scale);
        shape.lineTo(point.x, point.y);
        console.log(shape);

        let geometry = new THREE.ShapeGeometry(shape);
        let material = new THREE.MeshBasicMaterial({color: color});
        let drawing = new THREE.Mesh(geometry, material);

        scene.add(drawing);
        drawings.push(drawing);

    })
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

    createBuildings();
}

function mainLoop() {

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}