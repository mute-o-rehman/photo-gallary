import 'zone.js/node';
import { ngExpressEngine } from '@nguniversal/express-engine';
import express, { Request, Response } from 'express';
import { join } from 'path';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import AppServerModule from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/photo-gallary/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  console.log('Dist folder:', distFolder);
  console.log('Index HTML:', indexHtml);

  try {
    server.engine(
      'html',
      ngExpressEngine({
        bootstrap: AppServerModule,
      })
    );

    server.set('view engine', 'html');
    server.set('views', distFolder);

    server.get(
      '*.*',
      express.static(distFolder, {
        maxAge: '1y',
      })
    );

    server.get('*', (req: Request, res: Response) => {
      console.log('Handling request:', req.url);
      res.render(indexHtml, { req, res });
    });
  } catch (err) {
    console.error('Error setting up server:', err);
  }

  return server;
}

function run() {
  const port = process.env['PORT'] || 4000;

  try {
    const server = app();
    server.listen(port, () => {
      console.log(`Node Express server listening on http://localhost:${port}`);
    });

    server.on('error', (err) => {
      console.error('Server error:', err);
    });
  } catch (err) {
    console.error('Error running server:', err);
  }
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the application works in the same way in both environments
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
