import React, { useState } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { useLocation } from "@reach/router"
import './layout.scss'
import favicon from '../images/favicon.png'

const Layout = ({ children }) => {
  const { pathname } = useLocation()
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
        }
      }
      siteBuildMetadata {
        buildTime
      }
      allMdx(sort: {fields: frontmatter___index, order: ASC}) {
        nodes {
          frontmatter {
            title
            index
          }
          id
          slug
          excerpt(pruneLength: 1000)
          body
        }
      }
      allImageSharp {
        nodes {
          original {
            src
          }
          parent {
            ... on File {
              relativeDirectory
            }
          }
        }
      }
    }
  `)

  const [ menuShown, showMenu ] = useState(false)
  const [ aboutShown, showAbout ] = useState(false)
  const [ contactShown, showContact ] = useState(false)

  const ref = React.useRef()

  const currentNode = data.allMdx.nodes.find(n => pathname.replace(/\/$/, '') === `/${n.slug.replace('/', '')}`) || data.allMdx.nodes.find(n => n.frontmatter.index === 1)
  const rootNode = data.allMdx.nodes.find(n => !n.frontmatter.index)

  const title = `${(pathname === '/' ? rootNode : currentNode).frontmatter.title} — ${data.site.siteMetadata.title}`
  const description = (pathname === '/' ? rootNode : currentNode).excerpt
  const image = data.allImageSharp.nodes.find(n => n.parent.relativeDirectory === currentNode.slug.replace('/', '')).original.src

  return (
    <div className='Portfolio'>
      <Helmet>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <link rel="canonical" href={`${data.site.siteMetadata.siteUrl}${pathname}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${data.site.siteMetadata.siteUrl}${pathname}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${data.site.siteMetadata.siteUrl}${pathname}`} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
        <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
      </Helmet>
      <header>
        <div>
          <Link to="/">A. L.</Link>
          <svg onClick={() => {
            showAbout(false)
            showContact(false)
            showMenu(!menuShown)
          }} className='xs-only' width="26" height="19" viewBox="0 0 26 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="2.25" x2="26" y2="2.25" stroke="black" stroke-width="3.5"/>
            <line y1="9.61667" x2="26" y2="9.61667" stroke="black" stroke-width="3.5"/>
            <line y1="16.9833" x2="26" y2="16.9833" stroke="black" stroke-width="3.5"/>
          </svg>
        </div>
        <aside className={menuShown || "hidden-xs"}>
          <button onClick={() => {
            showMenu(false)
            showContact(!contactShown)
            showAbout(false)
          }}>Me contacter</button>
          <button onClick={() => {
            showMenu(false)
            showAbout(!aboutShown)
            showContact(false)
          }}>À propos</button>
        </aside>
      </header>
      <main>
        <div>
          {children}
        </div>
        <nav className={pathname === '/' || 'hidden-xs'}>
          {data.allMdx.nodes.filter(n => n.frontmatter.index).map((node, i) => (
            <h2 key={node.id}>
              <Link to={'/' + node.slug} className={(+pathname.replace('/', '') === +i || pathname.replace(/\/$/, '') === `/${node.slug.replace('/', '')}`) && 'active'}>
                {node.frontmatter.title.split(' ').map(word =>
                  <span>{word}</span>
                ).reduce((acc, curr) => [acc, ' ', curr])}
              </Link>
            </h2>
          ))}
        </nav>
      </main>
      {(menuShown || aboutShown || contactShown) && (
        <button aria-label="close" className="overlay" onClick={() => {
          showMenu(false)
          showAbout(false)
          showContact(false)
        }} />
      )}
      <article className={contactShown || "hidden"}>
        <form onSubmit={e => {
          e.preventDefault()
          window.location.href = `mailto:antoine.lacour@free.fr?body=${encodeURIComponent(ref.current.value)}`
        }} className='bg-white text-black m-6 p-3 flex flex-col'>
          <div>
            <span>Message :</span>
            <button type='button' onClick={() => showContact(false)}>
              <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.723674 1.27633L11.2763 11.829M11.2763 1.27633L0.723675 11.829" stroke="black" stroke-width="2"/>
              </svg>
            </button>
          </div>
          <textarea ref={ref} rows='10' placeholder='…' />
          <button type='submit'>Envoyer</button>
        </form>
      </article>
      <article className={aboutShown || "hidden"}>
        <div>
          {rootNode.excerpt}<br />
          <br />
          Dernière mise à jour le {new Date(data.siteBuildMetadata.buildTime).toLocaleDateString()}.<br />
          Antoine Lacour © 2022 — Tous droits réservés.
        </div>
        <button onClick={() => showAbout(false)}>
          <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.723674 1.27633L11.2763 11.829M11.2763 1.27633L0.723675 11.829" stroke="black" stroke-width="2"/>
          </svg>
        </button>
      </article>
    </div>
  )
}

export default Layout
