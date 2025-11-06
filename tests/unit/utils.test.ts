import { describe, it, expect } from 'vitest';

// Example utility function tests
describe('Utility Functions', () => {
  describe('formatCurrency', () => {
    it('formats number as currency', () => {
      const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount);
      };

      expect(formatCurrency(1000)).toBe('$1,000.00');
      expect(formatCurrency(50.5)).toBe('$50.50');
    });
  });

  describe('slugify', () => {
    it('converts text to URL-friendly slug', () => {
      const slugify = (text: string) => {
        return text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/--+/g, '-')
          .trim();
      };

      expect(slugify('Hello World')).toBe('hello-world');
      expect(slugify('Test & Demo!')).toBe('test-demo');
      expect(slugify('  Multiple   Spaces  ')).toBe('multiple-spaces');
    });
  });

  describe('validateEmail', () => {
    it('validates email addresses', () => {
      const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('invalid.email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });

  describe('truncateText', () => {
    it('truncates long text with ellipsis', () => {
      const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
      };

      expect(truncateText('Short text', 20)).toBe('Short text');
      expect(truncateText('This is a very long text', 10)).toBe('This is a ...');
    });
  });
});
