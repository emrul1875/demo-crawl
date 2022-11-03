const express = require('express')
const app = express()
const port = 3040

const { scrapProductByUrl } = require("./ebay");

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));
app.get("/ebay/load", async (req, res) => {
    try {
        let url = req.query.url;
        url = url ? url : `https://www.ebay.com/itm/184723335316?epid=18039803895&hash=item2b025e6894%3Ag%3ARwcAAOSwM5Fh524l&amdata=enc%3AAQAHAAAA4IO2kmno6M%2FH4DGlLbvMqUk9Kxn19j4GCaK1ZyhnDuAieutoAkZ6jUSL8eY0CgEEDG5AdfucICVIKbJ5gQP2qqrOO9stuReP1EndTutZ2qWWCzmSi3REqPVslh32oC0TY3QkXaTjdy646ztTtHSNvku7W3czPSG8KIpWTdBS9Azbwe9VHQ92%2F0d%2FurUwrOofzlKBy97JzCkd%2Fi9Phn5dK5S4cXkgxFfdwI6KPr%2BcOJ3YdkftZOTtzUfCInpm8lKMNC3R5c%2F0%2Fs%2B3mVWkBiNlzXJvq8OAwJSx%2BrCEjO5ZgaDu%7Ctkp%3ABFBMrt3d74dh&LH_BIN=1&LH_ItemCondition=1000`;
        const data = await scrapProductByUrl(url);
        return res.status(200).send(data);
    } catch (error) {
        console.log(error)
        const data = {error: true, message: "Loading data from E-Bay Failed"};
        return res.status(200).send(data);
    }
});

app.listen(process.env.PORT || port, () => {
    console.log("server started at port " + port);
});