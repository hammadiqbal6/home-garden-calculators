import { describe, expect, it } from 'vitest';
import {
  ASPHALT_DENSITY_LB_PER_CUFT,
  BAG_YIELD_CUFT,
  bagsNeeded,
  bedMulch,
  boardFeetPerPiece,
  brickCount,
  cmuCount,
  deckMaterials,
  fenceMaterials,
  fertilizerNeeded,
  grassSeed,
  gravelVolume,
  lumberFromBoardFeet,
  lumberFromPieces,
  masonryUnits,
  paintNeeded,
  paverCount,
  postHoleVolume,
  raisedBedSoil,
  rebarForSlab,
  REBAR_LB_PER_FT,
  retainingWallBlocks,
  roofingSquares,
  roofPitch,
  sandVolume,
  slabVolume,
  sonotubeVolume,
  stepsVolume,
  topsoilVolume,
  treeRingMulch,
  asphaltTons,
} from '../src/lib/calculators';
import { cuFtToCuYd, toFeet } from '../src/lib/units';

describe('units', () => {
  it('converts inches and meters to feet', () => {
    expect(toFeet(12, 'in')).toBe(1);
    expect(toFeet(1, 'm')).toBeCloseTo(3.28084, 4);
  });
});

describe('concrete', () => {
  it('slab 10×10×4" is ~1.23 cu yd before waste', () => {
    const r = slabVolume({
      length: 10,
      width: 10,
      thickness: 4,
      thicknessUnit: 'in',
      wasteFactor: 0,
    });
    // 10*10*(4/12) = 33.333 cu ft = 1.235 cu yd
    expect(r.volumeCuFt).toBeCloseTo(33.333, 2);
    expect(r.volumeCuYd).toBeCloseTo(cuFtToCuYd(33.333), 2);
  });

  it('applies 10% waste on slabs by default', () => {
    const r = slabVolume({ length: 10, width: 10, thickness: 4, thicknessUnit: 'in' });
    expect(r.volumeCuFt).toBeCloseTo(33.333 * 1.1, 2);
  });

  it('sonotube 12" × 4 ft matches πr²h', () => {
    const r = sonotubeVolume({
      diameter: 12,
      height: 4,
      diameterUnit: 'in',
      heightUnit: 'ft',
      wasteFactor: 0,
    });
    const expected = Math.PI * 0.5 ** 2 * 4;
    expect(r.volumeCuFt).toBeCloseTo(expected, 3);
  });

  it('post holes scale by count', () => {
    const one = postHoleVolume({
      diameter: 8,
      depth: 2,
      count: 1,
      wasteFactor: 0,
    });
    const eight = postHoleVolume({
      diameter: 8,
      depth: 2,
      count: 8,
      wasteFactor: 0,
    });
    expect(eight.volumeCuFt).toBeCloseTo(one.volumeCuFt * 8, 2);
  });

  it('steps solid-fill uses triangular number formula', () => {
    const r = stepsVolume({
      numberOfSteps: 3,
      riser: 7,
      tread: 11,
      width: 3,
      riserUnit: 'in',
      treadUnit: 'in',
      widthUnit: 'ft',
      wasteFactor: 0,
    });
    const riser = 7 / 12;
    const tread = 11 / 12;
    const expected = 3 * tread * riser * ((3 * 4) / 2);
    expect(r.volumeCuFt).toBeCloseTo(expected, 3);
  });

  it('bag yields match 40/60/80 lb published coverage', () => {
    expect(BAG_YIELD_CUFT[40]).toBe(0.3);
    expect(BAG_YIELD_CUFT[60]).toBe(0.45);
    expect(BAG_YIELD_CUFT[80]).toBe(0.6);
    expect(bagsNeeded(1.2, 80)).toBe(2);
    expect(bagsNeeded(1.2, 60)).toBe(3);
  });
});

describe('mulch', () => {
  it('bed mulch volume = area × depth', () => {
    const r = bedMulch({ length: 20, width: 5, depthInches: 3 });
    expect(r.areaSqFt).toBe(100);
    expect(r.volumeCuFt).toBeCloseTo(25, 3);
    expect(r.volumeCuYd).toBeCloseTo(25 / 27, 3);
  });

  it('tree ring is annular area × depth', () => {
    const r = treeRingMulch({
      outerDiameter: 6,
      trunkDiameter: 1,
      depthInches: 3,
      diameterUnit: 'ft',
    });
    const area = Math.PI * (3 ** 2 - 0.5 ** 2);
    expect(r.areaSqFt).toBeCloseTo(area, 2);
    expect(r.volumeCuFt).toBeCloseTo(area * 0.25, 2);
  });

  it('rejects trunk larger than ring', () => {
    expect(() =>
      treeRingMulch({ outerDiameter: 2, trunkDiameter: 3, depthInches: 3 }),
    ).toThrow();
  });
});

describe('bulk materials', () => {
  it('gravel includes density tonnage', () => {
    const r = gravelVolume({ length: 20, width: 10, depthInches: 4, wasteFactor: 0 });
    expect(r.volumeCuYd).toBeCloseTo((200 * (4 / 12)) / 27, 3);
    expect(r.tons).toBeGreaterThan(0);
  });

  it('topsoil and sand return positive volumes', () => {
    expect(topsoilVolume({ length: 10, width: 10, depthInches: 6 }).volumeCuYd).toBeGreaterThan(0);
    expect(sandVolume({ length: 10, width: 10, depthInches: 2 }).volumeCuFt).toBeCloseTo(
      100 * (2 / 12) * 1.1,
      2,
    );
  });
});

describe('paver / fence / deck', () => {
  it('paver count ceilings whole units with waste', () => {
    const r = paverCount({
      areaLength: 10,
      areaWidth: 10,
      paverLengthIn: 12,
      paverWidthIn: 12,
      wastePercent: 10,
    });
    expect(r.paversNeeded).toBe(100);
    expect(r.paversWithWaste).toBe(110);
  });

  it('fence posts = sections + 1', () => {
    const r = fenceMaterials({ totalLength: 48, postSpacingFt: 8 });
    expect(r.sections).toBe(6);
    expect(r.posts).toBe(7);
    expect(r.rails).toBe(18);
  });

  it('deck boards cover width', () => {
    const r = deckMaterials({ length: 12, width: 12, boardWidthIn: 5.5, boardLengthFt: 12 });
    expect(r.areaSqFt).toBe(144);
    expect(r.deckBoards).toBe(Math.ceil(12 / (5.5 / 12)));
    expect(r.deckBoardsWithWaste).toBe(r.deckBoards);
  });

  it('deck joist spacing and board waste are optional inputs', () => {
    const at16 = deckMaterials({
      length: 16,
      width: 12,
      boardWidthIn: 5.5,
      boardLengthFt: 12,
      joistSpacingIn: 16,
    });
    const at12 = deckMaterials({
      length: 16,
      width: 12,
      boardWidthIn: 5.5,
      boardLengthFt: 12,
      joistSpacingIn: 12,
      wastePercent: 10,
    });
    expect(at16.joists).toBe(Math.floor(16 / (16 / 12)) + 1);
    expect(at12.joists).toBe(Math.floor(16 / (12 / 12)) + 1);
    expect(at12.joists).toBeGreaterThan(at16.joists);
    expect(at12.deckBoardsWithWaste).toBe(Math.ceil(at12.deckBoards * 1.1));
  });
});

describe('roof / paint / wall / lawn', () => {
  it('6/12 pitch is ~26.57°', () => {
    const r = roofPitch({ rise: 6, run: 12, riseUnit: 'in', runUnit: 'in' });
    expect(r.pitchOver12).toBeCloseTo(6, 2);
    expect(r.angleDegrees).toBeCloseTo(26.57, 1);
    expect(r.areaFactor).toBeCloseTo(Math.sqrt(1 + 0.25), 3);
  });

  it('roofing squares use pitch factor and 100 sq ft', () => {
    const r = roofingSquares({
      planLength: 40,
      planWidth: 25,
      pitchOver12: 6,
      wastePercent: 10,
    });
    const factor = Math.sqrt(1 + 0.25);
    expect(r.roofAreaSqFt).toBeCloseTo(1000 * factor, 1);
    expect(r.squares).toBeCloseTo((1000 * factor) / 100, 2);
    expect(r.bundles3PerSquare).toBe(Math.ceil(r.squaresWithWaste * 3));
  });

  it('paint subtracts openings and uses coverage', () => {
    const r = paintNeeded({
      length: 12,
      width: 10,
      height: 8,
      doors: 1,
      windows: 2,
      coats: 2,
      coverageSqFtPerGallon: 350,
    });
    const walls = 2 * (12 + 10) * 8;
    const paint = walls - 20 - 30;
    expect(r.paintableAreaSqFt).toBe(paint);
    expect(r.gallonsTwoCoats).toBeCloseTo((paint * 2) / 350, 2);
  });

  it('retaining wall courses and blocks', () => {
    const r = retainingWallBlocks({
      wallLength: 20,
      wallHeight: 3,
      blockLengthIn: 18,
      blockHeightIn: 6,
      wastePercent: 0,
    });
    expect(r.courses).toBe(6);
    expect(r.blocksPerCourse).toBe(Math.ceil(20 / 1.5));
    expect(r.blocks).toBe(r.courses * r.blocksPerCourse);
  });

  it('grass seed and fertilizer scale with area', () => {
    const g = grassSeed({ length: 50, width: 20, newLawnLbPer1000: 4 });
    expect(g.areaSqFt).toBe(1000);
    expect(g.seedLbsNew).toBe(4);
    const f = fertilizerNeeded({
      length: 50,
      width: 20,
      nitrogenLbPer1000: 1,
      nitrogenPercent: 25,
      bagSizeLbs: 40,
    });
    expect(f.productLbs).toBe(4);
    expect(f.bagsNeeded).toBe(1);
  });

  it('raised bed soil volume', () => {
    const r = raisedBedSoil({ length: 8, width: 4, depthInches: 12 });
    expect(r.volumeCuFt).toBe(32);
  });
});

describe('asphalt', () => {
  it('uses 145 lb/ft³ planning density for compacted hot mix', () => {
    expect(ASPHALT_DENSITY_LB_PER_CUFT).toBe(145);
    // 10×20 ft driveway at 3" compacted, no waste:
    // 200 × 0.25 = 50 cu ft → 50 × 145 / 2000 = 3.625 tons
    const r = asphaltTons({
      length: 20,
      width: 10,
      depthInches: 3,
      wasteFactor: 0,
    });
    expect(r.volumeCuFt).toBeCloseTo(50, 3);
    expect(r.tons).toBeCloseTo(3.63, 2);
  });

  it('applies waste to volume and tons', () => {
    const r = asphaltTons({
      length: 20,
      width: 10,
      depthInches: 3,
      wasteFactor: 0.05,
    });
    expect(r.volumeCuFt).toBeCloseTo(52.5, 3);
    expect(r.tons).toBeCloseTo((52.5 * 145) / 2000, 2);
  });
});

describe('brick / CMU', () => {
  it('modular brick with ⅜" joint is ~6.86 per sq ft (Glen-Gery)', () => {
    const r = brickCount({
      wallLength: 10,
      wallHeight: 10,
      unitLengthIn: 7.625,
      unitHeightIn: 2.25,
      mortarJointIn: 0.375,
      wastePercent: 0,
    });
    expect(r.unitsPerSqFt).toBeCloseTo(6.86, 2);
    // 10×10 wall: module 8" × 2.625" → ceil(120/8)=15 per course, ceil(120/2.625)=46 courses
    expect(r.unitsPerCourse).toBe(15);
    expect(r.courses).toBe(46);
    expect(r.unitsExact).toBe(15 * 46);
  });

  it('CMU 8×16 face with ⅜" joint is 1.125 units per sq ft', () => {
    const r = cmuCount({
      wallLength: 16,
      wallHeight: 8,
      wastePercent: 0,
    });
    expect(r.unitsPerSqFt).toBeCloseTo(1.13, 2);
    expect(r.moduleLengthIn).toBeCloseTo(16, 2);
    expect(r.moduleHeightIn).toBeCloseTo(8, 2);
    expect(r.unitsPerCourse).toBe(12); // 16 ft / (16/12) ft
    expect(r.courses).toBe(12); // 8 ft / (8/12) ft
    expect(r.unitsExact).toBe(144);
  });

  it('applies waste percent with ceil', () => {
    const r = masonryUnits({
      wallLength: 10,
      wallHeight: 8,
      mode: 'brick',
      wastePercent: 5,
    });
    expect(r.unitsWithWaste).toBe(Math.ceil(r.unitsExact * 1.05));
  });
});

describe('lumber', () => {
  it('board feet for a nominal 2×4×8 is 5.33', () => {
    // (2 × 4 × 8) / 12 = 5.333… → 5.33
    expect(boardFeetPerPiece({ thicknessIn: 2, widthIn: 4, length: 8 })).toBeCloseTo(5.33, 2);
  });

  it('tallies softwood under 1" nominal as 1" thick', () => {
    expect(boardFeetPerPiece({ thicknessIn: 0.75, widthIn: 6, length: 10 })).toBeCloseTo(
      (1 * 6 * 10) / 12,
      2,
    );
  });

  it('scales board feet by piece count', () => {
    const r = lumberFromPieces({ thicknessIn: 2, widthIn: 6, length: 12, pieces: 10 });
    expect(r.boardFeetPerPiece).toBeCloseTo(12, 2);
    expect(r.totalBoardFeet).toBeCloseTo(120, 2);
    expect(r.totalLinearFeet).toBe(120);
  });

  it('converts target board feet to pieces', () => {
    const r = lumberFromBoardFeet({
      thicknessIn: 2,
      widthIn: 4,
      length: 8,
      targetBoardFeet: 50,
    });
    // 5.33 BF each → ceil(50/5.33) = 10
    expect(r.piecesNeeded).toBe(10);
    expect(r.totalBoardFeetOrdered).toBeCloseTo(53.3, 1);
  });
});

describe('rebar', () => {
  it('counts a 20×20 slab at 18" o.c. each way', () => {
    // floor(240/18)+1 = 14 bars each way; LF = 14*20*2 = 560
    const r = rebarForSlab({
      length: 20,
      width: 20,
      spacingIn: 18,
      barSize: 4,
      stickLengthFt: 20,
      wastePercent: 0,
    });
    expect(r.barsAlongLength).toBe(14);
    expect(r.barsAlongWidth).toBe(14);
    expect(r.linearFeet).toBeCloseTo(560, 2);
    expect(r.sticks).toBe(28); // 560 / 20
    expect(r.weightLbs).toBeCloseTo(560 * REBAR_LB_PER_FT[4], 1);
  });

  it('adds waste before stick count', () => {
    const r = rebarForSlab({
      length: 20,
      width: 20,
      spacingIn: 18,
      stickLengthFt: 20,
      wastePercent: 10,
    });
    expect(r.linearFeetWithWaste).toBeCloseTo(616, 2);
    expect(r.sticks).toBe(31); // ceil(616/20)
  });
});
