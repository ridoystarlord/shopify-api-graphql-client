import got from 'got';

interface GraphQLResponse<T> {
  data: T;
  errors?: any[];
}

export class ShopifyGraphQLClient {
  private shopName: string;
  private accessToken: string;
  private apiUrl: string;

  constructor(
    shopName: string,
    accessToken: string,
    apiVersion: string = '2023-10',
  ) {
    if (!shopName || !accessToken) {
      throw new Error('Both shopName and accessToken are required');
    }

    // Ensure shopName follows the correct format (e.g., abc.myshopify.com)
    const shopNameRegex = /^[a-zA-Z0-9-]+\.myshopify\.com$/;
    if (!shopNameRegex.test(shopName)) {
      throw new Error(
        'Invalid shopName format. It should be in the format "abc.myshopify.com".',
      );
    }

    this.shopName = shopName;
    this.accessToken = accessToken;
    this.apiUrl = `https://${shopName}/admin/api/${apiVersion}/graphql.json`;
  }

  public async graphql<T>(
    query: string,
    variables?: Record<string, any>,
  ): Promise<GraphQLResponse<T>> {
    if (!query) {
      throw new Error('Query or mutation is required');
    }

    try {
      const response: any = await got.post(this.apiUrl, {
        json: {
          query,
          variables: variables || {},
        },
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': this.accessToken,
        },
        responseType: 'json',
      });

      return response.body;
    } catch (error: any) {
      throw new Error(`GraphQL request failed: ${error.message}`);
    }
  }
}
