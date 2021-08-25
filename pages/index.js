import { useState, Fragment, useReducer, useEffect } from 'react'
import {
  Box,
  Textarea,
  Text,
  Checkbox,
  Heading,
  Stack,
} from '@ds-pack/components'
import Link from '../components/Link'
import { get } from '../hooks/localStorage'

function ControlledCheckbox({ label, checked, onChange }) {
  return (
    <Checkbox display="inline-flex" checked={checked} onChange={onChange}>
      {label}
    </Checkbox>
  )
}

let boldRegex = new RegExp('\\*\\*(.+)\\*\\*')
let italicsRegex = new RegExp('__(.+)__')

// Supported Format:
// [ ] todo item
// [x] todo item

function isLineEmptyCheckbox(line) {
  return line.trim().startsWith('[ ]')
}

function isLineCheckedCheckbox(line) {
  return line.trim().startsWith('[x]')
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
                // [ ] todo item
                return line.replace(/\[ \]/, '[x]')
              } else if (isLineCheckedCheckbox(line)) {
                // [x] todo item
                return line.replace(/\[\x]/, '[ ]')
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
  let [{ settings }, setSettings] = useState({ settings: null })
  let [state, dispatch] = useReducer(reducer, { value: 'Type some notes here' })

  let lines = state.value.split('\n')

  useEffect(() => {
    setSettings(get)
  }, [])

  let content = []

  let isInDetails = false
  let detailsLineNum = null
  let details = []
  let commentCount = 0
  for (let idx in lines) {
    let line = lines[idx]
    if (line.startsWith('//')) {
      commentCount += 1
    }
    let lineNum = Number(idx) + 1 - commentCount
    if (line.startsWith('>>')) {
      isInDetails = true
      detailsLineNum = lineNum
      details.push({
        summary: line.replace('>> ', ''),
        content: [],
      })
    } else if (isInDetails && line.startsWith('  ')) {
      details[details.length - 1].content.push({
        content: <Text is="span">{line}</Text>,
        lineNum,
      })
    } else if (isInDetails && !line.startsWith('  ')) {
      isInDetails = false
      content.push({
        isDetails: true,
        content: details[details.length - 1],
        lineNum: detailsLineNum,
      })
      // also push any content in the line
      content.push({
        content: <Text is="span">{line}</Text>,
        lineNum,
      })
    } else if (line.startsWith('//')) {
      // ignore comments
    } else if (isLineEmptyCheckbox(line) || isLineCheckedCheckbox(line)) {
      let checked = false
      if (isLineCheckedCheckbox(line)) {
        checked = true
      }
      content.push({
        content: (
          <ControlledCheckbox
            checked={checked}
            onChange={() =>
              dispatch({
                type: 'toggle-todo',
                lineNum: Number(idx) + 1,
              })
            }
            label={line.replace('[ ]', '').replace('[x]', '')}
          />
        ),
        lineNum,
      })
    } else if (boldRegex.test(line)) {
      let { 1: boldedContent, index } = line.match(boldRegex)
      let preBold = line.slice(0, index)
      let postBold = line.slice(index + boldedContent.length + 4)
      content.push({
        content: (
          <Fragment>
            {preBold.length ? <Text is="span">{preBold}</Text> : null}
            <Text is="strong" fontWeight="bold">
              {boldedContent}
            </Text>
            {postBold.length ? <Text is="span">{postBold}</Text> : null}
          </Fragment>
        ),
        lineNum,
      })
    } else if (italicsRegex.test(line)) {
      let { 1: italicContent, index } = line.match(italicsRegex)
      let preItalics = line.slice(0, index)
      let postItalics = line.slice(index + italicContent.length + 4)
      content.push({
        content: (
          <Fragment>
            {preItalics.length ? <Text is="span">{preItalics}</Text> : null}
            <Text is="em" fontStyle="italics">
              {italicContent}
            </Text>
            {postItalics.length ? <Text is="span">{postItalics}</Text> : null}
          </Fragment>
        ),
        lineNum,
      })
    } else {
      // @TODO handle links, tags, metadata
      content.push({
        content: <Text is="span">{line}</Text>,
        lineNum,
      })
    }
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="50vw 50vw"
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
        <Heading variant="h2" is="h1">
          Notedo
        </Heading>
        <Stack inline props={{ px: 2 }} alignItems="center">
          <Link to="/about">About</Link>
          <Link to="/settings">Settings</Link>
        </Stack>
      </Box>
      <Box>
        <Textarea
          fontFamily="monospace"
          value={state.value}
          onChange={(val) => dispatch({ type: 'change', value: val })}
          minHeight="calc(100vh - var(--header-height))"
        />
      </Box>
      <Box is="pre" style={{ whiteSpace: 'pre-line' }}>
        {content.map(({ content, lineNum, isDetails = false }) => {
          if (isDetails) {
            return (
              <Fragment key={lineNum}>
                {settings?.showLineNums ? (
                  <Text is="span" color="$gray-4" pr="$2">
                    {lineNum < 10 ? `0${lineNum}` : lineNum}
                  </Text>
                ) : null}
                <Box is="details" display="inline-block">
                  <summary>{content.summary}</summary>
                  {content.content.map(({ content, lineNum }) => (
                    <Fragment key={lineNum}>
                      {settings?.showLineNums ? (
                        <Text is="span" color="$gray-4" pr="$2">
                          {lineNum < 10 ? `0${lineNum}` : lineNum}
                        </Text>
                      ) : null}

                      {content}
                      <br />
                    </Fragment>
                  ))}
                </Box>
                <br />
              </Fragment>
            )
          }
          return (
            <Fragment key={lineNum}>
              {settings?.showLineNums ? (
                <Text is="span" color="$gray-4" pr="$2">
                  {lineNum < 10 ? `0${lineNum}` : lineNum}
                </Text>
              ) : null}

              {content}
              <br />
            </Fragment>
          )
        })}
      </Box>
    </Box>
  )
}
