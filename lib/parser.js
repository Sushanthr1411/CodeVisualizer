export function parseCode(code) {
  const functionRegex = /function\s+(\w+)\s*\(/g;
  const callRegex = /(\w+)\s*\(/g;

  let functions = [];
  let calls = [];

  let match;

  while ((match = functionRegex.exec(code)) !== null) {
    functions.push(match[1]);
  }

  while ((match = callRegex.exec(code)) !== null) {
    calls.push(match[1]);
  }

  return { functions, calls };
}

export function generateGraph(code) {
  const functionRegex = /function\s+(\w+)\s*\([^)]*\)\s*\{([\s\S]*?)\}/g;

  const nodes = [];
  const edges = [];

  let match;

  const functions = [];

  // ✅ First pass: collect all function names
  while ((match = functionRegex.exec(code)) !== null) {
    functions.push(match[1]);
  }

  // Reset regex to reuse
  functionRegex.lastIndex = 0;

  // ✅ Second pass: create nodes + edges
  while ((match = functionRegex.exec(code)) !== null) {
    const functionName = match[1];
    const functionBody = match[2];

    // Add node
    nodes.push({
      id: functionName,
      data: { label: functionName },
      position: { x: 0, y: 0 }, // UI handles positioning
    });

    const callRegex = /(\w+)\s*\(/g;
    let callMatch;

    while ((callMatch = callRegex.exec(functionBody)) !== null) {
      const calledFunction = callMatch[1];

      // ❌ Ignore unwanted JS keywords
      const ignoreList = ['if', 'for', 'while', 'switch', 'return'];

      if (
        calledFunction !== functionName &&
        functions.includes(calledFunction) &&
        !ignoreList.includes(calledFunction)
      ) {
        edges.push({
          id: `${functionName}-${calledFunction}`,
          source: functionName,
          target: calledFunction,
        });
      }
    }
  }

  return { nodes, edges };
}