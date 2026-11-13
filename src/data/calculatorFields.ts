/**
 * Server-rendered default fields + result rows (mirrors Calculator.astro defaults).
 * Result placeholders use the same pure math as the client island so crawlers and
 * AI answer engines see real worked numbers in the static HTML.
 */
import {
  asphaltTons,
  bedMulch,
  brickCount,
  deckMaterials,
  fenceMaterials,
  fertilizerNeeded,
  grassSeed,
  gravelVolume,
  lumberFromPieces,
  paintNeeded,
  paverCount,
  postHoleVolume,
  raisedBedSoil,
  rebarForSlab,
  retainingWallBlocks,
  roofingSquares,
  roofPitch,
  sandVolume,
  slabVolume,
  sonotubeVolume,
  topsoilVolume,
  treeRingMulch,
} from '../lib/calculators';

export type SsrField = {
  name: string;
  label: string;
  type?: 'number' | 'select';
  options?: { value: string; label: string }[];
  value: string;
  hint?: string;
  step?: string;
};

const dims = (
  length = '10',
  width = '10',
  depthLabel = 'Depth',
  depth = '4',
  depthHint = 'inches',
): SsrField[] => [
  { name: 'length', label: 'Length', value: length, hint: 'feet' },
  { name: 'width', label: 'Width', value: width, hint: 'feet' },
  { name: 'depth', label: depthLabel, value: depth, hint: depthHint },
];

export const ssrFields: Record<string, SsrField[]> = {
  concrete: [
    {
      name: 'shape',
      label: 'Shape',
      type: 'select',
      options: [
        { value: 'slab', label: 'Slab / pad' },
        { value: 'footing', label: 'Footing' },
        { value: 'steps', label: 'Steps' },
      ],
      value: 'slab',
    },
    { name: 'length', label: 'Length', value: '10', hint: 'feet' },
    { name: 'width', label: 'Width', value: '10', hint: 'feet' },
    { name: 'thickness', label: 'Thickness / height', value: '4', hint: 'inches for slabs' },
    { name: 'steps', label: 'Number of steps', value: '3' },
    { name: 'riser', label: 'Riser', value: '7', hint: 'inches' },
    { name: 'tread', label: 'Tread', value: '11', hint: 'inches' },
    { name: 'waste', label: 'Waste %', value: '10' },
  ],
  'post-holes': [
    { name: 'diameter', label: 'Hole diameter', value: '10', hint: 'inches' },
    { name: 'depth', label: 'Hole depth', value: '2.5', hint: 'feet' },
    { name: 'count', label: 'Number of posts', value: '8' },
    { name: 'waste', label: 'Waste %', value: '10' },
  ],
  sonotube: [
    { name: 'diameter', label: 'Tube diameter', value: '12', hint: 'inches' },
    { name: 'height', label: 'Height', value: '4', hint: 'feet' },
    { name: 'count', label: 'Number of tubes', value: '4' },
    { name: 'waste', label: 'Waste %', value: '5' },
  ],
  mulch: dims('20', '5', 'Depth', '3', 'inches'),
  'tree-ring-mulch': [
    { name: 'outer', label: 'Outer ring diameter', value: '6', hint: 'feet' },
    { name: 'trunk', label: 'Trunk / keep-out diameter', value: '1', hint: 'feet' },
    { name: 'depth', label: 'Depth', value: '3', hint: 'inches' },
  ],
  gravel: [...dims('20', '10', 'Depth', '4', 'inches'), { name: 'waste', label: 'Waste / compaction %', value: '10' }],
  topsoil: [...dims('20', '10', 'Depth', '4', 'inches'), { name: 'waste', label: 'Waste / compaction %', value: '10' }],
  sand: [...dims('20', '10', 'Depth', '1', 'inches'), { name: 'waste', label: 'Waste / compaction %', value: '10' }],
  paver: [
    { name: 'length', label: 'Patio length', value: '12', hint: 'feet' },
    { name: 'width', label: 'Patio width', value: '10', hint: 'feet' },
    { name: 'paverL', label: 'Paver length', value: '12', hint: 'inches' },
    { name: 'paverW', label: 'Paver width', value: '12', hint: 'inches' },
    { name: 'waste', label: 'Waste %', value: '10' },
  ],
  fence: [
    { name: 'length', label: 'Total fence length', value: '48', hint: 'feet' },
    { name: 'spacing', label: 'Post spacing', value: '8', hint: 'feet' },
    { name: 'rails', label: 'Rails per section', value: '3' },
    { name: 'picketW', label: 'Picket width', value: '5.5', hint: 'inches' },
    { name: 'gap', label: 'Gap between pickets', value: '0.5', hint: 'inches' },
  ],
  deck: [
    { name: 'length', label: 'Deck length', value: '16', hint: 'feet' },
    { name: 'width', label: 'Deck width', value: '12', hint: 'feet' },
    { name: 'boardW', label: 'Board face width', value: '5.5', hint: 'inches incl. gap' },
    { name: 'boardL', label: 'Board length', value: '12', hint: 'feet' },
  ],
  'roof-pitch': [
    { name: 'rise', label: 'Rise', value: '6', hint: 'inches' },
    { name: 'run', label: 'Run', value: '12', hint: 'inches' },
  ],
  roofing: [
    { name: 'length', label: 'Plan length', value: '40', hint: 'feet' },
    { name: 'width', label: 'Plan width', value: '25', hint: 'feet' },
    { name: 'pitch', label: 'Pitch (X in 12)', value: '6' },
    { name: 'waste', label: 'Waste %', value: '10' },
  ],
  paint: [
    { name: 'length', label: 'Room length', value: '14', hint: 'feet' },
    { name: 'width', label: 'Room width', value: '12', hint: 'feet' },
    { name: 'height', label: 'Ceiling height', value: '8', hint: 'feet' },
    { name: 'doors', label: 'Doors', value: '2' },
    { name: 'windows', label: 'Windows', value: '2' },
    { name: 'coats', label: 'Coats', value: '2' },
    { name: 'coverage', label: 'Coverage per gallon', value: '350', hint: 'sq ft' },
  ],
  'retaining-wall': [
    { name: 'length', label: 'Wall length', value: '20', hint: 'feet' },
    { name: 'height', label: 'Wall height', value: '3', hint: 'feet' },
    { name: 'blockL', label: 'Block face length', value: '18', hint: 'inches' },
    { name: 'blockH', label: 'Block face height', value: '6', hint: 'inches' },
    { name: 'waste', label: 'Waste %', value: '5' },
  ],
  'grass-seed': [
    { name: 'length', label: 'Lawn length', value: '50', hint: 'feet' },
    { name: 'width', label: 'Lawn width', value: '20', hint: 'feet' },
    { name: 'newRate', label: 'New lawn lb / 1,000 sq ft', value: '3.5' },
    { name: 'overRate', label: 'Overseed lb / 1,000 sq ft', value: '1.75' },
  ],
  fertilizer: [
    { name: 'length', label: 'Lawn length', value: '50', hint: 'feet' },
    { name: 'width', label: 'Lawn width', value: '20', hint: 'feet' },
    { name: 'nRate', label: 'Target N lb / 1,000 sq ft', value: '1' },
    { name: 'nPct', label: 'Nitrogen % on bag', value: '25' },
    { name: 'bag', label: 'Bag size (lb)', value: '40' },
  ],
  'raised-bed': [
    { name: 'length', label: 'Interior length', value: '8', hint: 'feet' },
    { name: 'width', label: 'Interior width', value: '4', hint: 'feet' },
    { name: 'depth', label: 'Fill depth', value: '12', hint: 'inches' },
  ],
  asphalt: [
    ...dims('40', '12', 'Compacted depth', '3', 'inches'),
    { name: 'waste', label: 'Waste / overage %', value: '5' },
    { name: 'density', label: 'Density', value: '145', hint: 'lb/cu ft compacted' },
  ],
  brick: [
    {
      name: 'mode',
      label: 'Unit type',
      type: 'select',
      options: [
        { value: 'brick', label: 'Clay brick' },
        { value: 'cmu', label: 'Concrete block (CMU)' },
      ],
      value: 'brick',
    },
    { name: 'length', label: 'Wall length', value: '20', hint: 'feet' },
    { name: 'height', label: 'Wall height', value: '8', hint: 'feet' },
    { name: 'unitL', label: 'Unit face length', value: '7.625', hint: 'inches (actual)' },
    { name: 'unitH', label: 'Unit face height', value: '2.25', hint: 'inches (actual)' },
    { name: 'joint', label: 'Mortar joint', value: '0.375', hint: 'inches' },
    { name: 'waste', label: 'Waste %', value: '5' },
  ],
  lumber: [
    {
      name: 'mode',
      label: 'Calculate',
      type: 'select',
      options: [
        { value: 'pieces', label: 'Board feet from pieces' },
        { value: 'boardFeet', label: 'Pieces from board feet' },
      ],
      value: 'pieces',
    },
    { name: 'thickness', label: 'Nominal thickness', value: '2', hint: 'inches' },
    { name: 'width', label: 'Nominal width', value: '4', hint: 'inches' },
    { name: 'length', label: 'Length', value: '8', hint: 'feet' },
    { name: 'pieces', label: 'Number of pieces', value: '10' },
    { name: 'boardFeet', label: 'Target board feet', value: '50' },
  ],
  rebar: [
    { name: 'length', label: 'Slab length', value: '20', hint: 'feet' },
    { name: 'width', label: 'Slab width', value: '20', hint: 'feet' },
    { name: 'spacing', label: 'Spacing (o.c.)', value: '18', hint: 'inches each way' },
    {
      name: 'barSize',
      label: 'Bar size',
      type: 'select',
      options: [
        { value: '3', label: '#3 (⅜")' },
        { value: '4', label: '#4 (½")' },
        { value: '5', label: '#5 (⅝")' },
        { value: '6', label: '#6 (¾")' },
      ],
      value: '4',
    },
    { name: 'stick', label: 'Stick length', value: '20', hint: 'feet' },
    { name: 'waste', label: 'Waste / lap %', value: '10' },
  ],
};

function concreteRows(
  r: ReturnType<typeof slabVolume>,
): [string, string][] {
  return [
    ['Volume', `${r.volumeCuFt} cu ft`],
    ['Cubic yards', String(r.volumeCuYd)],
    ['Cubic meters', String(r.volumeCuM)],
    ['40 lb bags', String(r.bags40)],
    ['60 lb bags', String(r.bags60)],
    ['80 lb bags', String(r.bags80)],
  ];
}

function bulkRows(r: ReturnType<typeof gravelVolume>): [string, string][] {
  const rows: [string, string][] = [
    ['Area', `${r.areaSqFt} sq ft`],
    ['Volume', `${r.volumeCuFt} cu ft (${r.volumeCuYd} cu yd / ${r.volumeCuM} m³)`],
  ];
  if (r.tons != null) rows.push(['Est. tons', String(r.tons)]);
  return rows;
}

const concreteDefault = slabVolume({
  length: 10,
  width: 10,
  thickness: 4,
  wasteFactor: 0.1,
});
const postHolesDefault = postHoleVolume({
  diameter: 10,
  depth: 2.5,
  count: 8,
  wasteFactor: 0.1,
});
const sonotubeDefault = sonotubeVolume({
  diameter: 12,
  height: 4,
  count: 4,
  wasteFactor: 0.05,
});
const mulchDefault = bedMulch({ length: 20, width: 5, depthInches: 3 });
const treeRingDefault = treeRingMulch({
  outerDiameter: 6,
  trunkDiameter: 1,
  depthInches: 3,
});
const gravelDefault = gravelVolume({
  length: 20,
  width: 10,
  depthInches: 4,
  wasteFactor: 0.1,
});
const topsoilDefault = topsoilVolume({
  length: 20,
  width: 10,
  depthInches: 4,
  wasteFactor: 0.1,
});
const sandDefault = sandVolume({
  length: 20,
  width: 10,
  depthInches: 1,
  wasteFactor: 0.1,
});
const paverDefault = paverCount({
  areaLength: 12,
  areaWidth: 10,
  paverLengthIn: 12,
  paverWidthIn: 12,
  wastePercent: 10,
});
const fenceDefault = fenceMaterials({
  totalLength: 48,
  postSpacingFt: 8,
  railsPerSection: 3,
  picketWidthIn: 5.5,
  picketGapIn: 0.5,
});
const deckDefault = deckMaterials({
  length: 16,
  width: 12,
  boardWidthIn: 5.5,
  boardLengthFt: 12,
});
const pitchDefault = roofPitch({ rise: 6, run: 12 });
const roofingDefault = roofingSquares({
  planLength: 40,
  planWidth: 25,
  pitchOver12: 6,
  wastePercent: 10,
});
const paintDefault = paintNeeded({
  length: 14,
  width: 12,
  height: 8,
  doors: 2,
  windows: 2,
  coats: 2,
  coverageSqFtPerGallon: 350,
});
const wallDefault = retainingWallBlocks({
  wallLength: 20,
  wallHeight: 3,
  blockLengthIn: 18,
  blockHeightIn: 6,
  wastePercent: 5,
});
const seedDefault = grassSeed({
  length: 50,
  width: 20,
  newLawnLbPer1000: 3.5,
  overseedLbPer1000: 1.75,
});
const fertDefault = fertilizerNeeded({
  length: 50,
  width: 20,
  nitrogenLbPer1000: 1,
  nitrogenPercent: 25,
  bagSizeLbs: 40,
});
const bedDefault = raisedBedSoil({ length: 8, width: 4, depthInches: 12 });
const asphaltDefault = asphaltTons({
  length: 40,
  width: 12,
  depthInches: 3,
  wasteFactor: 0.05,
  densityLbPerCuFt: 145,
});
const brickDefault = brickCount({
  wallLength: 20,
  wallHeight: 8,
  unitLengthIn: 7.625,
  unitHeightIn: 2.25,
  mortarJointIn: 0.375,
  wastePercent: 5,
});
const lumberDefault = lumberFromPieces({
  thicknessIn: 2,
  widthIn: 4,
  length: 8,
  pieces: 10,
});
const rebarDefault = rebarForSlab({
  length: 20,
  width: 20,
  spacingIn: 18,
  barSize: 4,
  stickLengthFt: 20,
  wastePercent: 10,
});

export const defaultResultRows: Record<string, [string, string][]> = {
  concrete: concreteRows(concreteDefault),
  'post-holes': concreteRows(postHolesDefault),
  sonotube: concreteRows(sonotubeDefault),
  mulch: [
    ['Area', `${mulchDefault.areaSqFt} sq ft`],
    [
      'Volume',
      `${mulchDefault.volumeCuFt} cu ft (${mulchDefault.volumeCuYd} cu yd / ${mulchDefault.volumeCuM} m³)`,
    ],
    ['2 cu ft bags', String(mulchDefault.bags2CuFt)],
    ['3 cu ft bags', String(mulchDefault.bags3CuFt)],
  ],
  'tree-ring-mulch': [
    ['Ring area', `${treeRingDefault.areaSqFt} sq ft`],
    ['Volume', `${treeRingDefault.volumeCuFt} cu ft (${treeRingDefault.volumeCuYd} cu yd)`],
    ['2 cu ft bags', String(treeRingDefault.bags2CuFt)],
    ['3 cu ft bags', String(treeRingDefault.bags3CuFt)],
  ],
  gravel: bulkRows(gravelDefault),
  topsoil: bulkRows(topsoilDefault),
  sand: bulkRows(sandDefault),
  paver: [
    ['Area', `${paverDefault.areaSqFt} sq ft (${paverDefault.areaSqM} m²)`],
    ['Pavers (exact)', String(paverDefault.paversNeeded)],
    ['Pavers with waste', String(paverDefault.paversWithWaste)],
    ['Bedding sand', `${paverDefault.edgeSandCuFt} cu ft`],
    ['Base gravel', `${paverDefault.baseGravelCuYd} cu yd`],
  ],
  fence: [
    ['Run length', `${fenceDefault.lengthFt} ft`],
    ['Sections', String(fenceDefault.sections)],
    ['Posts', String(fenceDefault.posts)],
    ['Rails', String(fenceDefault.rails)],
    ['Pickets', String(fenceDefault.pickets)],
    ['80 lb bags for posts (est.)', String(fenceDefault.concreteBags80ForPosts)],
  ],
  deck: [
    ['Area', `${deckDefault.areaSqFt} sq ft`],
    ['Deck boards', String(deckDefault.deckBoards)],
    ['Joists (16" o.c.)', String(deckDefault.joists)],
    ['Rim joists', String(deckDefault.rimJoists)],
    ['Screws (est.)', String(deckDefault.screws)],
  ],
  'roof-pitch': [
    ['Pitch', `${pitchDefault.pitchOver12} / 12`],
    ['Angle', `${pitchDefault.angleDegrees}°`],
    ['Slope', `${pitchDefault.slopePercent}%`],
    ['Area factor', String(pitchDefault.areaFactor)],
  ],
  roofing: [
    ['Plan area', `${roofingDefault.planAreaSqFt} sq ft`],
    [
      'Roof area',
      `${roofingDefault.roofAreaSqFt} sq ft (${roofingDefault.roofAreaSqM} m²)`,
    ],
    ['Squares', String(roofingDefault.squares)],
    ['Squares with waste', String(roofingDefault.squaresWithWaste)],
    ['Bundles (~3/sq)', String(roofingDefault.bundles3PerSquare)],
  ],
  paint: [
    ['Wall area', `${paintDefault.wallAreaSqFt} sq ft`],
    [
      'Paintable area',
      `${paintDefault.paintableAreaSqFt} sq ft (${paintDefault.paintableAreaSqM} m²)`,
    ],
    ['Gallons (1 coat)', String(paintDefault.gallonsOneCoat)],
    ['Gallons (your coats)', String(paintDefault.gallonsTwoCoats)],
    ['Liters (your coats)', String(paintDefault.litersTwoCoats)],
  ],
  'retaining-wall': [
    ['Face area', `${wallDefault.faceAreaSqFt} sq ft`],
    ['Courses', String(wallDefault.courses)],
    ['Blocks / course', String(wallDefault.blocksPerCourse)],
    ['Blocks', String(wallDefault.blocks)],
    ['Blocks with waste', String(wallDefault.blocksWithWaste)],
    ['Base gravel', `${wallDefault.baseGravelCuYd} cu yd`],
  ],
  'grass-seed': [
    ['Area', `${seedDefault.areaSqFt} sq ft (${seedDefault.areaSqM} m²)`],
    ['Seed (new lawn)', `${seedDefault.seedLbsNew} lb / ${seedDefault.seedKgNew} kg`],
    [
      'Seed (overseed)',
      `${seedDefault.seedLbsOverseed} lb / ${seedDefault.seedKgOverseed} kg`,
    ],
  ],
  fertilizer: [
    ['Area', `${fertDefault.areaSqFt} sq ft`],
    ['Product needed', `${fertDefault.productLbs} lb (${fertDefault.productKg} kg)`],
    ['Bags', String(fertDefault.bagsNeeded)],
  ],
  'raised-bed': [
    ['Volume', `${bedDefault.volumeCuFt} cu ft`],
    ['Cubic yards', String(bedDefault.volumeCuYd)],
    ['Cubic meters', String(bedDefault.volumeCuM)],
    ['1.5 cu ft bags', String(bedDefault.bags15CuFt)],
  ],
  asphalt: [
    ['Area', `${asphaltDefault.areaSqFt} sq ft`],
    [
      'Volume',
      `${asphaltDefault.volumeCuFt} cu ft (${asphaltDefault.volumeCuYd} cu yd / ${asphaltDefault.volumeCuM} m³)`,
    ],
    ['Tons (compacted)', String(asphaltDefault.tons)],
    ['Density used', `${asphaltDefault.densityLbPerCuFt} lb/cu ft`],
  ],
  brick: [
    ['Face area', `${brickDefault.faceAreaSqFt} sq ft`],
    ['Units per sq ft', String(brickDefault.unitsPerSqFt)],
    ['Courses', String(brickDefault.courses)],
    ['Units / course', String(brickDefault.unitsPerCourse)],
    ['Units (exact)', String(brickDefault.unitsExact)],
    ['Units with waste', String(brickDefault.unitsWithWaste)],
  ],
  lumber: [
    ['Board feet / piece', String(lumberDefault.boardFeetPerPiece)],
    ['Total board feet', String(lumberDefault.totalBoardFeet)],
    ['Linear feet', String(lumberDefault.totalLinearFeet)],
    ['Pieces', String(lumberDefault.pieces)],
  ],
  rebar: [
    ['Bars along length', String(rebarDefault.barsAlongLength)],
    ['Bars along width', String(rebarDefault.barsAlongWidth)],
    ['Linear feet', String(rebarDefault.linearFeet)],
    ['Linear feet + waste', String(rebarDefault.linearFeetWithWaste)],
    [`${rebarDefault.stickLengthFt} ft sticks`, String(rebarDefault.sticks)],
    ['Est. weight', `${rebarDefault.weightLbs} lb`],
  ],
};
