import got from 'got';

// Function for generating the Shopify OAuth Install URL
export function generateShopifyAppInstallURL(
  shop: string,
  clientId: string,
  scopes: string,
  redirectUri: string,
): string {
  if (!shop || !clientId || !scopes || !redirectUri) {
    throw new Error('Shop, clientId, scopes, and redirectUri are required');
  }

  const url = `https://${shop}/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;
  return encodeURI(url);
}

// Function for getting the Shopify access token
export async function getShopifyAccessToken(
  code: string,
  shop: string,
  clientId: string,
  clientSecret: string,
): Promise<string> {
  if (!code || !shop || !clientId || !clientSecret) {
    throw new Error('Code, shop, clientId, and clientSecret are required');
  }

  const oAuthURL = `https://${shop}/admin/oauth/access_token`;

  try {
    const response: any = await got.post(oAuthURL, {
      json: {
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      },
      responseType: 'json',
    });

    return response.body.access_token;
  } catch (error: any) {
    throw new Error(`Failed to retrieve access token: ${error.message}`);
  }
}
