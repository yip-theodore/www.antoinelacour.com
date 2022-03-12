import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Project from '../components/Project'

const BlogPost = ({ data }) => {
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <Project data={data} />
    </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
      }
      body
    }
  }
`

export default BlogPost
