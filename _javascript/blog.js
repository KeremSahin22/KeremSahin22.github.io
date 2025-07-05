/**
 * Blog pagination functionality
 */

// Function to handle pagination logic
function initializeBlogPagination() {
  // Configuration
  const POSTS_PER_PAGE = 5;
  const MAX_VISIBLE_PAGES = 5;

  // Get all post elements
  const postItems = document.querySelectorAll('.post-item');
  const totalPosts = postItems.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Pagination elements
  const prevButton = document.getElementById('prev-page');
  const nextButton = document.getElementById('next-page');
  const currentPageSpan = document.getElementById('current-page');
  const totalPagesSpan = document.getElementById('total-pages');
  const pageIndexLi = document.querySelector('.page-index');
  const paginationNav = document.getElementById('blog-pagination');
  
  // Check if pagination elements exist
  if (!paginationNav) {
    console.warn('Blog pagination elements not found');
    return;
  }
  
  const paginationUl = paginationNav.querySelector('ul');

  let currentPage = 1;

  // Debug logging
  console.log('Blog pagination initialized - Total posts:', totalPosts, 'Total pages:', totalPages);

  // Hide pagination if there are no posts or only one page
  if (totalPosts === 0 || totalPages <= 1) {
    console.log('Hiding pagination - no posts or only one page');
    paginationNav.style.display = 'none';
    paginationNav.classList.remove('show');
    return;
  }

  // Show pagination when there are multiple pages
  console.log('Showing pagination - multiple pages detected');
  paginationNav.classList.add('show');

  // Initialize pagination
  totalPagesSpan.textContent = totalPages;
  showPage(1);
  updatePaginationButtons();

  /**
   * Show posts for a specific page
   */
  function showPage(page) {
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;

    // Hide all posts
    postItems.forEach((post, index) => {
      if (index >= startIndex && index < endIndex) {
        post.style.display = 'block';
      } else {
        post.style.display = 'none';
      }
    });

    currentPage = page;
    currentPageSpan.textContent = page;
    updatePaginationButtons();

    // Scroll to top of post list
    document.getElementById('post-list').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  /**
   * Update pagination buttons and page numbers
   */
  function updatePaginationButtons() {
    // Update previous button
    if (currentPage === 1) {
      prevButton.classList.add('disabled');
    } else {
      prevButton.classList.remove('disabled');
    }

    // Update next button
    if (currentPage === totalPages) {
      nextButton.classList.add('disabled');
    } else {
      nextButton.classList.remove('disabled');
    }

    // Update page numbers (only on larger screens)
    updatePageNumbers();
  }

  /**
   * Update page number buttons
   */
  function updatePageNumbers() {
    // Check if required elements exist
    if (!paginationUl || !pageIndexLi) return;
    
    // Remove existing page number buttons
    const existingPageNumbers = paginationUl.querySelectorAll('.page-number');
    existingPageNumbers.forEach(el => el.remove());

    // Only show page numbers on larger screens and if there are multiple pages
    if (totalPages <= 1) return;

    // Calculate which page numbers to show
    let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
    let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
      startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
    }

    // Add ellipsis at the beginning if needed
    if (startPage > 1) {
      addPageButton(1);
      if (startPage > 2) {
        addEllipsis();
      }
    }

    // Add page number buttons
    for (let i = startPage; i <= endPage; i++) {
      addPageButton(i);
    }

    // Add ellipsis at the end if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        addEllipsis();
      }
      addPageButton(totalPages);
    }
  }

  /**
   * Add a page number button
   */
  function addPageButton(pageNum) {
    const li = document.createElement('li');
    li.className = 'page-item page-number';
    if (pageNum === currentPage) {
      li.classList.add('active');
    }

    const a = document.createElement('a');
    a.className = 'page-link';
    a.href = '#';
    a.textContent = pageNum;
    a.addEventListener('click', function(e) {
      e.preventDefault();
      showPage(pageNum);
    });

    li.appendChild(a);

    // Insert before the page-index element
    paginationUl.insertBefore(li, pageIndexLi);
  }

  /**
   * Add ellipsis
   */
  function addEllipsis() {
    const li = document.createElement('li');
    li.className = 'page-item disabled page-number';
    const span = document.createElement('span');
    span.className = 'page-link';
    span.textContent = '...';
    li.appendChild(span);

    // Insert before the page-index element
    paginationUl.insertBefore(li, pageIndexLi);
  }

  // Event listeners
  if (prevButton) {
    prevButton.addEventListener('click', function(e) {
      e.preventDefault();
      if (currentPage > 1) {
        showPage(currentPage - 1);
      }
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', function(e) {
      e.preventDefault();
      if (currentPage < totalPages) {
        showPage(currentPage + 1);
      }
    });
  }
}

// Initialize pagination when DOM is ready
document.addEventListener('DOMContentLoaded', initializeBlogPagination);

// Fallback for cases where DOMContentLoaded might not fire
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeBlogPagination);
} else {
  initializeBlogPagination();
}
