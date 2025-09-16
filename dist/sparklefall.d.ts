/**
 * Configuration options for SparkleFall
 */
export interface SparkleFallOptions {
  /**
   * Container element or selector where sparkles will fall
   * @default document.body
   */
  container?: HTMLElement | string;
  
  /**
   * Interval between spawning new sparkles (milliseconds)
   * @default 800
   */
  interval?: number;
  
  /**
   * How long sparkles remain visible (milliseconds)
   * @default 5000
   */
  duration?: number;
  
  /**
   * Array of sparkle characters/emojis to use
   * @default ['✨', '⭐', '💫', '🌟']
   */
  sparkles?: string[];
  
  /**
   * Array of colors for sparkles. Use null for default emoji colors
   * @default null
   * @example ['#FFD700', '#FFF', '#FF69B4']
   */
  colors?: string[] | null;
  
  /**
   * Minimum sparkle size in pixels
   * @default 10
   */
  minSize?: number;
  
  /**
   * Maximum sparkle size in pixels
   * @default 30
   */
  maxSize?: number;
  
  /**
   * Minimum fall duration in seconds
   * @default 2
   */
  minDuration?: number;
  
  /**
   * Maximum fall duration in seconds
   * @default 5
   */
  maxDuration?: number;
  
  /**
   * Wind effect strength (-1 to 1)
   * Negative values blow left, positive blow right
   * @default 0
   */
  wind?: number;
  
  /**
   * Enable rotation during fall
   * @default true
   */
  spin?: boolean;
  
  /**
   * Maximum number of sparkles on screen at once
   * @default 50
   */
  maxSparkles?: number;
  
  /**
   * Automatically start animation when created
   * @default true
   */
  autoStart?: boolean;
  
  /**
   * Z-index for the sparkle container
   * @default 9999
   */
  zIndex?: number;
}

/**
 * SparkleFall - Beautiful falling sparkle animations for your website
 */
export default class SparkleFall {
  /**
   * Current configuration
   */
  config: Required<SparkleFallOptions>;
  
  /**
   * Whether the animation is currently running
   */
  isRunning: boolean;
  
  /**
   * Create a new SparkleFall instance
   * @param options - Configuration options
   */
  constructor(options?: SparkleFallOptions);
  
  /**
   * Start the sparkle animation
   */
  start(): void;
  
  /**
   * Stop spawning new sparkles (existing sparkles continue to fall)
   */
  stop(): void;
  
  /**
   * Stop and remove all sparkles immediately
   */
  clear(): void;
  
  /**
   * Destroy the instance and clean up DOM
   */
  destroy(): void;
  
  /**
   * Update configuration options
   * @param options - New configuration options to merge
   */
  updateConfig(options: Partial<SparkleFallOptions>): void;
  
  /**
   * Create a burst of sparkles
   * @param count - Number of sparkles to create (limited by maxSparkles)
   */
  burst(count?: number): void;
}