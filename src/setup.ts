import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';

dotenv.config();

const {
  JWT_TOKEN_SECRET,
  APP_DOMAIN,
} = process.env;

const corsOptions = {
  credentials: true,
  origin: [
    'https://studio.apollographql.com',
    APP_DOMAIN ? APP_DOMAIN : 'http://localhost:3000'
  ]
}

export default function initSetup (app: express.Express) {
  if (!JWT_TOKEN_SECRET)
    throw new Error('Please configure JWT_TOKEN_SECRET environment variable.');

  app.disable('x-powered-by');

  app.use(express.urlencoded({ limit: '10mb', extended: true }));
  app.use(express.json({ limit: '10mb' }));

  app.use(cookieParser());
  app.use(compression());

  app.use(express.static('public'))
  app.use('/api/images/', express.static('images'));

  app.use(helmet({ frameguard: { action: 'sameorigin' } }));

  app.use(cors(corsOptions));
}
