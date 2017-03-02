export default (html, preloadedState) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Quoro</title>
    </head>
    <body>
      <div id="root">${html}</div>
      <script>
        window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
      <script src="/static/js/bundle.js"></script>
    </body>
  </html>
`;
