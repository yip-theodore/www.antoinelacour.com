import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Project from '../components/Project'

const Post = ({ data }) => {
  return (
    <Layout>
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

export default Post
