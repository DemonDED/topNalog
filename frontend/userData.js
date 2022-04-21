const test = document.querySelector('.testText');

test.textContent = 'dasdsads'

async function getUserInformation() {

  xhr.open('GET', 'http://90.189.211.207/getUserInformation/Roman', true);
  xhr.onload = () => {
    if (xhr.status == 200) {
        let userData = xhr.response;
    }
  }
  xhr.send();

}

function getTaxReporting() {

}














