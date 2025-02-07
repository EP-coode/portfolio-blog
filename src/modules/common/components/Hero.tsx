'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import styles from './Hero.module.css'
import { GlitchPartialOptions, GlitchResult } from 'powerglitch'
import Particles, { initParticlesEngine } from '@tsparticles/react'
// TODO: move to dynamic import
import { loadSlim } from '@tsparticles/slim'
import { IOptions, RecursivePartial } from '@tsparticles/engine'
import clsx from 'clsx'

export default function Hero({ className, ...props }: React.HTMLProps<HTMLDivElement>) {
  const glitchElemRef = useRef(null)
  const [particlesInitialized, setParticlesInitialized] = useState(false)
  const glitchConfig = useMemo<GlitchPartialOptions>(
    () => ({
      playMode: 'always',
      optimizeSeo: true,
      createContainers: true,
      hideOverflow: false,
      timing: {
        duration: 2000,
      },
      glitchTimeSpan: {
        start: 0.5,
        end: 0.7,
      },
      shake: {
        velocity: 15,
        amplitudeX: 0.2,
        amplitudeY: 0.2,
      },
      slice: {
        count: 6,
        velocity: 15,
        minHeight: 0.02,
        maxHeight: 0.14,
        hueRotate: true,
      },
      pulse: false,
    }),
    [],
  )
  const particlesConfig = useMemo<RecursivePartial<IOptions>>(
    () => ({
      fullScreen: false,
      background: {
        color: '#000',
        repeat: 'no-repeat',
        size: '40%',
        position: '60% 50%',
      },
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'repulse',
          },
          onHover: {
            enable: true,
            mode: 'bubble',
          },
        },
        modes: {
          bubble: {
            distance: 200,
            duration: 2,
            opacity: 0,
            size: 0,
            speed: 3,
          },
          repulse: {
            distance: 400,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: { value: '#fd0130' },
        move: {
          direction: 'none',
          enable: true,
          outModes: 'out',
          random: true,
          speed: 0.3,
        },
        number: {
          density: {
            enable: true,
          },
          value: 600,
        },
        opacity: {
          animation: {
            enable: true,
            speed: 5,
          },
          value: { min: 0.3, max: 0.6 },
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: 1,
        },
      },
    }),
    [],
  )

  useEffect(() => {
    let glitch: GlitchResult | null = null

    const glitchHeroText = async () => {
      if (!glitchElemRef.current) {
        return
      }

      const PowerGlitch = await import('powerglitch')

      glitch = PowerGlitch.PowerGlitch.glitch(glitchElemRef.current, glitchConfig)
    }

    glitchHeroText()

    return () => {
      if (!!glitch) {
        glitch.stopGlitch()
      }
    }
  })

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setParticlesInitialized(true)
    })
  })

  return (
    <div className={clsx(styles.heroContainer, className)} {...props}>
      {particlesInitialized && (
        <Particles
          id="hero_bg_particles"
          className={styles.particlesWrapper}
          options={particlesConfig}
        ></Particles>
      )}
      <h1 className={styles.heroText}>
        Hi! I&apos;m Ernest Przybył, a <span ref={glitchElemRef}>web</span> developer
      </h1>
      <span className={styles.barcodeText}>//module/hero...</span>
    </div>
  )
}
