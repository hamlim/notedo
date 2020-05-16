import * as React from 'react'
import {
  H3,
  Box,
  H1,
  Checkbox,
  Label,
  Button,
} from '@matthamlin/component-library'
import Link from '../components/Link'
import { set } from '../hooks/localStorage'

let { useState } = React

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
        <H1 fontSize={3}>Notedo Settings:</H1>
        <Link to="/">Home</Link>
      </Box>

      <Box mt={6}>
        <H3>Preview Settings:</H3>

        <Label display="flex">
          Show line numbers in the preview:
          <Checkbox checked={showLineNums} onChange={setShowLineNums} />
        </Label>
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <Button onTap={saveSettings}>Save</Button>
        </Box>
      </Box>
    </Box>
  )
}
