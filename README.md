# koa-express

Use express (and connect) middleware in koa

# Install

```bash
npm install koa-express
```

# Usage:

```javascript
var koa = require('koa');
var express = require('koa-express');

var app = koa();

function middleware (req, res, next) {
  console.log('express');
  next();
}

app.use(express(middleware));

app.use(function * () {
  this.body = 'koa';
});

app.listen(3000);
```

# License

MIT
