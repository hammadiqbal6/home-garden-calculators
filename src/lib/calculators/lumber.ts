/**
 * Softwood board-foot and piece takeoffs.
 * Board feet = (nominal thickness_in × nominal width_in × length_ft) ÷ 12
 * per piece, then × quantity (7 CFR 1217.4 / American Softwood Lumber Standard
 * board measure — use nominal thickness and width, actual length).
 */
import { round, toFeet, type LengthUnit } from '../units';

export interface LumberFromPiecesResult {
  boardFeetPerPiece: number;
  totalBoardFeet: number;
  totalLinearFeet: number;
  pieces: number;
  volumeCuFt: number;
}

export interface LumberFromBoardFeetResult {
  boardFeetPerPiece: number;
  targetBoardFeet: number;
  piecesNeeded: number;
  totalBoardFeetOrdered: number;
  totalLinearFeet: number;
}

/** Board feet for one piece using softwood nominal dimensions. */
export function boardFeetPerPiece(opts: {
  thicknessIn: number;
  widthIn: number;
  length: number;
  lengthUnit?: LengthUnit;
}): number {
  const lengthFt = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const t = opts.thicknessIn;
  const w = opts.widthIn;
  if (t <= 0 || w <= 0 || lengthFt <= 0) throw new Error('Dimensions must be positive');
  // Softwood < 1" nominal thickness is tallied as 1" (7 CFR 1217.4).
  const thickness = t < 1 ? 1 : t;
  return round((thickness * w * lengthFt) / 12, 2);
}

/** Total board feet and linear feet from a piece list of identical sizes. */
export function lumberFromPieces(opts: {
  thicknessIn: number;
  widthIn: number;
  length: number;
  lengthUnit?: LengthUnit;
  pieces: number;
}): LumberFromPiecesResult {
  const pieces = opts.pieces;
  if (pieces <= 0 || !Number.isFinite(pieces)) throw new Error('Piece count must be positive');
  const lengthFt = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  const per = boardFeetPerPiece(opts);
  const total = round(per * pieces, 2);
  return {
    boardFeetPerPiece: per,
    totalBoardFeet: total,
    totalLinearFeet: round(lengthFt * pieces, 2),
    pieces: Math.ceil(pieces),
    // 1 board foot = 1/12 cu ft of nominal wood.
    volumeCuFt: round(total / 12, 3),
  };
}

/** How many identical pieces are needed for a target board-foot total. */
export function lumberFromBoardFeet(opts: {
  thicknessIn: number;
  widthIn: number;
  length: number;
  lengthUnit?: LengthUnit;
  targetBoardFeet: number;
}): LumberFromBoardFeetResult {
  const target = opts.targetBoardFeet;
  if (target <= 0) throw new Error('Board feet must be positive');
  const per = boardFeetPerPiece(opts);
  if (per <= 0) throw new Error('Board feet per piece must be positive');
  const piecesNeeded = Math.ceil(target / per);
  const lengthFt = toFeet(opts.length, opts.lengthUnit ?? 'ft');
  return {
    boardFeetPerPiece: per,
    targetBoardFeet: round(target, 2),
    piecesNeeded,
    totalBoardFeetOrdered: round(per * piecesNeeded, 2),
    totalLinearFeet: round(lengthFt * piecesNeeded, 2),
  };
}
