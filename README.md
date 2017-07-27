# Modbus.ts

[![npm](https://img.shields.io/npm/v/modbus.ts.svg?style=flat-square)](https://www.npmjs.com/package/modbus.ts)
[![npm](https://img.shields.io/npm/l/modbus.ts.svg?style=flat-square)](https://github.com/mojzu/modbus.ts/blob/master/LICENCE)
[![Travis CI](https://img.shields.io/travis/mojzu/modbus.ts.svg?style=flat-square)](https://travis-ci.org/mojzu/modbus.ts)
[![Code Climate](https://img.shields.io/codeclimate/coverage/github/mojzu/modbus.ts.svg?style=flat-square)](https://codeclimate.com/github/mojzu/modbus.ts)

[Modbus](http://www.modbus.org/) application protocol written in [TypeScript](https://www.typescriptlang.org/) for [Node.js](https://nodejs.org/en/).

-   [Documentation](https://mojzu.github.io/modbus.ts/)

## Quickstart

Modbus TCP client communicating with mock server example.

```TypeScript
import * as modbus from "modbus.ts";

// Create mock server and client instances.
const server = new modbus.TcpMockServer(5022, "server");
const client = new modbus.TcpClient({ host: "localhost", port: 5022 }, "client");

// Open server for connections.
server.open()
  .subscribe(() => {

    // Connect client to server.
    client.connect()
      .switchMap(() => {
        // Make request(s) to server.
        return client.readHoldingRegisters(0x1000, 1);
      })
      .subscribe((response) => {
        // Handle server response(s).
        process.stdout.write(`${JSON.stringify(response.data, null, 2)}\n`);

        // Disconnect client, close server.
        client.disconnect();
        server.close();
      });

  });
```

## Dependencies

-  [container.ts](https://www.npmjs.com/package/container.ts)
-  [debug](https://www.npmjs.com/package/debug)
-  [rxjs](https://www.npmjs.com/package/rxjs)

## Developer

Clone repository, install dependencies with `yarn install` and run scripts: `yarn run ...`

| Script      | Description                                              |
| ----------- | -------------------------------------------------------- |
| `clean`     | Clean compiled files.                                    |
| `distclean` | Remove Node modules and generated documentation.         |
| `test`      | Run tests using Jasmine and Istanbul.                    |
| `lint`      | Run TSLint on project.                                   |
| `example`   | Run example script, `yarn run example -- -f quickstart`. |
| `docs`      | Generate Typedoc documentation.                          |
| `build`     | Build library for release.                               |

Publishing library to NPM/GitHub.

```Shell
$ yarn run build && npm publish --access=public
$ git push origin master --tags
```

Set [GitHub](https://github.com/) repository pages source to `/docs`.

Add [Code Climate](https://codeclimate.com/) repository token to [Travis CI](https://travis-ci.org/) in `Settings -> Environment Variables`.
