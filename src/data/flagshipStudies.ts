export const caseStudySlugs = ['arrow', 'screw-town', 'car-blast'] as const;

interface CaseStudy {
  focus: string;
  context: string;
  implementation: string;
  value: string;
  architecture: string;
  decisions: { title: string; body: string }[];
  tradeoff: string;
  nextStep: string;
  methods: Record<string, string[]>;
  proof: { label: string; value: string }[];
}

// Ground implementation statements in inspected components; benefits are not benchmarks.
export const caseStudies: Record<string, CaseStudy> = {
  arrow: {
    focus: 'Custom rendering & gameplay geometry',
    context: 'Curving arrows need continuous texture, readable endpoints and movement that stays aligned with the puzzle path.',
    implementation: 'A custom ribbon renderer generates mesh geometry, maps texture coordinates along path distance and handles body, caps and arrowheads separately.',
    value: 'Connects geometry, visual configuration and movement in one reusable rendering system, with a Graphics fallback for the same path data.',
    architecture: 'ArrowGraphics owns path smoothing, mesh construction and endpoint presentation. ArrowMove owns movement, collision response and recoil, then synchronizes the active path with the renderer. Ribbon and cap configuration control visual variants independently of board layout.',
    decisions: [
      { title: 'Geometry follows the path', body: 'Smoothed corners, path tangents and width calculations produce the ribbon vertices and triangle indices. The build constructs a combined mesh from this data.' },
      { title: 'Texture continuity is explicit', body: 'Distance along the path drives UV coordinates. Body trimming, repeat scale and separate cap settings keep texture treatment configurable across different arrow shapes.' },
      { title: 'Rendering follows gameplay state', body: 'ArrowMove rebuilds the active path during motion and handles collisions, recoil and endpoint scaling. Generated nodes and renderer state have explicit cleanup paths.' },
    ],
    tradeoff: 'A custom mesh gives control over texture continuity and endpoint treatment, with more geometry code to maintain than a chain of sprites. Curve sampling density is a deliberate balance between silhouette quality and update cost.',
    nextStep: 'Measure mesh rebuild frequency and allocations on long paths before introducing buffer reuse or lower curve sampling. Preserve corner shape, UV continuity and collision feedback as acceptance criteria.',
    methods: { ArrowGraphics: ['generateCombinedMesh', 'calculateMeshData', 'getRibbonMetricInfo', 'buildSmoothedPath'], ArrowMove: ['handleCollision', 'rebuildActivePath'] },
    proof: [{ label: 'Engineering focus', value: 'Mesh + UV' }, { label: 'Implementation', value: 'Custom ribbon' }],
  },
  'screw-town': {
    focus: '3D interaction & constrained physics',
    context: 'Selecting screws on a rotating 3D object requires spatial validation, clear visual feedback and coordinated physical release.',
    implementation: 'Selection checks use rotated bounding boxes. Screw components coordinate collider, rigid-body and hinge controls, while separate handlers expose 3D button interactions.',
    value: 'Brings spatial reasoning and physical feedback into the same puzzle interaction, with explicit control over when objects can be selected and released.',
    architecture: 'The inspected scene separates OrbitCamera, input handling, Button3D interaction and Screw behavior. Screw.checkCanTouch evaluates spatial overlap before selection; lifecycle methods enable, disable or remove physical components as the screw changes state.',
    decisions: [
      { title: 'Selection respects 3D geometry', body: 'The touch validation path constructs oriented bounding boxes using world transforms and checks intersections, accounting for rotated boards rather than relying only on screen-space positions.' },
      { title: 'Physical release has explicit controls', body: 'Screw behavior exposes separate operations for collider activation and physical-component lifecycle. Hinge constraints participate in the board assembly represented by the scene.' },
      { title: 'Feedback spans model and interface', body: 'Selection coordinates material changes, layer changes and animated movement into collection slots. Button3D provides distinct click, start and cancel handlers.' },
    ],
    tradeoff: 'Oriented-box tests fit rotated assemblies more closely than a screen-space hit area, while requiring transform and overlap work. A spatial index would add maintenance as boards move; its value needs profiling.',
    nextStep: 'Profile candidate selection and active constraint count at several camera angles. Introduce coarse filtering only if traversal is a measured bottleneck, retaining correct occlusion and single-selection behavior.',
    methods: { Screw: ['checkCanTouch', 'disableComponent', 'enableComponent'], Button3D: ['onHandlerClick'], OrbitCamera: ['onLoad'] },
    proof: [{ label: 'Screw components in scene', value: '186' }, { label: 'Hinge constraints in scene', value: '186' }],
  },
  'car-blast': {
    focus: 'Data-driven 3D scenes & coordinated motion',
    context: 'A pixel-art board combines many colored elements with collection slots and moving units on a conveyor route.',
    implementation: 'PixelArtController builds and links the pixel grid from level data. Movement components handle conveyor segments, curved transitions and transfers between slots.',
    value: 'Separates content construction from movement behavior, creating a practical foundation for visual level variants and coordinated gameplay transitions.',
    architecture: 'PixelArtController reads level dimensions, initializes the grid, builds pixels and establishes their links. WoolMove handles conveyor movement, curved segments, slot transfers and tween cleanup. Pool, waypoint and slot controllers support the surrounding scene.',
    decisions: [
      { title: 'Level content is data-driven', body: 'Grid dimensions and pixel data feed initialization and construction. Pixel creation, linking, hidden-pixel checks and cell removal are explicit operations rather than one monolithic scene animation.' },
      { title: 'Movement handles route transitions', body: 'Conveyor movement combines straight segments with curved turns and rotation changes. Separate operations cover transfers to the conveyor, into slots and between slots.' },
      { title: 'Scene scale is visible in the build', body: 'The inspected scene contains 1,051 Pixel components alongside pool, waypoint and slot controllers. Tween cleanup is exposed separately from movement startup.' },
    ],
    tradeoff: 'Individual pixel objects make selection, visibility and removal straightforward, while increasing scene-management work. Merging or instancing geometry must preserve the per-pixel behavior the game relies on.',
    nextStep: 'Measure active renderers, material variation and pixel-removal bursts before choosing instancing, mesh merging or pooling changes. Compare the same level and conveyor sequence on a fixed device.',
    methods: { PixelArtController: ['initGrid', 'buildPixels', 'checkHiddenPixel', 'removeCell'], WoolMove: ['moveByCurve', 'moveToSlot', 'clearTween'] },
    proof: [{ label: 'Pixel components in scene', value: '1,051' }, { label: 'Content pipeline', value: 'Data → grid' }],
  },
};

export const caseStudyHighlights = Object.fromEntries(caseStudySlugs.map(slug => [slug, caseStudies[slug]])) as Record<(typeof caseStudySlugs)[number], CaseStudy>;
