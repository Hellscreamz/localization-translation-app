const uploadHelper = require('../helpers/uploadHelper');

exports.FileUpload = (req, res) => {
    uploadHelper.handleFileUploadHelper(req, res);
};

