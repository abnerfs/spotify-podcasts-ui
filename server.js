const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 2277;


function ensureSecure(req, res, next) {
    const protocol = req.get('X-Forwarded-Proto');
    // console.log('secure');
    //Heroku stores the origin protocol in a header variable. The app itself is isolated within the dyno and all request objects have an HTTP protocol.
    if (protocol =='https' || req.hostname == 'localhost') {
        //Serve Angular App by passing control to the next middleware
        next();
    } else if(protocol !='https' && req.get('X-Forwarded-Port')!='443'){
        //Redirect if not HTTP with original request URL
        res.redirect('https://' + req.hostname + req.url);
    }
}

app.use(ensureSecure);
app.use(express.static(__dirname + '/dist/spotify-podcasts-ui'));


app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/spotify-podcasts-ui/index.html'));
});


app.listen(PORT, () => {
    console.log('Site iniciado na porta ' + PORT);
})