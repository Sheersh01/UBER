const axios = require("axios");

module.exports.getAdressCoordinate = async (address) => {
  if (!address || typeof address !== "string" || !address.trim()) {
    throw new Error("Address is required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;

  if (!apiKey) {
    throw new Error("GOOGLE_MAPS_API is not configured");
  }

  const url = "https://maps.googleapis.com/maps/api/geocode/json";

  try {
    const response = await axios.get(url, {
      params: {
        address: address.trim(),
        key: apiKey,
      },
    });

    if (
      response.data.status !== "OK" ||
      !response.data.results ||
      response.data.results.length === 0
    ) {
      throw new Error("Unable to find coordinates for the provided address");
    }

    const location = response.data.results[0].geometry.location;

    return {
      ltd: location.lat,
      lang: location.lng,
    };
  } catch (error) {
    if (error.response?.data?.error_message) {
      throw new Error(error.response.data.error_message);
    }

    throw new Error(error.message || "Failed to fetch coordinates");
  }
};
