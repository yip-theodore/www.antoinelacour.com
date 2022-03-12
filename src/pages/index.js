import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Project from '../components/Project'

const BlogPost = ({ data }) => {
  return (
    <Layout pageTitle='Portfolio'>
      <div className='hidden-xs'>
        <Project data={data} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    mdx(frontmatter: {index: {eq: 0}}) {
      frontmatter {
        title
      }
      body
    }
  }
`

export default BlogPost
