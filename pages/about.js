import * as React from 'react'
import { H3, Box, Text, H1, Stack } from '@matthamlin/component-library'
import Link from '../components/Link'

export default function About() {
  return (
    <Box maxWidth="content" margin="0 auto">
      <Box
        height="50px"
        display="flex"
        alignItems="center"
        px={4}
        justifyContent="space-between"
      >
        <H1 fontSize={3}>About Notedo</H1>
        <Link to="/">Back</Link>
      </Box>

      <Stack props={{ my: 2 }} flexDirection="column">
        <Text>
          Notedo is a work in progress note taking and todo application all in
          one.
        </Text>
        <H3>Shortcuts:</H3>
        <Text fontWeight="bold">Todo:</Text>
        <Text>
          To create a new todo item, you can type <kbd>[ ]</kbd> (or{' '}
          <kbd>[]</kbd>)
        </Text>
        <Text>
          To mark a todo item as done, you can add an <kbd>x</kbd> in the middle
          of the square braces: <kbd>[x]</kbd>
        </Text>

        <Text fontWeight="bold">Comments:</Text>
        <Text>
          To create a new comment, you can prefix your line with <kbd>//</kbd>
        </Text>
      </Stack>
    </Box>
  )
}
