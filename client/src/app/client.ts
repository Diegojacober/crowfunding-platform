import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;
const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

if (!clientId) {
  throw new Error("No client ID provided");
}
if (!secretKey) {
  throw new Error("No Secret key provided");
}

export const client = createThirdwebClient({
  secretKey: secretKey,
});
