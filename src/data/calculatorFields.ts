/** Server-rendered default fields to prevent CLS (mirrors Calculator.astro defaults). */
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
};

export const defaultResultRows: Record<string, [string, string][]> = {
  concrete: [
    ['Volume', '—'],
    ['Cubic yards', '—'],
    ['Cubic meters', '—'],
    ['40 lb bags', '—'],
    ['60 lb bags', '—'],
    ['80 lb bags', '—'],
  ],
  'post-holes': [
    ['Volume', '—'],
    ['Cubic yards', '—'],
    ['Cubic meters', '—'],
    ['40 lb bags', '—'],
    ['60 lb bags', '—'],
    ['80 lb bags', '—'],
  ],
  sonotube: [
    ['Volume', '—'],
    ['Cubic yards', '—'],
    ['Cubic meters', '—'],
    ['40 lb bags', '—'],
    ['60 lb bags', '—'],
    ['80 lb bags', '—'],
  ],
  mulch: [
    ['Area', '—'],
    ['Volume', '—'],
    ['2 cu ft bags', '—'],
    ['3 cu ft bags', '—'],
  ],
  'tree-ring-mulch': [
    ['Ring area', '—'],
    ['Volume', '—'],
    ['2 cu ft bags', '—'],
    ['3 cu ft bags', '—'],
  ],
  gravel: [
    ['Area', '—'],
    ['Volume', '—'],
    ['Est. tons', '—'],
  ],
  topsoil: [
    ['Area', '—'],
    ['Volume', '—'],
    ['Est. tons', '—'],
  ],
  sand: [
    ['Area', '—'],
    ['Volume', '—'],
    ['Est. tons', '—'],
  ],
  paver: [
    ['Area', '—'],
    ['Pavers (exact)', '—'],
    ['Pavers with waste', '—'],
    ['Bedding sand', '—'],
    ['Base gravel', '—'],
  ],
  fence: [
    ['Run length', '—'],
    ['Sections', '—'],
    ['Posts', '—'],
    ['Rails', '—'],
    ['Pickets', '—'],
    ['80 lb bags for posts (est.)', '—'],
  ],
  deck: [
    ['Area', '—'],
    ['Deck boards', '—'],
    ['Joists (16" o.c.)', '—'],
    ['Rim joists', '—'],
    ['Screws (est.)', '—'],
  ],
  'roof-pitch': [
    ['Pitch', '—'],
    ['Angle', '—'],
    ['Slope', '—'],
    ['Area factor', '—'],
  ],
  roofing: [
    ['Plan area', '—'],
    ['Roof area', '—'],
    ['Squares', '—'],
    ['Squares with waste', '—'],
    ['Bundles (~3/sq)', '—'],
  ],
  paint: [
    ['Wall area', '—'],
    ['Paintable area', '—'],
    ['Gallons (1 coat)', '—'],
    ['Gallons (your coats)', '—'],
    ['Liters (your coats)', '—'],
  ],
  'retaining-wall': [
    ['Face area', '—'],
    ['Courses', '—'],
    ['Blocks / course', '—'],
    ['Blocks', '—'],
    ['Blocks with waste', '—'],
    ['Base gravel', '—'],
  ],
  'grass-seed': [
    ['Area', '—'],
    ['Seed (new lawn)', '—'],
    ['Seed (overseed)', '—'],
  ],
  fertilizer: [
    ['Area', '—'],
    ['Product needed', '—'],
    ['Bags', '—'],
  ],
  'raised-bed': [
    ['Volume', '—'],
    ['Cubic yards', '—'],
    ['Cubic meters', '—'],
    ['1.5 cu ft bags', '—'],
  ],
};
