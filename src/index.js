
const PORT = process.env.PORT ||  3000;
const express = require("express");
const app =  require("./app/app");
const {swaggerDocs : v1SwaggerDoc} = require("./swagger");


//configuracion de puerto para el servidor
app.listen(PORT, () => {
    console.log(`a Server running on port ${PORT}`);
    v1SwaggerDoc(app, PORT);
});


