class RateLimiter {
    constructor({ maxCallsPerDay, delayMs = 500 }) {
      this.maxCallsPerDay = maxCallsPerDay;
      this.delayMs = delayMs;
      this.calls = 0;
    }
  
    async wait() {
      if (this.calls >= this.maxCallsPerDay) {
        throw new Error("Límite de llamadas diarias alcanzado");
      }
  
      this.calls++;
      return new Promise((resolve) => setTimeout(resolve, this.delayMs));
    }
  }
  
  module.exports = RateLimiter;
  