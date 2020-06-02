const ClosureCompiler = require('google-closure-compiler').jsCompiler

console.log(ClosureCompiler.CONTRIB_PATH) // absolute path to the contrib folder which contains externs

const closureCompiler = new ClosureCompiler({
  compilation_level: 'ADVANCED'
})

const compilerProcess = closureCompiler.run([{
  compilation_level: 'ADVANCED_OPTIMIZATIONS',
  output_format: 'json',
  code_url: ['xs_observe.js', 'reefer.js'],
  js_output_file: 'reefer-min.js'
}], (exitCode, stdOut, stdErr) => {
  // compilation complete
})
