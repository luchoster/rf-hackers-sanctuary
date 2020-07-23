import * as R from 'ramda'
import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import { mapIndexed, notNilOrEmpty } from '../../lib/Helpers'
import BlockContent from '../BlockContent'

export default props => {
  console.log(props)
  const { blocks: crew } = props
  const CrewModal = withReactContent(Swal)
  return (
    <div className="grid crew">
      {mapIndexed((person, index) => {
        return (
          <div
            onClick={() =>
              CrewModal.fire({
                title: person.title,
                // text: 'Do you want to continue',
                // icon: 'success',
                showConfirmButton: false,
                showCloseButton: true,
                // width: 1600,
                heightAuto: false,
                padding: '3em',
                customClass: {
                  popup: 'crew__popup',
                  title: 'title'
                },
                html: (
                  <div className="details">
                    <div
                      className="details__member bg"
                      style={{
                        backgroundImage: `url(${person.avatar.asset.url})`
                      }}
                    >
                      <div className="details__member__content">
                        <BlockContent blocks={person.intro} />
                        <div style={{ height: 50 }} />
                        <ul className="social-links">
                          {notNilOrEmpty(person.email) && (
                            <li>
                              <FontAwesomeIcon
                                icon={faEnvelope}
                                className="icon social-icons color--secondary"
                                size="2x"
                              />
                              <a href={`mailto:${person.email}`}>
                                {person.email}
                              </a>
                            </li>
                          )}
                          {notNilOrEmpty(person.website) && (
                            <li>
                              <FontAwesomeIcon
                                icon={faGlobe}
                                className="icon social-icons color--secondary"
                                size="2x"
                              />
                              <a
                                href={person.website}
                                target="_blank"
                                rel="noreferrer noopener"
                              >
                                {person.website}
                              </a>
                            </li>
                          )}
                          {notNilOrEmpty(person.twitter_handle) && (
                            <li>
                              <FontAwesomeIcon
                                icon={faTwitter}
                                className="icon social-icons color--secondary"
                                size="2x"
                              />
                              <a
                                href={`https://twitter.com/${person.twitter_handle}`}
                                target="_blank"
                                rel="noreferrer noopener"
                              >
                                {person.twitter_handle}
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                ),
                preConfirm: () => {
                  // var pageTitle = document.title
                  // putting the document title back to original
                }
              })
            }
            className="cell"
            style={{
              backgroundImage: `url(${person.avatar.asset.url})`,
              cursor: 'pointer'
            }}
          >
            <div className="deg-90--rl team-member-name" style={{ zIndex: 1 }}>
              <p>{person.title}</p>
            </div>
          </div>
        )
      })(crew)}
    </div>
  )
}
