import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Headroom from 'react-headroom'
import {
  Collapse,
  Drawer,
  List,
  ListSubheader,
  ListItem,
  ListItemText
} from '@material-ui/core'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

import { mapIndexed, notNilOrEmpty } from '../lib/Helpers'
library.add(fab)

export default () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState('')
  const [open, setOpen] = React.useState(true)

  const DropdownParent = React.useRef(null)

  React.useEffect(() => {
    // loadReCaptcha(process.env.GATSBY_GOOGLE_RECAPTCHA)
    // typeof document !== 'undefined' &&
    //   document.querySelector('.page').addEventListener('click', toggleDropdown)
  }, [])

  function toggleDropdown() {
    typeof document !== 'undefined' &&
      document.querySelector('.dropotron').classList.contains('active') &&
      setActiveDropdown('')
  }

  function handleClick() {
    setOpen(!open)
  }

  const data = useStaticQuery(graphql`
    {
      menuItems: sanityMainMenu {
        _rawItems(resolveReferences: { maxDepth: 2 })
      }
      siteSettings: sanitySiteSettings {
        logo {
          asset {
            fluid {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  `)

  function toggleDrawer() {
    setDrawerOpen(!drawerOpen)
  }

  const { _rawItems: items } = data.menuItems
  const settings = data.siteSettings

  return (
    <Headroom>
      <header id="header">
        <div className="logo">
          <AniLink
            paintDrip
            to="/"
            duration={1}
            direction="down"
            hex="#212121"
            bg={`
              url(${require('../assets/img/web_background.jpg')})
              center / cover   /* position / size */
              no-repeat        /* repeat */
              fixed            /* attachment */
              padding-box      /* origin */
              content-box      /* clip */
              white            /* color */
            `}
          >
            <img
              src={settings.logo.asset.fluid.src}
              alt="RF Hackers Sanctuary Logo"
            />
          </AniLink>
        </div>
        <FontAwesomeIcon
          icon={faBars}
          mask={['circle']}
          size="2x"
          className="navPanelToggle"
          onClick={toggleDrawer}
        />
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Main Menu
              </ListSubheader>
            }
          >
            <ListItem button>
              <AniLink
                paintDrip
                hex="#212121"
                onClick={toggleDrawer}
                className="title"
                to="/"
                duration={1}
                direction="down"
                bg={`
                  url(${require('../assets/img/web_background.jpg')})
                  center / auto    /* position / size */
                  no-repeat        /* repeat */
                  fixed            /* attachment */
                  padding-box      /* origin */
                  content-box      /* clip */
                  #00adee          /* color */
                `}
              >
                Home
              </AniLink>
            </ListItem>
            {mapIndexed((item, index) => {
              return notNilOrEmpty(item.subMenu) && item.subMenu.length > 0 ? (
                <>
                  <ListItem button onClick={handleClick}>
                    <ListItemText primary={item.page_title} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {mapIndexed((subMenuItem, i) => (
                        <ListItem button key={i}>
                          {notNilOrEmpty(subMenuItem.subMenuSlug) ? (
                            <AniLink
                              paintDrip
                              hex="#212121"
                              className="title"
                              to={`/${subMenuItem.subMenuSlug}`}
                              duration={1.5}
                              direction="down"
                              bg={`
                              url(${require('../assets/img/web_background.jpg')})
                              center / auto    /* position / size */
                              no-repeat        /* repeat */
                              fixed            /* attachment */
                              padding-box      /* origin */
                              content-box      /* clip */
                              #00adee          /* color */
                            `}
                            >
                              <ListItemText
                                primary={subMenuItem.subMenuTitle}
                              />
                            </AniLink>
                          ) : (
                            <a
                              href={subMenuItem.subMenuUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-link={subMenuItem.subMenuUrl}
                              data-title={subMenuItem.subMenuTitle}
                            >
                              <ListItemText
                                primary={subMenuItem.subMenuTitle}
                              />
                            </a>
                          )}
                        </ListItem>
                      ))(item.subMenu)}
                      <ListItem button />
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItem button key={index}>
                  <AniLink
                    paintDrip
                    hex="#212121"
                    className="title"
                    to={`/${item.slug}`}
                    duration={1.5}
                    direction="down"
                    bg={`
                    url(${require('../assets/img/web_background.jpg')})
                    center / auto    /* position / size */
                    no-repeat        /* repeat */
                    fixed            /* attachment */
                    padding-box      /* origin */
                    content-box      /* clip */
                    #00adee          /* color */
                  `}
                  >
                    {item.page_title}
                  </AniLink>
                </ListItem>
              )
            })(items)}
          </List>
        </Drawer>
        <nav id="nav">
          <ul>
            <li>
              <AniLink
                paintDrip
                hex="#212121"
                className="title"
                to="/"
                duration={1}
                direction="down"
                bg={`
                  url(${require('../assets/img/web_background.jpg')})
                  center / auto    /* position / size */
                  no-repeat        /* repeat */
                  fixed            /* attachment */
                  padding-box      /* origin */
                  content-box      /* clip */
                  #00adee          /* color */
                `}
              >
                Home
              </AniLink>
            </li>
            {mapIndexed((item, index) =>
              notNilOrEmpty(item.subMenu) ? (
                <li key={index}>
                  <div
                    className="dropdown link"
                    onClick={() =>
                      item === activeDropdown
                        ? setActiveDropdown('')
                        : setActiveDropdown(item)
                    }
                    ref={DropdownParent}
                  >
                    {item.page_title}
                  </div>
                  <ul
                    className={`dropotron level-0 center animated ${
                      item === activeDropdown ? 'active fadeIn' : 'fadeOut'
                    }`}
                  >
                    {mapIndexed((subMenuItem, i) => (
                      <li key={i}>
                        {notNilOrEmpty(subMenuItem.subMenuSlug) ? (
                          <AniLink
                            paintDrip
                            hex="#212121"
                            className="title"
                            to={`/${subMenuItem.subMenuSlug}`}
                            duration={1.5}
                            direction="down"
                            bg={`
                              url(${require('../assets/img/web_background.jpg')})
                              center / auto    /* position / size */
                              no-repeat        /* repeat */
                              fixed            /* attachment */
                              padding-box      /* origin */
                              content-box      /* clip */
                              #00adee          /* color */
                            `}
                          >
                            {subMenuItem.subMenuTitle}
                          </AniLink>
                        ) : (
                          <a
                            href={subMenuItem.subMenuUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-link={subMenuItem.subMenuUrl}
                            data-title={subMenuItem.subMenuTitle}
                          >
                            {subMenuItem.subMenuTitle}
                          </a>
                        )}
                      </li>
                    ))(item.subMenu)}
                  </ul>
                </li>
              ) : (
                <li key={index}>
                  <AniLink
                    paintDrip
                    hex="#212121"
                    className="title"
                    to={`/${item.slug}`}
                    duration={1.5}
                    direction="down"
                    bg={`
                      url(${settings.logo.asset.fluid.src})
                      center / auto    /* position / size */
                      no-repeat        /* repeat */
                      fixed            /* attachment */
                      padding-box      /* origin */
                      content-box      /* clip */
                      #00adee          /* color */
                    `}
                  >
                    {item.page_title}
                  </AniLink>
                </li>
              )
            )(items)}
          </ul>
        </nav>
      </header>
    </Headroom>
  )
}
