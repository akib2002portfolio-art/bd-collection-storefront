export const HERO_ANIMATION = {
  // Time between automatic slide changes
  AUTOPLAY_INTERVAL: 9000,

  BACKGROUND: {
    // Very subtle Ken Burns effect
    INITIAL_SCALE: 1.03,
    FINAL_SCALE: 1.0,

    // Slightly shorter than autoplay so it finishes naturally
    DURATION: 8.5,
  },

  CONTENT: {
    // Fade timings
    FADE_DURATION: 0.6,

    // Wait a little before text appears
    START_DELAY: 0.4,

    // Delay between title, subtitle and button
    STAGGER: 0.12,
  },
} as const;