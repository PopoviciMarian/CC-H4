const { postRequest, getRequest } = require('../module/requests');

const cloudApi = async (base64Image) => {
    const { imageId } = (await postRequest('images-function', '', { imageData: base64Image })).data;
    console.log('imageId', imageId);

    const { description } = (await getRequest('analyze_image', imageId)).data;
    const resultedText = description.join(',');
    console.log('resultedText', resultedText);
    
    const { translations } = (await postRequest('translate_text', '', { message: resultedText }))?.data?.data;
    console.log('Translations', translations);

    const { data } = (await postRequest('rate_text', '', { message: resultedText }));
    return {
        imageId,
        resultedText,
        translations,
        feeling: data.data.sentiment,
    }
}

exports.processImageController = async (req,res, next) => {
    try {
        if (Object.keys(req.files).length > 0 && !req.files.image) {
            const error = new Error('Please upload a file that\'s an image');
            error.httpStatusCode = 400;
            return next(error);
        }
        const { image } = req.files;
        if (!image.mimetype.startsWith('image/')) {
            const error = new Error('Please upload an image file');
            error.httpStatusCode = 400;
            return next(error);
        }

        if (image.size > 3e6) {
            const error = new Error('Please upload an image less than 1MB');
            error.httpStatusCode = 400;
            return next(error);
        }
        const base64Data = image.data.toString('base64');
        
        const response = await cloudApi(base64Data);

        return res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            data: response,
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
}