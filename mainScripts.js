const exec = require('child_process').exec;
var files = [];
const execSync = require('sync-exec');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function clicked() {
    var input = document.createElement('input');
    input.type = 'file';
    input.multiple = "multiple";
    input.onchange = e => { 
        files = e.target.files;
        console.log(files)
        document.getElementById("files").innerHTML = '';
        for (var i = 0; i < files.length; i++) {
            document.getElementById("files").innerHTML += '<div class="alert alert-info" id="'+files[i]["name"]+'">'+files[i]["name"]+'</div>';
        }
    }
    input.click();
}

async function loader() {
    document.getElementById("loading").innerHTML = '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';
    await sleep(1000);
    convert();
}

async function convert() {
    for(var i = 0; i < files.length; i++) {
        var script = 'ffmpeg -i '+files[i]["path"]+' -c:v dnxhd -profile:v dnxhr_hq -pix_fmt yuv422p -c:a pcm_s16le '+files[i]["path"]+'.mov'
        console.log(script)
        await execSync(script);
        console.log("finish");
    }
    document.getElementById("files").innerHTML = '';
    document.getElementById("loading").innerHTML = '';
}
