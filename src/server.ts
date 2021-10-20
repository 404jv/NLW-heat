import { serverHttp } from './app';

serverHttp.listen(3333, () =>
  console.log('🚀 Server is running: http://localhost:3333')
);
