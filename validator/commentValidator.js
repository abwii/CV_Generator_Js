module.exports = function validateComment(comment) {
    let errors = [];
  
    // Vérifier que comment est défini
    if (!comment) {
      errors.push('Le commentaire est requis.');
      return errors; // Retourner immédiatement si comment est indéfini
    }
  
    // Vérifier que le commentaire n'est pas vide
    if (comment.trim() === '') {
      errors.push('Le commentaire ne peut pas être vide.');
    }
  
    // Vérifier que le commentaire ne dépasse pas 500 caractères
    if (comment.length > 500) {
      errors.push('Le commentaire ne peut pas dépasser 500 caractères.');
    }
  
    return errors;
  };
  