const reserveBook = async (event) => {
    event.preventDefault();
    const bookId = document.querySelector('#id').value.trim();
    try{

        const response = await fetch('api/books/id'),{
        method: 'PUT',
        body: JSON.stringify({}),
        headers: {'Content-Type': 'application/json'}
        };

    }catch (err) { 
        res.status(500).json(err);
    }
}
 
.addEventListener('submit', loginFormHandler);
  