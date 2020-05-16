import * as React from 'react'
import {
  Box,
  Textarea,
  Text,
  HiddenCheckbox,
  Label,
  Button,
  H1,
  Stack,
} from '@matthamlin/component-library'
import Link from '../components/Link'

let { useState, Fragment, useReducer } = React

function ControlledCheckbox({ label, checked, onChange }) {
  return (
    <Label display="inline-flex">
      <HiddenCheckbox checked={checked} onChange={onChange} />
      {label}
    </Label>
  )
}

// minimal
// [] todo item
// [x] todo item
// classic
// [ ] todo item
// [X] todo item

function isLineMinimalEmptyCheckbox(line) {
  return line.trim().startsWith('[]')
}

function isLineClassicEmptyCheckbox(line) {
  return line.trim().startsWith('[ ]')
}

function isLineEmptyCheckbox(line) {
  return isLineMinimalEmptyCheckbox(line) || isLineClassicEmptyCheckbox(line)
}

function isLineMinimalCheckedCheckbox(line) {
  return line.trim().startsWith('[x]')
}

function isLineClassicCheckedCheckbox(line) {
  return line.trim().startsWith('[X]')
}

function isLineCheckedCheckbox(line) {
  return (
    isLineMinimalCheckedCheckbox(line) || isLineClassicCheckedCheckbox(line)
  )
}

function Line({ line, lineNum, dispatch }) {
  let content
  if (line.startsWith('//')) {
    // ignore comments
    return null
  } else if (isLineEmptyCheckbox(line) || isLineCheckedCheckbox(line)) {
    let checked = false
    if (isLineCheckedCheckbox(line)) {
      checked = true
    }
    content = (
      <ControlledCheckbox
        checked={checked}
        onChange={(checked) =>
          dispatch({
            type: 'toggle-todo',
            lineNum,
          })
        }
        label={line}
      />
    )
  } else {
    content = <Text forwardedAs="span">{line}</Text>
  }
  return (
    <Fragment>
      <Text forwardedAs="span" color="gray.3">
        {lineNum}
      </Text>{' '}
      {content}
      <br />
    </Fragment>
  )
}

function reducer(state, action) {
  switch (action.type) {
    case 'toggle-todo': {
      let { lineNum } = action
      return {
        value: state.value
          .split('\n')
          .map((line, idx) => {
            if (idx === lineNum - 1) {
              if (isLineEmptyCheckbox(line)) {
                // [] todo item
                if (isLineMinimalEmptyCheckbox(line)) {
                  return line.replace(/\[\]/, '[x]')
                } else {
                  // [ ] todo item
                  return line.replace(/\[ \]/, '[x]')
                }
              } else if (isLineCheckedCheckbox(line)) {
                // [x] todo item
                if (isLineMinimalCheckedCheckbox(line)) {
                  return line.replace(/\[\x]/, '[]')
                } else {
                  // [X] todo item
                  return line.replace(/\[X\]/, '[]')
                }
              }
            }
            return line
          })
          .join('\n'),
      }
    }
    case 'change': {
      return {
        value: action.value,
      }
    }
  }
}

export default function Notedo() {
  let [state, dispatch] = useReducer(reducer, { value: 'Type some more here' })

  let lines = state.value.split('\n')

  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr 1fr"
      gridTemplateRows="50px 1fr"
      style={{ '--header-height': '50px' }}
    >
      <Box
        gridColumn="1 / 3"
        display="flex"
        alignItems="center"
        px={4}
        justifyContent="space-between"
      >
        <H1 fontSize={3}>Notedo</H1>
        <Stack inline props={{ px: 2 }} alignItems="center">
          <Link to="/about">About</Link>
          <Button>Action</Button>
        </Stack>
      </Box>
      <Box>
        <Textarea
          value={state.value}
          onChange={(val) => dispatch({ type: 'change', value: val })}
          minHeight="calc(100vh - var(--header-height))"
        />
      </Box>
      <Box forwardedAs="pre">
        {lines.map((line, idx) => {
          return (
            <Line line={line} key={idx} lineNum={idx + 1} dispatch={dispatch} />
          )
        })}
      </Box>
    </Box>
  )
}
