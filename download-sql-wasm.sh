echo "Downloading SQL.js WebAssembly file..."
curl -L https://github.com/sql-js/sql.js/releases/download/v1.8.0/sql-wasm.wasm -o public/sql-wasm.wasm
echo "Downloaded sql-wasm.wasm to public directory"