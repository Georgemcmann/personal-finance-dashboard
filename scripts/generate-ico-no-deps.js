const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, '..', 'public', 'favicon.png');
const output = path.join(__dirname, '..', 'public', 'favicon.ico');

if (!fs.existsSync(input)) {
  console.error('Input PNG not found:', input);
  process.exit(1);
}

const png = fs.readFileSync(input);
if (png.length < 29) {
  console.error('PNG too small or invalid');
  process.exit(1);
}

// Parse width/height from IHDR chunk (bytes 16-23: width, height big-endian)
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);

const ICONDIR = Buffer.alloc(6);
ICONDIR.writeUInt16LE(0, 0); // reserved
ICONDIR.writeUInt16LE(1, 2); // type (1 = icon)
ICONDIR.writeUInt16LE(1, 4); // count

const entry = Buffer.alloc(16);
entry.writeUInt8(width >= 256 ? 0 : width, 0); // width
entry.writeUInt8(height >= 256 ? 0 : height, 1); // height
entry.writeUInt8(0, 2); // color count
entry.writeUInt8(0, 3); // reserved
entry.writeUInt16LE(1, 4); // color planes
entry.writeUInt16LE(32, 6); // bits per pixel
entry.writeUInt32LE(png.length, 8); // bytes in resource
const imageOffset = ICONDIR.length + entry.length; // typically 6 + 16 = 22
entry.writeUInt32LE(imageOffset, 12);

const ico = Buffer.concat([ICONDIR, entry, png]);
fs.writeFileSync(output, ico);
console.log('Created', output, 'with', width + 'x' + height, 'PNG embedded.');
