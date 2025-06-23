import matter from 'gray-matter';

const articleFiles = [
  'The-Art-of-Threat-Hunting.md'
];

async function fetchArticles() {
  const articlesData = await Promise.all(
    articleFiles.map(async (filename) => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}readings/${filename}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${filename}: Server responded with ${response.status} ${response.statusText}`);
        }
        const markdown = await response.text();
        const { data, content } = matter(markdown);
        return {
          frontmatter: data,
          content: content,
          slug: filename.replace('.md', ''),
        };
      } catch (error) {
        console.error(`Error fetching or parsing article '${filename}':`, error);
        return null; // Return null for failed articles
      }
    })
  );
  // Filter out any articles that failed to load
  return articlesData.filter(article => article !== null);
}

export const articlesPromise = fetchArticles(); 