var enabled = true;
var data = {};

document.getElementById('more-btn').addEventListener('click', function() {
    if (enabled) {
        document.getElementById('rate-msg').innerText = ""
        loadImage();
        enabled = false;
        setTimeout(function() { enabled = true; }, 100);
    } else {
        document.getElementById('rate-msg').innerText = "You're spitting too fast!";
        console.log('Too fast!');
    }
});

function loadImage() {
    var index = Math.floor(Math.random() * (data.length - 1));
    var uris = data[index]['image_uris'];
    if (uris.length == 0) {
        console.log('No images');
    }
    var uri = uris['border_crop'];
    if ('png' in uris) {
        uri = uris['png'];
    } else if ('normal' in uris) {
        uri = uris['normal'];
    } else if ('large' in uris) {
        uri = uris['large'];
    }
    var img = document.getElementById('card');
    img.src = uri;
}

fetch('https://api.scryfall.com/cards/search?q=art%3Adrool+OR+art%3Aspit+OR+art%3Asaliva&unique=cards')
.then(response => {
    if (!response.ok) {
    throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(res => {
    data = res.data.filter((x) => x.image_uris != null);
    loadImage();
})
.catch(error => {
    console.error('Error:', error);
});