import createError from 'http-errors';
import express from 'express';
import path, {dirname} from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {fileURLToPath} from 'url';
import cors from 'cors';
import userRouter from "./modules/user/user.routes.js";
import experienceRouter from "./modules/experience/experience.routes.js";
import hikeRouter from './modules/hike/hike.routes.js';
import adminRouter from './modules/admin/admin.routes.js';
import reservationRouter from './modules/reservation/reservation.routes.js'
import postRouter from './modules/post/post.routes.js'
import paymentRoutes from "./modules/payment/payment.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/hike', hikeRouter);
app.use('/api/experience', experienceRouter);
app.use('/api/admin', adminRouter);
app.use('/api/reservation', reservationRouter);
app.use('/api/post', postRouter);
app.use("/api/payment", paymentRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: err.message});
});

export default app;
