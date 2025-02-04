const apiKey = '4d77697374fe4da882a0244ec02be33e';  // Your API key
const apiUrl = 'https://newsapi.org/v2/everything?q=apple&from=2025-02-03&to=2025-02-03&sortBy=popularity&apiKey=' + apiKey;

async function fetchNews(query = 'apple') {
    const url = `https://newsapi.org/v2/everything?q=${query}&from=2025-02-03&to=2025-02-03&sortBy=popularity&apiKey=${apiKey}`;
    const loadingIndicator = document.getElementById('loading');
    const newsContainer = document.getElementById('news-container');
    
    // Show loading while fetching data
    loadingIndicator.style.display = 'block';
    newsContainer.innerHTML = '';  // Clear previous news
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Hide loading indicator after fetching
        loadingIndicator.style.display = 'none';
        
        if (data.status === 'ok' && data.articles.length > 0) {
            displayNews(data.articles);
        } else {
            newsContainer.innerHTML = '<p>No articles found. Try a different search term.</p>';
        }
    } catch (error) {
        loadingIndicator.style.display = 'none';
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>There was an error fetching the news. Please try again later.</p>';
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('news-article');
        
        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        
        newsContainer.appendChild(articleElement);
    });
}

function searchNews() {
    const query = document.getElementById('query').value;
    if (query) {
        fetchNews(query);
    } else {
        fetchNews('apple');  // Default query if no search term is entered
    }
}

// Initial load with default "apple" query
fetchNews();
