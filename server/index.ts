import path from 'path';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

const distPath = path.join(__dirname, './../');
const port = 80;
const app = express();

app.use(express.static(distPath + '/client'));

if (process.env.NODE_ENV !== 'production') {
  const webpackConfig = require('./../config/webpack/config.prod');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');

  const compiler = webpack(webpackConfig)

  app.use(
    webpackDevMiddleware(compiler, {
      logLevel: 'silent',
      publicPath: '/dist/client',
      writeToDisk(filePath) {
        return /dist\/server\//.test(filePath) || /loadable-stats/.test(filePath)
      },
    }),
  )
}

const nodeStats = path.resolve(
  __dirname,
  './../dist/server/loadable-stats.json'
);

const webStats = path.resolve(
  __dirname,
  './../dist/client/loadable-stats.json'
);

const templateFn = ({ body, extractor }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Peru.com Turismo 📸 | ¿Listo para tu próximo viaje? </title>
    <meta name="description" content="Contamos con la mejor información sobre los lugares turísticos más importantes del Perú. Elige el destino que más te guste ☝, infórmate del atractivo turístico ⚠️ y escoge el paquete turístico 🚀 que más se te acomode. ¡Perú.com es tu guía para tus aventuras!">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
  </head>
  <body>
    <div id="root">${body}</div>
    ${extractor.getScriptTags()}
  </body>
  </html>
`;

app.get('*', async (req, res) => {
  try {
    const serverExtractor = new ChunkExtractor({ statsFile: nodeStats });
    const clientExtractor = new ChunkExtractor({ statsFile: webStats });
    const body = renderToString(
      <>
        <GlobalStyle />
        <Provider store={store}>
          <Router location={req.path} context={context}>
            {renderRoutes(routes)}
        </Router>
        </Provider>
      </>
    );

    res.set('content-type', 'text/html');
    res.send(templateFn({
      body,
      clientExtractor
    }));
  } catch (error) {
    throw new Error(error.message);
  }
});

app.listen(port, () => {
  console.log(`Serving at http://localhost:${port}`);
});
