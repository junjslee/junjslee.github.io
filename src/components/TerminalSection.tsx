import React, { useEffect, useRef, useState } from 'react'

interface TerminalLine {
  kind: 'input' | 'output' | 'error'
  text: string
}

interface TerminalSectionProps {
  onTriggerBsod: () => void
}

const PROMPT = 'C:\\Users\\JunLee> '

const INITIAL_LINES: TerminalLine[] = [
  { kind: 'output', text: 'Microsoft Windows XP [Version 5.1.2600]' },
  { kind: 'output', text: '(C) Copyright 1985-2001 Microsoft Corp.' },
  { kind: 'output', text: '' },
  { kind: 'output', text: '' },
]

function runCommand(input: string, onTriggerBsod: () => void): TerminalLine[] {
  const trimmed = input.trim()
  const lower = trimmed.toLowerCase()

  if (!trimmed) return []

  if (lower === 'help') {
    return [
      { kind: 'output', text: 'Available commands:' },
      { kind: 'output', text: '  help        Show this help message' },
      { kind: 'output', text: '  cls, clear  Clear the terminal screen' },
      { kind: 'output', text: '  dir         List directory contents' },
      { kind: 'output', text: '  whoami      Display current user' },
      { kind: 'output', text: '  ipconfig    Display network configuration' },
      { kind: 'output', text: '  systeminfo  Display system information' },
      { kind: 'output', text: '' },
    ]
  }

  if (lower === 'cls' || lower === 'clear') {
    return [{ kind: 'output', text: '__CLEAR__' }]
  }

  if (lower === 'dir') {
    return [
      { kind: 'output', text: ' Volume in drive C is JunLee-PC' },
      { kind: 'output', text: ' Directory of C:\\Users\\JunLee' },
      { kind: 'output', text: '' },
      { kind: 'output', text: '03/26/2026  09:14 AM    <DIR>          Research' },
      { kind: 'output', text: '03/26/2026  09:14 AM    <DIR>          Projects' },
      { kind: 'output', text: '03/26/2026  09:14 AM    <DIR>          Writing' },
      { kind: 'output', text: '03/26/2026  09:14 AM             2,048 about.txt' },
      { kind: 'output', text: '03/26/2026  09:14 AM           184,320 Resume.pdf' },
      { kind: 'output', text: '               2 File(s)        186,368 bytes' },
      { kind: 'output', text: '               3 Dir(s)  238,102,364,160 bytes free' },
      { kind: 'output', text: '' },
    ]
  }

  if (lower === 'whoami') {
    return [
      { kind: 'output', text: 'junjslee-pc\\Junseong Lee' },
      { kind: 'output', text: '' },
    ]
  }

  if (lower === 'ipconfig') {
    return [
      { kind: 'output', text: 'Windows IP Configuration' },
      { kind: 'output', text: '' },
      { kind: 'output', text: 'Ethernet adapter Local Area Connection:' },
      { kind: 'output', text: '' },
      { kind: 'output', text: '   Connection-specific DNS Suffix  . : github.io' },
      { kind: 'output', text: '   IP Address. . . . . . . . . . . : 185.199.108.153' },
      { kind: 'output', text: '   Subnet Mask . . . . . . . . . . : 255.255.255.0' },
      { kind: 'output', text: '   Default Gateway . . . . . . . . : 185.199.108.1' },
      { kind: 'output', text: '' },
    ]
  }

  if (lower === 'systeminfo') {
    return [
      { kind: 'output', text: 'Host Name:              JUNJSLEE-PC' },
      { kind: 'output', text: 'OS Name:                Windows XP Portfolio Edition' },
      { kind: 'output', text: 'OS Version:             5.1.2600 Service Pack 3' },
      { kind: 'output', text: 'Owner:                  Junseong Lee' },
      { kind: 'output', text: 'System Model:           B.S. Finance & Data Science CS Minor' },
      { kind: 'output', text: 'Processor:              AI Research Engineer @ Asan Medical Center' },
      { kind: 'output', text: 'Current Focus:          Statistical learning + Medical AI' },
      { kind: 'output', text: '' },
    ]
  }

  if (
    lower === 'sudo rm -rf /' ||
    lower === 'rm -rf /' ||
    lower === 'del /f /s /q c:\\'
  ) {
    window.setTimeout(() => {
      onTriggerBsod()
    }, 900)
    return [
      { kind: 'error', text: 'WARNING: Attempting to delete system partition...' },
      { kind: 'error', text: 'Access Denied. Initiating emergency shutdown sequence.' },
      { kind: 'output', text: '' },
    ]
  }

  return [
    { kind: 'error', text: `'${trimmed}' is not recognized as an internal or external command,` },
    { kind: 'error', text: 'operable program or batch file.' },
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
