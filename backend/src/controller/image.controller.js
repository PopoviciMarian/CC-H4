const { postRequest, getRequest } = require('../module/requests');

const cloudApi = async (base64Image) => {
    // const { imageId } = (await postRequest('images-function', '', { imageData: base64Image })).data;
    const imageId = 'c84f9052-cca7-4d00-9368-ebe1d6f7f174'
    console.log('imageId', imageId);

    const { data } = await getRequest('analyze_image', imageId);
    const resultedText = ','.join(data);
    console.log(data);

    // const { data }

    return {
        imageId,
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
        return next(error);
    }
}