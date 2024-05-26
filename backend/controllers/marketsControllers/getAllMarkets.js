const { Market } = require("../../models");

const getAllMarkets = async (req, res) => {
    const markets = await Market.find({})
    res.status(200).json({ markets })
};

module.exports = getAllMarkets
