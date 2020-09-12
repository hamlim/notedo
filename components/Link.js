import * as React from 'react'
import { Link as StyledLink } from '@ds-pack/components'
import RouterLink from 'next/link'

export default function Link({ to, ...props }) {
  return (
    <RouterLink href={to} passHref>
      <StyledLink is="a" {...props} />
    </RouterLink>
  )
}
