/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const projectId = '	total-treat-382511';
// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Instantiates a client
const translate = new Translate({projectId});

exports.translateText = async (req, res) => {
  try {
    let {message} = req.body;
    if (message.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Message too long'
      });
    }
    const targetLangs = ['ro', 'de'];
    const translations =  await Promise.all(targetLangs.map(async (lang) => {
      const [translation] = await translate.translate(message, lang);
      return {
        lang,
        message: translation
      };
    }));

    return res.status(200).json({
      success: true,
      message: 'Message translated successfully',
      data: {
        translations
      }
    });

  } catch(err) {
    return res.status(500).json({
      success: false,
      message: `Request failed with error: ${err}`
    });
  }
};
