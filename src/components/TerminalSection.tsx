import React, { useEffect, useRef, useState } from 'react'

interface TerminalLine {
  kind: 'input' | 'output' | 'error' | 'ascii'
  text: string
}

interface TerminalSectionProps {
  onTriggerBsod: () => void
}

const PROMPT = 'C:\\JunLee> '

const BANNER = String.raw`
        _                 _
       (_)_   _ _ __     | | ___  ___
       | | | | | '_ \ _  | |/ _ \/ _ \
       | | |_| | | | | |_| |  __/  __/
      _/ |\__,_|_| |_|\___/ \___|\___|
     |__/
`

const INITIAL_LINES: TerminalLine[] = [
  { kind: 'ascii', text: BANNER },
  { kind: 'output', text: 'Microsoft Windows XP [Version 5.1.2600]' },
  { kind: 'output', text: '(c) 1985-2001 Junseong Corp. All rights reserved.' },
  { kind: 'output', text: '' },
  { kind: 'output', text: 'Type  help  to see what this thing can do.' },
  { kind: 'output', text: '' },
]

const JOKES = [
  'There are 10 kinds of people. Those who know binary and those who don\'t.',
  'Why do programmers prefer dark mode? Because light attracts bugs.',
  'A SQL query walks into a bar, sees two tables, and asks: "Mind if I join?"',
  '!false — it\'s funny because it\'s true.',
  'I would tell you a UDP joke, but you might not get it.',
  'There\'s no place like 127.0.0.1.',
]

function runCommand(input: string, onTriggerBsod: () => void): TerminalLine[] {
  const trimmed = input.trim()
  if (!trimmed) return []

  const lower = trimmed.toLowerCase()
  const [head, ...rest] = trimmed.split(/\s+/)
  const cmd = head.toLowerCase()
  const args = rest.join(' ')

  if (cmd === 'help') {
    return [
      { kind: 'output', text: 'Commands:' },
      { kind: 'output', text: '  help             this list' },
      { kind: 'output', text: '  dir              browse C:\\JunLee' },
      { kind: 'output', text: '  whoami           who is this guy anyway' },
      { kind: 'output', text: '  echo <text>      parrot mode' },
      { kind: 'output', text: '  joke             tell me a joke' },
      { kind: 'output', text: '  cls | clear      clean slate' },
      { kind: 'output', text: '' },
      { kind: 'output', text: '  (there are hidden commands. go on.)' },
      { kind: 'output', text: '' },
    ]
  }

  if (cmd === 'cls' || cmd === 'clear') {
    return [{ kind: 'output', text: '__CLEAR__' }]
  }

  if (cmd === 'dir') {
    return [
      { kind: 'output', text: ' Volume in drive C is JUN-LEE' },
      { kind: 'output', text: ' Directory of C:\\JunLee' },
      { kind: 'output', text: '' },
      { kind: 'output', text: ' <DIR>   Research/' },
      { kind: 'output', text: ' <DIR>   Projects/      (episteme, UMTauto, ...)' },
      { kind: 'output', text: ' <DIR>   Writing/' },
      { kind: 'output', text: '         about.txt' },
      { kind: 'output', text: '         Resume.pdf' },
      { kind: 'output', text: '         coffee.sh' },
      { kind: 'output', text: '' },
    ]
  }

  if (cmd === 'whoami') {
    return [
      { kind: 'output', text: 'Junseong Lee — AI Research Engineer @ Asan Medical Center.' },
      { kind: 'output', text: 'Likes: medical AI, calibrated reasoning, small useful tools.' },
      { kind: 'output', text: '' },
    ]
  }

  if (cmd === 'echo') {
    return [{ kind: 'output', text: args || 'ECHO is on.' }, { kind: 'output', text: '' }]
  }

  if (cmd === 'joke') {
    const pick = JOKES[Math.floor(Math.random() * JOKES.length)]
    return [{ kind: 'output', text: pick }, { kind: 'output', text: '' }]
  }

  if (cmd === 'coffee' || lower === 'coffee.sh') {
    return [
      { kind: 'ascii', text: '     ( (\n      ) )\n   .______.\n   |      |]\n   \\      /\n    `----\'' },
      { kind: 'output', text: 'brewing... ☕ done. stay caffeinated.' },
      { kind: 'output', text: '' },
    ]
  }

  if (cmd === 'exit' || cmd === 'shutdown') {
    return [
      { kind: 'output', text: 'nice try. you can hit the X button though.' },
      { kind: 'output', text: '' },
    ]
  }

  if (lower === 'sudo rm -rf /' || lower === 'rm -rf /' || lower === 'del /f /s /q c:\\') {
    window.setTimeout(() => onTriggerBsod(), 900)
    return [
      { kind: 'error', text: 'WARNING: deleting system partition...' },
      { kind: 'error', text: 'just kidding. no wait—' },
      { kind: 'output', text: '' },
    ]
  }

  return [
    { kind: 'error', text: `'${trimmed}' is not recognized. try 'help'.` },
    { kind: 'output', text: '' },
  ]
}

const TerminalSection: React.FC<TerminalSectionProps> = ({ onTriggerBsod }) => {
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES)
  const [inputValue, setInputValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'instant' })
  }, [lines])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const value = inputValue
    const output = runCommand(value, onTriggerBsod)

    const isClear = output.length === 1 && output[0]?.text === '__CLEAR__'

    if (value.trim()) {
      setHistory((prev) => [value, ...prev])
    }
    setHistoryIndex(-1)
    setInputValue('')

    if (isClear) {
      setLines(INITIAL_LINES)
      return
    }

    setLines((prev) => [
      ...prev,
      { kind: 'input', text: `${PROMPT}${value}` },
      ...output,
    ])
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const nextIndex = Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(nextIndex)
      setInputValue(history[nextIndex] ?? '')
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      const nextIndex = Math.max(historyIndex - 1, -1)
      setHistoryIndex(nextIndex)
      setInputValue(nextIndex === -1 ? '' : (history[nextIndex] ?? ''))
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return (
    <div className="xp-terminal" onClick={focusInput}>
      <div className="xp-terminal-lines">
        {lines.map((line, index) => (
          <div key={index} className={`xp-terminal-line xp-term-${line.kind}`}>
            {line.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="xp-terminal-current-prompt">
          <span className="xp-terminal-prompt-text">{PROMPT}</span>
          <div className="xp-terminal-cursor-wrap">
            <input
              ref={inputRef}
              className="xp-terminal-field"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
        </div>
      </form>
      <div ref={bottomRef} />
    </div>
  )
}

export default TerminalSection
