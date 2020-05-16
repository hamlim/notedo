import * as React from 'react'
import { Link as StyledLink } from '@matthamlin/component-library'
import RouterLink from 'next/link'

export default function Link({ to, ...props }) {
  return (
    <RouterLink href={to} passHref>
      <StyledLink forwardedAs="a" {...props} />
    </RouterLink>
  )
}
