declare module '\*.svg' {
  import React = require('react')
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  const src: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default src
}

import { Session } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string
      email?: string
      image?: string
      admin?: boolean // Add this line
    }
  }
}