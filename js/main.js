const dimensionNumbers = document.querySelectorAll('.dimension-number')
const dimensionInput = document.getElementById('dimension-input')
const qrCodeContainer = document.getElementById('qr-code-container')
const urlInput = document.getElementById('url-input').value
const generateQRCodeBtn = document.getElementById('generate-qr-code-btn')

const API_URL = 'http://api.qrserver.com/v1/create-qr-code/?data='

// EVENT LISTENERS //
dimensionInput.addEventListener('input', (e) => setDimensions(e))

generateQRCodeBtn.addEventListener('click', generateQRCode)


// FUNCTIONS //

// Set Dimensions
function setDimensions(e)
{
    dimensionNumbers.forEach((dimensionNumber) =>
    {
        dimensionNumber.textContent = dimensionInput.valueAsNumber


        if (dimensionInput.valueAsNumber > 350)
        {
            limitDimensions()
        }
    })

    setTimeout(() =>
    {
        updateQRCodeContainerDimensions()
    }, 2000)
}

// Limit Dimensions
function limitDimensions()
{
    dimensionNumbers.forEach((dimensionNumber) =>
    {
        dimensionNumber.textContent = 350
    })

    dimensionInput.valueAsNumber = 350
}

// Update QR Code Container Dimensions
function updateQRCodeContainerDimensions()
{
    qrCodeContainer.style.height = `${dimensionInput.valueAsNumber}px`
    qrCodeContainer.style.width = `${dimensionInput.valueAsNumber}px`
}

// Generate QR Code
async function generateQRCode()
{
    // http://api.qrserver.com/v1/create-qr-code/?data=facebook.com/vschweitz&amp;size=100x100
    const data = await fetch(`${API_URL}${urlInput}&size${dimensionInput.valueAsNumber}x${dimensionInput.valueAsNumber}`)
    showData(data)
}

function showData(data)
{
    qrCodeContainer.innerHTML = `
      <img src="${data}" type="image/*">
    `
}