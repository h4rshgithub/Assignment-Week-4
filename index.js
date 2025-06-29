const express = require('express');
const chalk = require('chalk');
const path = require('path');

const app = express();
const PORT = 3000;

// ======= Middleware for Logging =========
app.use((req, res, next) => {
  console.log(chalk.cyan(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`));
  next();
});

// ======= Serve Static Files (like CSS) =========
app.use(express.static(path.join(__dirname, 'public')));

// ======= Route 1: Home Page (HTML with styling) =========
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Express.js Demo</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <h1>Welcome to My Express.js Demo 🚀</h1>
      <p>This web server demonstrates basic routing, middleware, and API endpoints using Express.js.</p>
      <nav>
        <a href="/">Home</a> |
        <a href="/about">About Express & API</a> |
        <a href="/api/info">API Info (JSON)</a>
      </nav>
    </body>
    </html>
  `);
});

app.get('/about', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>About Express & API</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <h1>About Express.js and API</h1>
      <p><strong>Express.js:</strong> A fast, minimal web framework for Node.js to build web applications and REST APIs easily.</p>
      <p><strong>API Endpoint:</strong> A URL where the server sends data (usually in JSON) when requested. Great for connecting frontend apps or mobile apps to backend services.</p>
      <nav>
        <a href="/">Home</a> |
        <a href="/api/info">API Info (JSON)</a>
      </nav>
    </body>
    </html>
  `);
});

app.get('/api/info', (req, res) => {
  res.json({
    appName: 'Express API Demo',
    developer: 'Harsh Singh',
    serverTime: new Date(),
    features: ['Routing', 'Middleware', 'Static Files', 'API Response']
  });
});

app.use((req, res) => {
  console.log(chalk.red(`404 Error - ${req.url} Not Found`));
  res.status(404).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>404 Not Found</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <h2 style="color:red;">404 - Page Not Found ❌</h2>
      <p>The page you're looking for does not exist.</p>
      <a href="/">Go Back Home</a>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(chalk.green.bold(`Server running at: http://localhost:${PORT}`));
});
