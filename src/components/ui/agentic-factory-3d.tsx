'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { PALETTE, PALETTE_HEX } from '@/lib/palette'
import { MACHINE_STATIONS, type MachineStationConfig } from '@/lib/machine-stations'

/**
 * Graphipacks Factory — Interactive 3D Machine
 *
 * An interactive flexible packaging plant tour across 6 stations:
 * Flexo Printing, Rotogravure, Lamination, Inspection, Packing, and Finished Inventory.
 * Four modes (Assembled, Cutaway, Stations, One order), five cameras, hover and
 * click stations. Procedural three.js: no models, no images.
 *
 * Built by OpenAI Codex (GPT-6 Astra) from a single prompt; ported to React by Claude.
 * Live demo: https://agentic-factory-3d.vercel.app · Next.js template: https://github.com/eugeneshilow/agentic-3d-templates
 * Made with AI agents · 
 *
 * Fills its box: give it a height (default 100vh). Dependencies: react, three.
 * The embed prop hides the panels for a landing-page hero: on a frame wider than 900 px
 * the machine moves to the right 58 % and leaves the left side for your headline.
 * Control it with window.__machine: setMode, setCamera, focusStation, play, pause.
 *
 * Type arguments are written `Foo< Bar>` with a space after `<` on purpose: the
 * 21st.dev publish scanner reads `<Bar` as a JSX tag. Prettier tidies it back.
 */

export type AgenticFactory3DProps = {
  /** Height of the scene box, e.g. 720 or '100vh'. Default '100vh'. */
  height?: number | string
  className?: string
  /** Clean hero mode: no panels, the machine on the right of a wide frame. */
  embed?: boolean
  /** Active station hotspot ID ('extrusion' | 'rotogravure' | 'packing' | 'inspection' | null for Overview). */
  activeStationId?: string | null
  /** Callback when a user clicks a 3D hotspot pin or resets station. */
  onSelectStation?: (id: string | null) => void
  /** A station was clicked: legacy callback. */
  onStation?: (id: StationId) => void
  /** Called if WebGL is unsupported, fails to initialize, or loses context. */
  onFallback?: () => void
  /** The first real frame is drawn. */
  onReady?: () => void
}

export function isWebGLSupported(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    )
  } catch {
    return false
  }
}

export default function AgenticFactory3D({
  height = '100vh',
  className,
  embed = false,
  activeStationId = null,
  onSelectStation,
  onStation,
  onFallback,
  onReady,
}: AgenticFactory3DProps) {
  const rootRef = useRef< HTMLDivElement>(null)
  const hotspotRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [sceneReady, setSceneReady] = useState(false)
  const handlers = useRef({ onStation, onSelectStation, onFallback, onReady })
  useEffect(() => {
    handlers.current = { onStation, onSelectStation, onFallback, onReady }
  }, [onStation, onSelectStation, onFallback, onReady])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (!isWebGLSupported()) {
      handlers.current.onFallback?.()
      handlers.current.onReady?.()
      return
    }
    let dispose: (() => void) | undefined
    let cancelled = false
    // The in-scene screens are painted on canvases: wait for fonts first.
    document.fonts.ready.then(() => {
      if (cancelled) return
      dispose = initMachineScene(root, getComputedStyle(root).fontFamily, {
        embedded: embed,
        hotspotRefs,
        onStation: (id) => handlers.current.onStation?.(id),
        onSelectStation: (id) => handlers.current.onSelectStation?.(id),
        onFallback: () => handlers.current.onFallback?.(),
        onReady: () => {
          setSceneReady(true)
          handlers.current.onReady?.()
        },
      })
    })
    return () => {
      cancelled = true
      dispose?.()
    }
  }, [embed])

  // Sync activeStationId prop -> smooth 3D camera orbit (or Overview reset)
  useEffect(() => {
    if (!sceneReady) return
    window.__machine?.focusHotspot?.(activeStationId ?? null)
  }, [activeStationId, sceneReady])

  return (
    <div
      ref={rootRef}
      className={['agentic-factory-3d', embed && 'embed', className].filter(Boolean).join(' ')}
      style={{ height }}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div
        id="scene"
        role="img"
        aria-label="Interactive 3D machine with six stations: Flexo Printing, 8-Color Rotogravure Printing, Film Lamination, Automated Inspection Line, Packing & Conveying, and Printed Film Rolls & Stock. Drag to rotate, scroll or pinch to zoom. Hover or tap a station to take a closer look."
      />
      <div className="vignette" />
      <header className="topbar debug-ui">
        <div className="identity">
          <div className="mark">
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
              <path
                d="M3 5l7 11 7-11M7 5l3 5 3-5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <strong>Graphipacks Factory</strong>
            <small>Interactive Plant Tour</small>
          </div>
        </div>
        <div className="status" id="status">
          <i />
          <span id="status-text">Machine running</span>
          <span>MADURAI PLANT</span>
        </div>
      </header>
      <div className="scene-heading debug-ui">
        The line that makes your packaging <span className="index">6 STATIONS / 1 SYSTEM</span>
      </div>
      <div className="coordinates debug-ui">MADURAI PLANT — SINCE 1984</div>
      <div id="journey" className="debug-ui">
        <div className="journey-icon">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M3 4h10v9H3zM6 4V2h4v2m-5 4h6" stroke="currentColor" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <strong id="journey-title">Flexo Printing</strong>
          <small id="journey-detail">Station 01 · Base flexographic print</small>
        </div>
        <div className="track">
          <i id="journey-progress" />
        </div>
      </div>
      <div id="labels" />
      <div id="hotspots" aria-label="Interactive machine station hotspots">
        {MACHINE_STATIONS.map((station, idx) => {
          const isActive = activeStationId === station.id
          return (
            <button
              key={station.id}
              ref={(el) => {
                hotspotRefs.current[idx] = el
              }}
              type="button"
              data-hotspot-id={station.id}
              aria-label={`Inspect station ${station.numeral}: ${station.title}`}
              aria-pressed={isActive}
              onClick={(e) => {
                e.stopPropagation()
                handlers.current.onSelectStation?.(station.id)
              }}
              className={`hotspot-pin${isActive ? ' active' : ''}`}
            >
              <span className="hotspot-ring" aria-hidden="true" />
              <span className="hotspot-num">{station.numeral}</span>
              {isActive && <span className="hotspot-dot" aria-hidden="true" />}
            </button>
          )
        })}
      </div>
      <div className="controls debug-ui">
        <nav className="camera-row" aria-label="Camera">
          <span className="caption">VIEW</span>
          <button data-camera="overview" aria-pressed="true">
            Overview
          </button>
          <button data-camera="side" aria-pressed="false">
            Side
          </button>
          <button data-camera="top" aria-pressed="false">
            Top
          </button>
          <button data-camera="station" aria-pressed="false">
            Station
          </button>
          <button data-camera="flight" aria-pressed="false">
            Flight
          </button>
          <span className="divider" />
          <button id="play" aria-label="Pause the animation" aria-pressed="false">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <rect x="2" y="1" width="2.5" height="10" rx=".5" />
              <rect x="7.5" y="1" width="2.5" height="10" rx=".5" />
            </svg>
          </button>
        </nav>
      </div>
      <footer className="footer">
        <span className="hint debug-ui">
          <svg width="13" height="16" viewBox="0 0 13 16" fill="none">
            <rect x="2" y="1" width="9" height="14" rx="4.5" stroke="currentColor" />
            <path d="M6.5 4v3" stroke="currentColor" strokeLinecap="round" />
          </svg>
          Rotate. Zoom. Explore.
        </span>
      </footer>
      <div id="loading">
        <i />
        <span>Assembling the manufacturing line</span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// The scene: lib/machine-scene.ts of the template, inlined (21st.dev takes one file).
// ---------------------------------------------------------------------------

// The whole machine: plate, five stations, conveyor, cargo, camera, labels and
// the embed API. Ported line by line from the single-file original (index.html
// built by Codex): the same parts, the same numbers, the same timing. What
// changed: three.js comes from npm instead of a CDN, the copy (including the
// text painted on the in-scene screens) is English, DOM lookups are scoped to
// the component root, and initMachineScene() returns a dispose function for
// React unmounts. All geometry and textures are procedural: no models, no images.

export type MachineMode = 'assembled' | 'cutaway' | 'stations' | 'order'
export type MachineCamera = 'overview' | 'side' | 'top' | 'station' | 'flight'
export type StationId = 'flexo' | 'rotogravure' | 'lamination' | 'inspection' | 'packing' | 'stock'

export type MachineApi = {
  setMode: (name: string) => boolean
  focusStation: (id: string) => boolean
  focusHotspot: (id: string | null) => boolean
  setCamera: (name: string) => boolean
  play: () => boolean
  pause: () => boolean
}

declare global {
  interface Window {
    __machine?: MachineApi
    __machineDebug?: { getState: () => Record< string, unknown> }
  }
}

export type MachineSceneOptions = {
  /** Clean hero: panels hidden, wheel and touch scroll the page. */
  embedded: boolean
  hotspotRefs?: React.MutableRefObject<Array<HTMLButtonElement | null>>
  onStation?: (id: StationId) => void
  onSelectStation?: (id: string | null) => void
  onFallback?: () => void
  onReady?: () => void
}

function initMachineScene(
  root: HTMLElement,
  fontFamily: string,
  options: MachineSceneOptions
): () => void {
  const cleanups: Array<() => void> = []
  // The component sizes the scene to its own box; the template filled the window.
  const frameWidth = () => root.clientWidth
  const frameHeight = () => root.clientHeight
  // Every listener goes through here, so dispose() can take it off again.
  const listen = (target: EventTarget, type: string, handler: (event: never) => void) => {
    const fn = handler as unknown as EventListener
    target.addEventListener(type, fn)
    cleanups.push(() => target.removeEventListener(type, fn))
  }
  function $< T extends HTMLElement = HTMLElement>(id: string): T {
    const el = root.querySelector< T>(`#${id}`)
    if (!el) throw new Error(`Scene markup is missing #${id}`)
    return el
  }
  function triggerFallback() {
    $('loading').classList.add('done')
    options.onFallback?.()
    options.onReady?.()
  }
  const dispose = () => {
    for (const fn of cleanups.reverse()) fn()
    cleanups.length = 0
  }
  try {
    const TAU = Math.PI * 2
    const embedded = options.embedded
    const motionQuery = typeof window.matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null
    let reduceMotion = Boolean(motionQuery?.matches)
    const palette = {
      steel: PALETTE_HEX.steelBlue,
      powder: PALETTE_HEX.powderBlue,
      red: PALETTE_HEX.imperialRed,
      white: PALETTE_HEX.honeydew,
      dark: PALETTE_HEX.darkNavy,
      amber: PALETTE_HEX.steelBlue,
    }
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(33, Math.max(1, frameWidth()) / Math.max(1, frameHeight()), 0.1, 150)
    const isMobile = frameWidth() < 768 || matchMedia('(pointer:coarse)').matches
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch {
      triggerFallback()
      return dispose
    }
    renderer.setClearColor(PALETTE_HEX.darkNavy, 0)
    // Cap Canvas DPR strictly to [1, 1.5] to prevent 3x mobile GPU overload
    renderer.setPixelRatio(Math.min(Math.max(window.devicePixelRatio || 1, 1), 1.5))
    renderer.setSize(frameWidth(), frameHeight())
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.12
    renderer.shadowMap.enabled = !isMobile
    if (!isMobile) {
      renderer.shadowMap.type = THREE.PCFShadowMap
    }
    renderer.localClippingEnabled = true
    $('scene').appendChild(renderer.domElement)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.065
    controls.enablePan = false
    controls.minDistance = 4.5
    controls.maxDistance = 60
    controls.minPolarAngle = 0.09
    controls.maxPolarAngle = Math.PI * 0.475
    controls.rotateSpeed = 0.48
    controls.zoomSpeed = 0.7
    // Embedded in a landing page: wheel scrolls the page, while drag/touch rotates the scene cleanly.
    if (embedded) {
      controls.enableZoom = false
      controls.enableRotate = true
    }
    const pmrem = new THREE.PMREMGenerator(renderer),
      room = new RoomEnvironment()
    const env = pmrem.fromScene(room, 0.04)
    scene.environment = env.texture
    scene.environmentIntensity = 0.62
    room.dispose()
    pmrem.dispose()
    scene.add(new THREE.HemisphereLight(0xfff2df, 0x172D4A, 2))
    const key = new THREE.DirectionalLight(0xfff1d8, 4.2)
    key.position.set(-4, 12, 7)
    key.castShadow = !isMobile
    key.shadow.mapSize.set(1024, 1024)
    Object.assign(key.shadow.camera, {
      left: -10,
      right: 10,
      top: 9,
      bottom: -9,
      near: 0.5,
      far: 35,
    })
    key.shadow.normalBias = 0.035
    key.shadow.bias = -0.0002
    key.shadow.radius = 4
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xf5e8d8, 3.1)
    rim.position.set(3, 7, -8)
    scene.add(rim)
    const warm = new THREE.PointLight(0xffbd42, 28, 20, 2)
    warm.position.set(-4, 5, 3)
    scene.add(warm)
    const front = new THREE.DirectionalLight(0xffffff, 1)
    front.position.set(5, 3, 10)
    scene.add(front)

    const mat = (
      color: number,
      metalness = 0.1,
      roughness = 0.4,
      extra: THREE.MeshStandardMaterialParameters = {}
    ) => new THREE.MeshStandardMaterial({ color, metalness, roughness, ...extra })
    const M = {
      body: mat(0x30363f, 0.75, 0.29),
      base: mat(PALETTE_HEX.darkNavy, 0.85, 0.32),
      platformDeck: mat(0x152740, 0.8, 0.35),
      platformSteel: mat(PALETTE_HEX.steelBlue, 0.85, 0.25),
      platformDark: mat(0x0e1b2d, 0.6, 0.4),
      edge: mat(0x707986, 0.85, 0.24),
      chrome: mat(0xc3cad0, 0.92, 0.18),
      dark: mat(0x12171d, 0.45, 0.38),
      rubber: mat(0x0b1015, 0.1, 0.6),
      amber: mat(palette.amber, 0.52, 0.28),
      ivory: mat(PALETTE_HEX.honeydew, 0.48, 0.26),
      copper: mat(PALETTE_HEX.steelBlue, 0.85, 0.3),
      red: mat(PALETTE_HEX.imperialRed, 0.45, 0.32),
      black: mat(0x050909, 0, 0.6),
      light: mat(PALETTE_HEX.steelBlue, 0.2, 0.25, { emissive: PALETTE_HEX.steelBlue, emissiveIntensity: 1.5 }),
      whiteLight: mat(0xf1faee, 0.1, 0.3, { emissive: 0xf1faee, emissiveIntensity: 1.8 }),
      green: mat(0xa8dadc, 0.1, 0.3, { emissive: 0x457b9d, emissiveIntensity: 0.7 }),
      glass: mat(0x81949e, 0.45, 0.16, { transparent: true, opacity: 0.19, depthWrite: false }),
      paper: mat(PALETTE_HEX.honeydew, 0, 0.85),
    }
    type Vec3 = [number, number, number]
    type Material = THREE.Material
    const geometries = new Map< string, THREE.BufferGeometry>()
    function boxGeo(w: number, h: number, d: number, r = 0.04) {
      const k = `b${w},${h},${d},${r}`
      if (!geometries.has(k))
        geometries.set(
          k,
          r
            ? new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 3, h / 3, d / 3))
            : new THREE.BoxGeometry(w, h, d)
        )
      return geometries.get(k)!
    }
    function box(
      parent: THREE.Object3D,
      w: number,
      h: number,
      d: number,
      x: number,
      y: number,
      z: number,
      m: Material = M.body,
      r = 0.04
    ) {
      const o = new THREE.Mesh(boxGeo(w, h, d, r), m)
      o.position.set(x, y, z)
      o.castShadow = true
      o.receiveShadow = true
      parent.add(o)
      return o
    }
    function cyl(
      parent: THREE.Object3D,
      r: number,
      h: number,
      x: number,
      y: number,
      z: number,
      m: Material = M.chrome,
      r2: number = r,
      segments = 24
    ) {
      const k = `c${r},${r2},${h},${segments}`
      if (!geometries.has(k)) geometries.set(k, new THREE.CylinderGeometry(r, r2, h, segments))
      const o = new THREE.Mesh(geometries.get(k)!, m)
      o.position.set(x, y, z)
      o.castShadow = true
      o.receiveShadow = true
      parent.add(o)
      return o
    }
    function ball(
      parent: THREE.Object3D,
      r: number,
      x: number,
      y: number,
      z: number,
      m: Material = M.chrome
    ) {
      const k = `s${r}`
      if (!geometries.has(k)) geometries.set(k, new THREE.SphereGeometry(r, 12, 8))
      const o = new THREE.Mesh(geometries.get(k)!, m)
      o.position.set(x, y, z)
      parent.add(o)
      return o
    }
    function tube(parent: THREE.Object3D, pts: Vec3[], r: number, m: Material = M.chrome) {
      const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)))
      const o = new THREE.Mesh(
        new THREE.TubeGeometry(curve, Math.max(12, pts.length * 7), r, 8, false),
        m
      )
      o.castShadow = true
      parent.add(o)
      return o
    }
    function screw(parent: THREE.Object3D, x: number, y: number, z: number) {
      cyl(parent, 0.055, 0.026, x, y, z, M.chrome, undefined, 12)
      box(parent, 0.068, 0.005, 0.009, x, y + 0.014, z, M.dark, 0)
    }
    type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => void
    function canvasTexture(w: number, h: number, draw: Draw) {
      const c = document.createElement('canvas')
      c.width = w
      c.height = h
      const ctx = c.getContext('2d')!
      draw(ctx, w, h)
      const t = new THREE.CanvasTexture(c)
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy())
      return { texture: t, canvas: c, ctx }
    }
    function print(
      ctx: CanvasRenderingContext2D,
      txt: string,
      x: number,
      y: number,
      size = 20,
      color = '#f4f1ea',
      weight = 500
    ) {
      ctx.fillStyle = color
      ctx.font = `${weight} ${size}px ${fontFamily}`
      ctx.fillText(txt, x, y)
    }
    function screenMaterial(texture: THREE.Texture) {
      return new THREE.MeshBasicMaterial({ map: texture, toneMapped: false })
    }
    type Painted = THREE.Texture | { texture: THREE.Texture }
    function screen(
      parent: THREE.Object3D,
      w: number,
      h: number,
      x: number,
      y: number,
      z: number,
      tex: Painted
    ) {
      const map = 'texture' in tex ? tex.texture : tex
      const o = new THREE.Mesh(new THREE.PlaneGeometry(w, h), screenMaterial(map))

      o.position.set(x, y, z)
      parent.add(o)
      return o
    }
    const machine = new THREE.Group()
    scene.add(machine)
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(70, 70),
      new THREE.ShadowMaterial({ opacity: 0.23 })
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -0.43
    floor.receiveShadow = true
    scene.add(floor)
    const shadow = canvasTexture(128, 128, (c, w, h) => {
      const g = c.createRadialGradient(64, 64, 12, 64, 64, 64)
      g.addColorStop(0, 'rgba(0,0,0,.8)')
      g.addColorStop(0.55, 'rgba(0,0,0,.45)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      c.fillStyle = g
      c.fillRect(0, 0, w, h)
    })
    const contact = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 13),
      new THREE.MeshBasicMaterial({
        map: shadow.texture,
        transparent: true,
        depthWrite: false,
        opacity: 0.65,
      })
    )
    contact.rotation.x = -Math.PI / 2
    contact.position.y = -0.415
    scene.add(contact)
    // A chamfered, layered platform with engraved nomenclature and captive screws in Dark Navy & Steel Blue.
    box(machine, 12.8, 0.38, 8.25, 0, -0.09, 0, M.base, 0.17)
    box(machine, 12.6, 0.055, 8.08, 0, 0.13, 0, M.platformSteel, 0.11)
    box(machine, 12.49, 0.09, 7.96, 0, 0.19, 0, M.platformDeck, 0.1)
    box(machine, 12.55, 0.027, 8.02, 0, -0.19, 0, M.platformDark, 0.06)
    box(machine, 11.9, 0.026, 0.032, 0, -0.17, 4.115, M.platformSteel, 0.01)
    for (const x of [-5.6, 5.6])
      for (const z of [-3.35, 3.35]) {
        cyl(machine, 0.39, 0.25, x, -0.31, z, M.rubber)
        cyl(machine, 0.29, 0.09, x, -0.4, z, M.platformDark)
        screw(machine, x, 0.253, z)
      }
    for (const x of [-6.02, 6.02]) for (const z of [-3.73, 3.73]) screw(machine, x, 0.255, z)
    const engraving = canvasTexture(1536, 176, (c, w, h) => {
      c.fillStyle = PALETTE.darkNavy
      c.fillRect(0, 0, w, h)
      c.strokeStyle = PALETTE.steelBlue
      c.lineWidth = 2
      c.strokeRect(2, 2, w - 4, h - 4)
      print(c, 'GRAPHIPACKS', 45, 79, 40, PALETTE.honeydew, 650)
      print(c, '·  FLEXIBLE PACKAGING SOLUTIONS  ·  MADURAI', 355, 79, 32, PALETTE.powderBlue, 450)
      print(c, 'MANUFACTURING EXCELLENCE    /    HIGH-BARRIER FILMS', 47, 133, 19, PALETTE.honeydew, 500)
      print(c, 'EST. 1984', 1330, 130, 23, PALETTE.imperialRed)
    })
    const plate = screen(machine, 7.35, 0.84, -0.4, 0.25, 3.51, engraving)
    plate.rotation.x = -Math.PI / 2
    for (let i = 0; i < 16; i++)
      box(machine, 0.015, 0.009, 0.11 + (i % 4) * 0.035, -5.6 + i * 0.09, 0.249, 3.5, M.platformSteel, 0)
    // Faint drafting marks stay local to the machine, leaving the headline area empty.
    const drafting = new THREE.Group()
    scene.add(drafting)
    const lineMat = new THREE.LineBasicMaterial({
      color: PALETTE_HEX.steelBlue,
      transparent: true,
      opacity: 0.16,
    })
    const draftingPoints = []
    for (const r of [7.5, 8.1])
      for (let i = 0; i < 120; i++)
        for (const j of [i, i + 1]) {
          const a = (j / 120) * TAU
          draftingPoints.push(new THREE.Vector3(Math.cos(a) * r, -0.4, Math.sin(a) * r * 0.72))
        }
    for (let i = 0; i < 52; i++) {
      const a = (i / 52) * TAU,
        r = 8.1
      draftingPoints.push(
        new THREE.Vector3(Math.cos(a) * r, -0.395, Math.sin(a) * r * 0.72),
        new THREE.Vector3(
          Math.cos(a) * (r + (i % 4 === 0 ? 0.16 : 0.07)),
          -0.395,
          Math.sin(a) * (r + (i % 4 === 0 ? 0.16 : 0.07)) * 0.72
        )
      )
    }
    drafting.add(
      new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(draftingPoints), lineMat)
    )

    // The five stations, left to right along the belt. `step` is the station's place in the
    // manufacturing flow (Flexo, Rotogravure, Lamination, Inspection, Packing, Stock)
    type StationDef = {
      id: StationId
      name: string
      step: number
      output: string
      pos: Vec3
      desc: string
    }
    type Station = StationDef & {
      group: THREE.Group
      base: THREE.Vector3
      glowMat: THREE.MeshStandardMaterial
      label: HTMLDivElement
      index: number
      anchor: THREE.Vector3
    }
    const definitions: StationDef[] = [
      {
        id: 'flexo',
        name: 'Flexo Printing',
        step: 1,
        output: 'Base Print',
        pos: [-4.15, 0.29, -0.65],
        desc: 'High-speed central impression flexographic printing with inline surface curing.',
      },
      {
        id: 'rotogravure',
        name: '8-Color Rotogravure Printing',
        step: 2,
        output: 'HD Print Cylinders',
        pos: [-1.75, 0.29, -2.05],
        desc: 'Precision electronic cylinder engraving with up to 8-colour registration and metallic inks.',
      },
      {
        id: 'lamination',
        name: 'Film Lamination',
        step: 3,
        output: 'Multi-Layer Barrier',
        pos: [1.75, 0.29, -2.05],
        desc: 'Solventless adhesive lamination combining PET, MET-PET, and LLDPE for high-barrier protection.',
      },
      {
        id: 'inspection',
        name: 'Automated Inspection Line',
        step: 4,
        output: 'Vision Inspected Rolls',
        pos: [4.15, 0.29, -0.45],
        desc: 'Continuous optical surface defect scanning, tensile gauge checks, and seal verification.',
      },
      {
        id: 'packing',
        name: 'Packing & Conveying',
        step: 5,
        output: 'Sorted Cartons & Bales',
        pos: [2.5, 0.29, 1.95],
        desc: 'Automated pouch counting, wicket bundling, and robotic conveying for palletised dispatch.',
      },
      {
        id: 'stock',
        name: 'Printed Film Rolls & Stock',
        step: 6,
        output: 'Finished Inventory',
        pos: [-1.2, 0.29, 1.95],
        desc: 'Climate-monitored warehouse staging and export-ready palletised roll inventory.',
      },
    ]
    const stations: Station[] = [],
      cutPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 10),
      shellMaterials: THREE.Material[] = []
    function shell< T extends THREE.Material>(m: T): T {
      const s = m.clone() as T
      s.clippingPlanes = [cutPlane]
      s.clipShadows = true
      s.side = THREE.DoubleSide
      shellMaterials.push(s)
      return s
    }
    const S = {
      body: shell(M.body),
      ivory: shell(M.ivory),
      amber: shell(M.amber),
      edge: shell(M.edge),
    }
    const gears: Array<{ g: THREE.Group; vertical: boolean }> = []
    function gear(
      parent: THREE.Object3D,
      x: number,
      y: number,
      z: number,
      r = 0.3,
      vertical = false
    ) {
      const g = new THREE.Group()
      g.position.set(x, y, z)
      if (vertical) g.rotation.x = Math.PI / 2
      parent.add(g)
      cyl(g, r, 0.09, 0, 0, 0, M.copper)
      cyl(g, r * 0.66, 0.105, 0, 0, 0, M.dark)
      cyl(g, r * 0.22, 0.14, 0, 0, 0, M.chrome)
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * TAU,
          b = box(g, r * 0.26, 0.085, r * 0.2, Math.cos(a) * r, 0, Math.sin(a) * r, M.copper, 0.008)
        b.rotation.y = -a
      }
      g.userData.moving = true
      gears.push({ g, vertical })
      return g
    }
    definitions.forEach((d, i) => {
      const group = new THREE.Group()
      group.position.fromArray(d.pos)
      machine.add(group)
      const glowMat = M.light.clone()
      glowMat.emissiveIntensity = 0.5
      box(group, 2.05, 0.12, 1.78, 0, 0.03, 0, M.dark, 0.1)
      box(group, 1.97, 0.03, 1.7, 0, 0.12, 0, glowMat, 0.09)
      box(group, 2.03, 0.17, 1.75, 0, 0.215, 0, M.body, 0.1)
      for (const x of [-0.85, 0.85]) for (const z of [-0.7, 0.7]) screw(group, x, 0.311, z)
      // Internal mechanics become visible when the shell is cut at deck height.
      gear(group, -0.35, 0.45, 0, 0.27)
      gear(group, 0.22, 0.45, 0.12, 0.21)
      box(group, 0.6, 0.15, 0.36, 0.52, 0.47, -0.33, M.dark)
      for (let j = 0; j < 6; j++)
        box(group, 0.025, 0.16, 0.37, 0.3 + j * 0.08, 0.47, -0.33, M.edge, 0.004)
      tube(
        group,
        [
          [-0.7, 0.4, -0.4],
          [-0.55, 0.48, 0.4],
          [0.35, 0.45, 0.6],
          [0.7, 0.58, 0.23],
        ],
        0.023,
        M.light
      )
      const plaque = canvasTexture(512, 116, (c, w, h) => {
        c.fillStyle = '#151a20'
        c.fillRect(0, 0, w, h)
        print(c, String(i + 1).padStart(2, '0'), 24, 76, 42, PALETTE.steelBlue, 550)
        print(c, d.name.toUpperCase(), 111, 73, 35, '#d7d9d7', 550)
      })
      screen(group, 1.54, 0.345, 0, 0.27, 0.891, plaque)
      const label = document.createElement('div')
      label.className = 'station-label'
      label.innerHTML = `<div class="stem"></div><div class="label-card"><div class="label-title"><span>${String(i + 1).padStart(2, '0')}</span>${d.name}</div><div class="label-meta">Step ${d.step} · ${d.output}</div></div>`
      $('labels').appendChild(label)
      cleanups.push(() => label.remove())

      stations.push({
        ...d,
        group,
        base: new THREE.Vector3(...d.pos),
        glowMat,
        label,
        index: i,
        anchor: new THREE.Vector3(0, 2.5, 0),
      })
    })
    const engine = stations[0].group
    box(engine, 1.74, 0.62, 1.33, 0, 0.65, -0.05, S.ivory, 0.13)
    box(engine, 1.5, 0.1, 1.16, 0, 0.99, -0.04, S.body, 0.025)
    for (const x of [-0.68, 0.68]) {
      cyl(engine, 0.065, 1.73, x, 1.35, -0.18, M.chrome)
      box(engine, 0.22, 1.8, 0.22, x, 1.37, -0.44, S.ivory, 0.035)
    }
    box(engine, 1.82, 0.27, 0.4, 0, 2.28, -0.35, S.amber, 0.045)
    box(engine, 1.55, 0.06, 0.06, 0, 2.13, -0.115, M.chrome, 0.01)
    const printhead = new THREE.Group()
    engine.add(printhead)
    printhead.position.set(0, 1.9, -0.08)
    printhead.userData.moving = true
    box(printhead, 0.45, 0.36, 0.44, 0, 0, 0, M.body, 0.05)
    cyl(printhead, 0.11, 0.13, 0, -0.24, 0.03, M.chrome, 0.04)
    box(printhead, 0.24, 0.045, 0.022, 0, 0.09, 0.23, M.light, 0.01)
    tube(
      engine,
      [
        [-0.68, 2.1, -0.35],
        [-0.42, 2.52, -0.4],
        [0.25, 2.5, -0.4],
        [0.35, 2.01, -0.12],
      ],
      0.032,
      M.dark
    )
    // -------------------------------------------------------------------------
    // Station 0 (Flexo): Extruder & Hopper with White Pellets, Blown-Film Bubble,
    // ONE Large Horizontal Printed Film Roll, and Flat Stand-Up Pouch Sample
    // -------------------------------------------------------------------------

    // 1. Plastic manufacturing cue: Extruder base, Feed Hopper with white polymer pellets
    // Extruder barrel housing
    box(engine, 0.50, 0.28, 0.40, -0.78, 1.05, -0.32, M.body, 0.03)
    cyl(engine, 0.12, 0.07, -0.78, 1.05, -0.16, M.copper)
    cyl(engine, 0.12, 0.07, -0.78, 1.05, -0.48, M.copper)

    // Clear feed throat sight-glass
    cyl(engine, 0.075, 0.22, -0.78, 1.30, -0.32, M.glass)
    // Visible polymer pellets in feed throat
    ball(engine, 0.024, -0.78, 1.24, -0.32, M.paper)
    ball(engine, 0.025, -0.77, 1.30, -0.31, M.paper)
    ball(engine, 0.023, -0.79, 1.36, -0.33, M.paper)

    // Conical stainless steel feed hopper
    const hopperGeo = new THREE.CylinderGeometry(0.24, 0.08, 0.36, 24)
    const hopperMesh = new THREE.Mesh(hopperGeo, M.chrome)
    hopperMesh.position.set(-0.78, 1.58, -0.32)
    hopperMesh.castShadow = true
    engine.add(hopperMesh)
    cyl(engine, 0.25, 0.035, -0.78, 1.76, -0.32, M.chrome)

    // White polymer pellets mound filling the hopper mouth
    const pelletMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.32,
      metalness: 0.04,
    })
    const pelletGeo = new THREE.SphereGeometry(0.028, 10, 8)
    const pelletGroup = new THREE.Group()
    pelletGroup.position.set(-0.78, 1.75, -0.32)
    engine.add(pelletGroup)
    const pelletOffsets: [number, number, number][] = [
      [0, 0.03, 0],
      [-0.05, 0.02, 0.04],
      [0.06, 0.02, 0.03],
      [-0.03, 0.02, -0.06],
      [0.04, 0.02, -0.05],
      [-0.11, 0.01, 0.08],
      [0.12, 0.01, 0.06],
      [-0.08, 0.01, -0.11],
      [0.10, 0.01, -0.09],
      [-0.15, 0.0, 0.02],
      [0.16, 0.0, -0.01],
      [0.02, 0.0, 0.16],
      [-0.02, 0.0, -0.15],
      [-0.13, -0.01, -0.08],
      [0.14, -0.01, 0.09],
      [0.09, -0.01, -0.13],
      [-0.08, -0.01, 0.14],
      [0, -0.02, 0.18],
      [0, -0.02, -0.18],
      [-0.18, -0.02, 0],
      [0.18, -0.02, 0],
    ]
    for (const [px, py, pz] of pelletOffsets) {
      const pMesh = new THREE.Mesh(pelletGeo, pelletMat)
      pMesh.position.set(px, py, pz)
      pelletGroup.add(pMesh)
    }

    // 2. Translucent blown-film bubble rising from extrusion circular die
    cyl(engine, 0.22, 0.10, -0.42, 1.10, -0.32, M.dark)
    cyl(engine, 0.25, 0.05, -0.42, 1.16, -0.32, M.chrome)
    cyl(engine, 0.23, 0.03, -0.42, 1.20, -0.32, M.copper)

    const bubblePts = [
      new THREE.Vector2(0.12, 0.0),
      new THREE.Vector2(0.17, 0.14),
      new THREE.Vector2(0.28, 0.32),
      new THREE.Vector2(0.32, 0.55),
      new THREE.Vector2(0.33, 1.05),
      new THREE.Vector2(0.30, 1.35),
      new THREE.Vector2(0.17, 1.50),
      new THREE.Vector2(0.06, 1.56),
    ]
    const bubbleGeo = new THREE.LatheGeometry(bubblePts, 32)
    const bubbleMat = new THREE.MeshStandardMaterial({
      color: 0xd9eafd,
      transparent: true,
      opacity: 0.42,
      roughness: 0.08,
      metalness: 0.18,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
    const blownFilmBubble = new THREE.Mesh(bubbleGeo, bubbleMat)
    blownFilmBubble.position.set(-0.42, 1.22, -0.32)
    blownFilmBubble.userData.moving = true
    engine.add(blownFilmBubble)

    // Frost line ring
    const frostRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.325, 0.012, 8, 32),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.55,
        roughness: 0.35,
      })
    )
    frostRing.rotation.x = Math.PI / 2
    frostRing.position.set(-0.42, 1.77, -0.32)
    engine.add(frostRing)

    // Collapsing A-frame guide slats & nip rollers
    box(engine, 0.02, 0.28, 0.46, -0.52, 2.66, -0.32, M.edge, 0.005)
    box(engine, 0.02, 0.28, 0.46, -0.32, 2.66, -0.32, M.edge, 0.005)
    const nip1 = cyl(engine, 0.038, 0.48, -0.42, 2.78, -0.32, M.chrome)
    nip1.rotation.x = Math.PI / 2

    // Extruded film web entering the flexo print assembly
    tube(
      engine,
      [
        [-0.42, 2.78, -0.32],
        [-0.30, 2.35, -0.32],
        [-0.12, 2.10, -0.32],
      ],
      0.018,
      bubbleMat
    )

    // 3. ONE large horizontal printed film roll lying flat (no holes, no spokes, no red disc)
    const rollTexture = canvasTexture(1024, 512, (c, w, h) => {
      c.fillStyle = '#f6f4ed'
      c.fillRect(0, 0, w, h)

      for (let r = 0; r < 2; r++) {
        const rx = r * 512
        // Dark Navy header band
        c.fillStyle = PALETTE.darkNavy
        c.fillRect(rx, 0, 512, 68)

        // Steel rules
        c.fillStyle = PALETTE.steelBlue
        c.fillRect(rx, 68, 512, 8)
        c.fillRect(rx, 436, 512, 8)

        print(c, 'GRAPHIPACKS', rx + 24, 46, 36, '#ffffff', 700)
        print(c, 'FLEXO PRINTED FILM', rx + 300, 46, 16, PALETTE.powderBlue, 600)

        // Printed pouch layouts on roll surface
        for (let row = 0; row < 2; row++) {
          const ry = 88 + row * 168
          c.fillStyle = '#ffffff'
          c.fillRect(rx + 20, ry, 472, 150)
          c.strokeStyle = PALETTE.powderBlue
          c.lineWidth = 2.5
          c.strokeRect(rx + 20, ry, 472, 150)

          c.fillStyle = '#ebe6dc'
          c.fillRect(rx + 20, ry, 18, 150)
          c.fillRect(rx + 474, ry, 18, 150)

          print(c, 'STAND-UP BARRIER POUCH', rx + 52, ry + 36, 20, PALETTE.darkNavy, 700)
          print(c, 'HIGH-BARRIER LAMINATE · 100µm', rx + 52, ry + 60, 13, PALETTE.steelBlue, 600)
          print(c, 'PET / MET-PET / LLDPE', rx + 52, ry + 82, 12, '#505a64', 500)

          c.fillStyle = PALETTE.steelBlue
          c.beginPath()
          c.roundRect(rx + 52, ry + 94, 150, 26, 4)
          c.fill()
          print(c, 'GRAPHIPACKS QC OK', rx + 62, ry + 112, 12, '#ffffff', 700)

          c.fillStyle = PALETTE.darkNavy
          for (let b = 0; b < 24; b++) {
            const bw = b % 3 === 0 ? 3.5 : b % 5 === 0 ? 4.5 : 2
            c.fillRect(rx + 235 + b * 7, ry + 94, bw, 32)
          }
        }

        const regColors = [PALETTE.darkNavy, PALETTE.steelBlue, PALETTE.powderBlue, PALETTE.steelBlue, PALETTE.darkNavy]
        regColors.forEach((col, idx) => {
          c.fillStyle = col
          c.fillRect(rx + 28 + idx * 36, 460, 24, 24)
        })
        print(c, 'MADURAI PLANT · 8-COLOR REGISTER · LOT GP-2026', rx + 220, 478, 13, '#6e7780', 600)
      }
    })

    // Roll cradle pillow blocks & bottom support rollers
    box(engine, 0.14, 0.36, 0.30, 0.42 - 0.42, 0.98, -0.22, M.dark, 0.02)
    box(engine, 0.14, 0.36, 0.30, 0.42 + 0.42, 0.98, -0.22, M.dark, 0.02)
    const cr1 = cyl(engine, 0.065, 0.86, 0.42, 0.88, -0.32, M.chrome)
    cr1.rotation.z = Math.PI / 2
    const cr2 = cyl(engine, 0.065, 0.86, 0.42, 0.88, -0.12, M.chrome)
    cr2.rotation.z = Math.PI / 2

    // ONE large horizontal printed film roll lying flat
    const horizontalRoll = new THREE.Group()
    horizontalRoll.position.set(0.42, 1.20, -0.22)
    horizontalRoll.userData.moving = true
    engine.add(horizontalRoll)

    const rollMat = new THREE.MeshStandardMaterial({
      map: rollTexture.texture,
      roughness: 0.28,
      metalness: 0.15,
    })
    const rollGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.74, 36)
    const rollMesh = new THREE.Mesh(rollGeo, rollMat)
    rollMesh.rotation.z = Math.PI / 2
    rollMesh.castShadow = true
    rollMesh.receiveShadow = true
    horizontalRoll.add(rollMesh)

    // Central mandrel spindle through core
    const coreSpindle = cyl(horizontalRoll, 0.07, 0.96, 0, 0, 0, M.chrome)
    coreSpindle.rotation.z = Math.PI / 2

    // Solid core ends with dark cardboard core and chrome chucks (no holes, no spokes, no red disc)
    for (const x of [-0.375, 0.375]) {
      const coreDisc = cyl(horizontalRoll, 0.15, 0.015, x, 0, 0, M.dark)
      coreDisc.rotation.z = Math.PI / 2
      const chuck = cyl(horizontalRoll, 0.11, 0.05, x + (x > 0 ? 0.03 : -0.03), 0, 0, M.chrome)
      chuck.rotation.z = Math.PI / 2
    }

    // Printed film web unrolling from the horizontal roll into the flexo press
    const rollWeb = new THREE.Mesh(
      new THREE.PlaneGeometry(0.70, 0.38),
      new THREE.MeshStandardMaterial({
        map: rollTexture.texture,
        roughness: 0.28,
        metalness: 0.15,
        side: THREE.DoubleSide,
      })
    )
    rollWeb.rotation.x = -Math.PI / 2
    rollWeb.position.set(0.42, 1.20 + 0.44, -0.41)
    engine.add(rollWeb)

    // 4. Flat printed pouch sample standing up, showing a real laminated pouch design
    const videoTexture = canvasTexture(440, 720, () => {})
    function drawVideo(t = 0) {
      const c = videoTexture.ctx,
        w = 440,
        h = 720

      // White pouch substrate background
      c.fillStyle = '#fbfbfa'
      c.fillRect(0, 0, w, h)

      // Heat-sealed top and bottom margins with crimp lines
      c.fillStyle = '#eae5db'
      c.fillRect(0, 0, w, 48)
      c.fillRect(0, 672, w, 48)
      c.strokeStyle = '#d7d1c3'
      c.lineWidth = 1.5
      for (let y = 8; y < 44; y += 5) {
        c.beginPath()
        c.moveTo(0, y)
        c.lineTo(w, y)
        c.stroke()
      }
      for (let y = 678; y < 714; y += 5) {
        c.beginPath()
        c.moveTo(0, y)
        c.lineTo(w, y)
        c.stroke()
      }

      // Deep Navy header banner with Steel Blue accent lines
      c.fillStyle = PALETTE.darkNavy
      c.fillRect(0, 48, w, 116)
      c.fillStyle = PALETTE.steelBlue
      c.fillRect(0, 46, w, 3)
      c.fillRect(0, 164, w, 4)

      // Brand typography in header
      print(c, 'GRAPHIPACKS', 32, 98, 30, '#ffffff', 700)
      print(c, 'PREMIUM BARRIER PACKAGING', 32, 134, 13, PALETTE.powderBlue, 600)

      // Main product title
      print(c, 'STAND-UP BARRIER POUCH', 32, 206, 21, PALETTE.darkNavy, 700)
      print(c, 'SOLVENTLESS LAMINATION · 3-PLY', 32, 234, 13, PALETTE.steelBlue, 600)

      // Center printed label panel with steel border
      c.strokeStyle = PALETTE.powderBlue
      c.lineWidth = 2
      c.strokeRect(28, 256, 384, 210)
      c.fillStyle = '#f6f3eb'
      c.fillRect(30, 258, 380, 206)

      // Steel highlight badge inside panel
      c.fillStyle = PALETTE.steelBlue
      c.beginPath()
      c.roundRect(46, 276, 175, 26, 4)
      c.fill()
      print(c, '100% BARRIER INTEGRITY', 56, 294, 11, '#ffffff', 700)

      // Pouch features
      print(c, '• MOISTURE & OXYGEN BARRIER', 46, 332, 14, PALETTE.darkNavy, 600)
      print(c, '• HERMETIC HEAT-SEAL WITH ZIPPER', 46, 364, 14, PALETTE.darkNavy, 600)
      print(c, '• FOOD GRADE COMPLIANT (ISO 9001)', 46, 396, 14, PALETTE.darkNavy, 600)
      print(c, '• SOLVENTLESS ADHESIVE BONDING', 46, 428, 13, PALETTE.steelBlue, 600)

      // Technical specs
      print(c, 'MATERIAL: PET 12µ / MET-PET 12µ / PE 80µ', 32, 492, 13, PALETTE.darkNavy, 600)
      print(c, 'SPEC: 1000g STAND-UP POUCH · 110 MICRON', 32, 518, 13, '#5e6871', 500)
      print(c, 'BATCH: GP-MADURAI-2026-FLEXO', 32, 544, 13, '#5e6871', 500)

      // Barcode block
      c.fillStyle = PALETTE.darkNavy
      for (let i = 0; i < 48; i++) {
        const bx = 32 + i * 7.8
        const bw = i % 3 === 0 ? 3.5 : i % 5 === 0 ? 4.5 : 2
        c.fillRect(bx, 570, bw, 46)
      }
      print(c, '8 901234 567890', 140, 638, 13, '#5e6871', 500)

      // Footer
      print(c, 'MADURAI PACKAGING PLANT · SINCE 1984', 32, 698, 12, PALETTE.steelBlue, 600)

      videoTexture.texture.needsUpdate = true
    }
    drawVideo(0)

    // Flat printed pouch sample standing upright on display stand
    const pouchSample = new THREE.Group()
    pouchSample.userData.moving = true
    engine.add(pouchSample)

    // Acrylic / dark mounting stand on station bed
    box(engine, 0.72, 0.08, 0.22, 0, 0.82, 0.63, M.dark, 0.02)
    box(engine, 0.70, 0.02, 0.04, 0, 0.87, 0.72, M.chrome, 0.005)
    box(engine, 0.22, 0.35, 0.04, 0, 1.02, 0.52, M.chrome, 0.01)

    // Stand-up pouch body (slight backward tilt for natural upright stand-up presentation)
    pouchSample.rotation.x = -0.08
    box(pouchSample, 0.62, 1.06, 0.028, 0, 1.36, 0.61, M.ivory, 0.02)
    // Heat seal crimp borders at top and bottom
    box(pouchSample, 0.624, 0.06, 0.034, 0, 1.86, 0.61, M.edge, 0.008)
    box(pouchSample, 0.624, 0.05, 0.034, 0, 0.86, 0.61, M.edge, 0.008)
    // Tear notches on sides
    box(pouchSample, 0.025, 0.02, 0.036, -0.31, 1.80, 0.61, M.dark, 0)
    box(pouchSample, 0.025, 0.02, 0.036, 0.31, 1.80, 0.61, M.dark, 0)

    // High-definition printed pouch front artwork
    screen(pouchSample, 0.58, 0.96, 0, 1.36, 0.626, videoTexture)
    box(engine, 1.14, 0.12, 0.2, 0, 0.83, 0.66, M.dark, 0.025)
    for (const x of [-0.42, 0.42]) {
      const r = cyl(engine, 0.115, 0.18, x, 0.92, 0.6, M.chrome)
      r.rotation.z = Math.PI / 2
    }
    for (let i = 0; i < 5; i++)
      box(engine, 0.08, 0.03, 0.22, -0.38 + i * 0.19, 1.011, -0.02, M.edge, 0.005)

    const admin = stations[1].group
    box(admin, 1.9, 0.66, 1.36, 0, 0.67, -0.04, S.body, 0.11)
    const consoleTop = new THREE.Group()
    consoleTop.position.set(0, 1.01, -0.08)
    consoleTop.rotation.x = -0.32
    admin.add(consoleTop)
    box(consoleTop, 1.76, 0.12, 1.27, 0, 0, 0, S.ivory, 0.04)
    const queue = canvasTexture(640, 340, () => {})
    function drawQueue(t: number) {
      const c = queue.ctx
      c.fillStyle = '#111b20'
      c.fillRect(0, 0, 640, 340)
      print(c, 'ROTOGRAVURE UNITS', 25, 45, 21, '#acb9b8', 550)
      print(c, '08 UNITS ACTIVE', 450, 45, 18, PALETTE.steelBlue, 500)
      for (let i = 0; i < 3; i++) {
        const y = 74 + i * 76
        c.fillStyle = '#202c30'
        c.beginPath()
        c.roundRect(21, y, 598, 61, 6)
        c.fill()
        c.fillStyle = i === 0 ? PALETTE.steelBlue : '#626f69'
        c.fillRect(34, y + 10, 27, 41)
        print(
          c,
          ['Units 1-4: Process CMYK', 'Units 5-6: Special Spot & White', 'Units 7-8: Over-lacquer & Gold'][i],
          77,
          y + 29,
          19,
          '#d4d8cc'
        )
        print(c, i === 0 ? 'PRINTING' : 'CALIBRATED', 77, y + 49, 11, i === 0 ? PALETTE.steelBlue : '#81948f')
        c.fillStyle = '#334348'
        c.fillRect(377, y + 26, 214, 7)
        c.fillStyle = i === 0 ? PALETTE.steelBlue : '#607475'
        c.fillRect(377, y + 26, i === 0 ? ((t * 0.15) % 1) * 214 : 41 + i * 27, 7)
      }
    }
    drawQueue(0)
    const qs = screen(consoleTop, 1.53, 0.79, 0, 0.067, -0.17, queue)
    qs.rotation.x = -Math.PI / 2
    const toggles: THREE.Mesh[] = []
    for (let i = 0; i < stations.length - 1; i++) {
      const x = -0.57 + i * 0.38
      cyl(consoleTop, 0.074, 0.035, x, 0.1, 0.45, M.dark)
      const t = cyl(consoleTop, 0.025, 0.15, x, 0.19, 0.45, M.chrome)
      t.rotation.x = -0.4
      t.userData.moving = true
      toggles.push(t)
      ball(consoleTop, 0.04, x, 0.275, 0.421, M.ivory)
    }
    cyl(admin, 0.075, 0.06, 0.77, 1.05, -0.62, M.green)
    for (let i = 0; i < 7; i++)
      box(admin, 0.55, 0.027, 0.02, 0, 0.46 + i * 0.05, 0.655, M.dark, 0.003)

    const storefront = stations[2].group
    box(storefront, 1.35, 0.18, 0.88, 0, 0.44, 0, S.ivory, 0.045)
    cyl(storefront, 0.095, 1.04, 0, 0.93, -0.31, M.chrome)
    box(storefront, 0.56, 0.91, 0.14, 0, 0.99, -0.34, S.body, 0.04)
    box(storefront, 2.42, 1.72, 0.2, 0, 1.94, -0.17, S.ivory, 0.08)
    box(storefront, 2.28, 1.59, 0.1, 0, 1.94, -0.044, M.dark, 0.045)
    const webTexture = canvasTexture(896, 592, (c, w, h) => {
      c.fillStyle = '#edece3'
      c.fillRect(0, 0, w, h)
      c.fillStyle = '#dedfd7'
      c.fillRect(0, 0, w, 56)
      c.fillStyle = '#adaeaa'
      for (let i = 0; i < 3; i++) {
        c.beginPath()
        c.arc(26 + i * 19, 27, 4, 0, TAU)
        c.fill()
      }
      print(c, 'GRAPHIPACKS', 33, 100, 22, '#22282b', 650)
      print(c, 'Mulch Film   Grow Bags   Pouches', 450, 98, 14, '#6a7271')
      c.fillStyle = PALETTE.steelBlue
      c.beginPath()
      c.roundRect(32, 131, 287, 401, 10)
      c.fill()
      c.strokeStyle = '#242827'
      c.lineWidth = 8
      for (let i = 0; i < 3; i++) {
        c.beginPath()
        c.ellipse(175, 320, 75 - i * 17, 94, 0.4, 0, TAU)
        c.stroke()
      }
      print(c, 'BARRIER', 52, 181, 29, '#242827', 700)
      print(c, 'LAMINATION', 52, 220, 29, '#242827', 700)
      print(c, 'Solventless.', 359, 197, 41, '#22282b', 600)
      print(c, 'Zero Odour.', 359, 252, 41, '#22282b', 600)
      print(c, 'Multi-layer barrier laminate', 362, 300, 19, '#77807b')
      print(c, 'PET + MET-PET + Polyethylene', 362, 329, 19, '#77807b')
      for (let i = 0; i < 3; i++) {
        c.fillStyle = '#d1d5cd'
        c.fillRect(362, 363 + i * 16, 400 - i * 43, 5)
      }
      c.fillStyle = '#232a2b'
      c.beginPath()
      c.roundRect(359, 447, 279, 62, 7)
      c.fill()
      print(c, 'Request Tech Quote  ↗', 370, 486, 20, '#f4f1ea', 500)
      print(c, 'MADURAI PACKAGING PLANT', 33, 571, 12, '#879088')
    })
    screen(storefront, 2.16, 1.43, 0, 1.95, 0.011, webTexture)
    ball(storefront, 0.024, 0, 2.747, -0.05, M.dark)
    box(storefront, 0.21, 0.019, 0.008, 0, 1.149, 0.013, M.light, 0.003)
    screen(storefront, 0.685, 0.96, -0.655, 1.86, 0.018, videoTexture)
    const flyPost = new THREE.Group()
    flyPost.userData.moving = true
    storefront.add(flyPost)
    box(flyPost, 0.59, 0.77, 0.045, 0.94, 0.81, 0.55, M.ivory, 0.025)
    const postTex = canvasTexture(220, 290, (c, w, h) => {
      c.fillStyle = '#f4f1ea'
      c.fillRect(0, 0, w, h)
      c.fillStyle = PALETTE.darkNavy
      c.fillRect(15, 16, 190, 168)
      // 3-Layer high-barrier laminate schematic
      c.fillStyle = '#1c3d5a'
      c.fillRect(30, 40, 160, 24)
      print(c, 'PET 12µ', 75, 57, 13, '#ffffff', 600)

      c.fillStyle = PALETTE.steelBlue
      c.fillRect(30, 72, 160, 24)
      print(c, 'MET-PET 12µ', 58, 89, 13, PALETTE.darkNavy, 700)

      c.fillStyle = '#d8d3c5'
      c.fillRect(30, 104, 160, 24)
      print(c, 'LLDPE 80µ', 68, 121, 13, PALETTE.darkNavy, 600)

      print(c, 'BARRIER FILM', 17, 218, 20, PALETTE.darkNavy, 700)
      print(c, '3-Ply Solventless Bonding', 17, 242, 12, PALETTE.steelBlue, 600)
      print(c, 'Zero Odour · High Barrier', 17, 264, 11, '#566059', 500)
    })
    screen(flyPost, 0.55, 0.72, 0.94, 0.81, 0.575, postTex)

    const cabinet = stations[3].group
    box(cabinet, 1.75, 1.77, 1.02, 0, 1.24, -0.13, S.body, 0.12)
    box(cabinet, 1.58, 0.13, 1.09, 0, 2.16, -0.13, S.amber, 0.04)
    box(cabinet, 1.47, 1.38, 0.055, 0, 1.31, 0.405, M.dark, 0.025)
    const orderTex = canvasTexture(480, 460, (c, w, h) => {
      c.fillStyle = '#172224'
      c.fillRect(0, 0, w, h)
      print(c, 'VISION INSPECTION QA', 30, 51, 25, '#e8e8d8', 550)
      print(c, 'Continuous Optical Scan · 100% Verified', 30, 81, 14, '#869991')
      ;['Batch GP-8401', 'Batch GP-8402', 'Batch GP-8403'].forEach((n, i) => {
        const y = 110 + i * 100
        c.fillStyle = '#283839'
        c.beginPath()
        c.roundRect(22, y, 436, 83, 8)
        c.fill()
        c.fillStyle = [PALETTE.steelBlue, PALETTE.powderBlue, PALETTE.darkNavy][i]
        c.beginPath()
        c.arc(58, y + 40, 19, 0, TAU)
        c.fill()
        print(c, n[0], 49, y + 47, 20, '#1b2828', 600)
        print(c, n, 93, y + 33, 23, '#e6e8dc', 550)
        print(c, ['Defect Scan: 0', 'Gauge: 25µm ±0.5', 'Seal Strength: OK'][i], 93, y + 58, 15, '#94a59b')
        print(c, '↗', 410, y + 49, 25, PALETTE.steelBlue)
      })
    })
    screen(cabinet, 1.31, 1.255, 0, 1.37, 0.44, orderTex)
    box(cabinet, 1.27, 0.075, 0.29, 0, 0.57, 0.55, M.chrome, 0.02)
    for (let i = 0; i < 3; i++)
      box(cabinet, 1.15, 0.021, 0.12, 0, 0.58 + i * 0.15, -0.35, M.copper, 0.006)
    tube(
      cabinet,
      [
        [0.69, 0.43, -0.2],
        [0.89, 0.65, -0.2],
        [0.89, 1.8, -0.2],
        [0.65, 1.99, -0.2],
      ],
      0.033,
      M.chrome
    )
    const incoming = new THREE.Group()
    incoming.userData.moving = true
    cabinet.add(incoming)
    box(incoming, 0.86, 0.42, 0.043, 0, 0, 0, M.light, 0.035)
    const nameTex = canvasTexture(432, 204, (c, w, h) => {
      c.fillStyle = PALETTE.steelBlue
      c.fillRect(0, 0, w, h)
      c.fillStyle = '#2a2e26'
      c.beginPath()
      c.arc(58, 98, 32, 0, TAU)
      c.fill()
      print(c, 'QC', 34, 112, 32, PALETTE.steelBlue, 550)
      print(c, 'QA PASS', 108, 91, 32, '#222822', 600)
      print(c, 'Tolerance OK ✓', 108, 138, 20, PALETTE.darkNavy, 500)
    })
    screen(incoming, 0.82, 0.39, 0, 0, 0.026, nameTex)

    const cashdesk = stations[4].group
    box(cashdesk, 1.91, 0.63, 1.32, 0, 0.65, -0.06, S.ivory, 0.12)
    box(cashdesk, 1.96, 0.19, 1.38, 0, 0.42, -0.04, S.body, 0.04)
    box(cashdesk, 1.37, 0.09, 0.038, 0, 0.44, 0.66, M.dark, 0.01)
    box(cashdesk, 0.37, 0.042, 0.03, 0, 0.45, 0.687, M.chrome, 0.009)
    box(cashdesk, 1.02, 0.25, 0.91, -0.33, 1.04, -0.03, S.body, 0.045)
    for (let row = 0; row < 3; row++)
      for (let col = 0; col < 3; col++)
        box(
          cashdesk,
          0.19,
          0.085,
          0.17,
          -0.62 + col * 0.27,
          1.21,
          0.27 - row * 0.24,
          col === 2 && row === 2 ? M.amber : M.ivory,
          0.022
        )
    box(cashdesk, 0.64, 0.6, 0.52, 0.58, 1.04, -0.15, S.body, 0.045)
    box(cashdesk, 0.48, 0.07, 0.09, 0.59, 1.37, -0.1, M.dark, 0.01)
    cyl(cashdesk, 0.06, 0.65, -0.35, 1.6, -0.56, M.chrome)
    box(cashdesk, 1.13, 0.46, 0.19, -0.35, 1.98, -0.56, S.body, 0.045)
    const cashTex = canvasTexture(512, 176, () => {})
    function drawCash() {
      const c = cashTex.ctx
      c.fillStyle = PALETTE.darkNavy
      c.fillRect(0, 0, 512, 176)
      print(c, 'PACKING & WICKET LINE', 22, 44, 23, PALETTE.powderBlue, 500)
      print(c, '2,500 BAGS / HR', 26, 125, 48, PALETTE.powderBlue, 500)
    }
    drawCash()
    screen(cashdesk, 1.015, 0.349, -0.35, 1.98, -0.459, cashTex)
    const receipt = new THREE.Group()
    receipt.position.set(0.59, 1.37, -0.1)
    receipt.userData.moving = true
    cashdesk.add(receipt)
    const receiptTex = canvasTexture(280, 540, (c, w, h) => {
      c.fillStyle = '#f4f1ea'
      c.fillRect(0, 0, w, h)
      print(c, 'GRAPHIPACKS', 25, 52, 24, '#333d36', 650)
      print(c, 'DISPATCH MANIFEST', 32, 87, 18, '#566059')
      c.strokeStyle = '#8a9189'
      c.setLineDash([5, 6])
      c.beginPath()
      c.moveTo(22, 115)
      c.lineTo(258, 115)
      c.stroke()
      print(c, 'Mulch & Pouch Film', 25, 154, 19, '#333d36')
      print(c, 'Lot # GP-2026', 25, 190, 18, '#333d36')
      print(c, 'DISPATCHED', 25, 263, 26, '#333d36', 650)
      print(c, 'Madurai, TN', 25, 317, 21, '#687067')
      for (let i = 0; i < 44; i++) {
        c.fillStyle = '#333d36'
        c.fillRect(25 + i * 5, 370, 1 + (i % 3), 83)
      }
      print(c, 'No. 0001', 81, 496, 17, '#59635b')
    })
    const rp = screen(receipt, 0.41, 0.83, 0, 0.415, 0.01, receiptTex)
    rp.material.side = THREE.DoubleSide
    receipt.rotation.x = -0.16
    const coin = new THREE.Group()
    coin.userData.moving = true
    cashdesk.add(coin)
    const coinDisc = cyl(coin, 0.22, 0.065, 0, 0, 0, M.amber, undefined, 32)
    coinDisc.rotation.x = Math.PI / 2
    const coinRing = new THREE.Mesh(new THREE.TorusGeometry(0.174, 0.014, 6, 32), M.light)
    coinRing.position.z = 0.037
    coin.add(coinRing)
    const rubleTex = canvasTexture(128, 128, (c, w, h) => {
      c.clearRect(0, 0, w, h)
      c.textAlign = 'center'
      print(c, '$', 64, 95, 91, PALETTE.darkNavy, 650)
    })
    const ruble = screen(coin, 0.28, 0.28, 0, 0, 0.04, rubleTex)
    ruble.material.transparent = true
    cyl(cashdesk, 0.33, 0.09, 1.04, 0.39, 0.55, M.dark)
    cyl(cashdesk, 0.26, 0.025, 1.04, 0.445, 0.55, M.copper)

    // Station 5: Printed Film Rolls & Stock
    const stockStation = stations[5].group
    box(stockStation, 1.88, 0.62, 1.34, 0, 0.65, -0.05, S.ivory, 0.12)
    box(stockStation, 1.96, 0.18, 1.38, 0, 0.42, -0.04, S.body, 0.04)
    // Pallet base
    box(stockStation, 1.5, 0.1, 1.1, 0, 0.88, 0, M.dark, 0.02)
    // Upright rack pillars
    for (const x of [-0.65, 0.65]) {
      cyl(stockStation, 0.05, 1.6, x, 1.65, -0.35, M.chrome)
      cyl(stockStation, 0.05, 1.6, x, 1.65, 0.35, M.chrome)
    }
    // Finished film roll cylinders stored horizontally on the rack
    const r1 = cyl(stockStation, 0.22, 1.15, 0, 1.35, -0.25, M.copper)
    r1.rotation.z = Math.PI / 2
    const r2 = cyl(stockStation, 0.26, 1.15, 0, 1.85, -0.25, M.amber)
    r2.rotation.z = Math.PI / 2
    const r3 = cyl(stockStation, 0.24, 1.15, 0, 1.45, 0.25, M.ivory)
    r3.rotation.z = Math.PI / 2
    // Screen display for inventory
    const stockScreenTex = canvasTexture(512, 176, (c, w, h) => {
      c.fillStyle = PALETTE.darkNavy
      c.fillRect(0, 0, w, h)
      print(c, 'WAREHOUSE STOCK & STAGING', 22, 44, 22, PALETTE.steelBlue, 600)
      print(c, 'PALLETIZED INVENTORY READY', 22, 95, 26, '#f4f1ea', 600)
      print(c, 'Lot GP-2026 · Madurai Plant', 22, 142, 18, '#81848b', 500)
    })
    screen(stockStation, 1.1, 0.4, 0, 2.25, 0.05, stockScreenTex)


    // Conveyor: a closed spline, instanced treads, continuous rails and phase-locked cargo.
    const path = new THREE.CatmullRomCurve3(
      [
        [-3.95, 0.84, 0.65],
        [-3.1, 0.84, -0.12],
        [-1.45, 0.84, -0.79],
        [1.32, 0.84, -0.8],
        [3.3, 0.84, 0.19],
        [3.43, 0.84, 1.21],
        [1.35, 0.84, 2.7],
        [-1.4, 0.84, 2.52],
        [-3.54, 0.84, 1.65],
      ].map((p) => new THREE.Vector3(...p)),
      true,
      'catmullrom',
      0.25
    )
    const belt = new THREE.Group()
    machine.add(belt)
    const frameMesh = new THREE.Mesh(new THREE.TubeGeometry(path, 150, 0.58, 8, true), M.dark)
    frameMesh.scale.y = 0.28
    frameMesh.position.y = 0.51
    belt.add(frameMesh)
    const beltCount = 148,
      beltSlats = new THREE.InstancedMesh(boxGeo(0.14, 0.075, 1.15, 0.015), M.body, beltCount)
    beltSlats.receiveShadow = true
    beltSlats.castShadow = false
    belt.add(beltSlats)
    beltSlats.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    const dummy = new THREE.Object3D(),
      pVec = new THREE.Vector3(),
      tVec = new THREE.Vector3()
    function updateBelt(t: number) {
      for (let i = 0; i < beltCount; i++) {
        const u = (i / beltCount + t * 0.012) % 1
        path.getPointAt(u, pVec)
        path.getTangentAt(u, tVec)
        dummy.position.copy(pVec)
        dummy.rotation.set(0, -Math.atan2(tVec.z, tVec.x), 0)
        dummy.updateMatrix()
        beltSlats.setMatrixAt(i, dummy.matrix)
      }
      beltSlats.instanceMatrix.needsUpdate = true
    }
    updateBelt(0)
    for (const side of [-1, 1]) {
      const pts = []
      const ptsLower = []
      for (let i = 0; i <= 160; i++) {
        path.getPointAt(i / 160, pVec)
        path.getTangentAt(i / 160, tVec)
        pts.push(
          pVec.clone().add(new THREE.Vector3(-tVec.z * 0.61 * side, 0.12, tVec.x * 0.61 * side))
        )
        ptsLower.push(
          pVec.clone().add(new THREE.Vector3(-tVec.z * 0.61 * side, 0.03, tVec.x * 0.61 * side))
        )
      }
      const railPath = new THREE.CatmullRomCurve3(pts)
      belt.add(new THREE.Mesh(new THREE.TubeGeometry(railPath, 160, 0.024, 6, false), M.chrome))
      const lowerRailPath = new THREE.CatmullRomCurve3(ptsLower)
      belt.add(new THREE.Mesh(new THREE.TubeGeometry(lowerRailPath, 160, 0.018, 6, false), M.dark))
    }
    for (let i = 0; i < 16; i++) {
      const p = path.getPointAt(i / 16)
      cyl(belt, 0.06, 0.44, p.x, 0.53, p.z, M.chrome)
      cyl(belt, 0.13, 0.03, p.x, 0.31, p.z, M.dark)
    }
    // Copper pneumatic lines link the station footings independently from the conveyor.
    const pipes = new THREE.Group()
    machine.add(pipes)
    const connectors = []
    for (let i = 0; i < stations.length - 1; i++) {
      const a = stations[i].base,
        b = stations[i + 1].base
      const points = [
        a.clone().add(new THREE.Vector3(0.4, 0.12, 0)),
        a
          .clone()
          .lerp(b, 0.35)
          .add(new THREE.Vector3(0, 0.1, -0.6)),
        a
          .clone()
          .lerp(b, 0.65)
          .add(new THREE.Vector3(0, 0.1, -0.6)),
        b.clone().add(new THREE.Vector3(-0.4, 0.12, 0)),
      ]
      const curve = new THREE.CatmullRomCurve3(points)
      const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 30, 0.054, 8, false), M.copper)
      pipes.add(mesh)
      connectors.push({ mesh, a: i, b: i + 1 })
    }
    const scriptTex = canvasTexture(256, 352, (c, w, h) => {
      c.fillStyle = '#eeeae0'
      c.fillRect(0, 0, w, h)
      print(c, 'JOB TICKET', 24, 47, 21, PALETTE.darkNavy, 650)
      print(c, 'LOT GP-1984', 24, 85, 14, PALETTE.steelBlue)
      for (let i = 0; i < 9; i++) {
        c.fillStyle = i === 4 ? PALETTE.steelBlue : '#9ca3af'
        c.fillRect(24, 111 + i * 21, 190 - (i % 3) * 24, 6)
      }
      print(c, 'PASSED  ✓', 24, 327, 16, PALETTE.darkNavy, 600)
    })
    const orderCardTex = canvasTexture(256, 352, (c, w, h) => {
      c.fillStyle = PALETTE.steelBlue
      c.fillRect(0, 0, w, h)
      print(c, 'NEW', 21, 48, 24, '#30362d', 650)
      print(c, 'ORDER', 21, 79, 24, '#30362d', 650)
      c.strokeStyle = PALETTE.powderBlue
      c.lineWidth = 2
      c.strokeRect(23, 112, 210, 139)
      print(c, 'BATCH', 36, 190, 34, '#30362d', 550)
      print(c, 'POUCH / 01', 23, 320, 17, PALETTE.darkNavy)
    })
    const packetTextures = [orderCardTex, scriptTex, videoTexture, postTex, receiptTex, receiptTex]
    const packets: Array<{
      group: THREE.Group
      faces: THREE.Mesh< THREE.PlaneGeometry, THREE.MeshBasicMaterial>[]
      halo: THREE.Mesh
      stage: number
      phase: number
    }> = []
    for (let i = 0; i < 6; i++) {
      const g = new THREE.Group()
      g.userData.moving = true
      machine.add(g)

      const faces: THREE.Mesh< THREE.PlaneGeometry, THREE.MeshBasicMaterial>[] = []

      if (i % 2 === 0) {
        // Flat printed pouch lying flat on the wider conveyor
        box(g, 0.54, 0.024, 0.76, 0, 0.012, 0, M.ivory, 0.012)
        // Top and bottom heat seal crimp bands
        box(g, 0.542, 0.028, 0.05, 0, 0.014, -0.355, M.edge, 0.005)
        box(g, 0.542, 0.028, 0.05, 0, 0.014, 0.355, M.edge, 0.005)

        // Stage face screen (lying flat on top of the pouch)
        packetTextures.forEach((tex) => {
          const s = screen(g, 0.48, 0.66, 0, 0.027, 0, tex)
          s.rotation.x = -Math.PI / 2
          s.material.side = THREE.DoubleSide
          s.visible = false
          faces.push(s)
        })
      } else {
        // Stacked film rolls on carrier tray
        box(g, 0.62, 0.024, 0.78, 0, 0.012, 0, M.dark, 0.008)
        // Two bottom rolls side-by-side
        const r1 = cyl(g, 0.13, 0.68, -0.16, 0.14, 0, M.amber, undefined, 24)
        r1.rotation.x = Math.PI / 2
        const r1B = cyl(g, 0.133, 0.32, -0.16, 0.14, 0, M.ivory, undefined, 24)
        r1B.rotation.x = Math.PI / 2
        const r1C = cyl(g, 0.04, 0.74, -0.16, 0.14, 0, M.chrome, undefined, 12)
        r1C.rotation.x = Math.PI / 2

        const r2 = cyl(g, 0.13, 0.68, 0.16, 0.14, 0, M.ivory, undefined, 24)
        r2.rotation.x = Math.PI / 2
        const r2B = cyl(g, 0.133, 0.32, 0.16, 0.14, 0, M.amber, undefined, 24)
        r2B.rotation.x = Math.PI / 2
        const r2C = cyl(g, 0.04, 0.74, 0.16, 0.14, 0, M.chrome, undefined, 12)
        r2C.rotation.x = Math.PI / 2

        // Top roll nestled on bottom two (pyramid stack)
        const r3 = cyl(g, 0.13, 0.68, 0, 0.37, 0, M.amber, undefined, 24)
        r3.rotation.x = Math.PI / 2
        const r3B = cyl(g, 0.133, 0.32, 0, 0.37, 0, M.ivory, undefined, 24)
        r3B.rotation.x = Math.PI / 2
        const r3C = cyl(g, 0.04, 0.74, 0, 0.37, 0, M.chrome, undefined, 12)
        r3C.rotation.x = Math.PI / 2

        // Stage face screen attached to tray side
        packetTextures.forEach((tex) => {
          const s = screen(g, 0.38, 0.22, 0, 0.026, 0.34, tex)
          s.material.side = THREE.DoubleSide
          s.visible = false
          faces.push(s)
        })
      }

      // Steel tracking halo ring lying flat on the conveyor bed around cargo
      const halo = new THREE.Mesh(
        new THREE.RingGeometry(0.56, 0.585, 40),
        new THREE.MeshBasicMaterial({
          color: PALETTE_HEX.steelBlue,
          transparent: true,
          opacity: 0.85,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      )
      halo.rotation.x = -Math.PI / 2
      halo.position.y = 0.02
      g.add(halo)
      halo.visible = false
      packets.push({ group: g, faces, halo, stage: -1, phase: 0 })
    }
    let adminU = 0.2,
      storeU = 0.37,
      cashU = 0.72
    // Find ports by arc length, so the travelling order arrives at the actual station.
    function nearestPort(x: number, z: number) {
      let best = 0,
        dist = Infinity
      for (let i = 0; i < 300; i++) {
        const p = path.getPointAt(i / 300),
          d = (p.x - x) ** 2 + (p.z - z) ** 2
        if (d < dist) {
          dist = d
          best = i / 300
        }
      }
      return best
    }
    adminU = nearestPort(-1.65, -0.7)
    storeU = nearestPort(1.5, -0.7)
    cashU = nearestPort(0.93, 2.65)

    // Merge static geometry per parent/material. Moving assemblies remain separate.
    function compact(group: THREE.Object3D) {
      for (const child of [...group.children]) if ((child as THREE.Group).isGroup) compact(child)
      const buckets = new Map< string, THREE.Mesh< THREE.BufferGeometry, THREE.Material>[]>()
      for (const object of group.children) {
        const child = object as THREE.Mesh< THREE.BufferGeometry, THREE.Material> & {
          isInstancedMesh?: boolean
        }
        if (
          !child.isMesh ||
          child.isInstancedMesh ||
          child.userData.moving ||
          Array.isArray(child.material)
        )
          continue
        const key = child.material.uuid
        if (!buckets.has(key)) buckets.set(key, [])
        buckets.get(key)!.push(child)
      }
      for (const list of buckets.values()) {
        if (list.length < 2) continue
        const geos = list.map((m) => {
          m.updateMatrix()
          const g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone()
          return g.applyMatrix4(m.matrix)
        })
        const merged = mergeGeometries(geos, false)
        for (const geo of geos) geo.dispose()
        if (!merged) continue
        const mesh = new THREE.Mesh(merged, list[0].material)
        mesh.castShadow = list.some((x) => x.castShadow)
        mesh.receiveShadow = list.some((x) => x.receiveShadow)
        for (const m of list) group.remove(m)
        group.add(mesh)
      }
    }
    // These references are animated individually and must not be merged into their parent.
    ;[
      incoming,
      receipt,
      coin,
      pouchSample,
      flyPost,
      printhead,
      horizontalRoll,
      blownFilmBubble,
    ].forEach((g) => (g.userData.moving = true))
    compact(machine)
    stations.forEach((s) =>
      s.group.traverse((o) => {
        o.userData.station = s.id
      })
    )
    const pickables = stations.map((s) => s.group)

    let mode: MachineMode = 'assembled',
      cameraMode: MachineCamera = 'overview',
      playing = !reduceMotion,
      simTime = 0,
      spread = 0,
      selected: string = 'engine',
      hovered: string | null = null,
      activeHotspot: MachineStationConfig | null = null

    let width = frameWidth(),
      height = frameHeight(),
      mobile = width < 768,
      lastInteraction = -10000,
      dragging = false,
      wasDragged = false,
      downX = 0,
      downY = 0
    let cameraAnimating = !embedded,
      flightTime = 0,
      lastDraw = -1,
      visible = true,
      contextLost = false
    const desiredPosition = new THREE.Vector3(),
      desiredTarget = new THREE.Vector3(0, 1, 0)
    const viewDirection = new THREE.Vector3(10.5, 10.8, 17).normalize()
    const hotspotAnchor = new THREE.Vector3()
    let baseDistance = 25,
      sized = false,
      readySent = false
    function updateHotspots() {
      const refs = options.hotspotRefs?.current
      if (!refs || !width || !height) return
      MACHINE_STATIONS.forEach((st, idx) => {
        const btn = refs[idx]
        if (!btn) return
        hotspotAnchor.set(st.anchor[0], st.anchor[1], st.anchor[2])
        hotspotAnchor.project(camera)
        if (hotspotAnchor.z > 1) {
          btn.style.opacity = '0'
          btn.style.pointerEvents = 'none'
          return
        }
        const x = (hotspotAnchor.x * 0.5 + 0.5) * width
        const y = (-hotspotAnchor.y * 0.5 + 0.5) * height
        btn.style.opacity = '1'
        btn.style.pointerEvents = 'auto'
        btn.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate3d(-50%, -50%, 0)`
      })
    }
    // A zero-size embed (an iframe inside a collapsed panel) used to send the camera to infinity: aspect 0
    // put NaN into the uniforms and left the scene black for good. Wait for a real size; the first real
    // size places the camera at once, without a fly-in.
    function layoutCamera() {
      if (!frameWidth() || !frameHeight()) return
      const first = !sized
      sized = true
      width = frameWidth()
      height = frameHeight()
      mobile = width < 768
      renderer.setSize(width, height)
      camera.aspect = width / height
      // Embedded in a wide landing hero, a shifted frustum centers the machine in the right 56%
      // (leaving the left side clear for the hero headline) without clipping the right edge.
      camera.setViewOffset(
        width,
        height,
        mobile || !embedded ? 0 : -width * 0.17,
        mobile || !embedded ? 0 : height * 0.02,
        width,
        height
      )
      const aspect = width / height
      const availableWidth = mobile ? 0.88 : Math.min(0.50, aspect > 2 ? 0.48 : 0.50)
      const horizontalFit =
        17.3 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * aspect * availableWidth)
      const verticalFit =
        11.5 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (embedded ? 0.82 : 0.62))
      baseDistance =
        Math.max(horizontalFit, verticalFit) * (mobile ? 1.06 : 1.08)
      controls.maxDistance = Math.max(60, baseDistance * 1.6)
      camera.updateProjectionMatrix()
      setCameraGoal()
      if (first || (embedded && !activeHotspot)) {
        camera.position.copy(desiredPosition)
        controls.target.copy(desiredTarget)
        controls.update()
        cameraAnimating = false
        updateHotspots()
      } else if (reduceMotion) {
        camera.position.copy(desiredPosition)
        controls.target.copy(desiredTarget)
        controls.update()
        cameraAnimating = false
        renderSingleFrame()
      } else {
        cameraAnimating = true
      }
    }
    function setCameraGoal() {
      const expand = mode === 'stations' ? 1.2 : 1
      if (cameraMode === 'station') {
        if (activeHotspot) {
          desiredTarget.set(...activeHotspot.cameraTarget)
          desiredPosition.set(...activeHotspot.cameraPosition)
          if (mobile) {
            desiredPosition.sub(desiredTarget).multiplyScalar(1.15).add(desiredTarget)
          }
        } else {
          const s = stations.find((s) => s.id === selected)!
          desiredTarget.copy(s.group.position).add(new THREE.Vector3(0, 1.25, 0))
          desiredPosition.copy(desiredTarget).addScaledVector(viewDirection, mobile ? 9 : 12)
        }
      } else {
        desiredTarget.set(0, 1, 0)
        const distance = baseDistance * expand
        if (cameraMode === 'side')
          desiredPosition.set(13, 5, 20).normalize().multiplyScalar(distance).add(desiredTarget)
        else if (cameraMode === 'top') desiredPosition.set(0.01, distance, 0.8).add(desiredTarget)
        else desiredPosition.copy(viewDirection).multiplyScalar(distance).add(desiredTarget)
      }
    }
    function syncButtons() {
      root
        .querySelectorAll< HTMLElement>('[data-mode]')
        .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)))
      root
        .querySelectorAll< HTMLElement>('[data-camera]')
        .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.camera === cameraMode)))
      $('journey').classList.toggle('visible', mode === 'order')
    }
    const modeAliases: Record< string, MachineMode> = {
      Assembled: 'assembled',
      Cutaway: 'cutaway',
      Stations: 'stations',
      'One order': 'order',
      assembled: 'assembled',
      cutaway: 'cutaway',
      stations: 'stations',
      order: 'order',
    }
    const cameraAliases: Record< string, MachineCamera> = {
      Overview: 'overview',
      Side: 'side',
      Top: 'top',
      Station: 'station',
      Flight: 'flight',
      overview: 'overview',
      side: 'side',
      top: 'top',
      station: 'station',
      flight: 'flight',
    }
    function setMode(name: string) {
      if (!Object.hasOwn(modeAliases, name)) return false
      const next = modeAliases[name]
      mode = next
      lastInteraction = performance.now()
      if (mode === 'order') {
        simTime = 0
        lastDraw = -1
        play()
        cameraMode = 'overview'
      } else if (cameraMode === 'station') cameraMode = 'overview'
      setCameraGoal()
      cameraAnimating = true
      syncButtons()
      return true
    }
    function focusStation(id: string) {
      const s = stations.find((s) => s.id === id)
      if (!s) return false
      activeHotspot = null
      selected = id
      if (mode === 'order') mode = 'assembled'
      cameraMode = 'station'
      lastInteraction = performance.now()
      setCameraGoal()
      if (reduceMotion || motionQuery?.matches) {
        camera.position.copy(desiredPosition)
        controls.target.copy(desiredTarget)
        controls.update()
        cameraAnimating = false
        renderSingleFrame()
      } else {
        cameraAnimating = true
        if (!isAnimating && visible && !contextLost) startLoop()
      }
      syncButtons()
      return true
    }
    function focusHotspot(id: string | null) {
      lastInteraction = performance.now()
      const isReduced = reduceMotion || Boolean(motionQuery?.matches)
      if (!id) {
        activeHotspot = null
        cameraMode = 'overview'
        setCameraGoal()
        if (isReduced) {
          camera.position.copy(desiredPosition)
          controls.target.copy(desiredTarget)
          controls.update()
          cameraAnimating = false
          renderSingleFrame()
        } else {
          cameraAnimating = true
          if (!isAnimating && visible && !contextLost) startLoop()
        }
        syncButtons()
        return true
      }
      const match = MACHINE_STATIONS.find((st) => st.id === id)
      if (!match) return false
      activeHotspot = match
      selected = match.id
      if (mode === 'order') mode = 'assembled'
      cameraMode = 'station'
      setCameraGoal()
      if (isReduced) {
        camera.position.copy(desiredPosition)
        controls.target.copy(desiredTarget)
        controls.update()
        cameraAnimating = false
        renderSingleFrame()
      } else {
        cameraAnimating = true
        if (!isAnimating && visible && !contextLost) startLoop()
      }
      syncButtons()
      return true
    }
    function setCamera(name: string) {
      if (!Object.hasOwn(cameraAliases, name)) return false
      const next = cameraAliases[name]
      cameraMode = next
      if (mode === 'order') mode = 'assembled'
      lastInteraction = performance.now()
      flightTime = 0
      setCameraGoal()
      cameraAnimating = true
      syncButtons()
      return true
    }
    function syncPlayback() {
      const b = $('play')
      b.setAttribute('aria-label', playing ? 'Pause the animation' : 'Resume the animation')
      b.setAttribute('aria-pressed', String(!playing))
      b.innerHTML = playing
        ? '<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="1" width="2.5" height="10" rx=".5"/><rect x="7.5" y="1" width="2.5" height="10" rx=".5"/></svg>'
        : '<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M3 1l8 5-8 5z"/></svg>'
      $('status').classList.toggle('paused', !playing)
      $('status-text').textContent = playing ? 'Machine running' : 'Machine paused'
    }
    function play() {
      playing = true
      syncPlayback()
      return true
    }
    function pause() {
      playing = false
      syncPlayback()
      return true
    }
    const api: MachineApi = { setMode, focusStation, focusHotspot, setCamera, play, pause }
    window.__machine = api
    cleanups.push(() => {
      if (window.__machine === api) delete window.__machine
    })
    root
      .querySelectorAll< HTMLElement>('[data-mode]')
      .forEach((b) => listen(b, 'click', () => setMode(b.dataset.mode ?? '')))
    root
      .querySelectorAll< HTMLElement>('[data-camera]')
      .forEach((b) => listen(b, 'click', () => setCamera(b.dataset.camera ?? '')))
    listen($('play'), 'click', () => (playing ? pause() : play()))
    syncPlayback()
    layoutCamera()
    camera.position.copy(desiredPosition)
    controls.target.copy(desiredTarget)
    controls.update()
    cameraAnimating = false
    listen(window, 'resize', layoutCamera)
    const resizeObserver = new ResizeObserver(() => layoutCamera())
    resizeObserver.observe(root)
    cleanups.push(() => resizeObserver.disconnect())
    controls.addEventListener('start', () => {
      dragging = true
      cameraAnimating = false
      lastInteraction = performance.now()
    })
    controls.addEventListener('end', () => {
      dragging = false
      lastInteraction = performance.now()
    })
    controls.addEventListener('change', () => {
      if (dragging) lastInteraction = performance.now()
    })
    const raycaster = new THREE.Raycaster(),
      pointer = new THREE.Vector2()
    function hitStation(x: number, y: number) {
      pointer.set((x / width) * 2 - 1, (-y / height) * 2 + 1)
      raycaster.setFromCamera(pointer, camera)
      const hits = raycaster.intersectObjects(pickables, true)
      return hits.length ? stations.find((s) => s.id === hits[0].object.userData.station) : null
    }
    const sceneIdToHotspot: Record<string, MachineStationConfig['id']> = {
      flexo: 'extrusion',
      rotogravure: 'rotogravure',
      packing: 'packing',
      inspection: 'inspection',
    }
    listen(renderer.domElement, 'pointermove', (e: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      if (Math.hypot((e.clientX - rect.left) - downX, (e.clientY - rect.top) - downY) > 5) wasDragged = true
      if (dragging) return
      const s = hitStation(e.clientX - rect.left, e.clientY - rect.top)
      hovered = s ? s.id : null
      renderer.domElement.style.cursor = s ? 'pointer' : 'grab'
    })
    listen(renderer.domElement, 'pointerleave', () => {
      hovered = null
    })
    listen(renderer.domElement, 'pointerdown', (e: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      downX = e.clientX - rect.left
      downY = e.clientY - rect.top
      wasDragged = false
    })
    listen(renderer.domElement, 'pointerup', (e: PointerEvent) => {
      if (wasDragged) return
      const rect = root.getBoundingClientRect()
      const s = hitStation(e.clientX - rect.left, e.clientY - rect.top)
      if (!s) return
      const mapped = sceneIdToHotspot[s.id]
      if (mapped) {
        focusHotspot(mapped)
        options.onSelectStation?.(mapped)
      } else {
        focusStation(s.id)
      }
      options.onStation?.(s.id as StationId)
    })
    let rafId = 0
    let isAnimating = false
    let isIntersecting = true

    function renderSingleFrame() {
      if (contextLost || !sized) return
      controls.autoRotate = false
      controls.update(0)
      updateHotspots()
      renderer.render(scene, camera)
      if (!readySent) {
        readySent = true
        options.onReady?.()
      }
    }

    function startLoop() {
      if (reduceMotion) {
        renderSingleFrame()
        return
      }
      if (isAnimating || !visible || contextLost) return
      isAnimating = true
      lastFrame = performance.now()
      rafId = requestAnimationFrame(animate)
    }

    function stopLoop() {
      if (!isAnimating && !rafId) return
      isAnimating = false
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = 0
      }
      controls.autoRotate = false
    }

    if (motionQuery) {
      const onMotionChange = (e: MediaQueryListEvent) => {
        reduceMotion = e.matches
        if (reduceMotion) {
          playing = false
          syncPlayback()
          stopLoop()
          renderSingleFrame()
        } else {
          playing = true
          syncPlayback()
          if (visible) startLoop()
        }
      }
      motionQuery.addEventListener('change', onMotionChange)
      cleanups.push(() => motionQuery.removeEventListener('change', onMotionChange))
    }

    controls.addEventListener('change', () => {
      updateHotspots()
      if (reduceMotion && visible && !isAnimating) {
        renderer.render(scene, camera)
      }
    })

    listen(document, 'visibilitychange', () => {
      visible = !document.hidden && isIntersecting
      if (visible) {
        startLoop()
      } else {
        stopLoop()
      }
    })
    const observer = new IntersectionObserver(
      (entries) => {
        isIntersecting = entries[0].isIntersecting
        visible = isIntersecting && !document.hidden
        if (visible) {
          startLoop()
        } else {
          stopLoop()
        }
      },
      { threshold: 0.01 }
    )
    observer.observe(renderer.domElement)
    cleanups.push(() => {
      observer.disconnect()
      stopLoop()
    })
    listen(renderer.domElement, 'webglcontextlost', (e: Event) => {
      e.preventDefault()
      contextLost = true
      stopLoop()
      triggerFallback()
    })
    listen(renderer.domElement, 'webglcontextrestored', () => {
      contextLost = false
      lastFrame = performance.now()
    })

    const scratch = new THREE.Vector3(),
      anchor = new THREE.Vector3()
    const journeySteps = [
      ['Flexo Printing', 'Station 01 · Surface priming and base flexographic print'],
      ['8-Color Rotogravure', 'Station 02 · High-definition cylinder engraving & print'],
      ['Film Lamination', 'Station 03 · Solventless barrier film adhesive bonding'],
      ['Automated Inspection', 'Station 04 · High-speed optical defect and seal scanning'],
      ['Packing & Conveying', 'Station 05 · Robotic counting, wicket bundling & carton packing'],
      ['Rolls & Stock Staging', 'Station 06 · Palletised climate-controlled inventory dispatch'],
    ]
    let prevJourney = -1,
      lastFrame = performance.now(),
      frameCount = 0,
      measureTime = 0,
      pixelRatio = renderer.getPixelRatio()
    function animate(now: number) {
      if (!isAnimating || !visible || contextLost) {
        isAnimating = false
        rafId = 0
        controls.autoRotate = false
        return
      }
      rafId = requestAnimationFrame(animate)
      const dt = Math.max(0, Math.min((now - lastFrame) / 1000, 0.045))
      lastFrame = now
      if (!visible || contextLost) return
      if (playing) {
        simTime += dt
        flightTime += dt
      }
      const t = simTime,
        beat = (t / 4) % 1,
        tact = (t * TAU) / 4,
        smooth = 1 - Math.exp(-dt * 5)
      spread = THREE.MathUtils.lerp(spread, mode === 'stations' ? 1 : 0, smooth)
      cutPlane.constant = THREE.MathUtils.lerp(
        cutPlane.constant,
        mode === 'cutaway' ? 0.99 : 10,
        smooth
      )
      stations.forEach((s, i) => {
        s.group.position.copy(s.base)
        s.group.position.x *= 1 + spread * 0.29
        s.group.position.z *= 1 + spread * 0.37
        s.group.position.y += spread * (i % 2 ? 0.32 : 0.55)
        const pulse = Math.pow(Math.max(0, Math.sin(tact - i * 0.9)), 7)
        s.glowMat.emissiveIntensity = THREE.MathUtils.lerp(
          s.glowMat.emissiveIntensity,
          hovered === s.id || (cameraMode === 'station' && selected === s.id)
            ? 3.5
            : 0.55 + pulse * 0.65,
          smooth
        )
      })
      belt.scale.set(1 + spread * 0.12, 1, 1 + spread * 0.15)
      pipes.scale.set(1 + spread * 0.25, 1, 1 + spread * 0.3)
      gears.forEach(({ g, vertical }, i) => {
        if (vertical) g.rotation.z = t * (i % 2 ? -1 : 1) * 1.1
        else g.rotation.y = t * (i % 2 ? -1 : 1) * 1.1
      })
      horizontalRoll.rotation.x = -t * 0.4
      blownFilmBubble.scale.x = 1 + Math.sin(tact * 1.5) * 0.015
      blownFilmBubble.scale.z = 1 + Math.cos(tact * 1.5) * 0.015
      printhead.position.x = Math.sin(tact) * 0.42
      printhead.position.y = 1.91 + Math.sin(tact * 2) * 0.055
      flyPost.position.y = Math.sin(tact) * 0.04
      const orderPhase = (t / 24) % 1,
        cashBeat = mode === 'order' ? THREE.MathUtils.clamp((orderPhase - 0.88) / 0.12, 0, 1) : beat
      receipt.visible = coin.visible = mode !== 'order' || orderPhase > 0.88
      receipt.scale.y = 0.2 + Math.min(1, cashBeat * 1.5) * 0.8
      coin.position.set(1.04, 2.7 - Math.min(1, cashBeat * 1.7) ** 2 * 2.17, 0.55)
      coin.rotation.y = t * 3.5
      coin.scale.setScalar(cashBeat > 0.9 ? 1 - (cashBeat - 0.9) * 8 : 1)
      const incomingBeat = mode === 'order' ? Math.min(1, orderPhase / 0.15) : beat
      incoming.visible = mode !== 'order' || orderPhase < 0.15
      incoming.position.set(
        Math.sin(incomingBeat * Math.PI) * 0.24,
        2.9 - incomingBeat * 1.9,
        1.1 - incomingBeat * 0.55
      )
      incoming.rotation.z = Math.sin(incomingBeat * Math.PI) * -0.14
      incoming.scale.setScalar(Math.min(1, incomingBeat * 8 + 0.15, (1 - incomingBeat) * 7 + 0.1))
      toggles.forEach((o, i) => (o.rotation.x = Math.sin(tact + i) > 0 ? -0.4 : 0.4))
      if (t - lastDraw > 1 / 18 || lastDraw < 0) {
        drawVideo(t)
        drawQueue(t)
        queue.texture.needsUpdate = true
        updateBelt(t)
        lastDraw = t
      }
      packets.forEach((packet, i) => {
        const phase = (t / 24 + i / 6) % 1
        packet.phase = phase
        path.getPointAt(phase, pVec)
        path.getTangentAt(phase, tVec)
        packet.group.position.copy(pVec)
        packet.group.position.x *= 1 + spread * 0.12
        packet.group.position.z *= 1 + spread * 0.15
        packet.group.position.y += 0.04
        packet.group.rotation.set(0, -Math.atan2(tVec.z, tVec.x) + Math.PI / 2, 0)
        const stage = Math.min(5, Math.floor(phase * 6))
        if (packet.stage !== stage) {
          packet.faces.forEach((f, j) => (f.visible = j === stage))
          packet.stage = stage
        }
        packet.group.visible = mode !== 'order' || i === 0
        packet.halo.visible = mode === 'order' && i === 0
        packet.group.scale.setScalar(mode === 'order' ? 1.25 : 1)
        if (phase > 0.94) packet.group.scale.multiplyScalar(Math.max(0.05, (1 - phase) / 0.06))
      })
      if (mode === 'order') {
        const packet = packets[0],
          step = packet.stage
        if (step !== prevJourney) {
          $('journey-title').textContent = journeySteps[step][0]
          $('journey-detail').textContent = journeySteps[step][1]
          prevJourney = step
        }
        $('journey-progress').style.transform = `scaleX(${packet.phase})`
        if (!dragging && playing) {
          desiredTarget.copy(packet.group.position)
          desiredPosition.copy(desiredTarget).addScaledVector(viewDirection, mobile ? 10 : 15)
          cameraAnimating = true
        }
      } else if (cameraMode === 'flight' && playing && !dragging) {
        const a = flightTime * 0.12,
          d = baseDistance * (mode === 'stations' ? 1.2 : 1)
        desiredTarget.set(0, 1, 0)
        desiredPosition
          .set(
            Math.sin(a + 0.55) * d * 0.83,
            d * (0.5 + Math.sin(a * 0.7) * 0.09),
            Math.cos(a + 0.55) * d * 0.83
          )
          .add(desiredTarget)
        cameraAnimating = true
      } else if (cameraMode === 'station' && cameraAnimating) setCameraGoal()
      if (cameraAnimating && !dragging) {
        const speed = 1 - Math.exp(-dt * (mode === 'order' ? 2.2 : 6.5))
        camera.position.lerp(desiredPosition, speed)
        controls.target.lerp(desiredTarget, speed)
        if (
          cameraMode !== 'flight' &&
          mode !== 'order' &&
          camera.position.distanceTo(desiredPosition) < 0.015 &&
          controls.target.distanceTo(desiredTarget) < 0.015
        )
          cameraAnimating = false
      }
      controls.autoRotate =
        playing &&
        !reduceMotion &&
        !dragging &&
        !cameraAnimating &&
        !activeHotspot &&
        mode !== 'order' &&
        cameraMode === 'overview' &&
        now - lastInteraction > 6500
      controls.autoRotateSpeed = 0.24
      controls.update(dt)
      updateHotspots()
      // Project station callouts after the camera update, clamping them inside the iframe.
      stations.forEach((s, i) => {
        const show = mode === 'stations'
        s.label.classList.toggle('visible', show)
        if (!show) return
        anchor.copy(s.group.position).add(s.anchor).project(camera)
        const offsets = mobile
          ? [
              [-30, 25],
              [-27, -50],
              [15, -65],
              [16, -1],
              [-5, 52],
            ]
          : [
              [-48, -14],
              [-8, -64],
              [30, -12],
              [30, 20],
              [-12, 40],
            ]
        let x = (anchor.x * 0.5 + 0.5) * width - 40 + offsets[i][0],
          y = (-anchor.y * 0.5 + 0.5) * height - 52 + offsets[i][1]
        // Embedded in a wide hero the callouts stay out of the headline side (the left 42.5%).
        x = THREE.MathUtils.clamp(
          x,
          mobile || !embedded ? 9 : width * 0.425,
          width - (mobile ? 123 : 165)
        )
        y = THREE.MathUtils.clamp(y, 130, height - 200)
        s.label.style.transform = `translate(${x}px,${y}px)`
      })
      renderer.render(scene, camera)
      // The first real frame is ready: the host page can fade the scene in or drop its poster.
      if (!readySent && sized) {
        readySent = true
        options.onReady?.()
      }
      // Reduce only raster resolution on sustained slow devices; geometry and timing stay identical.
      if (playing) {
        frameCount++
        measureTime += dt
        if (measureTime > 4) {
          if (frameCount / measureTime < 43 && pixelRatio > 1) {
            pixelRatio = Math.max(1, pixelRatio - 0.25)
            renderer.setPixelRatio(pixelRatio)
          }
          frameCount = 0
          measureTime = 0
        }
      }
    }
    startLoop()
    cleanups.push(() => {
      stopLoop()
      cancelAnimationFrame(rafId)
      controls.dispose()
      // Free every GPU resource the scene created, then the context itself.
      const textures = new Set< THREE.Texture>()
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        const list = mesh.material
          ? Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material]
          : []
        for (const material of list) {
          for (const value of Object.values(material))
            if (value instanceof THREE.Texture) textures.add(value)
          material.dispose()
        }
      })
      geometries.forEach((g) => g.dispose())
      textures.forEach((t) => t.dispose())
      env.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      renderer.domElement.remove()
    })
    renderer.compile(scene, camera)

    $('loading').classList.add('done')
    // Lightweight inspection for integration and automated browser checks; no production UI.
    Object.defineProperty(window, '__machineDebug', {
      value: {
        getState: () => ({
          mode,
          camera: cameraMode,
          playing,
          activeHotspot: activeHotspot?.id ?? null,
          cameraAnimating,
          time: simTime,
          spread,
          cutHeight: cutPlane.constant,
          width,
          height,
          embedded,
          drawCalls: renderer.info.render.calls,
          triangles: renderer.info.render.triangles,
          pixelRatio: renderer.getPixelRatio(),
          stations: stations.map((s) => {
            const p = s.group.position
              .clone()
              .add(new THREE.Vector3(0, 1, 0))
              .project(camera)
            return { id: s.id, x: (p.x * 0.5 + 0.5) * width, y: (-0.5 * p.y + 0.5) * height }
          }),
        }),
      },
      configurable: true,
    })
    cleanups.push(() => {
      delete window.__machineDebug
    })
  } catch (error) {
    console.warn('Machine: switching to static fallback', error)
    triggerFallback()
  }
  return dispose
}

// ---------------------------------------------------------------------------
// Styles: app/globals.css of the template, scoped to .agentic-factory-3d.
// ---------------------------------------------------------------------------

const STYLES = String.raw`
.agentic-factory-3d {
  width: 100%;
  contain: layout paint;
}
.agentic-factory-3d {
  color-scheme: dark;
  --bg: #1D3557;
  --white: #F1FAEE;
  --amber: #457B9D;
  --muted: #81848b;
  --line: rgba(241, 250, 238, 0.11);
}
.agentic-factory-3d, .agentic-factory-3d * {
  box-sizing: border-box;
}
.agentic-factory-3d {
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent;
}
.agentic-factory-3d {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: var(--white);
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
}
.agentic-factory-3d {
  position: relative;
  overflow: hidden;
}
.agentic-factory-3d button,
.agentic-factory-3d a {
  -webkit-tap-highlight-color: transparent;
}
.agentic-factory-3d button {
  font: inherit;
  color: inherit;
  cursor: pointer;
}
.agentic-factory-3d button:focus-visible,
.agentic-factory-3d a:focus-visible {
  outline: 2px solid var(--amber);
  outline-offset: 5px;
}
.agentic-factory-3d #scene {
  position: absolute;
  inset: 0;
  touch-action: none;
  outline: none;
}
.agentic-factory-3d #scene canvas {
  display: block;
  width: 100%;
  height: 100%;
}
.agentic-factory-3d .vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse at 50% 48%,
    transparent 30%,
    rgba(61, 14, 24, 0.12) 64%,
    rgba(61, 14, 24, 0.75) 100%
  );
}
.agentic-factory-3d .topbar {
  position: absolute;
  inset: 24px 32px auto 220px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
}
.agentic-factory-3d .identity {
  display: flex;
  gap: 13px;
  align-items: center;
}
.agentic-factory-3d .mark {
  width: 30px;
  height: 30px;
  border: 1px solid #55502f;
  border-radius: 9px;
  display: grid;
  place-items: center;
  color: var(--amber);
  background: #1c1b14;
}
.agentic-factory-3d .identity strong {
  display: block;
  font-weight: 550;
  letter-spacing: -0.2px;
  font-size: 13px;
}
.agentic-factory-3d .identity small {
  display: block;
  margin-top: 5px;
  font-size: 9px;
  letter-spacing: 1.55px;
  color: #73777f;
  text-transform: uppercase;
}
.agentic-factory-3d .status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  letter-spacing: 0.1px;
  color: #a6a79f;
}
.agentic-factory-3d .status i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--amber);
  box-shadow: 0 0 10px #457B9D60;
}
.agentic-factory-3d .status.paused i {
  background: #777;
  box-shadow: none;
}
.agentic-factory-3d .status span:last-child {
  font-variant-numeric: tabular-nums;
  color: #646971;
  margin-left: 12px;
}
.agentic-factory-3d .scene-heading {
  position: absolute;
  top: 110px;
  left: 24%;
  right: 24%;
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 9px;
  letter-spacing: 1.8px;
  color: #959790;
  text-transform: uppercase;
}
.agentic-factory-3d .scene-heading:before {
  content: '';
  width: 22px;
  height: 1px;
  background: var(--amber);
}
.agentic-factory-3d .scene-heading .index {
  margin-left: auto;
  color: #4e535b;
  font-size: 9px;
  letter-spacing: 1px;
}
.agentic-factory-3d .coordinates {
  position: absolute;
  top: 150px;
  right: 33px;
  color: #52575f;
  writing-mode: vertical-rl;
  font:
    9px var(--font-mono),
    ui-monospace,
    monospace;
  font-variant-numeric: tabular-nums;
  letter-spacing: 1.5px;
  pointer-events: none;
}
.agentic-factory-3d .controls {
  position: absolute;
  bottom: 79px;
  left: 26px;
  right: 26px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  z-index: 5;
}
.agentic-factory-3d svg {
  flex-shrink: 0;
  display: block;
}
.agentic-factory-3d .camera-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.agentic-factory-3d .camera-row .caption {
  font-size: 9px;
  letter-spacing: 1.4px;
  color: #555b65;
  margin-right: 9px;
}
.agentic-factory-3d .camera-row button {
  border: 0;
  background: transparent;
  color: #6e747e;
  padding: 5px 9px;
  font-size: 10px;
  transition: color 0.2s ease-in-out;
}
.agentic-factory-3d .camera-row button:hover,
.agentic-factory-3d .camera-row button[aria-pressed='true'] {
  color: var(--white);
}
.agentic-factory-3d .camera-row button[aria-pressed='true']:after {
  content: '';
  display: block;
  width: 3px;
  height: 3px;
  background: var(--amber);
  border-radius: 50%;
  margin: 5px auto -8px;
}
.agentic-factory-3d .camera-row .divider {
  width: 1px;
  height: 13px;
  background: var(--line);
  margin: 0 8px;
}
.agentic-factory-3d .camera-row #play {
  padding: 5px;
  width: 25px;
  height: 25px;
  display: grid;
  place-items: center;
}
.agentic-factory-3d .footer {
  position: absolute;
  bottom: 25px;
  left: 32px;
  right: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  pointer-events: none;
}
.agentic-factory-3d .wordmark {
  font-size: 11px;
  letter-spacing: -0.1px;
  color: #6d7178;
  text-decoration: none;
  pointer-events: auto;
}
.agentic-factory-3d .wordmark span {
  color: #a1a49f;
}
.agentic-factory-3d .hint {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #636972;
  font-size: 10px;
}
.agentic-factory-3d .hint svg {
  color: #8c8f91;
}
.agentic-factory-3d .footer-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font:
    9px var(--font-mono),
    ui-monospace,
    monospace;
  font-variant-numeric: tabular-nums;
  letter-spacing: 1.5px;
  color: #3f454d;
}
.agentic-factory-3d #labels {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.agentic-factory-3d #hotspots {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 6;
}
.agentic-factory-3d .hotspot-pin {
  position: absolute;
  left: 0;
  top: 0;
  width: 30px;
  height: 30px;
  padding: 0;
  border-radius: 9999px;
  background: #1D3557;
  border: 1px solid #A8DADC;
  color: #F1FAEE;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-variant-numeric: tabular-nums;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  box-shadow: 0 4px 14px rgba(29, 53, 87, 0.35);
  transition: background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
  pointer-events: auto;
  cursor: pointer;
}
.agentic-factory-3d .hotspot-pin::after {
  content: '';
  position: absolute;
  inset: -7px;
}
.agentic-factory-3d .hotspot-pin:hover {
  border-color: #F1FAEE;
  box-shadow: 0 0 0 3px rgba(168, 218, 220, 0.35), 0 6px 18px rgba(29, 53, 87, 0.45);
}
.agentic-factory-3d .hotspot-pin.active {
  border-color: #E63946;
  box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.35), 0 6px 18px rgba(29, 53, 87, 0.45);
}
.agentic-factory-3d .hotspot-ring {
  position: absolute;
  inset: -4px;
  border-radius: 9999px;
  border: 1px solid rgba(230, 57, 70, 0.65);
  opacity: 0;
  pointer-events: none;
}
.agentic-factory-3d .hotspot-pin.active .hotspot-ring {
  opacity: 1;
  animation: hotspot-pulse 1.8s ease-out infinite;
}
.agentic-factory-3d .hotspot-dot {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 7px;
  height: 7px;
  border-radius: 9999px;
  background: #E63946;
  border: 1px solid #F1FAEE;
}
@keyframes hotspot-pulse {
  0% {
    transform: scale(0.95);
    opacity: 0.9;
  }
  70% {
    transform: scale(1.38);
    opacity: 0;
  }
  100% {
    transform: scale(1.38);
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .agentic-factory-3d .hotspot-pin.active .hotspot-ring {
    animation: none !important;
  }
}
.agentic-factory-3d .station-label {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  will-change: transform;
  pointer-events: none;
  min-width: 138px;
}
.agentic-factory-3d .station-label.visible {
  opacity: 1;
}
.agentic-factory-3d .station-label .stem {
  height: 26px;
  width: 1px;
  background: linear-gradient(rgba(168, 218, 220, 0), #A8DADC);
  margin: 0 0 0 10px;
}
.agentic-factory-3d .station-label .label-card {
  background: #1D3557f5;
  border: 1px solid #A8DADC;
  border-radius: 6px;
  padding: 10px 13px;
  box-shadow: 0 8px 24px rgba(29, 53, 87, 0.28);
  color: #F1FAEE;
}
.agentic-factory-3d .station-label .label-title {
  font-weight: 600;
  font-size: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  white-space: nowrap;
  color: #F1FAEE;
}
.agentic-factory-3d .station-label .label-title span {
  color: #A8DADC;
  font-weight: 700;
  font:
    9px var(--font-mono),
    ui-monospace,
    monospace;
  font-variant-numeric: tabular-nums;
}
.agentic-factory-3d .station-label .label-meta {
  font-size: 9px;
  color: #F1FAEE;
  opacity: 0.85;
  margin: 6px 0 0 24px;
  white-space: nowrap;
}
.agentic-factory-3d #tooltip {
  position: absolute;
  pointer-events: none;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.15s ease-in-out;
  padding: 11px 14px;
  border: 1px solid #A8DADC;
  background: #1D3557f0;
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(29, 53, 87, 0.3);
  border-radius: 7px;
  max-width: 240px;
  color: #F1FAEE;
}
.agentic-factory-3d #tooltip.visible {
  opacity: 1;
}
.agentic-factory-3d #tooltip strong {
  font-size: 12px;
  font-weight: 600;
  color: #F1FAEE;
}
.agentic-factory-3d #tooltip strong span {
  font-size: 10px;
  color: #A8DADC;
  margin-right: 8px;
  font-weight: 700;
}
.agentic-factory-3d #tooltip p {
  font-size: 10px;
  color: #F1FAEE;
  opacity: 0.85;
  margin: 6px 0 0;
  line-height: 1.5;
}
.agentic-factory-3d #journey {
  position: absolute;
  left: 24%;
  right: 24%;
  top: 148px;
  opacity: 0;
  transform: translateY(-5px);
  transition: 0.3s ease-in-out;
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: 13px;
}
.agentic-factory-3d #journey.visible {
  opacity: 1;
  transform: none;
}
.agentic-factory-3d .journey-icon {
  width: 28px;
  height: 28px;
  border: 1px solid #457B9D40;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--amber);
}
.agentic-factory-3d #journey strong {
  font-size: 11px;
  font-weight: 500;
}
.agentic-factory-3d #journey small {
  display: block;
  font-size: 9px;
  margin-top: 4px;
  color: #7e858d;
}
.agentic-factory-3d #journey .track {
  height: 2px;
  background: #ffffff0b;
  flex: 1;
  margin-left: 8px;
}
.agentic-factory-3d #journey .track i {
  display: block;
  width: 100%;
  height: 100%;
  background: var(--amber);
  transform-origin: left;
  transform: scaleX(0);
}
.agentic-factory-3d #loading {
  position: absolute;
  left: 50%;
  top: 48%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 12px;
  color: #8c8f95;
  font-size: 11px;
  transition: opacity 0.3s ease-in-out;
  z-index: 20;
}
.agentic-factory-3d #loading i {
  height: 18px;
  width: 18px;
  border-radius: 50%;
  border: 1px solid #457B9D22;
  border-top-color: var(--amber);
  animation: agentic-factory-3d-spin 0.8s ease-in-out infinite;
}
@keyframes agentic-factory-3d-spin {
  to {
    transform: rotate(360deg);
  }
}
.agentic-factory-3d #loading.done {
  opacity: 0;
  pointer-events: none;
}
.agentic-factory-3d #error {
  position: absolute;
  left: 27.5%;
  right: 27.5%;
  top: 40%;
  border: 1px solid #A8DADC;
  background: #1D3557;
  padding: 24px;
  border-radius: 12px;
  display: none;
  font-size: 13px;
  line-height: 1.7;
  box-shadow: 0 12px 36px rgba(29, 53, 87, 0.35);
  color: #F1FAEE;
}
.agentic-factory-3d #error strong {
  color: #F1FAEE;
  font-weight: 600;
  display: block;
  font-size: 15px;
}
.agentic-factory-3d #error p {
  color: #F1FAEE;
  opacity: 0.85;
  margin: 8px 0 0;
}
.agentic-factory-3d #error button {
  border: 1px solid #A8DADC;
  background: #457B9D;
  color: #F1FAEE;
  padding: 8px 16px;
  border-radius: 6px;
  margin-top: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}
.agentic-factory-3d #error button:hover {
  background: #1D3557;
  border-color: #F1FAEE;
}
.agentic-factory-3d.embed {
  background: transparent !important;
}
.agentic-factory-3d.embed .debug-ui {
  display: none !important;
}
.agentic-factory-3d.embed .vignette {
  display: none !important;
}
.agentic-factory-3d.embed .footer {
  justify-content: flex-end;
}
.agentic-factory-3d.embed .wordmark {
  opacity: 0.65;
}
@media (min-width: 901px) {
.agentic-factory-3d.embed #loading {
    left: 71%;
  }
.agentic-factory-3d.embed #error {
    left: 48%;
    right: 7%;
  }
}
@media (min-width: 1600px) {
.agentic-factory-3d .topbar {
    inset: 38px 46px auto;
  }
.agentic-factory-3d .scene-heading {
    top: 142px;
  }
.agentic-factory-3d .controls {
    bottom: 100px;
    gap: 20px;
  }
.agentic-factory-3d .camera-row button {
    font-size: 11px;
    padding: 5px 12px;
  }
.agentic-factory-3d .footer {
    bottom: 35px;
    left: 46px;
    right: 46px;
  }
.agentic-factory-3d #journey {
    top: 182px;
  }
.agentic-factory-3d .coordinates {
    right: 47px;
    top: 185px;
  }
}
@media (max-width: 900px) {
.agentic-factory-3d .topbar {
    inset: 72px 22px auto;
  }
.agentic-factory-3d .identity strong {
    font-size: 12px;
  }
.agentic-factory-3d .identity small {
    font-size: 8px;
    letter-spacing: 1.1px;
  }
.agentic-factory-3d .status {
    font-size: 9px;
  }
.agentic-factory-3d .status span:last-child {
    display: none;
  }
.agentic-factory-3d .scene-heading {
    left: 22px;
    right: 22px;
    top: 105px;
    font-size: 8px;
    letter-spacing: 1.3px;
  }
.agentic-factory-3d .coordinates {
    display: none;
  }
.agentic-factory-3d .controls {
    left: 12px;
    right: 12px;
    bottom: 84px;
    gap: 18px;
  }
.agentic-factory-3d .camera-row {
    gap: 0;
  }
.agentic-factory-3d .camera-row .caption {
    font-size: 8px;
    margin-right: 6px;
  }
.agentic-factory-3d .camera-row button {
    padding: 5px 8px;
    font-size: 9px;
  }
.agentic-factory-3d .camera-row .divider {
    margin: 0 5px;
  }
.agentic-factory-3d .footer {
    bottom: 25px;
    left: 22px;
    right: 22px;
    align-items: flex-end;
  }
.agentic-factory-3d .hint {
    font-size: 9px;
    max-width: 175px;
    line-height: 1.6;
  }
.agentic-factory-3d .footer-center {
    display: none;
  }
.agentic-factory-3d .vignette {
    background: radial-gradient(ellipse at 50% 47%, transparent 20%, #1D355780 100%);
  }
.agentic-factory-3d #loading {
    left: 50%;
  }
.agentic-factory-3d #error {
    left: 7%;
    right: 7%;
    top: 35%;
  }
.agentic-factory-3d #journey {
    left: 24px;
    right: 24px;
    top: 143px;
  }
.agentic-factory-3d .station-label {
    min-width: 100px;
  }
.agentic-factory-3d .station-label .label-card {
    padding: 7px 9px;
  }
.agentic-factory-3d .station-label .label-title {
    font-size: 10px;
    gap: 7px;
  }
.agentic-factory-3d .station-label .label-meta {
    font-size: 8px;
    margin-left: 0;
  }
.agentic-factory-3d .station-label .stem {
    height: 17px;
  }
.agentic-factory-3d.embed .vignette {
    background: radial-gradient(ellipse at center, transparent 30%, #1D355760 100%);
  }
}
@media (max-width: 360px) {
.agentic-factory-3d .camera-row .caption {
    display: none;
  }
.agentic-factory-3d .status {
    display: none;
  }
}
@media (max-height: 570px) {
.agentic-factory-3d .topbar {
    top: 16px;
  }
.agentic-factory-3d .scene-heading {
    top: 70px;
  }
.agentic-factory-3d .controls {
    bottom: 50px;
    gap: 8px;
  }
.agentic-factory-3d .footer {
    bottom: 14px;
  }
.agentic-factory-3d #journey {
    top: 96px;
  }
}
@media (prefers-reduced-motion: reduce) {
.agentic-factory-3d, .agentic-factory-3d * {
    transition: none !important;
  }
.agentic-factory-3d #loading i {
    animation: none;
  }
}
`
