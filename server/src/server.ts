import app from "./app.js"
import { serverConfig } from "./config/server.config.js"


const PORT = serverConfig.port

app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`)
})