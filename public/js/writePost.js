async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const post_text = document.getElementById("post-content").value;
  
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        post_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      document.location.replace("/");//viewpost
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector("#submit").addEventListener("click", newFormHandler);