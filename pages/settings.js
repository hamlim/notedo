import { useState } from 'react'
import { Box, Heading, Checkbox, Button, Tapable } from '@ds-pack/components'
import Link from '../components/Link'
import { set } from '../hooks/localStorage'

export default function Settings() {
  let [showLineNums, setShowLineNums] = useState(true)

  function saveSettings() {
    set({ settings: { showLineNums } })
  }
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
          Notedo Settings:
        </Heading>
        <Link to="/">Home</Link>
      </Box>

      <Box mt={6}>
        <Heading is="h3" variant="h3">
          Preview Settings:
        </Heading>

        <Checkbox
          display="flex"
          checked={showLineNums}
          onChange={setShowLineNums}
        >
          Show line numbers in the preview
        </Checkbox>
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <Button is={Tapable} onClick={saveSettings}>
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
