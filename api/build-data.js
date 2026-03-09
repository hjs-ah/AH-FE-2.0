const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function fetchArticles() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_ARTICLES_DB,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published'
        }
      },
      sorts: [
        {
          property: 'Order',
          direction: 'ascending'
        }
      ]
    });

    return response.results.map(page => ({
      title: page.properties.Title?.title[0]?.plain_text || '',
      url: page.properties.URL?.url || '',
      description: page.properties.Description?.rich_text[0]?.plain_text || '',
      publishedDate: page.properties.Published?.date?.start || '',
    }));
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

async function fetchCreations() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_CREATIONS_DB,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published'
        }
      },
      sorts: [
        {
          property: 'Order',
          direction: 'ascending'
        }
      ]
    });

    return response.results.map(page => ({
      name: page.properties.Name?.title[0]?.plain_text || '',
      imageUrl: page.properties['Image URL']?.url || '',
    }));
  } catch (error) {
    console.error('Error fetching creations:', error);
    return [];
  }
}

async function fetchBooks() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_BOOKS_DB,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published'
        }
      },
      sorts: [
        {
          property: 'Order',
          direction: 'ascending'
        }
      ]
    });

    return response.results.map(page => ({
      title: page.properties.Title?.title[0]?.plain_text || '',
      author: page.properties.Author?.rich_text[0]?.plain_text || '',
      coverImageUrl: page.properties['Cover Image URL']?.url || '',
      amazonLink: page.properties['Amazon Link']?.url || '',
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}

async function fetchSettings() {
  try {
    const response = await notion.pages.retrieve({
      page_id: process.env.NOTION_SETTINGS_ID,
    });

    return {
      profileImageUrl: response.properties['Profile Image URL']?.url || '',
      linkedinUrl: response.properties['LinkedIn URL']?.url || '',
      behanceUrl: response.properties['Behance URL']?.url || '',
      mediumUrl: response.properties['Medium URL']?.url || '',
      email: response.properties['Email']?.email || '',
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {};
  }
}

async function buildData() {
  console.log('🔄 Fetching data from Notion...');

  const [articles, creations, books, settings] = await Promise.all([
    fetchArticles(),
    fetchCreations(),
    fetchBooks(),
    fetchSettings(),
  ]);

  const data = {
    articles,
    creations,
    books,
    settings,
    lastUpdated: new Date().toISOString(),
  };

  // Write to JSON file
  const dataPath = path.join(__dirname, '..', 'data.json');
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  console.log('✅ Data fetched and saved to data.json');
  console.log(`   - ${articles.length} articles`);
  console.log(`   - ${creations.length} creations`);
  console.log(`   - ${books.length} books`);
  console.log(`   - Settings updated`);
}

// Run the build
buildData().catch(console.error);
