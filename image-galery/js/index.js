const VENDORS_NAMES = ['unsplash', 'flickr']
const headerTitle = document.querySelector('.header-title')
const headerLogo = document.getElementById('logo')
const main = document.getElementById('main')

const vendors = new Map(
  [
    [VENDORS_NAMES[0], {
      title: 'Unsplash API',
      logo: './assets/icon/unsplash.png',
    }],
    [VENDORS_NAMES[1], {
      title: 'Unsplash API',
    }],
  ]
)
{
}

const state = {
  currentVendor: VENDORS_NAMES[0]
}

const renderImages = (img) => {

}


window.onload = async () => {
  headerLogo.src = vendors.get(state.currentVendor).logo
  headerTitle.innerText = vendors.get(state.currentVendor).title
}


testJSON = [
  { url: './test/img/alain-bonnardeaux-aUdoa_00dgY-unsplash.jpg' },
  { url: './test/img/barcs-tamas-1UyKu8KMipE-unsplash.jpg' },
]