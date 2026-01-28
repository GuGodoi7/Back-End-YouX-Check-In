// middlewares/errorHandler.js

export default function errorHandler(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'O campo "completed" só aceita true ou false!'
    });
  }
  next(err);
}