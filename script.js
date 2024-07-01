document.addEventListener('DOMContentLoaded', function() {
    const commentList = document.getElementById('comment-list');
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');

    // Charger les commentaires existants depuis le fichier texte (simulé)
    loadComments();

    // Écouter l'événement de soumission du formulaire
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêcher le rechargement de la page

        const commentText = commentInput.value.trim();
        
        if (commentText !== '') {
            // Ajouter le nouveau commentaire à la liste
            addComment(commentText);

            // Réinitialiser le champ de commentaire après soumission
            commentInput.value = '';
        }
    });

    // Fonction pour charger les commentaires depuis le fichier texte (simulé)
    function loadComments() {
        // Ici, vous chargeriez normalement les commentaires depuis un fichier texte
        // Dans cet exemple, nous simulons en ajoutant quelques commentaires par défaut
        const defaultComments = [
            "Premier commentaire.",
            "Deuxième commentaire.",
            "Troisième commentaire.",
            "Quatrième commentaire.",
            "Cinquième commentaire."
        ];

        // Ajouter chaque commentaire à la liste
        defaultComments.forEach(comment => {
            addComment(comment);
        });
    }

    // Fonction pour ajouter un commentaire à la liste
    function addComment(commentText) {
        // Créer un nouvel élément li pour le commentaire
        const newComment = document.createElement('li');
        newComment.textContent = commentText;

        // Ajouter le commentaire au début de la liste
        commentList.prepend(newComment);

        // Limiter le nombre de commentaires affichés à 10
        if (commentList.children.length > 10) {
            commentList.removeChild(commentList.lastElementChild);
        }
    }
});
