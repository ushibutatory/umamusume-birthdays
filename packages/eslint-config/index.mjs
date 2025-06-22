import base from "./config-base.mjs";
import typescript from "./config-typescript.mjs";
import jest from "./config-jest.mjs";

// まとめてエクスポート
export default [...base, ...typescript, ...jest];

// 名前付きエクスポート
export { default as base } from "./config-base.mjs";
export { default as typescript } from "./config-typescript.mjs";
export { default as jest } from "./config-jest.mjs";
