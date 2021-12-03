export interface Env {
  dbHost: string;
  dbPort: number;
  dbName: string;
}

export const configurationFactory = (): Env => {
  const {
    DB_HOST: dbHost = '127.0.0.1',
    DB_PORT: dbPort = process.env.DB_PRORT || '28015',
    DB_NAME: dbName = 'nimbusweb',
  } = process.env;
  return { dbHost, dbPort: parseInt(dbPort, 10), dbName };
};
