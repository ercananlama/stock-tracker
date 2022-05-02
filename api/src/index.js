import http from 'http';
import createApp from './app.js';

(() => {
  try {
    const port = process.env.PORT || 8001;
    const app = createApp();
    http
      .createServer(app)
      .listen(port)
      .on("listening", () => {
        console.log(`Running on ${port}`);
      });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();