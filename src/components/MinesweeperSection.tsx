import React, { useEffect, useRef, useState } from 'react'

type Difficulty = 'beginner' | 'intermediate'
type Status = 'playing' | 'won' | 'lost'
type FaceState = 'smile' | 'worried' | 'dead' | 'cool'

interface Cell {
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  isExploded: boolean
  neighborCount: number
}

const DIFFICULTY_CONFIG: Record<Difficulty, { rows: number; cols: number; mines: number }> = {
  beginner: { rows: 9, cols: 9, mines: 10 },
  intermediate: { rows: 16, cols: 16, mines: 40 },
}

const NUMBER_COLORS = [
  '',
  '#0000ff',
  '#008000',
  '#ff0000',
  '#000080',
  '#800000',
  '#008080',
  '#000000',
  '#808080',
]

const FACE_EMOJI: Record<FaceState, string> = {
  smile: '🙂',
  worried: '😮',
  dead: '😵',
  cool: '😎',
}

function createEmptyBoard(rows: number, cols: number): Cell[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      isExploded: false,
      neighborCount: 0,
    }))
  )
}

function placeMines(board: Cell[][], mines: number, safeRow: number, safeCol: number): Cell[][] {
  const rows = board.length
  const cols = board[0].length
  const next = board.map((row) => row.map((cell) => ({ ...cell })))
  const candidates: Array<[number, number]> = []

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (Math.abs(r - safeRow) <= 1 && Math.abs(c - safeCol) <= 1) continue
      candidates.push([r, c])
    }
  }

  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[candidates[i], candidates[j]] = [candidates[j], candidates[i]]
  }

  const actualMines = Math.min(mines, candidates.length)
  for (let i = 0; i < actualMines; i++) {
    const [r, c] = candidates[i]
    next[r][c].isMine = true
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (next[r][c].isMine) continue
      let count = 0
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr
          const nc = c + dc
          if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue
          if (next[nr][nc].isMine) count++
        }
      }
      next[r][c].neighborCount = count
    }
  }

  return next
}

function floodReveal(board: Cell[][], startR: number, startC: number): Cell[][] {
  const rows = board.length
  const cols = board[0].length
  const next = board.map((row) => row.map((cell) => ({ ...cell })))
  const stack: Array<[number, number]> = [[startR, startC]]

  while (stack.length > 0) {
    const [r, c] = stack.pop()!
    if (r < 0 || c < 0 || r >= rows || c >= cols) continue
    const cell = next[r][c]
    if (cell.isRevealed || cell.isFlagged || cell.isMine) continue
    cell.isRevealed = true
    if (cell.neighborCount === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue
          stack.push([r + dr, c + dc])
        }
      }
    }
  }

  return next
}

function revealAllMines(board: Cell[][], explodedR: number, explodedC: number): Cell[][] {
  return board.map((row, r) =>
    row.map((cell, c) => {
      if (cell.isMine) {
        return {
          ...cell,
          isRevealed: true,
          isExploded: r === explodedR && c === explodedC,
        }
      }
      return cell
    })
  )
}

function isWon(board: Cell[][]): boolean {
  for (const row of board) {
    for (const cell of row) {
      if (!cell.isMine && !cell.isRevealed) return false
    }
  }
  return true
}

const MinesweeperSection: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner')
  const config = DIFFICULTY_CONFIG[difficulty]
  const [board, setBoard] = useState<Cell[][]>(() => createEmptyBoard(config.rows, config.cols))
  const [minesPlaced, setMinesPlaced] = useState(false)
  const [status, setStatus] = useState<Status>('playing')
  const [flagCount, setFlagCount] = useState(0)
  const [time, setTime] = useState(0)
  const [face, setFace] = useState<FaceState>('smile')
  const [flagMode, setFlagMode] = useState(false)
  const hasStartedRef = useRef(false)

  const reset = (nextDifficulty?: Difficulty) => {
    const effective = nextDifficulty ?? difficulty
    const cfg = DIFFICULTY_CONFIG[effective]
    if (nextDifficulty) setDifficulty(nextDifficulty)
    setBoard(createEmptyBoard(cfg.rows, cfg.cols))
    setMinesPlaced(false)
    setStatus('playing')
    setFlagCount(0)
    setTime(0)
    setFace('smile')
    hasStartedRef.current = false
  }

  useEffect(() => {
    if (status !== 'playing' || !hasStartedRef.current) return
    const interval = window.setInterval(() => setTime((t) => Math.min(t + 1, 999)), 1000)
    return () => window.clearInterval(interval)
  }, [status, minesPlaced])

  const toggleFlag = (r: number, c: number) => {
    if (status !== 'playing') return
    const cell = board[r][c]
    if (cell.isRevealed) return
    const next = board.map((row) => row.map((cellCopy) => ({ ...cellCopy })))
    next[r][c].isFlagged = !next[r][c].isFlagged
    setFlagCount((prev) => prev + (next[r][c].isFlagged ? 1 : -1))
    setBoard(next)
  }

  const handleReveal = (r: number, c: number) => {
    if (status !== 'playing') return
    const cell = board[r][c]
    if (cell.isFlagged || cell.isRevealed) return

    let working = board
    if (!minesPlaced) {
      working = placeMines(board, config.mines, r, c)
      setMinesPlaced(true)
      hasStartedRef.current = true
    }

    if (working[r][c].isMine) {
      setBoard(revealAllMines(working, r, c))
      setStatus('lost')
      setFace('dead')
      return
    }

    const next = floodReveal(working, r, c)
    if (isWon(next)) {
      setBoard(next)
      setStatus('won')
      setFace('cool')
      return
    }
    setBoard(next)
  }

  const handleCellClick = (r: number, c: number) => {
    if (flagMode) {
      toggleFlag(r, c)
      return
    }
    handleReveal(r, c)
  }

  const handleCellContext = (event: React.MouseEvent, r: number, c: number) => {
    event.preventDefault()
    toggleFlag(r, c)
  }

  const minesRemaining = Math.max(-99, config.mines - flagCount)
  const mineDisplay =
    minesRemaining < 0
      ? `-${String(Math.abs(minesRemaining)).padStart(2, '0')}`
      : String(minesRemaining).padStart(3, '0')
  const timeDisplay = String(time).padStart(3, '0')

  return (
    <div className="xp-minesweeper" onContextMenu={(e) => e.preventDefault()}>
      <div className="xp-ms-menubar">
        <button
          type="button"
          className={difficulty === 'beginner' ? 'is-active' : ''}
          onClick={() => reset('beginner')}
        >
          Beginner
        </button>
        <button
          type="button"
          className={difficulty === 'intermediate' ? 'is-active' : ''}
          onClick={() => reset('intermediate')}
        >
          Intermediate
        </button>
        <button
          type="button"
          className={`xp-ms-flag-toggle${flagMode ? ' is-active' : ''}`}
          onClick={() => setFlagMode((v) => !v)}
          aria-pressed={flagMode}
          title="Tap-to-flag (or right-click)"
        >
          ⚑ {flagMode ? 'on' : 'off'}
        </button>
      </div>

      <div className="xp-ms-panel">
        <div className="xp-ms-header">
          <div className="xp-ms-counter" aria-label="Mines remaining">{mineDisplay}</div>
          <button
            type="button"
            className="xp-ms-face"
            onClick={() => reset()}
            aria-label="New game"
          >
            <span aria-hidden="true">{FACE_EMOJI[face]}</span>
          </button>
          <div className="xp-ms-counter" aria-label="Time">{timeDisplay}</div>
        </div>

        <div
          className="xp-ms-grid"
          style={{ gridTemplateColumns: `repeat(${config.cols}, 24px)` }}
          onMouseDown={() => status === 'playing' && setFace('worried')}
          onMouseUp={() => status === 'playing' && setFace('smile')}
          onMouseLeave={() => status === 'playing' && setFace('smile')}
        >
          {board.map((row, r) =>
            row.map((cell, c) => {
              const classes = ['xp-ms-cell']
              if (cell.isRevealed) classes.push('is-revealed')
              if (cell.isRevealed && cell.isMine) classes.push('is-mine')
              if (cell.isExploded) classes.push('is-exploded')
              if (cell.isFlagged) classes.push('is-flagged')

              let content: React.ReactNode = ''
              if (cell.isFlagged && !cell.isRevealed) content = '⚑'
              else if (cell.isRevealed) {
                if (cell.isMine) content = '✹'
                else if (cell.neighborCount > 0) content = cell.neighborCount
              }

              const style =
                cell.isRevealed && !cell.isMine && cell.neighborCount > 0
                  ? { color: NUMBER_COLORS[cell.neighborCount] }
                  : undefined

              return (
                <button
                  key={`${r}-${c}`}
                  type="button"
                  className={classes.join(' ')}
                  style={style}
                  onClick={() => handleCellClick(r, c)}
                  onContextMenu={(e) => handleCellContext(e, r, c)}
                  disabled={status !== 'playing' && !cell.isRevealed && !cell.isFlagged}
                >
                  {content}
                </button>
              )
            })
          )}
        </div>
      </div>

      <div className="xp-ms-footer">
        {status === 'playing' && 'Left-click to reveal · Right-click (or Flag Mode) to flag'}
        {status === 'won' && `🎉 Cleared in ${time}s — click the face for a new game.`}
        {status === 'lost' && '💥 Boom. Click the face to try again.'}
      </div>
    </div>
  )
}

export default MinesweeperSection
