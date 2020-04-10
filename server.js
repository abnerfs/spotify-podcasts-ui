const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 2277;

app.use(express.static(__dirname + '/dist/spotify-podcasts-ui'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/spotify-podcasts-ui/index.html'));
});


app.listen(PORT, () => {
    console.log('Site iniciado na porta ' + PORT);
})