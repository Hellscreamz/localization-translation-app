exports.handleFileDownload = (req, res) => {
    try {
        const userSession = req.session;

        if (userSession.userId && userSession.jsonData) {
            const jsonData = userSession.jsonData;

            res.setHeader('Content-disposition', 'attachment; filename=translations.json');
            res.setHeader('Content-type', 'application/json');

            res.json(jsonData);
        } else {
            res.status(400).json({ error: 'User session or JSON data not found' });
        }
    } catch (error) {
        console.error('Error handling file download:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
