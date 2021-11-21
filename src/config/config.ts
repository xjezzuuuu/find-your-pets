import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    app: {
      port: process.env.APP_PORT,
    },
    files: {
      dest: process.env.UPLOADS_FOLDER,
    },
    jwt: {
      secretKey: process.env.JWT_SECRET,
      expires: process.env.JWT_EXPIRES,
    },
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      name: process.env.DB_DATABASE,
    },
  };
});
