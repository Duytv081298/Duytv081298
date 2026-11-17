// Design analysis, separated from measured artifact evidence.
export const caseStudySlugs = ['bloom-sort', 'screw-puzzle', 'coffee-please'] as const;
export const caseStudies: Record<string, { tradeoff: string; validation: string[] }> = {
  'bloom-sort': {
    tradeoff: 'Pooling reduces allocation churn but retains objects in memory. Atlases reduce texture switches but increase the minimum texture payload. Profile both before choosing pool sizes and atlas boundaries.',
    validation: [
      'Repeat a fixed sorting sequence after several restarts; check that input listeners, particles and pooled objects return to their initial counts.',
      'Capture draw calls, frame time and peak memory on a named low-end device with fixed level and quality settings.',
      'Compare HTML bytes with the target network budget, then verify first interaction and click-through in its SDK test environment.',
    ],
  },
  'screw-puzzle': {
    tradeoff: 'A deterministic board model makes move validation testable independently of animation. Visual physics adds weight and feedback, but should not determine whether a move is legal.',
    validation: [
      'Test blocked holes, overlapping boards and rapid repeated taps; each accepted move must change the board exactly once.',
      'Pause and resume during animation, rotate the viewport and restart; the visual board must match logical state.',
      'Profile the busiest board on a named device, recording CPU frame time, draw calls and peak memory before comparing optimizations.',
    ],
  },
  'coffee-please': {
    tradeoff: 'An explicit order state machine prevents duplicate rewards and stale UI. Scripted pour effects are cheaper and more predictable than fluid simulation, at the cost of less physical freedom.',
    validation: [
      'Test order arrival, preparation, service and timeout transitions; each order must complete and award a score only once.',
      'Background and resume the playable during an active order; check that timers, audio and the call to action recover consistently.',
      'Record package size and time to first interaction under a defined network profile, then validate the final creative in each target SDK.',
    ],
  },
};
