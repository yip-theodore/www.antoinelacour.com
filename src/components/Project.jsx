import * as React from 'react'
import { Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const Project = ({ data }) => {
  return (
    <div className='Project'>
      <div>
        <h1>{data.mdx.frontmatter.title}</h1>
        <Link className='xs-only' to="/">
          <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.723674 1.27633L11.2763 11.829M11.2763 1.27633L0.723675 11.829" stroke="black" stroke-width="2"/>
          </svg>
        </Link>
      </div>
      <MDXRenderer>
        {data.mdx.body}
      </MDXRenderer>
      <footer>Antoine Lacour © 2022 — Tous droits réservés.</footer>
    </div>
  )
}

export default Project
