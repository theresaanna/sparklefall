/**
 * @jest-environment jsdom
 */

const SparkleFall = require('../src/sparklefall.js');

describe('SparkleFall', () => {
  let sparkleInstance;
  
  afterEach(() => {
    // Clean up after each test
    if (sparkleInstance) {
      sparkleInstance.destroy();
      sparkleInstance = null;
    }
    // Clear any remaining styles
    document.head.innerHTML = '';
    document.body.innerHTML = '';
  });

  describe('Initialization', () => {
    test('should create instance with default options', () => {
      sparkleInstance = new SparkleFall({ autoStart: false });
      
      expect(sparkleInstance).toBeDefined();
      expect(sparkleInstance.config.container).toBe(document.body);
      expect(sparkleInstance.config.interval).toBe(800);
      expect(sparkleInstance.config.maxSparkles).toBe(50);
      expect(sparkleInstance.config.sparkles).toEqual(['✨', '⭐', '💫', '🌟']);
    });

    test('should accept custom options', () => {
      sparkleInstance = new SparkleFall({
        interval: 500,
        maxSparkles: 100,
        wind: 0.5,
        autoStart: false
      });
      
      expect(sparkleInstance.config.interval).toBe(500);
      expect(sparkleInstance.config.maxSparkles).toBe(100);
      expect(sparkleInstance.config.wind).toBe(0.5);
    });

    test('should handle container selector string', () => {
      const div = document.createElement('div');
      div.id = 'test-container';
      document.body.appendChild(div);
      
      sparkleInstance = new SparkleFall({
        container: '#test-container',
        autoStart: false
      });
      
      expect(sparkleInstance.config.container).toBe(div);
    });

    test('should create sparkle container element', () => {
      sparkleInstance = new SparkleFall({ autoStart: false });
      
      const container = document.querySelector('.sparklefall-container');
      expect(container).toBeTruthy();
      expect(container.style.zIndex).toBe('9999');
    });

    test('should inject styles into document head', () => {
      sparkleInstance = new SparkleFall({ autoStart: false });
      
      const styles = document.getElementById('sparklefall-styles');
      expect(styles).toBeTruthy();
      expect(styles.textContent).toContain('.sparklefall-container');
      expect(styles.textContent).toContain('@keyframes sparklefall-drop');
    });

    test('should not duplicate styles if already present', () => {
      sparkleInstance = new SparkleFall({ autoStart: false });
      const firstStyles = document.getElementById('sparklefall-styles');
      
      const sparkleInstance2 = new SparkleFall({ autoStart: false });
      const secondStyles = document.getElementById('sparklefall-styles');
      
      expect(firstStyles).toBe(secondStyles);
      sparkleInstance2.destroy();
    });
  });

  describe('Sparkle Creation', () => {
    test('should create sparkle element with correct properties', () => {
      sparkleInstance = new SparkleFall({ autoStart: false });
      sparkleInstance.createSparkle();
      
      const sparkle = document.querySelector('.sparklefall-sparkle');
      expect(sparkle).toBeTruthy();
      expect(sparkle.textContent).toMatch(/[✨⭐💫🌟]/);
      expect(sparkle.className).toBe('sparklefall-sparkle');
      expect(sparkle.style.left).toMatch(/\d+(\.\d+)?%/);
      expect(sparkle.style.top).toBe('-50px');
    });

    test('should apply custom colors when specified', () => {
      sparkleInstance = new SparkleFall({
        colors: ['#FF0000', '#00FF00'],
        autoStart: false
      });
      sparkleInstance.createSparkle();
      
      const sparkle = document.querySelector('.sparklefall-sparkle');
      expect(['rgb(255, 0, 0)', 'rgb(0, 255, 0)']).toContain(sparkle.style.color);
    });

    test('should respect size limits', () => {
      sparkleInstance = new SparkleFall({
        minSize: 20,
        maxSize: 30,
        autoStart: false
      });
      sparkleInstance.createSparkle();
      
      const sparkle = document.querySelector('.sparklefall-sparkle');
      const fontSize = parseFloat(sparkle.style.fontSize);
      expect(fontSize).toBeGreaterThanOrEqual(20);
      expect(fontSize).toBeLessThanOrEqual(30);
    });

    test('should not exceed maxSparkles limit', () => {
      sparkleInstance = new SparkleFall({
        maxSparkles: 3,
        autoStart: false
      });
      
      // Create more than max
      for (let i = 0; i < 5; i++) {
        sparkleInstance.createSparkle();
      }
      
      const sparkles = document.querySelectorAll('.sparklefall-sparkle');
      expect(sparkles.length).toBe(3);
    });

    test('should apply wind effect', () => {
      sparkleInstance = new SparkleFall({
        wind: 0.5,
        autoStart: false
      });
      sparkleInstance.createSparkle();
      
      const sparkle = document.querySelector('.sparklefall-sparkle');
      const windOffset = sparkle.style.getPropertyValue('--wind-offset');
      expect(windOffset).toBe('50px');
    });

    test('should apply rotation when spin is enabled', () => {
      sparkleInstance = new SparkleFall({
        spin: true,
        autoStart: false
      });
      sparkleInstance.createSparkle();
      
      const sparkle = document.querySelector('.sparklefall-sparkle');
      const rotation = sparkle.style.getPropertyValue('--rotation');
      expect(rotation).toMatch(/\-?\d+(\.\d+)?deg/);
    });

    test('should not rotate when spin is disabled', () => {
      sparkleInstance = new SparkleFall({
        spin: false,
        autoStart: false
      });
      sparkleInstance.createSparkle();
      
      const sparkle = document.querySelector('.sparklefall-sparkle');
      const rotation = sparkle.style.getPropertyValue('--rotation');
      expect(rotation).toBe('0deg');
    });
  });

  describe('Animation Control', () => {
    test('should start animation when start() is called', () => {
      sparkleInstance = new SparkleFall({ autoStart: false });
      
      expect(sparkleInstance.isRunning).toBe(false);
      sparkleInstance.start();
      expect(sparkleInstance.isRunning).toBe(true);
      expect(sparkleInstance.intervalId).toBeTruthy();
    });

    test('should auto-start when autoStart is true', () => {
      sparkleInstance = new SparkleFall({ autoStart: true });
      
      expect(sparkleInstance.isRunning).toBe(true);
    });

    test('should stop creating new sparkles when stop() is called', () => {
      sparkleInstance = new SparkleFall({ autoStart: false });
      sparkleInstance.start();
      
      expect(sparkleInstance.isRunning).toBe(true);
      sparkleInstance.stop();
      expect(sparkleInstance.isRunning).toBe(false);
      expect(sparkleInstance.intervalId).toBe(null);
    });

    test('should not create duplicate intervals when start() called multiple times', () => {
      sparkleInstance = new SparkleFall({ autoStart: false });
      
      sparkleInstance.start();
      const firstIntervalId = sparkleInstance.intervalId;
      
      sparkleInstance.start();
      const secondIntervalId = sparkleInstance.intervalId;
      
      expect(firstIntervalId).toBe(secondIntervalId);
    });

    test('should clear all sparkles when clear() is called', () => {
      sparkleInstance = new SparkleFall({ autoStart: false });
      
      // Create some sparkles
      for (let i = 0; i < 3; i++) {
        sparkleInstance.createSparkle();
      }
      
      expect(document.querySelectorAll('.sparklefall-sparkle').length).toBe(3);
      
      sparkleInstance.clear();
      expect(document.querySelectorAll('.sparklefall-sparkle').length).toBe(0);
      expect(sparkleInstance.isRunning).toBe(false);
    });

    test('should remove container when destroy() is called', () => {
      sparkleInstance = new SparkleFall({ autoStart: false });
      
      expect(document.querySelector('.sparklefall-container')).toBeTruthy();
      
      sparkleInstance.destroy();
      expect(document.querySelector('.sparklefall-container')).toBeFalsy();
      expect(sparkleInstance.sparkleContainer).toBe(null);
    });
  });

  describe('Configuration Updates', () => {
    test('should update configuration with updateConfig()', () => {
      sparkleInstance = new SparkleFall({
        wind: 0,
        interval: 800,
        autoStart: false
      });
      
      sparkleInstance.updateConfig({
        wind: 0.5,
        interval: 500
      });
      
      expect(sparkleInstance.config.wind).toBe(0.5);
      expect(sparkleInstance.config.interval).toBe(500);
    });

    test('should preserve unmodified config values', () => {
      sparkleInstance = new SparkleFall({
        maxSparkles: 50,
        autoStart: false
      });
      
      sparkleInstance.updateConfig({
        wind: 0.3
      });
      
      expect(sparkleInstance.config.maxSparkles).toBe(50);
      expect(sparkleInstance.config.wind).toBe(0.3);
    });
  });

  describe('Burst Mode', () => {
    test('should create burst of sparkles', (done) => {
      sparkleInstance = new SparkleFall({
        maxSparkles: 20,
        autoStart: false
      });
      
      sparkleInstance.burst(5);
      
      // Wait for burst to complete
      setTimeout(() => {
        const sparkles = document.querySelectorAll('.sparklefall-sparkle');
        expect(sparkles.length).toBe(5);
        done();
      }, 300);
    });

    test('should respect maxSparkles limit in burst', (done) => {
      sparkleInstance = new SparkleFall({
        maxSparkles: 3,
        autoStart: false
      });
      
      sparkleInstance.burst(10);
      
      setTimeout(() => {
        const sparkles = document.querySelectorAll('.sparklefall-sparkle');
        expect(sparkles.length).toBeLessThanOrEqual(3);
        done();
      }, 300);
    });
  });

  describe('Custom Sparkles', () => {
    test('should use custom sparkle characters', () => {
      sparkleInstance = new SparkleFall({
        sparkles: ['❤️', '💖'],
        autoStart: false
      });
      sparkleInstance.createSparkle();
      
      const sparkle = document.querySelector('.sparklefall-sparkle');
      expect(['❤️', '💖']).toContain(sparkle.textContent);
    });

    test('should handle single sparkle character', () => {
      sparkleInstance = new SparkleFall({
        sparkles: ['•'],
        autoStart: false
      });
      sparkleInstance.createSparkle();
      
      const sparkle = document.querySelector('.sparklefall-sparkle');
      expect(sparkle.textContent).toBe('•');
    });
  });

  describe('Performance', () => {
    test('should clean up sparkles after animation duration', (done) => {
      sparkleInstance = new SparkleFall({
        minDuration: 0.1,
        maxDuration: 0.2,
        autoStart: false
      });
      
      sparkleInstance.createSparkle();
      expect(sparkleInstance.sparkleCount).toBe(1);
      
      setTimeout(() => {
        expect(sparkleInstance.sparkleCount).toBe(0);
        done();
      }, 300);
    });

    test('should track sparkle count accurately', () => {
      sparkleInstance = new SparkleFall({
        maxSparkles: 10,
        autoStart: false
      });
      
      expect(sparkleInstance.sparkleCount).toBe(0);
      
      sparkleInstance.createSparkle();
      expect(sparkleInstance.sparkleCount).toBe(1);
      
      sparkleInstance.createSparkle();
      expect(sparkleInstance.sparkleCount).toBe(2);
      
      sparkleInstance.clear();
      expect(sparkleInstance.sparkleCount).toBe(0);
    });
  });

  describe('Edge Cases', () => {
    test('should handle missing container gracefully', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      sparkleInstance = new SparkleFall({
        container: '#non-existent',
        autoStart: false
      });
      
      expect(consoleError).toHaveBeenCalledWith('SparkleFall: Container element not found');
      consoleError.mockRestore();
    });

    test('should handle zero duration', () => {
      sparkleInstance = new SparkleFall({
        minDuration: 0,
        maxDuration: 0,
        autoStart: false
      });
      
      sparkleInstance.createSparkle();
      const sparkle = document.querySelector('.sparklefall-sparkle');
      expect(sparkle.style.animationDuration).toBe('0s');
    });

    test('should handle negative wind values', () => {
      sparkleInstance = new SparkleFall({
        wind: -0.7,
        autoStart: false
      });
      
      sparkleInstance.createSparkle();
      const sparkle = document.querySelector('.sparklefall-sparkle');
      const windOffset = sparkle.style.getPropertyValue('--wind-offset');
      expect(windOffset).toBe('-70px');
    });
  });
});