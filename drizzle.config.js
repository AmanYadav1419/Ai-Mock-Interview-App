/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:FNYTKf5Gc4kI@ep-small-salad-a5fkcoet.us-east-2.aws.neon.tech/neondb?sslmode=require',
    }
  };