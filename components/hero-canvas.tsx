'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import { CITY_POINTS } from '@/lib/site-data'

interface FloatingCredit {
  id: number
  x: number
  y: number
  createdAt: number
}

interface CityMesh {
  name: string
  x: number
  y: number
  mesh: THREE.Mesh
  material: THREE.MeshStandardMaterial
  activeUntil: number
}

interface RainParticle {
  mesh: THREE.Mesh
  speed: number
}

const INDIA_OUTLINE = [
  [0.33, 0.08],
  [0.44, 0.14],
  [0.54, 0.17],
  [0.61, 0.25],
  [0.66, 0.33],
  [0.72, 0.38],
  [0.69, 0.47],
  [0.76, 0.56],
  [0.71, 0.68],
  [0.63, 0.75],
  [0.61, 0.85],
  [0.56, 0.95],
  [0.49, 1.02],
  [0.44, 1.12],
  [0.35, 1.06],
  [0.3, 0.93],
  [0.23, 0.86],
  [0.18, 0.74],
  [0.12, 0.67],
  [0.14, 0.55],
  [0.09, 0.47],
  [0.13, 0.35],
  [0.2, 0.23],
  [0.27, 0.15],
]

function latLngToCanvas(lat: number, lng: number, width: number, height: number) {
  const minLat = 6
  const maxLat = 36
  const minLng = 68
  const maxLng = 91
  const padX = width * 0.18
  const padY = height * 0.1

  return {
    x: padX + ((lng - minLng) / (maxLng - minLng)) * (width - padX * 2),
    y: padY + (1 - (lat - minLat) / (maxLat - minLat)) * (height - padY * 2),
  }
}

function clearGroup(group: THREE.Group) {
  while (group.children.length > 0) {
    const child = group.children[0]
    if (!child) continue
    group.remove(child)
    if ('geometry' in child && child.geometry instanceof THREE.BufferGeometry) {
      child.geometry.dispose()
    }
    const material = (child as THREE.Mesh).material
    if (Array.isArray(material)) {
      material.forEach((item) => item.dispose())
    } else if (material instanceof THREE.Material) {
      material.dispose()
    }
  }
}

export function HeroCanvas() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [credits, setCredits] = useState<FloatingCredit[]>([])

  useEffect(() => {
    const wrapper = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrapper || !canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0.1, 500)
    camera.position.z = 200

    const ambient = new THREE.AmbientLight(0xffffff, 0.85)
    const point = new THREE.PointLight(0x00e5ff, 0.4, 900)
    point.position.set(100, 0, 150)
    scene.add(ambient, point)

    const root = new THREE.Group()
    scene.add(root)

    const cityMeshes: CityMesh[] = []
    const rainParticles: RainParticle[] = []
    const cityGeometry = new THREE.SphereGeometry(8, 16, 16)
    const rainGeometry = new THREE.SphereGeometry(2.1, 10, 10)
    const rainMaterial = new THREE.MeshStandardMaterial({
      color: '#00E5FF',
      emissive: '#00E5FF',
      emissiveIntensity: 0.7,
    })

    let width = 0
    let height = 0
    let animationFrame = 0
    let lastRender = 0

    const rebuildScene = () => {
      width = wrapper.clientWidth
      height = wrapper.clientHeight

      camera.left = 0
      camera.right = width
      camera.top = 0
      camera.bottom = height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height, false)
      clearGroup(root)
      cityMeshes.length = 0
      rainParticles.length = 0

      const shape = new THREE.Shape()
      INDIA_OUTLINE.forEach(([xRatio, yRatio], index) => {
        const x = width * 0.21 + xRatio * (width * 0.38)
        const y = height * 0.08 + yRatio * (height * 0.52)
        if (index === 0) {
          shape.moveTo(x, y)
        } else {
          shape.lineTo(x, y)
        }
      })
      shape.closePath()

      const northEast = new THREE.Shape()
      northEast.moveTo(width * 0.55, height * 0.28)
      northEast.lineTo(width * 0.61, height * 0.24)
      northEast.lineTo(width * 0.67, height * 0.29)
      northEast.lineTo(width * 0.64, height * 0.36)
      northEast.lineTo(width * 0.57, height * 0.35)
      northEast.closePath()

      const indiaMaterial = new THREE.MeshStandardMaterial({
        color: '#111523',
        emissive: '#0c0f18',
        roughness: 0.95,
        metalness: 0.08,
      })

      const indiaMesh = new THREE.Mesh(new THREE.ShapeGeometry(shape), indiaMaterial)
      indiaMesh.position.z = -6
      root.add(indiaMesh)

      const northEastMesh = new THREE.Mesh(new THREE.ShapeGeometry(northEast), indiaMaterial.clone())
      northEastMesh.position.z = -6
      root.add(northEastMesh)

      const outlineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08 })
      const outline = new THREE.Line(new THREE.BufferGeometry().setFromPoints(shape.getPoints()), outlineMaterial)
      const northEastOutline = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(northEast.getPoints()),
        outlineMaterial.clone(),
      )
      root.add(outline, northEastOutline)

      CITY_POINTS.forEach((city) => {
        const projected = latLngToCanvas(city.lat, city.lng, width, height * 0.92)
        const material = new THREE.MeshStandardMaterial({
          color: '#FF5722',
          emissive: '#FF5722',
          emissiveIntensity: 1,
        })
        const cityMesh = new THREE.Mesh(cityGeometry, material)
        cityMesh.position.set(projected.x, projected.y, 16)
        root.add(cityMesh)

        cityMeshes.push({
          name: city.name,
          x: projected.x,
          y: projected.y,
          mesh: cityMesh,
          material,
          activeUntil: 0,
        })
      })

      for (let index = 0; index < 150; index += 1) {
        const particle = new THREE.Mesh(rainGeometry, rainMaterial.clone())
        particle.position.set(Math.random() * width, Math.random() * height - height, 10 + Math.random() * 8)
        root.add(particle)
        rainParticles.push({
          mesh: particle,
          speed: 2.8 + Math.random() * 4.3,
        })
      }
    }

    const onResize = () => rebuildScene()
    rebuildScene()
    window.addEventListener('resize', onResize)

    const animate = (timestamp: number) => {
      animationFrame = window.requestAnimationFrame(animate)
      if (timestamp - lastRender < 1000 / 30) return
      lastRender = timestamp

      const now = performance.now()

      for (const particle of rainParticles) {
        particle.mesh.position.y += particle.speed
        particle.mesh.position.x += Math.sin((particle.mesh.position.y + now / 40) * 0.015) * 0.25

        if (particle.mesh.position.y > height + 24) {
          particle.mesh.position.y = -20
          particle.mesh.position.x = Math.random() * width
        }

        for (const city of cityMeshes) {
          if (city.activeUntil > now) continue

          const distance = Math.hypot(particle.mesh.position.x - city.x, particle.mesh.position.y - city.y)
          if (distance < 30) {
            city.activeUntil = now + 1500
            particle.mesh.position.y = -20
            particle.mesh.position.x = Math.random() * width

            setCredits((current) => [
              ...current.slice(-5),
              {
                id: now + Math.random(),
                x: city.x,
                y: city.y,
                createdAt: now,
              },
            ])
            break
          }
        }
      }

      for (const city of cityMeshes) {
        if (city.activeUntil > now) {
          const progress = 1 - (city.activeUntil - now) / 1500
          const pulse = 1 + Math.sin(progress * Math.PI * 3) * 0.18
          city.mesh.scale.setScalar(pulse)
          city.material.color.set('#00C853')
          city.material.emissive.set('#00C853')
          city.material.emissiveIntensity = 1.2
        } else {
          city.mesh.scale.setScalar(1)
          city.material.color.set('#FF5722')
          city.material.emissive.set('#FF5722')
          city.material.emissiveIntensity = 1
        }
      }

      renderer.render(scene, camera)
    }

    animationFrame = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', onResize)
      clearGroup(root)
      cityGeometry.dispose()
      rainGeometry.dispose()
      rainMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  useEffect(() => {
    if (credits.length === 0) return

    const timeout = window.setTimeout(() => {
      const cutoff = performance.now() - 1700
      setCredits((current) => current.filter((item) => item.createdAt > cutoff))
    }, 300)

    return () => window.clearTimeout(timeout)
  }, [credits])

  return (
    <div ref={wrapperRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_40px),repeating-linear-gradient(to_bottom,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_40px)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.16),transparent_35%),radial-gradient(circle_at_bottom,rgba(255,87,34,0.14),transparent_45%)]" />
      {credits.map((credit) => (
        <div
          key={credit.id}
          className="pointer-events-none absolute -translate-x-1/2 text-sm font-semibold text-[#00C853] animate-credit-rise"
          style={{ left: credit.x, top: credit.y }}
        >
          +₹892
        </div>
      ))}
    </div>
  )
}
