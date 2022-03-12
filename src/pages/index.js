import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Project from '../components/Project'

const Index = ({ data }) => {
  return (
    <Layout>
      <div className='hidden-xs'>
        <Project data={data} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    mdx(frontmatter: {index: {eq: 1}}) {
      frontmatter {
        title
      }
      body
    }
  }
`

export default Index
