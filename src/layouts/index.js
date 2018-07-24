import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import './reset.css'
import './base.css'
import './global.css'

const Layout = ({ data, children }) => (
  <div>
     <Helmet title={data.site.siteMetadata.title} />
    {children()}
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
