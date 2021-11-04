import * as React from "react"
import { useStaticQuery, graphql } from 'gatsby'
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Helmet } from 'react-helmet'
import { elementScrollIntoViewPolyfill } from 'seamless-scroll-polyfill'

elementScrollIntoViewPolyfill?.()

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
              childImageSharp {
                id
                gatsbyImageData
              }
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
  const [ message, setMessage ] = React.useState('')
  return (
    <pre className='min-h-screen bg-black text-white text-sm pb-12'>
      <Helmet>
        <title>Antoine Lacour</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"></meta>
      </Helmet>
      <div className='group fixed z-10 bg-white text-black m-6 p-3 w-72 _box'>
        <div className='group-hover:hidden'>
          <h1 className='mb-3'><span className='_'>Antoine</span><span className='_'>Lacour</span></h1>
          <p>32bis rue Pérignon</p>
          <p className='mb-3'>75015 Paris</p>
          <p>@ant.lacour</p>
          <p>+33(0)6.33.43.52.71</p>
          <p>antoine.lacour@free.fr</p>
        </div>
        <div className='hidden group-hover:flex _menu'>
          <a href role='button' tabIndex='0' className='group text-left mr-6'>
            <span className='_group-focus:hidden _cv'>CV</span>
            <div className='hidden group-focus:block _bg-yellow-100 fixed md:z-10 top-0 left-0'>
              <div className='_bg-red-100 pt-6 md:pb-6 mx-6 max-h-screen overflow-y-scroll'>
                <StaticImage className='w-full' src='../images/cv.jpg' alt='CV' />
              </div>
            </div>
          </a>
          <a href role='button' tabIndex='0' className='group text-left mr-6'>
            <span className='_group-focus:hidden _about'>À propos</span>
            <div className='hidden group-focus:block _bg-yellow-100 w-full md:w-1/2 fixed top-0 left-0'>
              <div className='bg-white text-black m-6 p-3'>
                <p>Portfolio numérique — Antoine Lacour</p>
                <p>Mis à jour le {new Date(data.siteBuildMetadata.buildTime).toLocaleDateString()}</p>
              </div>
            </div>
          </a>
          <a href role='button' tabIndex='0' className='group text-left mr-6'>
            <span className='_group-focus:hidden _contact'>Me contacter</span>
            <div className='hidden group-focus:block _bg-yellow-100 w-full md:w-1/2 fixed z-10 top-0 left-0 _contact_form'>
              <div className='bg-white text-black m-6 p-3 flex flex-col'>
                <p className='mb-1.5'>Message:</p>
                <textarea className='text-lg bg-gray-100 p-1.5 w-full block mb-3' rows='5' placeholder='…' value={message} onChange={e => setMessage(e.target.value)} />
                <a className='border border-black py-1.5 px-2.5 inline-block ml-auto' href={`mailto:antoine.lacour@free.fr?body=${message}`}>OK</a>
              </div>
            </div>
          </a>
        </div>
        <a href role='button' tabIndex='0' className='hidden text-right _bg-red-100 fixed top-0 right-0 w-full h-full p-9 _close_button'>&nbsp;</a>
      </div>
      <div className='h-60'></div>
      {data.allFile.group.map(({ fieldValue, edges }) =>
        <div className='_project block group mt-6' key={fieldValue}>
          <p className='truncate pl-6 mb-2'>{fieldValue.split('_')[1]}</p>
          <div className='flex group-focus:flex-col overflow-x-scroll pl-6 _project_photos'>
            {edges.map(({ node }) =>
              <a href role='button' tabIndex='0' className='w-1/2 md:w-1/4 group-focus:w-auto flex-shrink-0 mr-6 mb-6 _project_photo' key={node.id} onFocus={e => setTimeout(() => e.target.scrollIntoView({ behavior: 'smooth' }))}>
                <p className='truncate text-xs my-1'>{node.name.split('_')[1]}</p>
                <div className='aspect-w-4 aspect-h-3'>
                  <GatsbyImage className='w-full h-full object-cover' image={getImage(node)} alt='_' />
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
