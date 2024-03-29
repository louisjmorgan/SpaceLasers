/* eslint-disable no-var */

import * as THREE from 'three';

/**
 * from http://stemkoski.blogspot.fr/2013/07/shaders-in-threejs-glow-and-halo.html
 * @return {[type]} [description]
 */
const VolumetricSpotLightMaterial = () => {
  //
  const vertexShader	= [
    'varying vec3 vNormal;',
    'varying vec3 vWorldPosition;',

    'void main(){',
    '// compute intensity',
    'vNormal		= normalize( normalMatrix * normal );',

    'vec4 worldPosition	= modelMatrix * vec4( position, 1.0 );',
    'vWorldPosition		= worldPosition.xyz;',

    '// set gl_Position',
    'gl_Position	= projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
    '}',
  ].join('\n');
  const fragmentShader	= [
    'varying vec3		vNormal;',
    'varying vec3		vWorldPosition;',

    'uniform vec3		lightColor;',

    'uniform vec3		spotPosition;',

    'uniform float		attenuation;',
    'uniform float		anglePower;',

    'void main(){',
    'float intensity;',

    /// ///////////////////////////////////////////////////////
    // distance attenuation					//
    /// ///////////////////////////////////////////////////////
    'intensity	= distance(vWorldPosition, spotPosition)/attenuation;',
    'intensity	= 1.0 - clamp(intensity, 0.0, 1.0);',

    /// ///////////////////////////////////////////////////////
    // intensity on angle					//
    /// ///////////////////////////////////////////////////////
    'vec3 normal	= vec3(vNormal.x, vNormal.y, abs(vNormal.z));',
    'float angleIntensity	= pow( dot(normal, vec3(0.0, 0.0, 1.0)), anglePower );',
    'intensity	= intensity * angleIntensity;',
    // 'gl_FragColor	= vec4( lightColor, intensity );',

    /// ///////////////////////////////////////////////////////
    // final color						//
    /// ///////////////////////////////////////////////////////

    // set the final color
    'gl_FragColor	= vec4( lightColor, intensity);',
    '}',
  ].join('\n');

  // create custom material from the shader code above
  //   that is within specially labeled script tags
  const material	= new THREE.ShaderMaterial({
    uniforms: {
      attenuation: {
        type: 'f',
        value: 5.0,
      },
      anglePower: {
        type: 'f',
        value: 1.2,
      },
      spotPosition: {
        type: 'v3',
        value: new THREE.Vector3(0, 0, 0),
      },
      lightColor: {
        type: 'c',
        value: new THREE.Color('cyan'),
      },
    },
    vertexShader,
    fragmentShader,
    // side		: THREE.DoubleSide,
    // blending	: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });
  return material;
};

export default VolumetricSpotLightMaterial;
