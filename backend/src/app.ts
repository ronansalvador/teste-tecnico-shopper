import * as express from 'express';
// const swaggerUi = require('swagger-ui-express')
// const swaggerFile = require('../swagger_output.json')
// import loginRoute from './routes/loginRoute';
// import matchRoute from './routes/matchRoute';
// import teamRoute from './routes/teamRoute';
// import leaderboardRoute from './routes/leaderboardRoute';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    // this.app.use('/login', loginRoute);
    // this.app.use('/teams', teamRoute);
    // this.app.use('/matches', matchRoute);
    // this.app.use('/leaderboard', leaderboardRoute);
    // this.app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
