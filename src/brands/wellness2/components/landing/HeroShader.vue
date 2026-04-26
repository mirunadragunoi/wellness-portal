<template>
  <canvas ref="canvasEl" class="hero-shader" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasEl = ref(null)
let gl, prog, rafId
let mouse = [0.5, 0.5]

const vert = `attribute vec2 p; void main(){ gl_Position = vec4(p,0,1); }`

const frag = `
precision highp float;
uniform vec2 R; uniform float T; uniform vec2 M;
float h(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5); }
float n(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.,a=.5;
  for(int i=0;i<6;i++){ v+=a*n(p); p=p*2.1+vec2(1.3,1.7); a*=.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy/R;
  vec2 st = uv*2.-1.; st.x *= R.x/R.y;
  vec2 m  = M*2.-1.;  m.x  *= R.x/R.y;
  float d = length(st-m);
  float mw = exp(-d*1.6)*0.3;
  vec2 w = vec2(fbm(st*1.2+vec2(T*.07)+m*mw), fbm(st*1.2+vec2(0,T*.07)+m*mw));
  float v = fbm(st*1.5+w*1.8+T*.055)*.5
          + fbm(st*.8+w*1.2-T*.04+vec2(5.2,1.3))*.3
          + fbm(st*2.5+w*.9+T*.05+vec2(-3.1,4.7))*.2;
  vec3 c0=vec3(.007,.024,.01), c1=vec3(.027,.078,.04), c2=vec3(.09,.24,.12),
       c3=vec3(.067,.729,.506), c4=vec3(.722,.961,.4), c5=vec3(.86,.99,.65);
  vec3 col;
  if(v<.25)      col=mix(c0,c1,v/.25);
  else if(v<.45) col=mix(c1,c2,(v-.25)/.2);
  else if(v<.62) col=mix(c2,c3,(v-.45)/.17);
  else if(v<.76) col=mix(c3,c4,(v-.62)/.14);
  else           col=mix(c4,c5,(v-.76)/.24);
  col += vec3(.08,.3,.12)*exp(-d*2.8)*.4;
  col *= 1.-dot(uv-.5,uv-.5)*1.5;
  col += (h(uv*R+T*100.)-.5)*.012;
  gl_FragColor = vec4(col,1.);
}
`

function sh(type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return s
}

function resize() {
  const c = canvasEl.value
  const dpr = Math.min(devicePixelRatio || 1, 2)
  c.width  = c.offsetWidth  * dpr
  c.height = c.offsetHeight * dpr
  gl.viewport(0, 0, c.width, c.height)
}

function onMouseMove(e) {
  mouse = [e.clientX / innerWidth, 1 - e.clientY / innerHeight]
}

onMounted(() => {
  const c = canvasEl.value
  gl = c.getContext('webgl')
  if (!gl) return

  prog = gl.createProgram()
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, vert))
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, frag))
  gl.linkProgram(prog)
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'p')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

  const uR = gl.getUniformLocation(prog, 'R')
  const uT = gl.getUniformLocation(prog, 'T')
  const uM = gl.getUniformLocation(prog, 'M')

  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouseMove)
  resize()

  const t0 = performance.now()
  const frame = (now) => {
    const t = (now - t0) / 1000
    gl.uniform2f(uR, c.width, c.height)
    gl.uniform1f(uT, t)
    gl.uniform2f(uM, mouse[0], mouse[1])
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    rafId = requestAnimationFrame(frame)
  }
  rafId = requestAnimationFrame(frame)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<style scoped>
.hero-shader {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}
</style>
