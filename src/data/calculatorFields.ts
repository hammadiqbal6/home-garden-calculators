/**
 * Server-rendered default fields + result rows (mirrors Calculator.astro defaults).
 * Result placeholders use the same pure math as the client island so crawlers and
 * AI answer engines see real worked numbers in the static HTML.
 */
import {
  asphaltTons,
  bedMulch,
  brickCount,
  deckFootings,
  concreteSlabCost,
  deckMaterials,
  fenceMaterials,
  fertilizerNeeded,
  footingVolume,
  formatUsd,
  frenchDrainMaterials,
  grassSeed,
  gravelVolume,
  lumberFromPieces,
  lumberWeight,
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
  circularBedMulch,
  concreteCostCompare,
  mixedSonotubeVolume,
  roundUpToQuarterYard,
  sodNeeded,
  stepsVolume,
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
  /** When true, empty/zero is allowed (prices, convertTons). */
  optional?: boolean;
};

const bulkPriceFields = (): SsrField[] => [
  {
    name: 'convertTons',
    label: 'Convert tons → yards (optional)',
    value: '',
    hint: 'leave blank to skip',
    optional: true,
  },
  {
    name: 'pricePerYard',
    label: 'Price per cu yd (optional)',
    value: '',
    hint: 'your local quote',
    optional: true,
  },
  {
    name: 'pricePerTon',
    label: 'Price per ton (optional)',
    value: '',
    hint: 'your local quote',
    optional: true,
  },
  {
    name: 'pricePerBag',
    label: 'Price per 0.5 cu ft bag (optional)',
    value: '',
    hint: 'your local quote',
    optional: true,
  },
];

const mulchPriceFields = (): SsrField[] => [
  {
    name: 'pricePerYard',
    label: 'Price per cu yd (optional)',
    value: '',
    hint: 'your local quote',
    optional: true,
  },
  {
    name: 'pricePerBag',
    label: 'Price per bag (optional)',
    value: '',
    hint: '2 or 3 cu ft bag price',
    optional: true,
  },
];

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
    { name: 'priceBag40', label: 'Price per 40 lb bag (optional)', value: '0', hint: 'your local price' },
    { name: 'priceBag60', label: 'Price per 60 lb bag (optional)', value: '0', hint: 'your local price' },
    { name: 'priceBag80', label: 'Price per 80 lb bag (optional)', value: '0', hint: 'your local price' },
    { name: 'priceYd', label: 'Ready-mix price per cu yd (optional)', value: '0', hint: 'your quote' },
    { name: 'delivery', label: 'Delivery fee (optional)', value: '0', hint: 'one-time fee' },
  ],
  'concrete-steps': [
    { name: 'width', label: 'Stair width', value: '3', hint: 'feet' },
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
    { name: 'diameter', label: 'Tube diameter (size A)', value: '12', hint: 'inches' },
    { name: 'height', label: 'Height (size A)', value: '4', hint: 'feet' },
    { name: 'count', label: 'Number of tubes (size A)', value: '4' },
    { name: 'diameterB', label: 'Tube diameter (size B, optional)', value: '0', hint: 'inches — 0 to skip' },
    { name: 'heightB', label: 'Height (size B)', value: '0', hint: 'feet' },
    { name: 'countB', label: 'Number of tubes (size B)', value: '0' },
    {
      name: 'baseType',
      label: 'Base under tube',
      type: 'select',
      options: [
        { value: 'none', label: 'None (tube only)' },
        { value: 'bell', label: 'Bell / flared base' },
        { value: 'pad', label: 'Circular pad' },
      ],
      value: 'none',
    },
    { name: 'bellDiameter', label: 'Bell base diameter', value: '24', hint: 'inches' },
    { name: 'bellHeight', label: 'Bell height', value: '1', hint: 'feet' },
    { name: 'padDiameter', label: 'Pad diameter', value: '24', hint: 'inches' },
    { name: 'padThickness', label: 'Pad thickness', value: '12', hint: 'inches' },
    { name: 'waste', label: 'Waste %', value: '5' },
  ],
  footing: [
    {
      name: 'footingType',
      label: 'Footing type',
      type: 'select',
      options: [
        { value: 'strip', label: 'Continuous / strip' },
        { value: 'pad', label: 'Spread pad' },
      ],
      value: 'strip',
    },
    { name: 'length', label: 'Length', value: '40', hint: 'feet (run length)' },
    { name: 'width', label: 'Width', value: '16', hint: 'inches (strip/pad width)' },
    { name: 'depth', label: 'Depth / thickness', value: '8', hint: 'inches' },
    { name: 'count', label: 'Number of segments', value: '1', hint: 'segments or pads' },
    { name: 'waste', label: 'Waste %', value: '10' },
    {
      name: 'rebar',
      label: 'Rebar estimate',
      type: 'select',
      options: [
        { value: 'no', label: 'Off' },
        { value: 'yes', label: 'On (planning only)' },
      ],
      value: 'no',
    },
    { name: 'longBars', label: 'Longitudinal bars', value: '2', hint: 'strip only' },
    { name: 'spacing', label: 'Bar spacing (o.c.)', value: '18', hint: 'inches' },
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
    { name: 'rebarWaste', label: 'Rebar waste / lap %', value: '10' },
  ],
  'deck-footings': [
    { name: 'length', label: 'Deck length', value: '16', hint: 'feet (along beams)' },
    { name: 'width', label: 'Deck width', value: '12', hint: 'feet (beam span direction)' },
    { name: 'postSpacing', label: 'Post spacing', value: '8', hint: 'feet along each beam' },
    {
      name: 'beamSpacing',
      label: 'Beam / post-row spacing',
      value: '8',
      hint: 'feet across the deck',
    },
    {
      name: 'layout',
      label: 'Layout',
      type: 'select',
      options: [
        { value: 'freestanding', label: 'Freestanding (posts on all sides)' },
        { value: 'attached', label: 'Attached (ledger — no house-side posts)' },
      ],
      value: 'freestanding',
    },
    {
      name: 'frostDepth',
      label: 'Frost depth / hole depth',
      value: '4',
      hint: 'feet (your local frost line)',
    },
    { name: 'holeDiameter', label: 'Hole diameter', value: '12', hint: 'inches' },
    {
      name: 'sonotubeDiameter',
      label: 'Sonotube diameter (optional)',
      value: '0',
      hint: 'inches inside Ø; 0 = use hole diameter',
    },
    { name: 'waste', label: 'Waste %', value: '5' },
  ],
  mulch: [...dims('20', '5', 'Depth', '3', 'inches'), ...mulchPriceFields()],
  'circular-mulch': [
    { name: 'diameter', label: 'Bed diameter', value: '8', hint: 'feet' },
    { name: 'depth', label: 'Depth', value: '3', hint: 'inches' },
    ...mulchPriceFields(),
  ],
  'tree-ring-mulch': [
    { name: 'outer', label: 'Outer ring diameter', value: '6', hint: 'feet' },
    { name: 'trunk', label: 'Trunk / keep-out diameter', value: '1', hint: 'feet' },
    { name: 'depth', label: 'Depth', value: '3', hint: 'inches' },
  ],
  gravel: [
    ...dims('20', '10', 'Depth', '4', 'inches'),
    { name: 'waste', label: 'Waste / compaction %', value: '10' },
    ...bulkPriceFields(),
  ],
  'paver-base': [
    ...dims('20', '4', 'Compacted base depth', '6', 'inches'),
    { name: 'waste', label: 'Compaction / waste %', value: '10' },
    {
      name: 'convertTons',
      label: 'Convert tons → yards (optional)',
      value: '',
      hint: 'leave blank to skip',
      optional: true,
    },
    {
      name: 'pricePerYard',
      label: 'Price per cu yd (optional)',
      value: '',
      hint: 'your local quote',
      optional: true,
    },
    {
      name: 'pricePerTon',
      label: 'Price per ton (optional)',
      value: '',
      hint: 'your local quote',
      optional: true,
    },
  ],
  'french-drain': [
    { name: 'length', label: 'Trench length', value: '40', hint: 'feet' },
    { name: 'width', label: 'Trench width', value: '12', hint: 'inches' },
    { name: 'depth', label: 'Trench depth', value: '18', hint: 'inches' },
    { name: 'pipeDia', label: 'Pipe diameter', value: '4', hint: 'inches (OD)' },
    { name: 'overlap', label: 'Fabric overlap', value: '12', hint: 'inches (fold-over)' },
    { name: 'waste', label: 'Waste / overage %', value: '10' },
    { name: 'density', label: 'Gravel density', value: '2700', hint: 'lb/cu yd' },
  ],
  topsoil: [
    ...dims('20', '10', 'Depth', '4', 'inches'),
    { name: 'waste', label: 'Waste / compaction %', value: '10' },
    ...bulkPriceFields(),
  ],
  sand: [
    ...dims('20', '10', 'Depth', '1', 'inches'),
    { name: 'waste', label: 'Waste / compaction %', value: '10' },
    ...bulkPriceFields(),
  ],
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
    { name: 'joistOC', label: 'Joist spacing', value: '16', hint: 'inches o.c.' },
    { name: 'waste', label: 'Board waste %', value: '10' },
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
  sod: [
    { name: 'length', label: 'Lawn length', value: '50', hint: 'feet' },
    { name: 'width', label: 'Lawn width', value: '20', hint: 'feet' },
    { name: 'waste', label: 'Waste / cut %', value: '5' },
    { name: 'piece', label: 'Sq ft per roll / piece', value: '10', hint: 'supplier coverage' },
    { name: 'pallet', label: 'Sq ft per pallet', value: '450', hint: 'supplier coverage' },
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
    {
      name: 'species',
      label: 'Species / condition',
      type: 'select',
      options: [
        { value: 'spf_kd', label: 'SPF kiln-dried (~29 lb/cu ft)' },
        { value: 'douglas_fir_larch_kd', label: 'Douglas fir-larch KD (~34 lb/cu ft)' },
        { value: 'southern_pine_kd', label: 'Southern pine KD (~36 lb/cu ft)' },
        { value: 'southern_pine_green', label: 'Southern pine green / wet PT (~53)' },
        { value: 'custom', label: 'Custom density' },
      ],
      value: 'spf_kd',
    },
    { name: 'density', label: 'Custom density', value: '28.7', hint: 'lb/cu ft (planning)' },
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
  'concrete-slab-cost': [
    { name: 'length', label: 'Length', value: '10', hint: 'feet' },
    { name: 'width', label: 'Width', value: '10', hint: 'feet' },
    { name: 'thickness', label: 'Thickness', value: '4', hint: 'inches' },
    { name: 'waste', label: 'Waste %', value: '10' },
    {
      name: 'purchaseMode',
      label: 'Buy as',
      type: 'select',
      options: [
        { value: 'ready-mix', label: 'Ready-mix (per yard / m³)' },
        { value: 'bags', label: 'Bagged mix' },
      ],
      value: 'ready-mix',
    },
    {
      name: 'readyMixPrice',
      label: 'Ready-mix price',
      value: '160',
      hint: 'example only — $/cu yd from your plant quote',
    },
    {
      name: 'bagSize',
      label: 'Bag size',
      type: 'select',
      options: [
        { value: '40', label: '40 lb' },
        { value: '60', label: '60 lb' },
        { value: '80', label: '80 lb' },
      ],
      value: '80',
    },
    {
      name: 'bagPrice',
      label: 'Price per bag',
      value: '7',
      hint: 'example only — replace with your store price',
    },
    {
      name: 'gravelBase',
      label: 'Gravel base (optional)',
      value: '0',
      hint: 'your quote for base stone ($ total)',
    },
    {
      name: 'rebarMesh',
      label: 'Rebar / mesh (optional)',
      value: '0',
      hint: 'your quote for steel ($ total)',
    },
    {
      name: 'forms',
      label: 'Forms (optional)',
      value: '0',
      hint: 'lumber / forms you price ($ total)',
    },
    {
      name: 'delivery',
      label: 'Delivery / short-load fee',
      value: '0',
      hint: 'plant short-load or delivery fee ($)',
    },
    {
      name: 'labor',
      label: 'Labor per sq ft (optional)',
      value: '0',
      hint: 'your labor rate × slab area',
    },
  ],
};

function concreteRows(
  r: ReturnType<typeof slabVolume>,
  withOrder = false,
): [string, string][] {
  const rows: [string, string][] = [
    ['Volume', `${r.volumeCuFt} cu ft`],
    ['Cubic yards', String(r.volumeCuYd)],
    ['Cubic meters', String(r.volumeCuM)],
    ['40 lb bags', String(r.bags40)],
    ['50 lb bags', String(r.bags50)],
    ['60 lb bags', String(r.bags60)],
    ['80 lb bags', String(r.bags80)],
  ];
  if (withOrder) {
    rows.push(['Yards to order (↑¼ yd)', String(roundUpToQuarterYard(r.volumeCuYd))]);
  }
  return rows;
}

function bulkRows(r: ReturnType<typeof gravelVolume>): [string, string][] {
  const rows: [string, string][] = [
    ['Area', `${r.areaSqFt} sq ft`],
    ['Volume', `${r.volumeCuFt} cu ft (${r.volumeCuYd} cu yd / ${r.volumeCuM} m³)`],
  ];
  if (r.tonsFromYards != null) rows.push(['Tons from yards', String(r.tonsFromYards)]);
  else if (r.tons != null) rows.push(['Est. tons', String(r.tons)]);
  if (r.yardsFromTons != null) rows.push(['Yards from tons', String(r.yardsFromTons)]);
  if (r.bags05CuFt != null) rows.push(['0.5 cu ft bags', String(r.bags05CuFt)]);
  if (r.costYards != null) rows.push(['Bulk cost (by yard)', `$${r.costYards}`]);
  if (r.costTons != null) rows.push(['Bulk cost (by ton)', `$${r.costTons}`]);
  if (r.costBags != null) rows.push(['Bag cost', `$${r.costBags}`]);
  if (r.cheapestLabel && r.cheapestCost != null) {
    const label =
      r.cheapestLabel === 'yard' ? 'bulk by yard' : r.cheapestLabel === 'ton' ? 'bulk by ton' : 'bags';
    rows.push(['Cheaper option', `${label} ($${r.cheapestCost})`]);
  }
  return rows;
}

function mulchRows(r: ReturnType<typeof bedMulch>): [string, string][] {
  const rows: [string, string][] = [
    ['Area', `${r.areaSqFt} sq ft`],
    ['Volume', `${r.volumeCuFt} cu ft (${r.volumeCuYd} cu yd / ${r.volumeCuM} m³)`],
    ['2 cu ft bags', String(r.bags2CuFt)],
    ['3 cu ft bags', String(r.bags3CuFt)],
  ];
  if (r.costYards != null) rows.push(['Bulk cost (by yard)', `$${r.costYards}`]);
  if (r.costBags2 != null) rows.push(['2 cu ft bag cost', `$${r.costBags2}`]);
  if (r.costBags3 != null) rows.push(['3 cu ft bag cost', `$${r.costBags3}`]);
  return rows;
}

const stepsDefault = stepsVolume({
  numberOfSteps: 3,
  riser: 7,
  tread: 11,
  width: 3,
  riserUnit: 'in',
  treadUnit: 'in',
  widthUnit: 'ft',
  wasteFactor: 0.1,
});
const circularMulchDefault = circularBedMulch({
  diameter: 8,
  depthInches: 3,
});
const paverBaseDefault = gravelVolume({
  length: 20,
  width: 4,
  depthInches: 6,
  wasteFactor: 0.1,
  densityLbPerCuYd: 2700,
});
const sodDefault = sodNeeded({
  length: 50,
  width: 20,
  wastePercent: 5,
  sqFtPerPiece: 10,
  sqFtPerPallet: 450,
});
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
const sonotubeDefault = mixedSonotubeVolume(
  [{ diameter: 12, height: 4, count: 4, baseType: 'none' }],
  0.05,
);
const deckFootingsDefault = deckFootings({
  length: 16,
  width: 12,
  postSpacing: 8,
  beamSpacing: 8,
  frostDepth: 4,
  holeDiameter: 12,
  layout: 'freestanding',
  wasteFactor: 0.05,
});
const footingDefault = footingVolume({
  footingType: 'strip',
  length: 40,
  width: 16,
  depth: 8,
  widthUnit: 'in',
  depthUnit: 'in',
  count: 1,
  wasteFactor: 0.1,
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
const frenchDrainDefault = frenchDrainMaterials({
  length: 40,
  width: 12,
  depth: 18,
  pipeDiameter: 4,
  fabricOverlap: 12,
  wasteFactor: 0.1,
  densityLbPerCuYd: 2700,
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
  joistSpacingIn: 16,
  wastePercent: 10,
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
const lumberWeightDefault = lumberWeight({
  thicknessIn: 2,
  widthIn: 4,
  length: 8,
  pieces: 10,
  densityPreset: 'spf_kd',
});
const rebarDefault = rebarForSlab({
  length: 20,
  width: 20,
  spacingIn: 18,
  barSize: 4,
  stickLengthFt: 20,
  wastePercent: 10,
});
const slabCostDefault = concreteSlabCost({
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

export const defaultResultRows: Record<string, [string, string][]> = {
  concrete: concreteRows(concreteDefault, true),
  'concrete-steps': concreteRows(stepsDefault),
  'post-holes': concreteRows(postHolesDefault),
  sonotube: [
    ['Volume', `${sonotubeDefault.volumeCuFt} cu ft`],
    ['Cubic yards', String(sonotubeDefault.volumeCuYd)],
    ['Cubic meters', String(sonotubeDefault.volumeCuM)],
    ['40 lb bags', String(sonotubeDefault.bags40)],
    ['50 lb bags', String(sonotubeDefault.bags50)],
    ['60 lb bags', String(sonotubeDefault.bags60)],
    ['80 lb bags', String(sonotubeDefault.bags80)],
  ],
  footing: [
    ['Footing type', 'Continuous / strip'],
    ['Count', String(footingDefault.count)],
    ...concreteRows(footingDefault),
  ],
  mulch: mulchRows(mulchDefault),
  'circular-mulch': mulchRows(circularMulchDefault),
  'deck-footings': [
    ['Footings (posts)', String(deckFootingsDefault.footingCount)],
    ['Posts along length', String(deckFootingsDefault.postsAlong)],
    ['Beam / post rows', String(deckFootingsDefault.beamRows)],
    ['Hole diameter', `${deckFootingsDefault.holeDiameterIn} in`],
    ['Hole depth (frost)', `${deckFootingsDefault.holeDepthFt} ft`],
    [
      'Sonotube / form Ø',
      deckFootingsDefault.sonotubeDiameterIn != null
        ? `${deckFootingsDefault.sonotubeDiameterIn} in ID`
        : `${deckFootingsDefault.formDiameterIn} in (match hole)`,
    ],
    [
      'Concrete per hole',
      `${deckFootingsDefault.volumePerHoleCuFt} cu ft (${deckFootingsDefault.volumePerHoleCuYd} cu yd)`,
    ],
    [
      'Total concrete',
      `${deckFootingsDefault.totalVolumeCuFt} cu ft (${deckFootingsDefault.totalVolumeCuYd} cu yd / ${deckFootingsDefault.totalVolumeCuM} m³)`,
    ],
    ['40 lb bags', String(deckFootingsDefault.bags40)],
    ['60 lb bags', String(deckFootingsDefault.bags60)],
    ['80 lb bags', String(deckFootingsDefault.bags80)],
  ],
  'tree-ring-mulch': [
    ['Ring area', `${treeRingDefault.areaSqFt} sq ft`],
    ['Volume', `${treeRingDefault.volumeCuFt} cu ft (${treeRingDefault.volumeCuYd} cu yd)`],
    ['2 cu ft bags', String(treeRingDefault.bags2CuFt)],
    ['3 cu ft bags', String(treeRingDefault.bags3CuFt)],
  ],
  gravel: bulkRows(gravelDefault),
  'paver-base': [
    ['Area', `${paverBaseDefault.areaSqFt} sq ft`],
    [
      'Volume',
      `${paverBaseDefault.volumeCuFt} cu ft (${paverBaseDefault.volumeCuYd} cu yd / ${paverBaseDefault.volumeCuM} m³)`,
    ],
    ['Est. tons', String(paverBaseDefault.tons)],
  ],
  'french-drain': [
    ['Pipe length', `${frenchDrainDefault.pipeLengthFt} ft`],
    [
      'Gravel (pipe subtracted)',
      `${frenchDrainDefault.gravelCuFt} cu ft (${frenchDrainDefault.gravelCuYd} cu yd / ${frenchDrainDefault.gravelCuM} m³)`,
    ],
    ['Est. tons', String(frenchDrainDefault.tons)],
    ['Fabric width (wrap)', `${frenchDrainDefault.fabricWidthFt} ft`],
    [
      'Fabric area',
      `${frenchDrainDefault.fabricAreaSqFt} sq ft (${frenchDrainDefault.fabricAreaSqM} m²)`,
    ],
    ['Density used', `${frenchDrainDefault.densityLbPerCuYd} lb/cu yd`],
  ],
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
    ['Boards with waste', String(deckDefault.deckBoardsWithWaste)],
    [`Joists (${deckDefault.joistSpacingIn}" o.c.)`, String(deckDefault.joists)],
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
  sod: [
    ['Lawn area', `${sodDefault.areaSqFt} sq ft (${sodDefault.areaSqM} m²)`],
    ['Area with waste', `${sodDefault.areaWithWasteSqFt} sq ft`],
    ['Rolls / pieces', String(sodDefault.pieces)],
    ['Pallets', String(sodDefault.pallets)],
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
    ['80 lb mortar bags (est.)', String(brickDefault.mortarBags80)],
  ],
  lumber: [
    ['Board feet / piece', String(lumberDefault.boardFeetPerPiece)],
    ['Total board feet', String(lumberDefault.totalBoardFeet)],
    ['Linear feet', String(lumberDefault.totalLinearFeet)],
    ['Pieces', String(lumberDefault.pieces)],
    [
      'Actual section',
      `${lumberWeightDefault.actualThicknessIn} × ${lumberWeightDefault.actualWidthIn} in`,
    ],
    ['Density used', `${lumberWeightDefault.densityLbPerCuFt} lb/cu ft`],
    [
      'Weight / piece',
      `${lumberWeightDefault.weightLbPerPiece} lb (${lumberWeightDefault.weightKgPerPiece} kg)`,
    ],
    [
      'Weight / linear ft',
      `${lumberWeightDefault.weightLbPerLinearFoot} lb/ft (${lumberWeightDefault.weightKgPerLinearFoot} kg/ft)`,
    ],
    [
      'Total weight',
      `${lumberWeightDefault.weightLbTotal} lb (${lumberWeightDefault.weightKgTotal} kg)`,
    ],
  ],
  rebar: [
    ['Bars along length', String(rebarDefault.barsAlongLength)],
    ['Bars along width', String(rebarDefault.barsAlongWidth)],
    ['Linear feet', String(rebarDefault.linearFeet)],
    ['Linear feet + waste', String(rebarDefault.linearFeetWithWaste)],
    [`${rebarDefault.stickLengthFt} ft sticks`, String(rebarDefault.sticks)],
    ['Est. weight', `${rebarDefault.weightLbs} lb`],
  ],
  'concrete-slab-cost': [
    ['Area', `${slabCostDefault.areaSqFt} sq ft`],
    [
      'Volume',
      `${slabCostDefault.volumeCuFt} cu ft (${slabCostDefault.volumeCuYd} cu yd / ${slabCostDefault.volumeCuM} m³)`,
    ],
    ['Material cost', formatUsd(slabCostDefault.materialCost)],
    ['Add-ons total', formatUsd(slabCostDefault.addOnsTotal)],
    ['Total', formatUsd(slabCostDefault.totalCost)],
    ['Cost per sq ft', formatUsd(slabCostDefault.costPerSqFt)],
  ],
};
