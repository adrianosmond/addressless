import React from 'react'
import Link from 'gatsby-link'
import Metadata from './metadata'
import './hero.css'

const Hero = ({ type, img, links, date, location, isPost, title }) =>
  <div className={`hero${ type ? ` hero--${type}` : '' }`}
      style={{backgroundImage: `url(${ img })`}}>
    <div className={`hero__wrapper${ type ? ` hero__wrapper--${type}` : '' }`}>
      { links ?
        <div className='container container--padded-top'>
          <Link to={'/'}>Home</Link> &gt; <Link to={'/posts'}>Posts</Link>
        </div>
        : null
      }
      <div className={`hero__content${ type ? ` hero__content--${type}` : '' }`}>
        <div className='container'>
          { date && location ?
            <Metadata date={date} location={location} isPost={isPost} />
            : null
          }
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  </div>

export default Hero