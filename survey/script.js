/**
 * ============================================
 * SONDAGE FARINE FUFU - SCRIPT
 * ============================================
 */

// Configuration
const CONFIG = {
    whatsappNumber: '243970709671',
    formId: 'surveyForm',
    successMsgId: 'successMsg'
};

/**
 * Toggle the family members question visibility
 * @param {boolean} show - Whether to show or hide the question
 */
function toggleFamille(show) {
    const element = document.getElementById('qMembres');
    if (element) {
        element.classList.toggle('hidden', !show);
    }
}

/**
 * Toggle the difficulty details question visibility
 * @param {boolean} show - Whether to show or hide the question
 */
function toggleDifficulte(show) {
    const element = document.getElementById('qDifficulte');
    if (element) {
        element.classList.toggle('hidden', !show);
    }
}

/**
 * Format form data into WhatsApp message
 * @param {Object} data - Form data object
 * @returns {string} Formatted message for WhatsApp
 */
function formatMessage(data) {
    let message = '*Nouvelle réponse Sondage Farine Fufu*%0A%0A';

    message += '*1. Famille nombreuse :* ' + (data.famille || 'Non répondu') + '%0A';
    if (data.famille === 'oui') {
        message += '   Membres : ' + (data.membres || '0') + '%0A';
    }

    message += '*2. Fréquence d\'achat/mois :* ' + (data.frequence || '0') + '%0A';
    message += '*3. Transport difficile :* ' + (data.transport || 'Non répondu') + '%0A';
    message += '*4. Livraison utile :* ' + (data.livraison_utile || 'Non répondu') + '%0A';
    message += '*5. Confiance livraison :* ' + (data.confiance || 'Non répondu') + '%0A';
    message += '*6. Type de farine :* ' + (data.type_farine || 'Non répondu') + '%0A';
    message += '*7. Marque farine blanche :* ' + (data.marque || 'Non répondu') + '%0A';
    message += '*8. Montant livraison accepté :* ' + (data.prix_livraison || '0') + ' FC%0A';
    message += '*9. Lieu d\'achat :* ' + (data.lieu_achat || 'Non répondu') + '%0A';
    message += '*10. Plus important :* ' + (data.important || 'Non répondu') + '%0A';
    message += '*11. Difficulté à trouver :* ' + (data.difficulte || 'Non répondu') + '%0A';
    if (data.difficulte === 'oui') {
        message += '   Détail : ' + (data.difficulte_detail || 'Rien') + '%0A';
    }
    message += '*12. Tester nouvelle marque :* ' + (data.tester || 'Non répondu') + '%0A';

    return message;
}

/**
 * Validate if form has required fields filled
 * @param {Object} data - Form data object
 * @returns {Object} Validation result with isValid and errors
 */
function validateForm(data) {
    const errors = [];

    // Check required fields
    const requiredFields = ['famille', 'frequence', 'transport', 'livraison_utile', 'confiance', 'type_farine', 'lieu_achat', 'important', 'difficulte', 'tester'];

    requiredFields.forEach(field => {
        if (!data[field]) {
            errors.push(`Le champ "${field}" est requis`);
        }
    });

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

/**
 * Send survey data to WhatsApp
 * @param {Event} e - Form submit event
 */
function handleFormSubmit(e) {
    e.preventDefault();

    const form = document.getElementById(CONFIG.formId);
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Validate form
    const validation = validateForm(data);
    if (!validation.isValid) {
        alert('Veuillez remplir tous les champs requis:\n' + validation.errors.join('\n'));
        return;
    }

    // Format and encode message
    const message = formatMessage(data);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    // Show success message
    form.style.display = 'none';
    const successMsg = document.getElementById(CONFIG.successMsgId);
    if (successMsg) {
        successMsg.classList.add('show');
    }

    // Optional: Log submission for analytics
    console.log('Survey submitted:', data);
}

/**
 * Initialize the survey form
 */
function initSurvey() {
    const form = document.getElementById(CONFIG.formId);
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        console.log('Survey form initialized successfully');
    } else {
        console.error('Survey form not found');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSurvey);
} else {
    initSurvey();
}