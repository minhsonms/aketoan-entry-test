/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import logger from 'morgan';
import expressValidator from 'express-validator';
import cors from 'cors';
import tasksRouter from './routes/tasks';
import authRouter from './routes/auth';
import connection from './database/db';
import 'dotenv/config';
import pkg from '../../package.json';

const startServer = async () => {
  connection();
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use('/api/auth', authRouter);
  app.use('/api/tasks', tasksRouter);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    const webpack = require('webpack');

    // eslint-disable-next-line global-require
    const webpackDevMiddleware = require('webpack-dev-middleware');
    // eslint-disable-next-line global-require
    const webpackHotMiddleware = require('webpack-hot-middleware');

    // eslint-disable-next-line global-require
    const webpackConfig = require('../../webpack.config');

    const compiler = webpack(webpackConfig[1]);
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: '/',
      }),
    );
    app.use(webpackHotMiddleware(compiler));
  }

  app.use(compression());
  app.use(logger(process.env.NODE_ENV === 'production' ? 'production' : 'dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(expressValidator());
  app.use(cookieParser());
  app.use(express.static('public'));
  app.get('*', async (req, res) => {
    res.status(200).end(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,shrink-to-fit=no"
          />
          <meta
            name="description"
            content="AKeToan"
          />
          <meta name="author" content="AKeToan Entry Test Project" />
          <meta name="msapplication-TileColor" content="#0dffff" />
          <meta name="theme-color" content="#ffffff" />
          <title>AKeToan Entry Project</title>
          <link rel="manifest" href="public/manifest.json" />
          <link rel="mask-icon" href="public/safari-pinned-tab.svg" />
          <link rel="shortcut icon" href="public/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="public/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="public/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="public/favicon-16x16.png" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@4.6.0/dist/minty/bootstrap.min.css" integrity="sha256-Fhkkoc5EF4ZmicPhSUkkS+tsuBpRE+Z/26qIgGSSIxQ=" crossorigin="anonymous" />
          <script type="text/javascript">
            window.REACT_APP_API_URL = 'https://localhost:3000';
          </script>
        </head>
        <body>
          <div id="app"></div>
          <script type="text/javascript" src="/app.js?v=${pkg.version}"></script>
        </body>
      </html>  
    `);
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json(err);
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running at http://localhost:${process.env.PORT || 3000}`);
  });
};

startServer();
