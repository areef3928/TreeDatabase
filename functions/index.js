const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

exports.helloWorld = onRequest((request, response) => {
  // การล็อกข้อมูลจาก request
  logger.info("Received request", { requestData: request.body });

  // ตรวจสอบว่าเป็นการร้องขอแบบ GET หรือ POST
  if (request.method === "GET") {
    response.status(200).send("Hello from Firebase! This is a GET request.");
  } else if (request.method === "POST") {
    // หากมีข้อมูลจาก body ของ POST
    const name = request.body.name || "Guest";
    response.status(200).json({
      message: `Hello, ${name}! This is a POST request.`,
      dataReceived: request.body
    });
  } else {
    response.status(405).send("Method Not Allowed. Only GET and POST are allowed.");
  }
});
