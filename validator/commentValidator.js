module.exports = function validateComment(content) {
    let errors = [];
  
    // Vérifier que content est défini
    if (!content) {
      errors.push('Le commentaire est requis.');
      return errors; // Retourner immédiatement si content est indéfini
    }
  
    // Vérifier que le commentaire n'est pas vide
    if (content.trim() === '') {
      errors.push('Le commentaire ne peut pas être vide.');
    }
  
    // Vérifier que le commentaire ne dépasse pas 500 caractères
    if (content.length > 500) {
      errors.push('Le commentaire ne peut pas dépasser 500 caractères.');
    }
  
    return errors;
  };
  