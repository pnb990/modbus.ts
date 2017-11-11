import * as childProcess from "child_process";
import * as path from "path";

/**
 * Execute command as child process.
 * Adds Node binaries directory to PATH for usability.
 */
export function shell(command: string, cwd: string) {
  childProcess.execSync(command, {
    stdio: [null, process.stdout, process.stderr],
    env: { PATH: `${process.env.PATH}:${path.resolve("./node_modules/.bin")}` },
    cwd,
  });
}