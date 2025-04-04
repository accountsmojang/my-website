// Shop functionality
document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productItem = this.closest('.product-item');
            const product = {
                id: productItem.dataset.id || Date.now(),
                name: productItem.querySelector('h3').textContent,
                price: productItem.querySelector('p').textContent,
                image: productItem.querySelector('img').src
            };
            
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${product.name} added to cart!`);
        });
    });
    
    // Checkout functionality (to be added to shop.html or a separate checkout page)
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Process payment
            processPayment()
                .then(() => {
                    // Send email receipt
                    return sendEmailReceipt();
                })
                .then(() => {
                    // Clear cart
                    localStorage.removeItem('cart');
                    alert('Order placed successfully! Check your email for confirmation.');
                    window.location.href = 'dashboard.html';
                })
                .catch(error => {
                    console.error('Checkout error:', error);
                    alert('There was an error processing your order. Please try again.');
                });
        });
    }
});

// Payment processing function
function processPayment() {
    return new Promise((resolve, reject) => {
        // In a real application, this would connect to a payment gateway
        // For demo purposes, we'll simulate a successful payment after a delay
        
        // Get payment method
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        
        console.log(`Processing ${paymentMethod} payment...`);
        
        setTimeout(() => {
            // Simulate 10% chance of payment failure for demo purposes
            if (Math.random() < 0.9) {
                resolve({
                    success: true,
                    paymentMethod,
                    transactionId: 'txn_' + Math.random().toString(36).substr(2, 9)
                });
            } else {
                reject(new Error('Payment failed. Please try another payment method.'));
            }
        }, 1500);
    });
}

// Email receipt function
function sendEmailReceipt() {
    return new Promise((resolve) => {
        // In a real application, this would connect to an email service
        // For demo purposes, we'll simulate sending an email
        
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        const cart = JSON.parse(localStorage.getItem('cart'));
        
        if (!user || !cart) {
            console.error('No user or cart data found');
            resolve(); // Still resolve to continue checkout flow
            return;
        }
        
        console.log(`Sending receipt to ${user.email}...`);
        
        // Calculate total
        const total = cart.reduce((sum, item) => {
            return sum + parseFloat(item.price.replace('$', ''));
        }, 0);
        
        // In a real app, you would send this data to your backend
        const receiptData = {
            to: user.email,
            subject: 'Your Order Receipt',
            body: `
                <h1>Thank you for your order!</h1>
                <p>Here's your receipt:</p>
                <ul>
                    ${cart.map(item => `<li>${item.name} - ${item.price}</li>`).join('')}
                </ul>
                <p><strong>Total: $${total.toFixed(2)}</strong></p>
                <p>Your order will be processed shortly.</p>
            `
        };
        
        console.log('Receipt email prepared:', receiptData);
        
        // Simulate email sending delay
        setTimeout(() => {
            console.log('Receipt email sent successfully');
            resolve();
        }, 1000);
    });
}