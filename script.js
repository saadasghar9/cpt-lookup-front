document.getElementById('codeForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const code = document.getElementById('codeInput').value.trim();
    const resultDiv = document.getElementById('result');

    if (!code) {
        resultDiv.innerText = 'Please enter a code';
        resultDiv.classList.remove('error'); 
        return;
    }

    resultDiv.innerText = 'Loading...'; 
    resultDiv.classList.remove('error'); 

    try {
        const response = await fetch('https://devbilnow.pythonanywhere.com/api/lookup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        resultDiv.innerText = data.description;
    } catch (error) {
        resultDiv.innerText = 'Error fetching description. Please try again.';
        resultDiv.classList.add('error'); 
        console.error('Error:', error);
    }
});


document.getElementById('codeInput').addEventListener('input', function() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = '';
    resultDiv.classList.remove('error');
});