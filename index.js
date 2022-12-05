var uploadedPictures = [];
const numberPictures = '&count=9';
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const searchByDayBtn = document.getElementById('searchByDay');
const randomPictures = document.getElementById('randomPictures');
const pictures = document.getElementById('pictures');
const body = document.querySelector('body');

window.addEventListener('load', () => {
    getPictures(numberPictures);
});

randomPictures.addEventListener('click', () => {
    pictures.innerHTML = '';
    getPictures(numberPictures);
    window.addEventListener('scroll', getMorePictures);
});

searchByDayBtn.addEventListener('click', () => {
    pictures.innerHTML = '';
    let param = `&start_date=${startDate.value}&end_date=${endDate.value}`;
    getPictures(param);
    window.removeEventListener('scroll', getMorePictures);
});

function getPictures(params) {
    let xhr = new XMLHttpRequest();
    let url = 'https://api.nasa.gov/planetary/apod?';
    let apiKey = 'api_key=qDNrEUMgNU8CN5gHKk8D7O6zjb20s6kn2DnKvCIU';

    xhr.open('GET', url + apiKey + params, true);

    xhr.addEventListener('load', (data) => {
        const dataJSON = JSON.parse(data.target.response);
        createPictures(dataJSON);
    });

    xhr.send();
}

function createPictures(dataJSON) {
    for (let picture of dataJSON) {
        const pictureItem = document.createElement('div');
        pictureItem.classList.add('picture');
        pictureItem.innerHTML = `
            <div class="picture__img__container">
                <img class="picture__img" src="${picture.url}" alt="${picture.title}">
            </div>
            <h3 class="picture__title">${picture.title}</h3>
            <p class="picture__date">${picture.date}</p>
        `;

        uploadedPictures.push(picture);
        pictures.appendChild(pictureItem);

        pictureItem.addEventListener('click', () => {
            showDetailPicture(picture.date);
        });
    }
}

function showDetailPicture(date) {
    let detailPicture = uploadedPictures.find((picture) => picture.date === date);

    pictureDetail.style.display = 'flex';
    body.style.overflow = 'hidden';

    const pictureDetailImg = document.querySelector('.picture_detail__img');
    pictureDetailImg.src = detailPicture.url;

    const pictureDetailTitle = document.querySelector('.picture_detail__title');
    pictureDetailTitle.innerHTML = detailPicture.title;

    const pictureDetailDate = document.querySelector('.picture_detail__date');
    pictureDetailDate.innerHTML = 'Fecha: ' + detailPicture.date;

    const pictureDetailExplanation = document.querySelector('.picture_detail__explanation');
    pictureDetailExplanation.innerHTML = detailPicture.explanation;

    const pictureDetailCopyright = document.querySelector('.picture_detail__copyright');
    pictureDetailCopyright.innerHTML = 'Copyright: ' + detailPicture.copyright;
}

window.addEventListener('scroll', getMorePictures);
function getMorePictures() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (clientHeight + scrollTop >= scrollHeight - 5) {
        getPictures(numberPictures);
    }
}

const pictureDetail = document.getElementById('picture_detail');
const menuHamburguesa = document.getElementById('menu__hamburguesa');
menuHamburguesa.addEventListener('click', () => {
    pictureDetail.style.display = 'none';
    body.style.overflow = 'auto';
});
