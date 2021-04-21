# Managed services

```bash
platform environment:branch db
```

```
yarn add pg platformsh-config
```

- Brief overview of config-reader
- review of environment variables
- discuss how services are visible to application
- add PostGres relationship

```yaml
# .platform.app.yaml
relationships:
    postgresdatabase: "dbpostgres:postgresql"
```

- create the service

```yaml
dbpostgres:
    type: postgresql:12
    disk: 256
```

```js
// config/database.js
const config = require("platformsh-config").config();

// dbRelationship matches the Postgres relationship key defined in .platform.app.yaml. 
//    Be sure to update both values during changes.
let dbRelationship = "postgresdatabase";

// Local: Strapi default sqlite settings.
let settings =  {
    client: 'sqlite',
    filename: process.env.DATABASE_FILENAME || '.tmp/data.db',
};

let options = {
  useNullAsDefault: true,
};

if (config.isValidPlatform() && !config.inBuild()) {
  // Platform.sh database configuration. Used post-build only in P.sh environments.
  const credentials = config.credentials(dbRelationship);
  console.log(`> platform.sh: Using Platform.sh configuration with relationship ${dbRelationship}.`);

  settings = {
    client: "postgres",
    host: credentials.ip,
    port: credentials.port,
    database: credentials.path,
    username: credentials.username,
    password: credentials.password
  };

  options = {
    ssl: false,
    debug: false,
    acquireConnectionTimeout: 100000,
    pool: {
      min: 0,
      max: 10,
      createTimeoutMillis: 30000,
      acquireTimeoutMillis: 600000,
      idleTimeoutMillis: 20000,
      reapIntervalMillis: 20000,
      createRetryIntervalMillis: 200
    }
  };
} else {
    if (config.isValidPlatform()) {
          // Build hook configuration message.
          console.log('> platform.sh: Using default configuration during Platform.sh build hook until relationships are available.');
    } else {
          // Strapi default local configuration.
          console.log('> platform.sh: Not in a Platform.sh Environment. Using default local sqlite configuration.');
    }
}

module.exports = {
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: settings,
      options: options,
    }
  }
};
```

- make and push changes
- recreate admin account
