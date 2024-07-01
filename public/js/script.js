document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('commentForm');
    const commentText = document.getElementById('commentText');
    const commentName = document.getElementById('name');
    const commentsSection = document.getElementById('commentsSection');

    // Fonction pour récupérer et afficher les commentaires
    function fetchComments() {
        fetch('/get-comments')
            .then(response => response.json())
            .then(data => {
                console.log('datas=',data);
                commentsSection.innerHTML = '';
                data.forEach(element => {
                    console.log(element);
                    const komante = document.createElement('div');
                    komante.classList.add('espas-kom');
                    komante.innerHTML = `
                    
                    <div class="espas-komant">
                        <div class="imaj">
                            <img src="${element.image}" alt="image" width="50" >
                            <p>${element.name}</p>
                        </div>

                    </div>
                    <div class="avis_util">
                        <div class="mesaj">
                            <h2>${element.commentText}</h2>
                        </div>
                    </div>
                    `;
                    
                    commentsSection.appendChild(komante);
                });

                

        })
    }
    
    // data.forEach(comment => {
    //     console.log('get comment', comment);
    //     const com = document.createElement('div');

    //     // commentsSection.innerHTML += `<p>${comment}</p>`;
    //    com.innerHTML = `
    //     { <p><strong>${comment.name}</strong>: ${comment.commentText}</p> }`;
    //     commentsSection.appendChild(com);
    // Écouter la soumission du formulaire
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const comment = {
                    name: document.getElementById('name').value,
                    commentText: document.getElementById('commentText').value
                };

                console.log(' post form: ', comment)
                
        fetch('/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment )
        })
        .then(response => {
            if (response.ok) {
                document.getElementById('name').value = '';
                document.getElementById('commentText').value = '';

                fetchComments();
            }
        });
    });

    // Charger les commentaires au chargement de la page
    fetchComments();
});

