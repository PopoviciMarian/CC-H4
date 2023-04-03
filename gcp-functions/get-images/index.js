/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const vision = new ImageAnnotatorClient();

exports.getImage = async (req, res) => {
  const fileName = req.query.id;

  // If no fileName was provided, return an error response
  if (!fileName) {
    return res.status(400).send('Error: No id provided.');
  }

  // Retrieve the file from Google Cloud Storage
  const bucketName = 'imges_bucket';
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);

  // Check if the file exists
  const [exists] = await file.exists();
  if (!exists) {
    return res.status(404).send('Error: File not found.');
  }
  const [fileContent] = await file.download();
  // Set the response headers and return the image
  res.set('Content-Type', 'image/jpeg');
  res.set('Cache-Control', 'public, max-age=31536000, s-maxage=31536000');
  res.send(fileContent);
};