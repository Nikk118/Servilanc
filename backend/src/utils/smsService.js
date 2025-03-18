import axios from "axios";

const sendSMS = async (phoneNumber, message) => {
  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        message,
        language: "english",
        route: "q",
        numbers: phoneNumber,
      },
      {
        headers: {
          authorization: "ksFS2zL1H8hwKql6YTQrJMGUn0gAiCc9BupmavWRobjZd4xNIyFtnD94uL7vPypaXxeIYW2ObwlKTEj1",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("SMS Sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};

export default sendSMS;
