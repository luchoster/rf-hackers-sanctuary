import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

import { mapIndexed } from '../lib/Helpers'

library.add(fab)

export default () => {
  const data = useStaticQuery(graphql`
    {
      sanitySiteSettings {
        title
        main_contact_email
        social_links {
          title
          url
          icon
        }
      }
    }
  `)

  const {
    sanitySiteSettings: { social_links }
  } = data

  return (
    <footer>
      <div className="footer-container">
        <h4 className="deg-90 title">Connect with us</h4>
        <ul className="footer-links">
          <li>
            <a href={`mailto:${data.sanitySiteSettings.main_contact_email}`}>
              <FontAwesomeIcon
                icon={faEnvelope}
                mask={['circle']}
                size="2x"
                className="social_icon"
              />
            </a>
          </li>
          {mapIndexed((link, index) => {
            return (
              <li key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon
                    icon={['fab', `${link.icon}`]}
                    className="social_icon"
                    size="2x"
                  />
                </a>
              </li>
            )
          })(social_links)}
        </ul>
        <div className="deg-90">{new Date().getFullYear()} &copy;</div>
      </div>
    </footer>
  )
}
