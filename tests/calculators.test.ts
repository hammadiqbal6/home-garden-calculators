import { describe, expect, it } from 'vitest';
import {
  BAG_YIELD_CUFT,
  bagsNeeded,
  bedMulch,
  deckMaterials,
  fenceMaterials,
  fertilizerNeeded,
  grassSeed,
  gravelVolume,
  paintNeeded,
  paverCount,
  postHoleVolume,
  raisedBedSoil,
  retainingWallBlocks,
  roofingSquares,
  roofPitch,
  sandVolume,
  slabVolume,
  sonotubeVolume,
  stepsVolume,
  topsoilVolume,
  treeRingMulch,
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
