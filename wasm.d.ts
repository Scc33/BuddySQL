// Type declarations for WebAssembly imports
declare module "*.wasm" {
  const content: string;
  export default content;
}
