import * as React from "react"
import { useStaticQuery, graphql } from 'gatsby'


const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allFile {
        group(field: relativeDirectory) {
          fieldValue
          edges {
            node {
              id
              name
              publicURL
            }
          }
        }
      }
    }
  `)
  // const projects = data.allFile.nodes.reduce((acc, { relativeDirectory, ...project }) => ({
  //   ...acc,
  //   [relativeDirectory]: [
  //     ...acc[relativeDirectory] || [],
  //     project,
  //   ],
  // }), {})
  console.log(data)
  return (
    <pre className='min-h-screen bg-black text-white text-xs pb-12'>
      {data.allFile.group.map(({ fieldValue, edges }) =>
        <div className='pt-12' key={fieldValue}>
          <p className='pl-6 mb-3'>{fieldValue}</p>
          <div className='flex overflow-x-scroll pl-6'>
            {edges.map(({ node: { id, name, publicURL } }) =>
              <div className='w-1/2 md:w-1/4 flex-shrink-0 mr-6' key={id}>
                <p className='mb-1.5'>{name}</p>
                <div className='aspect-w-4 aspect-h-3'>
                  <img className='w-full h-full object-cover' src={publicURL} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </pre>
  )
}

export default IndexPage
