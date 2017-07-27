"use strict";
const path = require("path");
const gulp = require("gulp");
const gutil = require("gulp-util");
const clean = require("./gulp/clean");
const shell = require("./gulp/shell");

// Library package path and file.
const packagePath = path.resolve(__dirname);
const packageJson = require("./package.json");

// Delete compiled files.
gulp.task("clean", (done) => {
  clean.run(packagePath, [
    "coverage",
    "*.tgz",
    "*.log",
    "test.d.ts",
    "test.js.map",
    "test.js",
    "index.d.ts",
    "index.js.map",
    "index.js",
    "pdu/**/*.d.ts",
    "pdu/**/*.js",
    "pdu/**/*.js.map",
    "tcp/**/*.d.ts",
    "tcp/**/*.js",
    "tcp/**/*.js.map",
    "examples/**/*.d.ts",
    "examples/**/*.js",
    "examples/**/*.js.map",
  ], done);
});

// Clean and delete modules generated documentation.
gulp.task("distclean", ["clean"], (done) => {
  clean.run(packagePath, ["docs", "node_modules"], done);
});

// Run TypeScript compiler.
gulp.task("tsc", ["clean"], (done) => {
  shell.run("tsc", packagePath, done);
});

// Run tests with coverage reporting.
gulp.task("test", ["tsc"], (done) => {
  shell.run("istanbul cover test.js -x \"**/*.spec.js\"", packagePath, done);
});

// Run linter.
gulp.task("lint", (done) => {
  shell.run("tslint -c tslint.json -p tsconfig.json --type-check", packagePath, done);
});

// Run example.
gulp.task("example", ["tsc"], (done) => {
  const file = gutil.env.f || gutil.env.file || "modules";
  shell.run(`node ./examples/${file}.js`, packagePath, done);
});

// Build documentation.
gulp.task("docs", (done) => {
  shell.run("typedoc --out docs .", packagePath, done);
});

// Build library.
gulp.task("build", ["test", "lint"], (done) => {
  shell.run("npm pack", packagePath, done);
});