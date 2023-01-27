import * as dotenv from 'dotenv'
import express from 'express'

import initSetup from './setup'
// import { initRoutes } from './routes'
import initApollo from './apollo'
import { connectDatabase, closeDatabase } from './database'

import { getEnv } from './utils/core'

dotenv.config()

const app = express();

/**
 * Initialise app setups
 */
initSetup(app);


/**
 * Initialise app routes
*/
// initRoutes(app);

/**
 * Connect mongoose database
*/
connectDatabase();

/**
 * Initialize apollo server
 */

initApollo(app);

/**
 * Start Express server.
 */

const PORT = getEnv({ name: 'PORT' });

app.listen(PORT, () => {
    console.log(
      `[arctis-api] 🚀 App is running at port ${PORT} in %s mode`,
      app.get('env')
    );
});