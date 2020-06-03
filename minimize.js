const ClosureCompiler = require('google-closure-compiler').jsCompiler

console.log(ClosureCompiler.CONTRIB_PATH) // absolute path to the contrib folder which contains externs

const {writeFile, readFileSync} = require('fs');

const closureCompiler = new ClosureCompiler({
  js: ['xs-observe.js', 'reefer.js'],
  compilation_level: 'SIMPLE',
  js_output_file: 'out.js',
  debug: true
})

const compilerProcess = closureCompiler.run([{
}], (exitCode, stdOut, stdErr) => {
  // compilation complete
  console.log (exitCode, stdOut, stdErr)
  stdOut.map((fileResults) => {
    writeFile(fileResults.path, fileResults.src, () => {});
  });
})
