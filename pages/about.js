import { Heading, Box, Text, Stack } from '@ds-pack/components'
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
        <Heading is="h1" variant="subhead">
          About Notedo
        </Heading>
        <Link to="/">Home</Link>
      </Box>

      <Stack props={{ my: 2 }} flexDirection="column">
        <Text>
          Notedo is a work in progress note taking and todo application all in
          one.
        </Text>
        <Heading is="h3" variant="h3">
          Shortcuts:
        </Heading>
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
