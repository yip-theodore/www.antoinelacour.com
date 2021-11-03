import * as React from "react"
import { useStaticQuery, graphql } from 'gatsby'
import { elementScrollIntoViewPolyfill } from 'seamless-scroll-polyfill'

elementScrollIntoViewPolyfill()

const IndexPage = () => {
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
  // const toggleFocus = e => e.currentTarget[document.activeElement === e.currentTarget ? 'blur' : 'focus']()
  return (
    <pre className='min-h-screen bg-black text-white text-sm pb-12'>
      <div className='group fixed z-10 bg-white text-black m-6 p-3 w-64 _box'>
        <div className='group-hover:hidden'>
          <h1 className='_ mb-3'>Name</h1>
          <p>Address</p>
          <p className='mb-3'>City</p>
          <p>@handle</p>
          <p>+33(0)0.00.00.00.00</p>
          <p>contact@mail.com</p>
        </div>
        <div className='hidden group-hover:flex _menu'>
          <a href role='button' tabIndex='0' className='group text-left mr-9'>
            <span className='_group-focus:hidden _cv'>CV</span>
            <div className='hidden group-focus:block _bg-yellow-100 w-full md:w-1/2 fixed top-0 left-0'>
              <div className='bg-white text-black m-6 p-3'>
                <div className='h-96'></div>
                <div className='h-96 hidden md:block'></div>
              </div>
            </div>
          </a>
          <a href role='button' tabIndex='0' className='group text-left mr-9'>
            <span className='_group-focus:hidden _about'>About</span>
            <div className='hidden group-focus:block _bg-yellow-100 w-full md:w-1/2 fixed top-0 left-0'>
              <div className='bg-white text-black m-6 p-3'>
                <p>Portfolio</p>
                <p>Updated on {new Date(data.siteBuildMetadata.buildTime).toLocaleDateString()}</p>
              </div>
            </div>
          </a>
          <a href role='button' tabIndex='0' className='group text-left mr-9'>
            <span className='_group-focus:hidden _contact'>Contact</span>
            <div className='hidden group-focus:block _bg-yellow-100 w-full md:w-1/2 fixed z-10 top-0 left-0 _contact_form'>
              <div className='bg-white text-black m-6 p-3'>
                <p className='mb-1.5'>Message:</p>
                <input className='bg-gray-100 p-1.5' placeholder='…' />
              </div>
            </div>
          </a>
        </div>
        <a href role='button' tabIndex='0' className='hidden text-right _bg-red-100 fixed top-0 right-0 w-full h-full p-9 _close_button'>&nbsp;</a>
      </div>
      <div className='h-60'></div>
      {data.allFile.group.map(({ fieldValue, edges }) =>
        <div className='_project block group mt-6' key={fieldValue}>
          <p className='pl-6 mb-2'>{fieldValue.split('_')[1]}</p>
          <div className='flex group-focus:flex-col overflow-x-scroll pl-6 _project_photos'>
            {edges.map(({ node: { id, name, publicURL } }) =>
              <a href role='button' tabIndex='0' className='w-1/2 md:w-1/4 group-focus:w-auto flex-shrink-0 mr-6 mb-6 _project_photo' key={id} onFocus={e => setTimeout(() => e.target.scrollIntoView({ behavior: 'smooth' }))}>
                <p className='text-xs my-1'>{name.split('_')[1]}</p>
                <div className='aspect-w-4 aspect-h-3'>
                  <img className='w-full h-full object-cover' src={publicURL} alt='_' />
                </div>
              </a>
            )}
          </div>
        </div>
      )}
      <a href role='button' tabIndex='0' className='hidden text-right _bg-red-100 fixed top-0 right-0 w-full h-full p-9 _close_button'>&nbsp;</a>
    </pre>
  )
}

export default IndexPage
