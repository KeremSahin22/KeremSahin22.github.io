/**
 * Publications page functionality
 */

// Function to initialize publications page features
function initializePublications() {
  console.log('Publications page initialized');
  
  // Get all publication items
  const publicationItems = document.querySelectorAll('.publication-item');
  
  if (publicationItems.length === 0) {
    console.log('No publication items found');
    return;
  }
  
  console.log(`Found ${publicationItems.length} publications`);
  
  // Add any additional interactive features here
  // For example: search, filter by year, etc.
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePublications);
} else {
  initializePublications();
}
