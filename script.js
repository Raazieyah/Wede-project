//functionality for lightbox

document.querySelectorAll(".thumb").forEach(img =>{
    img.addEventListener("click", () => {
        document.getElementById("lightbox-img").src = img.src;
        document.getElementById("lightbox").classList.add("show");

    });
});

document.getElementById("lightbox").onclick = () =>{
    document.getElementById("lightbox").classList.remove("show");
};
        

//Tabss element imlemented
document.querySelectorAll(".tab-btn").forEach(btn =>{
    btn.addEventListener("click", () => {

        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active-tab"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

        btn.classList.add("active-tab");

        document.getElementById("btn.dataset.tab").classList.add("active");

    });
});


//modals implemented
const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");

openModal.addEventListener("click", () =>{
    modal.style.display = "flex";
});

closeModal.addEventListener("click", () =>{
    modal.style.display = "none";
});

window.addEventListener("click", e =>{
    if(e.target === modal){
        modal.style.display = "none";
    }
    
});


//Search function for products implemented

const searchBox = document.getElementById("searchBox");

if (searchBox) {
    searchBox.addEventListener("input", () => {
        const keyword = searchBox.value.toLowerCase();

        document.querySelectorAll(".product-section").forEach(section => {
            const name = section.dataset.name.toLowerCase();
            const desc = section.dataset.description.toLowerCase();

            if (name.includes(keyword) || desc.includes(keyword)) {
                section.style.display = "block";
            } else {
                section.style.display = "none";
            }
        });
    });
}

//interactive map(contact page)
const myLocation = [-26.2041, 28.0473];  


if (document.getElementById("map")) {
    // Creating the map
    var map = L.map('map').setView(myLocation, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
    }).addTo(map);

    var marker = L.marker(myLocation).addTo(map);

    marker.bindPopup("<b>Natural Beauty HQ</b><br>Johannesburg, South Africa").openPopup();
}


//validation for contact form(conact page) and enquiry form(enquiry page)
document.addEventListener('DOMContentLoaded', () => {

    //for contact form:
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const errors = [];
            const name = document.getElementById('conName').value.trim();
            const email = document.getElementById('conEmail').value.trim();
            const phone = document.getElementById('conPhone').value.trim();
            const type = document.getElementById('conType').value;
            const message = document.getElementById('conMessage').value.trim();

            if (name.length < 3) errors.push("Full Name must be at least 3 characters.");
            if (!email.includes('@')) errors.push("Please enter a valid email.");
            if (phone && !/^\d{10}$/.test(phone)) errors.push("Phone number must be 10 digits.");
            if (!type) errors.push("Please select a message type.");
            if (message.length < 10) errors.push("Message must be at least 10 characters.");

            const errorDiv = document.getElementById('errorMessages');
            const successDiv = document.getElementById('successMessage');

            if (errors.length > 0) {
                errorDiv.innerHTML = errors.join('<br>');
                successDiv.innerHTML = '';
            } else {
                errorDiv.innerHTML = '';
                
                // AJAX 
                const formData = new FormData();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('phone', phone);
                formData.append('type', type);
                formData.append('message', message);

                fetch('submit.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.text())
                .then(data => {
                    successDiv.innerHTML = "Your message has been sent successfully!";
                    contactForm.reset();
                })
                .catch(err => {
                    errorDiv.innerHTML = "Error sending your message. Please try again.";
                });
            }
        });
    }

    //for enquiry form
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        const enqType = document.getElementById('enqType');
        const productArea = document.getElementById('productArea');

        
        enqType.addEventListener('change', () => {
            if (enqType.value === 'product') {
                productArea.classList.remove('hidden');
            } else {
                productArea.classList.add('hidden');
            }
        });

        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const errors = [];
            const name = document.getElementById('enqName').value.trim();
            const email = document.getElementById('enqEmail').value.trim();
            const type = enqType.value;
            const product = document.getElementById('enqProduct').value;
            const qty = document.getElementById('enqQty').value;
            const message = document.getElementById('enqMessage').value.trim();

            if (name.length < 3) errors.push("Full Name must be at least 3 characters.");
            if (!email.includes('@')) errors.push("Enter a valid email.");
            if (!type) errors.push("Please select an enquiry type.");
            if (type === 'product' && !product) errors.push("Please select a product.");
            if (type === 'product' && qty < 1) errors.push("Quantity must be at least 1.");
            if (message.length < 10) errors.push("Message must be at least 10 characters.");

            const errorDiv = document.getElementById('enquiryErrors');
            const resultDiv = document.getElementById('enquiryResult');

            if (errors.length > 0) {
                errorDiv.innerHTML = errors.join('<br>');
                resultDiv.classList.add('hidden');
            } else {
                errorDiv.innerHTML = '';
                resultDiv.classList.remove('hidden');
                resultDiv.innerHTML = "Sending your enquiry...";

                // AJAX 
                const formData = new FormData();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('type', type);
                formData.append('product', product);
                formData.append('qty', qty);
                formData.append('message', message);

                fetch('submit_enquiry.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.text())
                .then(data => {
                    resultDiv.innerHTML = "Your enquiry has been submitted successfully!";
                    enquiryForm.reset();
                    productArea.classList.add('hidden');
                })
                .catch(err => {
                    resultDiv.innerHTML = "Error submitting your enquiry. Please try again.";
                });
            }
        });
    }
});
