# Shopify Api GraphQL Client

A lightweight and easy-to-use Node.js client for interacting with Shopify’s GraphQL API. This client allows developers to send GraphQL queries and mutations to Shopify and includes utility functions for OAuth token generation.

## Installation

```bash
  npm install shopify-api-graphql-client
```

or

```bash
  yarn add shopify-api-graphql-client
```

## API

A class for making requests to Shopify’s GraphQL API.

**Constructor**

```javascript
new ShopifyGraphQLClient(shopName: string, accessToken: string, apiVersion?: string);
```

| Parameter     | Type     | Description                                                            |
| :------------ | :------- | :--------------------------------------------------------------------- |
| `shopName`    | `string` | **Required**. The Shopify store domain in the format abc.myshopify.com |
| `accessToken` | `string` | **Required**. The access token obtained from Shopify OAuth.            |
| `apiVersion`  | `string` | **optional**. The API version to use. Defaults to '2024-10'            |

## Usage

```javascript
import { ShopifyGraphQLClient } from 'shopify-api-graphql-client';

const client = new ShopifyGraphQLClient(
  'abc.myshopify.com',
  'your-access-token',
);
const query = `
    {
      shop {
        name
      }
    }
  `;

try {
  const data = await client.graphql(query);
  console.log('Shop data:', data);
} catch (error) {
  console.error('Error fetching shop data:', error.message);
}
```

## Utility Functions

If you want to generate the app installation url for a shop

```javascript
import { generateShopifyAppInstallURL } from 'shopify-api-graphql-client';

const installUrl = generateShopifyAppInstallURL(
  'abc.myshopify.com', // Shop domain in the format abc.myshopify.com
  process.env.CLIENT_ID!,
  process.env.SCOPES!,
  process.env.SHOPIFY_REDIRECT_URL!
);
console.log('Install URL:', installUrl);
```

If you want to get the access token for a shop using the code which is return after apps installation

```javascript
import { getShopifyAccessToken } from 'shopify-api-graphql-client';


  try {
    const accessToken = await getShopifyAccessToken(
      code,
      shop,
      process.env.CLIENT_ID!,
      process.env.CLIENT_SECRET!
    );
    console.log('Access Token:', accessToken);
  } catch (error) {
    console.error('Error fetching access token:', error.message);
  }

```

## Contributing

Contributions are always welcome! Please fork this repository and submit a pull request.

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License. See the LICENSE file for details.
