import React, { useState } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import './layout.scss'

const Layout = ({ pageTitle, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      siteBuildMetadata {
        buildTime
      }
      allMdx(sort: {fields: frontmatter___index, order: ASC}) {
        nodes {
          frontmatter {
            title
          }
          id
          slug
          body
        }
      }
    }
  `)

  const [ menuShown, showMenu ] = useState(false)
  const [ aboutShown, showAbout ] = useState(false)
  const [ contactShown, showContact ] = useState(false)

  const ref = React.useRef()
  const route = typeof window !== "undefined" && window.location.pathname.replace('/', '')

  return (
    <div className='Portfolio'>
      <title>{pageTitle} — {data.site.siteMetadata.title}</title>
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
        <nav className={!route || 'hidden-xs'}>
          {data.allMdx.nodes.map((node, i) => (
            <h2 key={node.id}>
              <Link to={"/" + node.slug} className={(+route === +i || route === node.slug) && 'active'}>
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
          Hello ! Moi c’est Antoine, je suis un designer graphiste vivant actuellement à Bruxelles. Je fais principalement des livres, des revues, de la typographie et de la photo. J'aime aussi écrire des nouvelles pendant mon temps libre (quand j’arrive à en trouver). J'ai obtenu mon diplôme de graphiste à l'ESAD de Reims et je fais maintenant mon master à La Cambre en typographie. N'hésitez pas à me contacter pour quelconque projet ou idée :)<br />
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
