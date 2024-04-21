//IMPORT THREE js
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

//IMPORT ORBITAL TO ROTATE THE OBJECTS
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

//TO READ THE WIDTH AND HEIGHT OF our screen
const size={
    width:window.innerWidth,
    height:window.innerHeight
}

//create a instance of scene
const scene = new THREE.Scene();

//CREATA A GEOMETRY 1
const geometry = new THREE.SphereGeometry(3, 64, 64);

//creat a geometry 2
const geometry2 = new THREE.SphereGeometry(1, 32, 32);

//Create a Lambert material (for shadows)
//const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

//Earth--------------
//type of material used to build our object
const material= new THREE.MeshPhysicalMaterial();

//add texture of any thing for the mesh
material.map = new THREE.TextureLoader().load('earth.jpg');

//for moon-----------------
//type of material used to build our object
const material2= new THREE.MeshPhongMaterial();

//add texture of any thing for the mesh
material2.map = new THREE.TextureLoader().load('moon.jpg');

//add sphere for Earth----------------------
//integrate geometry and material to create a object-- here it is sphere
const sphere = new THREE.Mesh(geometry, material);
//add spher to scene
scene.add( sphere );

//add sphere for moon----------------------
//integrate geometry and material to create a object-- here it is sphere
const sphere2 = new THREE.Mesh(geometry2, material2);
sphere2.position.x=-10;
//add spher to scene
scene.add( sphere2 );

  //Create directional light for casting shadows
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 20, 10);
directionalLight.castShadow = true; // Enable shadow casting
scene.add(directionalLight);

// Add ambient light to illuminate the scene
// scene.add(new THREE.AmbientLight(0x404040));

//ADD CAMERA
// Create a camera fro earth
const camera = new THREE.PerspectiveCamera(80, size.width / size.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

// Create a camera fro moon
const camera2 = new THREE.PerspectiveCamera(80, size.width / size.height, 0.1, 100);
camera2.position.z = 10;
scene.add(camera2);


//render in canva
const canvas= document.querySelector('.webgl');
const renderer= new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width,size.height);
renderer.setPixelRatio(2);
renderer.render(scene,camera);

//orbital control to animate or rotate the spheres
const controls= new OrbitControls(camera,canvas);
controls.enableDamping=true;
controls.enablePan=false;
controls.enableZoom=false;
controls.autoRotate=true;
controls.autoRotateSpeed=2;

//on window resize adjust shapes as required
window.addEventListener("resize",()=>
{
    size.width=window.innerWidth;
    size.height=window.innerHeight;
    console.log(size.height,":",size.width)
    
    camera.aspect=size.width/size.height;
    // Update camera's projection matrix with new aspect ratio
    camera.updateProjectionMatrix(); 

    renderer.setSize(size.width, size.height);
    renderer.render(scene, camera);
});

//loop to rotate the sphere2
const loop=()=>{
    controls.update();
    sphere2.rotation.y +=0.02;
    renderer.render(scene,camera);
    window.requestAnimationFrame(loop);
}
loop();