import * as THREE from 'three'
import './style.css'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import gsap from 'gsap'

const scene = new THREE.Scene()

const sphere = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
    color: '#00ff83',
    roughness: 0.4
})
const mesh = new THREE.Mesh(sphere, material)
scene.add(mesh)

const sphere2 = new THREE.SphereGeometry(3, 64, 64)
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 'red',
    roughness: 0.4
})
const sphere2Mesh = new THREE.Mesh(sphere2, sphereMaterial)
sphere2Mesh.attach
scene.add(sphere2Mesh)



//sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// lights
const light = new THREE.PointLight(0xffffff, 159, 100)
light.position.set(0, 10, 10)
scene.add(light)

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100)
camera.position.z = 20
scene.add(camera)

//Renderer
const canvas : HTMLElement = document.querySelector('.webgl')!
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Resize

window.addEventListener('resize', ()=>{
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    
    // update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 9


const loop = () =>{
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop()


const tl = gsap.timeline({defaults: {duration: 1}})
tl.fromTo(mesh.scale, {z: 0 , x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo('nav', {y:"-100%"}, {y: "0%"})
tl.fromTo(".title", { opacity: 0 }, {opacity: 1})

//
let mouseDown = false
let rgb = []
window.addEventListener("mousedown", ()=>{mouseDown = true})
window.addEventListener("mouseup", ()=>{mouseDown = false})

window.addEventListener('mousemove', (e)=>{
    if(mouseDown){
        rgb = [
            Math.round((e.pageX/sizes.width)*255),
            Math.round((e.pageX/sizes.height)*255),
            200
        ]

        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
        gsap.to(mesh.material.color, {r: newColor.r, g: newColor.g, b: newColor.b})
    }    
})