import "@testing-library/jest-dom";

// jsdom doesn't ship with a fetch implementation.
// Provide a global stub so components that call fetch() can be spied on.
if (typeof global.fetch === "undefined") {
  global.fetch = jest.fn() as jest.Mock;
}
