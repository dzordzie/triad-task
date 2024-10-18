/* ================== FROM VALIDATION ================== */
const form = document.getElementById('form')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const messageInput = document.getElementById('message')
const termsInput = document.getElementById('terms')
const termsErrorImg = document.querySelector('.terms_error')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (formCheck()) {
    resetForm()
    setTimeout(swapSections, 1000)
  }
})

function setError(input, message) {
  const currentInput = input.parentElement
  const smallTag = currentInput.querySelector('small')
  currentInput.classList.add('error')
  smallTag.innerText = message
}

function isEmailValid(email) {
  return /[a-z0-9][a-z0-9\.\-]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?/.test(email)
}

function isNameAndSurnameValid(name) {
  return /^[\p{L}]+ [\p{L}]+$/u.test(name)
}

function formCheck() {
  const nameValue = nameInput.value.trim()
  const emailValue = emailInput.value.trim()
  const messageValue = messageInput.value.trim()
  let isValid = true

  if (nameValue === '') {
    setError(nameInput, 'Vyplň prosím meno a priezvisko')
    isValid = false
  } else if (!isNameAndSurnameValid(nameValue)) {
    setError(nameInput, 'Vyplň prosím meno aj s priezviskom')
    isValid = false
  } else {
    setError(nameInput, '')
  }

  if (emailValue === '') {
    setError(emailInput, 'Vyplň prosím e-mail')
    isValid = false
  } else if (!isEmailValid(emailValue)) {
    setError(emailInput, 'Vložený e-mail nemá správny formát')
    isValid = false
  } else {
    setError(emailInput, '')
  }

  if (messageValue === '') {
    setError(messageInput, 'Napíš nám niečo o svojej práci')
    isValid = false
  } else {
    setError(messageInput, '')
  }

  if (!termsInput.checked) {
    termsErrorImg.style.visibility = 'visible'
    isValid = false
  } else {
    termsErrorImg.style.visibility = 'hidden'
  }

  if (!isValid) {
    console.log(isValid)
    return false
  }
  console.log(isValid)
  return true
}

function resetForm() {
  nameInput.value = ''
  emailInput.value = ''
  messageInput.value = ''
  termsInput.checked = false
}

/* ================== SUCCESS FORM SEND ================== */

const formSection = document.getElementById('want_feedback')
const uploadingSection = document.getElementById('uploading_section')
let currentImageIndex = 0
let imageChangeInterval

function swapSections() {
  currentImageIndex = 0
  changeLoadingImages()
  imageChangeInterval = setInterval(changeLoadingImages, 1000)
  setTimeout(switchToFinishSection, 6000)
  uploadingSection.style.display = 'flex'
  uploadingSection.scrollIntoView({ behavior: 'smooth' })
  window.location.hash = 'uploading_section'
  setTimeout(() => {
    formSection.style.display = 'none'
  }, 1000)
}

/* ================== SENDING DATA LOADING ================== */

const loadingImages = [
  './img/loading_1.png',
  './img/loading_2.png',
  './img/loading_3.png',
  './img/loading_4.png',
  './img/loading_5.png',
  './img/loading_6.png',
]

const loadingImg = document.querySelector('.loading_img')
const loadingSection = document.getElementById('loading_section')
const finishSection = document.getElementById('finish_section')

function changeLoadingImages() {
  loadingImg.src = loadingImages[currentImageIndex]

  if (currentImageIndex < loadingImages.length - 1) {
    currentImageIndex++
  }
}

function switchToFinishSection() {
  clearInterval(imageChangeInterval)
  loadingSection.style.display = 'none'
  finishSection.style.display = 'flex'
}
