const serverURL = 'https://geoglidev1.vercel.app/'; // Replace with your server's domain and port
const formData = new FormData();
formData.append('video', blob, 'animation.webm');

fetch(`${serverURL}/save-video`, {
    method: 'POST',
    body: formData,
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    console.log('Video saved on server:', data);
})
.catch(error => {
    console.error('Error saving video on server:', error);
    // Print server response to console
    error.response.text().then(text => console.log('Server response:', text));
});