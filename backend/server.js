const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");
const connectMongoDB = require("./db/mongoDB");

app.listen(config.PORT, () => {
    logger.info(`Server is running on port: ${config.PORT}`);
    connectMongoDB();
});