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
      siteBuildMetadata {
        buildTime(fromNow: true)
      }
      allFile(sort: {fields: name}) {
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
      <div className='group fixed z-10 bg-white text-black m-6 p-3 w-60 _box'>
        <div className='group-hover:hidden'>
          <h1 className='_'>Name</h1>
          <br />
          <p>Address</p>
          <p>City</p>
          <br />
          <p>@handle</p>
          <p>+33(0)0.00.00.00.00</p>
          <p>contact@mail.com</p>
        </div>
        <div className='hidden group-hover:block _menu'>
          <button className='group text-left mr-6'>
            <span className='_group-focus:hidden _cv'>CV</span>
            <div className='hidden group-focus:block _bg-yellow-100 w-full md:w-1/2 fixed top-0 left-0 min-h-screen'>
              <div className='bg-white text-black m-6 p-3'>
                <div className='h-96'></div>
                <div className='h-96'></div>
              </div>
            </div>
          </button>
          <button className='group text-left mr-6'>
            <span className='_group-focus:hidden _about'>About</span>
            <div className='hidden group-focus:block _bg-yellow-100 w-full md:w-1/2 fixed top-0 left-0 min-h-screen'>
              <div className='bg-white text-black m-6 p-3'>
                <p>Portfolio</p>
                <p>Updated {data.siteBuildMetadata.buildTime}</p>
              </div>
            </div>
          </button>
          <button className='group text-left mr-6'>
            <span className='_group-focus:hidden _contact'>Contact</span>
            <div className='hidden group-focus:block _bg-yellow-100 w-full md:w-1/2 fixed top-0 left-0 min-h-screen _contact_form'>
              <div className='bg-white text-black m-6 p-3'>
                <p className='mb-1.5'>Message:</p>
                <input className='bg-gray-100 p-1.5' placeholder='…' />
              </div>
            </div>
          </button>
        </div>
        <button className='hidden group-hover:block fixed top-0 right-0 m-6 p-3'>x</button>
      </div>
      <div className='h-48'></div>
      {data.allFile.group.map(({ fieldValue, edges }) =>
        <div className='pt-12' key={fieldValue}>
          <p className='pl-6 mb-3'>{fieldValue.split('_')[1]}</p>
          <div className='flex overflow-x-scroll pl-6'>
            {edges.map(({ node: { id, name, publicURL } }) =>
              <div className='w-1/2 md:w-1/4 flex-shrink-0 mr-6' key={id}>
                <p className='mb-1.5'>{name.split('_')[1]}</p>
                <div className='aspect-w-4 aspect-h-3'>
                  <img className='w-full h-full object-cover' src={publicURL} alt='_' />
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
