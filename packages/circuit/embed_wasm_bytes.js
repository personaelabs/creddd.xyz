import * as fs from 'fs';

/**
 * Load the wasm file and output a typescript file with the wasm bytes embedded
 */
const embedWasmBytes = async () => {
  let wasm = fs.readFileSync('./circuit-node/circuits_bg.wasm');

  let bytes = new Uint8Array(wasm.buffer);

  const file = `
    export const wasmBytes = new Uint8Array([${bytes.toString()}]);
  `;

  fs.writeFileSync('./circuit-node/wasm_bytes.ts', file);
};

embedWasmBytes();
