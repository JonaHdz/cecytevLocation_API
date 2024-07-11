
const port = 3000;
const express = require("express");
const app =  require("./app/app");
app.listen(port, () => {
    console.log(`a Server running on port ${port}`);
});


