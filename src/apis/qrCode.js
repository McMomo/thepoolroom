import QRCode from 'qrcode';

//Create QR Code by giving it the id of a dataset. Output file will be saved to /output/qrcodes
async function createQRCode(id, size, name) {
  const baseURI = 'https://poolroom.neocities.org/';
  // With promises
  await QRCode.toFile(
    './../output/qrcodes/' + size + '/' + name + '.png',
    baseURI + id + '.html',
    {
      errorCorrectionLevel: 'H',
      width: size,
      height: size,
    }
  );
}

export default createQRCode;
