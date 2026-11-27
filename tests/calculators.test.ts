import { describe, expect, it } from 'vitest';
import {
  ASPHALT_DENSITY_LB_PER_CUFT,
  BAG_YIELD_CUFT,
  bagsNeeded,
  bedMulch,
  boardFeetPerPiece,
  brickCount,
  cmuCount,
  deckFootings,
  deckMaterials,
  fenceMaterials,
  fertilizerNeeded,
  footingRebar,
  footingVolume,
  grassSeed,
  frenchDrainMaterials,
  gravelVolume,
  ACTUAL_SOFTWOOD_SECTIONS,
  LUMBER_DENSITY_PRESETS,
  actualSoftwoodSection,
  lumberFromBoardFeet,
  lumberFromPieces,
  lumberWeight,
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
  circularBedMulch,
  sodNeeded,
  asphaltTons,
  concreteSlabCost,
  formatUsd,
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

  it('bag yields match 40/50/60/80 lb published coverage', () => {
    expect(BAG_YIELD_CUFT[40]).toBe(0.3);
    expect(BAG_YIELD_CUFT[50]).toBe(0.375);
    expect(BAG_YIELD_CUFT[60]).toBe(0.45);
    expect(BAG_YIELD_CUFT[80]).toBe(0.6);
    expect(bagsNeeded(1.2, 80)).toBe(2);
    expect(bagsNeeded(1.2, 60)).toBe(3);
    expect(bagsNeeded(1.2, 50)).toBe(4);
  });

  it('sonotube results include bags50', () => {
    const r = sonotubeVolume({
      diameter: 12,
      height: 4,
      wasteFactor: 0,
    });
    expect(r.bags50).toBe(9);
    expect(r.bags80).toBe(6);
  });
});

describe('footing', () => {
  it('strip 40 ft × 16 in × 8 in is ~35.56 cu ft before waste', () => {
    // 40 × (16/12) × (8/12) = 5120/144 ≈ 35.556 cu ft ≈ 1.317 cu yd
    const r = footingVolume({
      footingType: 'strip',
      length: 40,
      width: 16,
      depth: 8,
      widthUnit: 'in',
      depthUnit: 'in',
      wasteFactor: 0,
    });
    expect(r.volumeCuFt).toBeCloseTo(35.556, 2);
    expect(r.volumeCuYd).toBeCloseTo(cuFtToCuYd(35.556), 2);
  });

  it('applies 10% waste and bag yields (QUIKRETE/Sakrete planning)', () => {
    const r = footingVolume({
      footingType: 'strip',
      length: 40,
      width: 16,
      depth: 8,
      widthUnit: 'in',
      depthUnit: 'in',
    });
    expect(r.volumeCuFt).toBeCloseTo(35.556 * 1.1, 2);
    // ceil(39.111 / 0.60) = 66 × 80 lb; ceil(39.111 / 0.45) = 87 × 60 lb
    expect(r.bags80).toBe(66);
    expect(r.bags60).toBe(87);
    expect(r.bags40).toBe(131);
  });

  it('pad count multiplies rectangular volume', () => {
    const one = footingVolume({
      footingType: 'pad',
      length: 3,
      width: 3,
      depth: 12,
      depthUnit: 'in',
      count: 1,
      wasteFactor: 0,
    });
    const four = footingVolume({
      footingType: 'pad',
      length: 3,
      width: 3,
      depth: 12,
      depthUnit: 'in',
      count: 4,
      wasteFactor: 0,
    });
    expect(one.volumeCuFt).toBeCloseTo(9, 3);
    expect(four.volumeCuFt).toBeCloseTo(36, 3);
  });

  it('strip rebar: 2 long bars + transverse at spacing', () => {
    // 2 × 40 + (floor(480/18)+1) × (16/12) = 80 + 27 × 1.333… = 116 lf
    const r = footingRebar({
      footingType: 'strip',
      length: 40,
      width: 16,
      widthUnit: 'in',
      longitudinalBars: 2,
      spacingIn: 18,
      barSize: 4,
      stickLengthFt: 20,
      wastePercent: 10,
    });
    expect(r.longitudinalBars).toBe(2);
    expect(r.transverseBars).toBe(27);
    expect(r.linearFeet).toBeCloseTo(116, 1);
    expect(r.linearFeetWithWaste).toBeCloseTo(127.6, 1);
    expect(r.sticks).toBe(7);
    expect(r.weightLbs).toBeCloseTo(127.6 * REBAR_LB_PER_FT[4], 0);
  });

  it('pad rebar scales a each-way mat by count', () => {
    const one = footingRebar({
      footingType: 'pad',
      length: 3,
      width: 3,
      spacingIn: 12,
      barSize: 4,
      wastePercent: 0,
    });
    const two = footingRebar({
      footingType: 'pad',
      length: 3,
      width: 3,
      count: 2,
      spacingIn: 12,
      barSize: 4,
      wastePercent: 0,
    });
    // floor(36/12)+1 = 4 bars each way → 4×3 + 4×3 = 24 lf
    expect(one.linearFeet).toBeCloseTo(24, 2);
    expect(two.linearFeet).toBeCloseTo(48, 2);
  });
});

describe('mulch', () => {
  it('bed mulch volume = area × depth', () => {
    const r = bedMulch({ length: 20, width: 5, depthInches: 3 });
    expect(r.areaSqFt).toBe(100);
    expect(r.volumeCuFt).toBeCloseTo(25, 3);
    expect(r.volumeCuYd).toBeCloseTo(25 / 27, 3);
    expect(r.bags2CuFt).toBe(13);
    expect(r.bags3CuFt).toBe(9);
  });

  it('optional mulch prices compare bulk vs bags when > 0', () => {
    const r = bedMulch({
      length: 20,
      width: 5,
      depthInches: 3,
      pricePerYard: 40,
      pricePerBag: 5,
    });
    expect(r.costYards).toBeCloseTo(r.volumeCuYd * 40, 2);
    expect(r.costBags2).toBe(13 * 5);
    expect(r.costBags3).toBe(9 * 5);
    expect(bedMulch({ length: 20, width: 5, depthInches: 3, pricePerYard: 0 }).costYards).toBeUndefined();
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

  it('circular bed mulch uses π r² × depth', () => {
    const r = circularBedMulch({ diameter: 8, depthInches: 3 });
    const area = Math.PI * 16;
    expect(r.areaSqFt).toBeCloseTo(area, 2);
    expect(r.volumeCuFt).toBeCloseTo(area * 0.25, 2);
    expect(r.bags2CuFt).toBe(Math.ceil((area * 0.25) / 2));
  });
});

describe('bulk materials', () => {
  it('gravel includes density tonnage both ways', () => {
    const r = gravelVolume({ length: 20, width: 10, depthInches: 4, wasteFactor: 0 });
    expect(r.volumeCuYd).toBeCloseTo((200 * (4 / 12)) / 27, 3);
    expect(r.tons).toBeGreaterThan(0);
    expect(r.tonsFromYards).toBe(r.tons);
    // 2700 lb/yd³ → 1.35 ton/yd³; 2.469 yd × 1.35 ≈ 3.33 tons
    expect(r.tonsFromYards).toBeCloseTo((r.volumeCuYd * 2700) / 2000, 2);
    expect(r.bags05CuFt).toBe(Math.ceil(r.volumeCuFt / 0.5));
  });

  it('convertTons yields yardsFromTons at material density', () => {
    const r = gravelVolume({
      length: 20,
      width: 10,
      depthInches: 4,
      wasteFactor: 0,
      convertTons: 2.7,
    });
    // 2.7 tons × 2000 / 2700 = 2 cu yd
    expect(r.yardsFromTons).toBeCloseTo(2, 3);
    expect(
      topsoilVolume({
        length: 10,
        width: 10,
        depthInches: 6,
        convertTons: 2.2,
      }).yardsFromTons,
    ).toBeCloseTo(2, 3); // 2.2 × 2000 / 2200
  });

  it('optional prices compare bag vs bulk when > 0', () => {
    const r = sandVolume({
      length: 10,
      width: 10,
      depthInches: 2,
      wasteFactor: 0,
      pricePerYard: 50,
      pricePerTon: 40,
      pricePerBag: 4,
    });
    expect(r.costYards).toBeCloseTo(r.volumeCuYd! * 50, 2);
    expect(r.costTons).toBeCloseTo(r.tons! * 40, 2);
    expect(r.costBags).toBe(r.bags05CuFt! * 4);
    expect(
      gravelVolume({ length: 10, width: 10, depthInches: 4, pricePerYard: 0 }).costYards,
    ).toBeUndefined();
  });

  it('topsoil and sand return positive volumes', () => {
    expect(topsoilVolume({ length: 10, width: 10, depthInches: 6 }).volumeCuYd).toBeGreaterThan(0);
    expect(sandVolume({ length: 10, width: 10, depthInches: 2 }).volumeCuFt).toBeCloseTo(
      100 * (2 / 12) * 1.1,
      2,
    );
  });
});

describe('french drain', () => {
  it('subtracts pipe volume and reports fabric + pipe length', () => {
    // 40 ft × 12 in × 18 in trench, 4 in pipe, 12 in fabric overlap, 0% waste
    // trench = 40 × 1 × 1.5 = 60 cu ft
    // pipe = π × (2/12)² × 40 ≈ 3.4907 cu ft
    // gravel = 56.5093 cu ft ≈ 2.093 cu yd
    // fabric width = 1 + 2×1.5 + 1 = 5 ft → area 200 sq ft
    const r = frenchDrainMaterials({
      length: 40,
      width: 12,
      depth: 18,
      pipeDiameter: 4,
      fabricOverlap: 12,
      wasteFactor: 0,
      densityLbPerCuYd: 2700,
    });
    expect(r.trenchVolumeCuFt).toBeCloseTo(60, 3);
    expect(r.pipeVolumeCuFt).toBeCloseTo(Math.PI * (2 / 12) ** 2 * 40, 3);
    expect(r.gravelCuFt).toBeCloseTo(60 - Math.PI * (2 / 12) ** 2 * 40, 3);
    expect(r.gravelCuYd).toBeCloseTo(r.gravelCuFt / 27, 3);
    expect(r.tons).toBeCloseTo((r.gravelCuYd * 2700) / 2000, 2);
    expect(r.fabricWidthFt).toBeCloseTo(5, 2);
    expect(r.fabricAreaSqFt).toBeCloseTo(200, 2);
    expect(r.pipeLengthFt).toBe(40);
  });

  it('applies waste after pipe subtraction', () => {
    const base = frenchDrainMaterials({
      length: 40,
      width: 12,
      depth: 18,
      pipeDiameter: 4,
      wasteFactor: 0,
    });
    const withWaste = frenchDrainMaterials({
      length: 40,
      width: 12,
      depth: 18,
      pipeDiameter: 4,
      wasteFactor: 0.1,
    });
    expect(withWaste.gravelCuFt).toBeCloseTo(base.gravelCuFt * 1.1, 3);
  });

  it('rejects pipe larger than trench width', () => {
    expect(() =>
      frenchDrainMaterials({ length: 10, width: 4, depth: 18, pipeDiameter: 4 }),
    ).toThrow();
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

  it('deck footings: 16×12 freestanding at 8 ft spacing → 6 piers', () => {
    // postsAlong = floor(16/8)+1 = 3; beamRows = floor(12/8)+1 = 2; count = 6
    const r = deckFootings({
      length: 16,
      width: 12,
      postSpacing: 8,
      beamSpacing: 8,
      frostDepth: 4,
      holeDiameter: 12,
      wasteFactor: 0,
    });
    expect(r.postsAlong).toBe(3);
    expect(r.beamRows).toBe(2);
    expect(r.footingCount).toBe(6);
    expect(r.holeDepthFt).toBe(4);
    expect(r.formDiameterIn).toBe(12);
    const per = Math.PI * 0.5 ** 2 * 4;
    expect(r.volumePerHoleCuFt).toBeCloseTo(per, 3);
    expect(r.totalVolumeCuFt).toBeCloseTo(per * 6, 2);
    // QUIKRETE 1101: 0.60 cu ft per 80 lb → ceil(18.85 / 0.60) = 32
    expect(r.bags80).toBe(Math.ceil((per * 6) / 0.6));
  });

  it('deck footings: attached layout drops the ledger-side row', () => {
    const free = deckFootings({
      length: 16,
      width: 12,
      postSpacing: 8,
      beamSpacing: 8,
      frostDepth: 4,
      holeDiameter: 12,
      layout: 'freestanding',
      wasteFactor: 0,
    });
    const attached = deckFootings({
      length: 16,
      width: 12,
      postSpacing: 8,
      beamSpacing: 8,
      frostDepth: 4,
      holeDiameter: 12,
      layout: 'attached',
      wasteFactor: 0,
    });
    expect(attached.beamRows).toBe(1);
    expect(attached.footingCount).toBe(3);
    expect(attached.footingCount).toBeLessThan(free.footingCount);
  });

  it('deck footings: optional Sonotube diameter drives concrete volume', () => {
    const r = deckFootings({
      length: 8,
      width: 8,
      postSpacing: 8,
      beamSpacing: 8,
      frostDepth: 3,
      holeDiameter: 14,
      sonotubeDiameter: 12,
      wasteFactor: 0,
    });
    expect(r.footingCount).toBe(4);
    expect(r.holeDiameterIn).toBe(14);
    expect(r.sonotubeDiameterIn).toBe(12);
    expect(r.formDiameterIn).toBe(12);
    expect(r.volumePerHoleCuFt).toBeCloseTo(Math.PI * 0.5 ** 2 * 3, 3);
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

  it('sod area with waste rounds pieces and pallets up', () => {
    const r = sodNeeded({
      length: 50,
      width: 20,
      wastePercent: 5,
      sqFtPerPiece: 10,
      sqFtPerPallet: 450,
    });
    expect(r.areaSqFt).toBe(1000);
    expect(r.areaWithWasteSqFt).toBe(1050);
    expect(r.pieces).toBe(105);
    expect(r.pallets).toBe(3);
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

  it('estimates 80 lb mortar bags from QUIKRETE 1102 yields', () => {
    const brick = brickCount({
      wallLength: 10,
      wallHeight: 10,
      wastePercent: 0,
    });
    // 15×46 = 690 bricks → ceil(690/37) = 19 bags
    expect(brick.unitsExact).toBe(690);
    expect(brick.mortarBags80).toBe(Math.ceil(690 / 37));

    const cmu = cmuCount({
      wallLength: 16,
      wallHeight: 8,
      wastePercent: 0,
    });
    // 144 blocks → ceil(144/13) = 12 bags
    expect(cmu.unitsExact).toBe(144);
    expect(cmu.mortarBags80).toBe(Math.ceil(144 / 13));
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

  it('maps nominal softwood sizes to dressed actual sections', () => {
    expect(actualSoftwoodSection(2, 4)).toEqual(ACTUAL_SOFTWOOD_SECTIONS['2x4']);
    expect(actualSoftwoodSection(2, 6)).toEqual({ thicknessIn: 1.5, widthIn: 5.5 });
    expect(actualSoftwoodSection(2, 8)).toEqual({ thicknessIn: 1.5, widthIn: 7.25 });
    expect(actualSoftwoodSection(2, 10)).toEqual({ thicknessIn: 1.5, widthIn: 9.25 });
    expect(actualSoftwoodSection(2, 12)).toEqual({ thicknessIn: 1.5, widthIn: 11.25 });
    expect(actualSoftwoodSection(4, 4)).toEqual({ thicknessIn: 3.5, widthIn: 3.5 });
  });

  it('uses Wood Handbook SG × 62.4 × 1.12 for KD density presets', () => {
    expect(LUMBER_DENSITY_PRESETS.spf_kd.densityLbPerCuFt).toBeCloseTo(0.41 * 62.4 * 1.12, 1);
    expect(LUMBER_DENSITY_PRESETS.douglas_fir_larch_kd.densityLbPerCuFt).toBeCloseTo(
      0.48 * 62.4 * 1.12,
      1,
    );
    expect(LUMBER_DENSITY_PRESETS.southern_pine_kd.densityLbPerCuFt).toBeCloseTo(
      0.51 * 62.4 * 1.12,
      1,
    );
    expect(LUMBER_DENSITY_PRESETS.southern_pine_green.densityLbPerCuFt).toBe(53);
  });

  it('estimates 2×4×8 SPF weight from actual 1.5×3.5 section', () => {
    // vol = (1.5 × 3.5 × 8 × 12) / 1728 = 0.291666… cu ft
    // density SPF KD = 0.41 × 62.4 × 1.12 ≈ 28.65 lb/cu ft
    // weight ≈ 8.36 lb
    const r = lumberWeight({
      thicknessIn: 2,
      widthIn: 4,
      length: 8,
      pieces: 1,
      densityPreset: 'spf_kd',
    });
    expect(r.actualThicknessIn).toBe(1.5);
    expect(r.actualWidthIn).toBe(3.5);
    expect(r.volumeCuFtPerPiece).toBeCloseTo(0.2917, 3);
    const density = LUMBER_DENSITY_PRESETS.spf_kd.densityLbPerCuFt;
    expect(r.weightLbPerPiece).toBeCloseTo(0.2916667 * density, 1);
    expect(r.weightLbPerLinearFoot).toBeCloseTo(r.weightLbPerPiece / 8, 2);
    expect(r.weightKgPerPiece).toBeCloseTo(r.weightLbPerPiece * 0.45359237, 2);
  });

  it('scales total weight by piece count', () => {
    const one = lumberWeight({
      thicknessIn: 2,
      widthIn: 4,
      length: 8,
      pieces: 1,
      densityPreset: 'spf_kd',
    });
    const ten = lumberWeight({
      thicknessIn: 2,
      widthIn: 4,
      length: 8,
      pieces: 10,
      densityPreset: 'spf_kd',
    });
    expect(ten.weightLbTotal).toBeCloseTo(one.weightLbPerPiece * 10, 1);
    expect(ten.pieces).toBe(10);
  });

  it('accepts a custom density override', () => {
    const r = lumberWeight({
      thicknessIn: 2,
      widthIn: 4,
      length: 8,
      pieces: 1,
      densityPreset: 'custom',
      densityLbPerCuFt: 30,
    });
    expect(r.densityLbPerCuFt).toBe(30);
    expect(r.weightLbPerPiece).toBeCloseTo(0.2916667 * 30, 1);
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

describe('concrete slab cost', () => {
  it('prices a 10×10×4" slab from ready-mix $/yd with waste', () => {
    // 10*10*(4/12)*1.1 = 36.667 cu ft ≈ 1.358 cu yd
    const r = concreteSlabCost({
      length: 10,
      width: 10,
      thickness: 4,
      wastePercent: 10,
      purchaseMode: 'ready-mix',
      readyMixPrice: 160,
      gravelBaseCost: 0,
      rebarMeshCost: 0,
      formsCost: 0,
      deliveryFee: 0,
      laborPerSqFt: 0,
    });
    expect(r.areaSqFt).toBeCloseTo(100, 3);
    expect(r.volumeCuYd).toBeCloseTo(cuFtToCuYd(33.333 * 1.1), 2);
    expect(r.materialCost).toBeCloseTo(r.volumeCuYd * 160, 2);
    expect(r.totalCost).toBeCloseTo(r.materialCost, 2);
    expect(r.costPerSqFt).toBeCloseTo(r.totalCost / 100, 2);
    expect(r.bags).toBeNull();
  });

  it('prices the same slab from 80 lb bag count × bag price', () => {
    const r = concreteSlabCost({
      length: 10,
      width: 10,
      thickness: 4,
      wastePercent: 10,
      purchaseMode: 'bags',
      bagSize: 80,
      bagPrice: 7,
    });
    // ceil(36.667 / 0.60) = 62 bags → 62 * 7 = 434
    expect(r.bags).toBe(62);
    expect(r.materialCost).toBe(434);
    expect(r.totalCost).toBe(434);
  });

  it('adds optional line items and labor per sq ft', () => {
    const r = concreteSlabCost({
      length: 10,
      width: 10,
      thickness: 4,
      wastePercent: 10,
      purchaseMode: 'ready-mix',
      readyMixPrice: 100,
      gravelBaseCost: 50,
      rebarMeshCost: 40,
      formsCost: 30,
      deliveryFee: 75,
      laborPerSqFt: 2,
    });
    expect(r.laborCost).toBe(200);
    expect(r.addOnsTotal).toBe(50 + 40 + 30 + 75 + 200);
    expect(r.totalCost).toBeCloseTo(r.materialCost + r.addOnsTotal, 2);
  });

  it('formats money with two decimals', () => {
    expect(formatUsd(12)).toBe('$12.00');
    expect(formatUsd(12.5)).toBe('$12.50');
  });
});
