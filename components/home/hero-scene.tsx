import { useEffect, useRef } from "react"
import * as THREE from "three"

// Escena del hero: una cadena de bloques (wireframe) enlazados, con nodos satélite
// y paquetes de datos que viajan entre bloques. Reacciona al cursor (inclinación +
// bloque bajo el puntero) y al scroll (la cadena se abre y gira).
// Rendimiento: se pausa fuera de pantalla o con la pestaña oculta, DPR limitado,
// menos geometría en celular y un solo cuadro estático con prefers-reduced-motion.

const COLORS = {
  edge: new THREE.Color("#4f7cff"),
  hot: new THREE.Color("#5ef2c6"),
  face: 0x090c15,
  link: 0x3d63e0,
  satLink: 0x2a3c7a,
  dust: 0x8fa6ff,
  fog: 0x05060a,
}

// Pseudoaleatorio determinista: la composición es siempre la misma.
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function dotTexture() {
  const c = document.createElement("canvas")
  c.width = c.height = 64
  const ctx = c.getContext("2d")!
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, "rgba(255,255,255,1)")
  g.addColorStop(0.25, "rgba(255,255,255,0.85)")
  g.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

type Block = {
  group: THREE.Group
  face: THREE.Mesh
  edgeMat: THREE.LineBasicMaterial
  coreMat: THREE.MeshBasicMaterial
  base: THREE.Vector3
  pos: THREE.Vector3
  size: number
  phase: number
  spin: THREE.Vector3
  heat: number
}

export default function HeroScene({ onReady }: { onReady?: () => void }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const hudBlockRef = useRef<HTMLSpanElement>(null)
  const hudCoordsRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const mobile = window.matchMedia("(max-width: 767px)").matches

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" })
    } catch {
      return // Sin WebGL: queda visible el respaldo estático del hero.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2))
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.setAttribute("aria-hidden", "true")
    renderer.domElement.style.display = "block"
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(COLORS.fog, 10, 24)
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
    camera.position.set(0, 0, 15)

    const root = new THREE.Group()
    scene.add(root)

    const disposables: { dispose: () => void }[] = []
    const track = <T extends { dispose: () => void }>(d: T) => {
      disposables.push(d)
      return d
    }
    const dot = track(dotTexture())

    // ---------- Bloques sobre una curva ----------
    const COUNT = mobile ? 7 : 10
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5.6, -2.3, -1.2),
      new THREE.Vector3(-2.7, -0.5, 1.3),
      new THREE.Vector3(0, 0.5, -0.8),
      new THREE.Vector3(2.7, 1.7, 1.0),
      new THREE.Vector3(5.4, 2.6, -1.0),
    ])
    const center = new THREE.Vector3()
    const boxGeo = track(new THREE.BoxGeometry(1, 1, 1))
    const edgeGeo = track(new THREE.EdgesGeometry(boxGeo))
    const coreGeo = track(new THREE.BoxGeometry(0.3, 0.3, 0.3))
    const faceMat = track(new THREE.MeshStandardMaterial({ color: COLORS.face, metalness: 0.55, roughness: 0.35 }))
    const glowMat = track(
      new THREE.LineBasicMaterial({ color: COLORS.edge, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending }),
    )

    // Luces: volumen en las caras, un contraluz verde agua y una luz que sigue al cursor.
    scene.add(new THREE.AmbientLight(0x6f86ff, 0.5))
    const key = new THREE.DirectionalLight(0x4f7cff, 2.4)
    key.position.set(5, 6, 8)
    const rim = new THREE.DirectionalLight(0x5ef2c6, 1.1)
    rim.position.set(-6, -3, 4)
    const cursorLight = new THREE.PointLight(0x8fb0ff, 60, 9, 1.6)
    cursorLight.position.set(0, 0, 4)
    scene.add(key, rim, cursorLight)

    const blocks: Block[] = []
    for (let i = 0; i < COUNT; i++) {
      const base = curve.getPointAt(i / (COUNT - 1))
      center.add(base)
      const size = 0.7 + rand(i) * 0.6
      const group = new THREE.Group()
      const face = new THREE.Mesh(boxGeo, faceMat)
      face.userData.index = i
      const edgeMat = track(new THREE.LineBasicMaterial({ color: COLORS.edge.clone(), transparent: true, opacity: 0.95 }))
      const edges = new THREE.LineSegments(edgeGeo, edgeMat)
      const glow = new THREE.LineSegments(edgeGeo, glowMat)
      glow.scale.setScalar(1.035)
      const coreMat = track(new THREE.MeshBasicMaterial({ color: COLORS.hot, transparent: true, opacity: 0.18 }))
      const core = new THREE.Mesh(coreGeo, coreMat)
      group.add(face, edges, glow, core)
      group.scale.setScalar(size)
      group.rotation.set(rand(i + 10) * Math.PI, rand(i + 20) * Math.PI, rand(i + 30) * Math.PI)
      group.position.copy(base)
      root.add(group)
      blocks.push({
        group,
        face,
        edgeMat,
        coreMat,
        base,
        pos: base.clone(),
        size,
        phase: rand(i + 40) * Math.PI * 2,
        spin: new THREE.Vector3(rand(i + 50) - 0.5, rand(i + 60) - 0.5, 0).multiplyScalar(0.25),
        heat: 0,
      })
    }
    center.divideScalar(COUNT)

    // ---------- Enlaces de la cadena ----------
    const chainPositions = new Float32Array((COUNT - 1) * 6)
    const chainGeo = track(new THREE.BufferGeometry())
    chainGeo.setAttribute("position", new THREE.BufferAttribute(chainPositions, 3))
    const chainMat = track(new THREE.LineBasicMaterial({ color: COLORS.link, transparent: true, opacity: 0.75 }))
    root.add(new THREE.LineSegments(chainGeo, chainMat))

    // ---------- Nodos satélite y sus enlaces ----------
    const SAT = mobile ? 26 : 46
    const satOwner: number[] = []
    const satOffset: THREE.Vector3[] = []
    for (let i = 0; i < SAT; i++) {
      satOwner.push(Math.floor(rand(i + 100) * COUNT))
      const dir = new THREE.Vector3(rand(i + 200) - 0.5, rand(i + 300) - 0.5, rand(i + 400) - 0.5).normalize()
      satOffset.push(dir.multiplyScalar(1.3 + rand(i + 500) * 1.6))
    }
    const satPositions = new Float32Array(SAT * 3)
    const satGeo = track(new THREE.BufferGeometry())
    satGeo.setAttribute("position", new THREE.BufferAttribute(satPositions, 3))
    const satMat = track(
      new THREE.PointsMaterial({ color: COLORS.dust, size: 0.12, map: dot, transparent: true, opacity: 0.9, depthWrite: false }),
    )
    root.add(new THREE.Points(satGeo, satMat))

    const satLinkPositions = new Float32Array(SAT * 6)
    const satLinkGeo = track(new THREE.BufferGeometry())
    satLinkGeo.setAttribute("position", new THREE.BufferAttribute(satLinkPositions, 3))
    const satLinkMat = track(new THREE.LineBasicMaterial({ color: COLORS.satLink, transparent: true, opacity: 0.45 }))
    root.add(new THREE.LineSegments(satLinkGeo, satLinkMat))

    // ---------- Paquetes de datos ----------
    const LINKS = COUNT - 1
    const PACKETS = mobile ? 4 : 7
    const packets = Array.from({ length: PACKETS }, (_, i) => ({
      link: Math.floor((i / PACKETS) * LINKS),
      t: rand(i + 600),
      speed: 0.35 + rand(i + 700) * 0.35,
    }))
    const packetPositions = new Float32Array(PACKETS * 3)
    const packetGeo = track(new THREE.BufferGeometry())
    packetGeo.setAttribute("position", new THREE.BufferAttribute(packetPositions, 3))
    const packetMat = track(
      new THREE.PointsMaterial({
        color: COLORS.hot,
        size: mobile ? 0.6 : 0.75,
        map: dot,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    )
    root.add(new THREE.Points(packetGeo, packetMat))

    // ---------- Polvo de fondo ----------
    const DUST = mobile ? 120 : 260
    const dustPositions = new Float32Array(DUST * 3)
    for (let i = 0; i < DUST; i++) {
      dustPositions[i * 3] = (rand(i + 800) - 0.5) * 22
      dustPositions[i * 3 + 1] = (rand(i + 900) - 0.5) * 12
      dustPositions[i * 3 + 2] = (rand(i + 1000) - 0.5) * 12 - 2
    }
    const dustGeo = track(new THREE.BufferGeometry())
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3))
    const dustMat = track(
      new THREE.PointsMaterial({ color: COLORS.dust, size: 0.05, map: dot, transparent: true, opacity: 0.45, depthWrite: false }),
    )
    const dust = new THREE.Points(dustGeo, dustMat)
    scene.add(dust)

    // ---------- Interacción ----------
    const pointer = { x: 0, y: 0, ndc: new THREE.Vector2(9, 9), moved: false }
    const tilt = { x: 0, y: 0 }
    const raycaster = new THREE.Raycaster()
    const faces = blocks.map((b) => b.face)
    let hovered = -1
    let scroll = 0
    let spread = 0

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
      const r = host.getBoundingClientRect()
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
      pointer.ndc.set(
        inside ? ((e.clientX - r.left) / r.width) * 2 - 1 : 9,
        inside ? -((e.clientY - r.top) / r.height) * 2 + 1 : 9,
      )
      pointer.moved = true
    }
    const onScroll = () => {
      scroll = Math.min(1, Math.max(0, window.scrollY / Math.max(1, host.offsetHeight)))
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    // ---------- Tamaño ----------
    const resize = () => {
      const w = host.clientWidth
      const h = host.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      renderer.domElement.style.width = w + "px"
      renderer.domElement.style.height = h + "px"
      camera.aspect = w / h
      // Que la cadena (~12 unidades de ancho) entre siempre en cuadro.
      camera.position.z = Math.min(26, Math.max(15, 18.5 / camera.aspect))
      const fog = scene.fog as THREE.Fog
      fog.near = camera.position.z - 5
      fog.far = camera.position.z + 9
      camera.updateProjectionMatrix()
      if (reduced) renderer.render(scene, camera)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(host)
    resize()

    // ---------- Actualización por cuadro ----------
    let time = 0
    let hudTimer = 0
    const tmp = new THREE.Vector3()

    const update = (dt: number) => {
      time += dt

      tilt.x += (-pointer.y * 0.22 - tilt.x) * Math.min(1, dt * 3)
      tilt.y += (pointer.x * 0.38 - tilt.y) * Math.min(1, dt * 3)
      spread += (scroll - spread) * Math.min(1, dt * 4)
      root.rotation.set(tilt.x, tilt.y + Math.sin(time * 0.15) * 0.22, -spread * 0.35)
      dust.rotation.y = time * 0.01 + tilt.y * 0.3
      dust.rotation.x = tilt.x * 0.3

      // La luz del cursor se mueve sobre un plano delante de la cadena.
      const lx = pointer.ndc.x === 9 ? pointer.x : pointer.ndc.x
      const ly = pointer.ndc.y === 9 ? -pointer.y : pointer.ndc.y
      cursorLight.position.x += (lx * 7 - cursorLight.position.x) * Math.min(1, dt * 5)
      cursorLight.position.y += (ly * 4 - cursorLight.position.y) * Math.min(1, dt * 5)

      if (pointer.moved || time < 0.1) {
        raycaster.setFromCamera(pointer.ndc, camera)
        const hit = raycaster.intersectObjects(faces, false)[0]
        hovered = hit ? (hit.object.userData.index as number) : -1
        pointer.moved = false
      }

      // Bloques: flotan, giran, se calientan si llega un paquete o pasa el cursor.
      blocks.forEach((b, i) => {
        tmp.copy(b.base).sub(center).multiplyScalar(spread * 0.55)
        b.pos.copy(b.base).add(tmp)
        b.pos.y += Math.sin(time * 0.8 + b.phase) * 0.14
        b.group.position.copy(b.pos)
        b.group.rotation.x += b.spin.x * dt
        b.group.rotation.y += b.spin.y * dt
        const target = i === hovered ? 1 : 0
        b.heat = Math.max(target, b.heat - dt * 0.9)
        const s = b.size * (1 + b.heat * 0.14)
        b.group.scale.setScalar(s)
        b.edgeMat.color.copy(COLORS.edge).lerp(COLORS.hot, b.heat)
        b.coreMat.opacity = 0.18 + b.heat * 0.8
      })

      for (let i = 0; i < LINKS; i++) {
        const a = blocks[i].pos
        const b = blocks[i + 1].pos
        chainPositions.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6)
      }
      chainGeo.attributes.position.needsUpdate = true

      for (let i = 0; i < SAT; i++) {
        const owner = blocks[satOwner[i]].pos
        const off = satOffset[i]
        const wobble = Math.sin(time * 0.6 + i) * 0.08
        const x = owner.x + off.x * (1 + spread * 0.4)
        const y = owner.y + off.y * (1 + spread * 0.4) + wobble
        const z = owner.z + off.z * (1 + spread * 0.4)
        satPositions.set([x, y, z], i * 3)
        satLinkPositions.set([owner.x, owner.y, owner.z, x, y, z], i * 6)
      }
      satGeo.attributes.position.needsUpdate = true
      satLinkGeo.attributes.position.needsUpdate = true

      packets.forEach((p, i) => {
        p.t += dt * p.speed
        if (p.t >= 1) {
          p.t -= 1
          p.link = (p.link + 1) % LINKS
          const arrived = blocks[p.link]
          arrived.heat = Math.max(arrived.heat, 0.55)
        }
        const a = blocks[p.link].pos
        const b = blocks[p.link + 1].pos
        tmp.copy(a).lerp(b, p.t)
        packetPositions.set([tmp.x, tmp.y, tmp.z], i * 3)
      })
      packetGeo.attributes.position.needsUpdate = true

      hudTimer += dt
      if (hudTimer > 0.1) {
        hudTimer = 0
        if (hudBlockRef.current) {
          hudBlockRef.current.textContent =
            hovered >= 0 ? `BLOQUE ${String(hovered + 1).padStart(2, "0")} · ENLAZADO` : `${COUNT} BLOQUES · EN LÍNEA`
        }
        if (hudCoordsRef.current) {
          hudCoordsRef.current.textContent = `X ${pointer.x.toFixed(2)}  Y ${(-pointer.y).toFixed(2)}`
        }
      }
    }

    // ---------- Ciclo de render ----------
    let raf = 0
    let running = false
    let visible = true
    let last = 0
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      update(dt)
      renderer.render(scene, camera)
      raf = requestAnimationFrame(frame)
    }
    const start = () => {
      if (running || reduced || !visible || document.hidden) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(host)
    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener("visibilitychange", onVisibility)

    // Primer cuadro sincrónico para poder mostrar el canvas sin parpadeo.
    update(0.016)
    renderer.render(scene, camera)
    onReady?.()
    start()

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("scroll", onScroll)
      disposables.forEach((d) => d.dispose())
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [onReady])

  return (
    <div className="relative h-full w-full">
      <div ref={hostRef} className="absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-28 hidden flex-col items-end gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 md:flex lg:right-10"
      >
        <span ref={hudBlockRef}>Cadena · en línea</span>
        <span ref={hudCoordsRef}>X 0.00 Y 0.00</span>
      </div>
    </div>
  )
}
