import { Client } from '@notionhq/client';
import { NOTION_API_KEY, NOTION_DATABASE_ID } from '$env/static/private';

// Validate environment variables
if (!NOTION_API_KEY) {
	throw new Error(
		'NOTION_API_KEY is not defined. Please add it to your .env file.\n' +
		'Get your API key from: https://www.notion.so/my-integrations'
	);
}

if (!NOTION_DATABASE_ID) {
	throw new Error(
		'NOTION_DATABASE_ID is not defined. Please add it to your .env file.\n' +
		'Find your database ID in the database URL.'
	);
}

// Initialize Notion client
// $env/static/private provides environment variables loaded from .env files
export const notion = new Client({
	auth: NOTION_API_KEY
});

// Export the database ID for easy access
export { NOTION_DATABASE_ID };
