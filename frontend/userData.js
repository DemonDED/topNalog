const xhr = new XMLHttpRequest();

xhr.open('GET', 'http://90.189.211.207/getUserInformation/Roman', true);
xhr.onload = () => {
    if (xhr.status == 200) {

    }
}
xhr.send();