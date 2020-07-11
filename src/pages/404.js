import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { useTrail, animated } from 'react-spring'

const fast = { tension: 1200, friction: 40 }
const slow = { mass: 10, tension: 200, friction: 50 }
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`

const NotFoundPage = () => {
  const [trail, set] = useTrail(3, () => ({
    xy: [0, 0],
    config: i => (i === 0 ? fast : slow)
  }))

  return (
    <Layout>
      <SEO title="404: Not found" />
      <section className="page page--f0f">
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="30"
            />
            <feColorMatrix
              in="blur"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"
            />
          </filter>
        </svg>
        <div
          className="hooks-main"
          onMouseMove={e => set({ xy: [e.clientX - 150, e.clientY] })}
        >
          {trail.map((props, index) => (
            <animated.div
              key={index}
              style={{ transform: props.xy.interpolate(trans) }}
            />
          ))}
        </div>
        <div className="container text--center">
          <h1 data-text="404 Not Found" className="glitch text--center">
            404 Not Found
          </h1>
        </div>
      </section>
    </Layout>
  )
}

export default NotFoundPage
