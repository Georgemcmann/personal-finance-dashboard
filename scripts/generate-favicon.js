const fs = require('fs');
const path = require('path');
const pngToIco = require('png-to-ico');

const input = path.join(__dirname, '..', 'public', 'favicon.png');
const output = path.join(__dirname, '..', 'public', 'favicon.ico');

pngToIco(input)
  .then(buf => fs.writeFileSync(output, buf))
  .then(() => console.log('favicon.ico created at', output))
  .catch(err => {
    console.error('Error creating favicon.ico:', err);
    process.exit(1);
  });
