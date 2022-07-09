import QRCode from 'qrcode';

//Create QR Code by giving it the id of a dataset. Output file will be saved to /output/qrcodes
function createQRCode(id) {
  const baseURI = 'https://poolroom.neocities.org/';
  // With promises
  QRCode.toFile('../../output/qrcodes/' + id + '.svg', baseURI + id, {
    errorCorrectionLevel: 'H',
  })
    .then((url) => {
      console.log(url);
    })
    .catch((err) => {
      console.error(err);
    });
}

export default createQRCode;
