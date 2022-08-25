/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
import * as THREE from 'three';

const LaserBeam = (width, height, canvas) => {
  const object3d = new THREE.Object3D();
  // generate the texture
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  // do the material
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    blending: THREE.AdditiveBlending,
    color: 0x4444aa,
    side: THREE.DoubleSide,
    depthWrite: false,
    transparent: false,
  });
  const geometry = new THREE.PlaneGeometry(width, height);
  //   geometry.applyMatrix4(
  //     new THREE.Matrix4().makeRotationX(-Math.PI / 2)
  //   );
  //   geometry.applyMatrix4(
  //     new THREE.Matrix4().makeTranslation(0, -height / 2, 0)
  //   );
  const nPlanes = 4;
  for (let i = 0; i < nPlanes; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.translateX(width / 2);
    mesh.rotation.x = (i / nPlanes) * Math.PI;
    mesh.rotateX(-Math.PI / 2);
    object3d.add(mesh);
  }
  return object3d;
};

const getLaserMeshes = (width, material) => {
  const geometry = new THREE.PlaneGeometry(width, 0.01);
  const nPlanes = 4;
  const meshes = [];
  for (let i = 0; i < nPlanes; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.translateX(width / 2);
    mesh.rotation.x = (i / nPlanes) * Math.PI;
    mesh.rotateX(-Math.PI / 2);
    meshes.push(mesh);
  }
  return meshes;
};

function generateLaserBodyCanvas() {
  // init canvas
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 1;
  canvas.height = 1;
  // set gradient
  const gradient = context.createLinearGradient(
    0,
    0,
    canvas.width,
    canvas.height,
  );
  gradient.addColorStop(0, 'rgba(  0,  0,  0,0.1)');
  gradient.addColorStop(0.4, 'rgba(160,160,160,0.3)');
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
  gradient.addColorStop(0.6, 'rgba(160,160,160,0.3)');
  gradient.addColorStop(1.0, 'rgba(  0,  0,  0,0.1)');
  // fill the rectangle
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  // return the just built canvas
  return canvas;
}

export { LaserBeam, generateLaserBodyCanvas, getLaserMeshes };
