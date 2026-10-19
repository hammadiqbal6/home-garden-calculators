import { round, toFeet, type LengthUnit } from '../units';

export interface FenceResult {
  lengthFt: number;
  sections: number;
  posts: number;
  rails: number;
  pickets: number;
  concreteBags80ForPosts: number;
}

/**
 * Privacy / picket fence materials.
 * Posts = sections + 1 (end posts). Rails per section default 3.
 * Pickets sized by face width + gap along the run.
 */
export function fenceMaterials(opts: {
  totalLength: number;
  lengthUnit?: LengthUnit;
  postSpacingFt?: number;
  railsPerSection?: number;
  picketWidthIn?: number;
  picketGapIn?: number;
  /** 80 lb bags per post hole (typical 1 bag for 8–12" hole). */
  bagsPerPost?: number;
}): FenceResult {
  const lengthFt = toFeet(opts.totalLength, opts.lengthUnit ?? 'ft');
  const spacing = opts.postSpacingFt ?? 8;
  const railsPer = opts.railsPerSection ?? 3;
  const picketW = opts.picketWidthIn ?? 5.5;
  const gap = opts.picketGapIn ?? 0.5;
  if (lengthFt <= 0 || spacing <= 0) throw new Error('Length and spacing must be positive');
  const sections = Math.ceil(lengthFt / spacing);
  const posts = sections + 1;
  const rails = sections * railsPer;
  const picketPitchIn = picketW + gap;
  const pickets = Math.ceil((lengthFt * 12) / picketPitchIn);
  const bagsPerPost = opts.bagsPerPost ?? 1;
  return {
    lengthFt: round(lengthFt, 2),
    sections,
    posts,
    rails,
    pickets,
    concreteBags80ForPosts: posts * bagsPerPost,
  };
}
