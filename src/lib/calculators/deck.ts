import { round, toFeet, type LengthUnit } from '../units';

export interface DeckResult {
  areaSqFt: number;
  deckBoards: number;
  joists: number;
  rimJoists: number;
  screws: number;
  boardLinearFt: number;
}

/**
 * Simple rectangular deck material takeoff.
 * Board face width includes typical gap (e.g. 5.5" for 6" nominal + gap → use 5.5).
 * Joists at 16" o.c. by default; +2 rim/band joists along length.
 */
export function deckMaterials(opts: {
  length: number;
  width: number;
  lengthUnit?: LengthUnit;
  widthUnit?: LengthUnit;
  boardWidthIn?: number;
  boardLengthFt?: number;
  joistSpacingIn?: number;
  screwsPerBoardFt?: number;
}): DeckResult {
  const L = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const W = toFeet(opts.width, opts.widthUnit ?? 'ft');
  const boardW = (opts.boardWidthIn ?? 5.5) / 12;
  const boardLen = opts.boardLengthFt ?? 12;
  const joistOC = (opts.joistSpacingIn ?? 16) / 12;
  const screwsPerFt = opts.screwsPerBoardFt ?? 2;
  if (L <= 0 || W <= 0 || boardW <= 0) throw new Error('Dimensions must be positive');
  const area = L * W;
  // Boards run along length; count across width
  const rows = Math.ceil(W / boardW);
  const boardsPerRow = Math.ceil(L / boardLen);
  const deckBoards = rows * boardsPerRow;
  const joists = Math.floor(L / joistOC) + 1;
  const rimJoists = 2;
  const boardLinearFt = deckBoards * boardLen;
  const screws = Math.ceil(boardLinearFt * screwsPerFt);
  return {
    areaSqFt: round(area, 2),
    deckBoards,
    joists,
    rimJoists,
    screws,
    boardLinearFt: round(boardLinearFt, 1),
  };
}
