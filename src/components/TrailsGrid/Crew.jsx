import React, { Component } from 'react'
import { config } from 'react-spring/renderprops'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import BlockContent from '../BlockContent'

import { Slug, Fade } from './Primitives'
import { notNilOrEmpty } from '../../lib/Helpers'
// import 'antd/dist/antd.css'

export default class Cell extends Component {
  render() {
    const {
      toggle,
      title,
      active,
      intro,
      email,
      avatar,
      twitter_handle,
      website
    } = this.props
    return (
      <div
        className="cell crew"
        style={{ cursor: !active ? 'pointer' : 'auto' }}
        onClick={!active ? toggle : undefined}
      >
        <Fade show={active} delay={active ? 500 : 0}>
          <div className="details">
            <Slug delay={600}>
              <div className="close">
                <FontAwesomeIcon
                  icon={faTimes}
                  className="icon"
                  size="2x"
                  onClick={toggle}
                />
              </div>
              <div
                className="details__member bg"
                style={{
                  backgroundImage: `url(${avatar.asset.url})`
                }}
              >
                <h1 className="title deg-90--rl">{title}</h1>
                <div className="details__member__content">
                  <BlockContent blocks={intro} />
                  <div style={{ height: 50 }} />
                  <ul className="social-links">
                    {notNilOrEmpty(email) && (
                      <li>
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="icon social-icons color--secondary"
                          size="2x"
                          onClick={toggle}
                        />
                        <a href={`mailto:${email}`}>{email}</a>
                      </li>
                    )}
                    {notNilOrEmpty(website) && (
                      <li>
                        <FontAwesomeIcon
                          icon={faGlobe}
                          className="icon social-icons color--secondary"
                          size="2x"
                          onClick={toggle}
                        />
                        <a
                          href={website}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {website}
                        </a>
                      </li>
                    )}
                    {notNilOrEmpty(twitter_handle) && (
                      <li>
                        <FontAwesomeIcon
                          icon={faTwitter}
                          className="icon social-icons color--secondary"
                          size="2x"
                          onClick={toggle}
                        />
                        <a
                          href={`https://twitter.com/${twitter_handle}`}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {twitter_handle}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </Slug>
          </div>
        </Fade>
        <Fade
          show={!active}
          from={{ opacity: 0, transform: 'translate3d(0,140px,0)' }}
          enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
          leave={{ opacity: 0, transform: 'translate3d(0,-50px,0)' }}
          delay={active ? 0 : 400}
        >
          <div
            className="thumbs-wrapper"
            onClick={() =>
              typeof window != 'undefinded' && window.scrollTo(0, 0)
            }
            style={{
              background: `url(${avatar.asset.url}) 90% center / contain no-repeat`
            }}
          >
            <div className="deg-90--rl" style={{ zIndex: 1 }}>
              <h4>{title}</h4>
            </div>
          </div>
        </Fade>
      </div>
    )
  }
}
