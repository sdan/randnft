import { Alchemy, Network } from "alchemy-sdk";

const config = {
    apiKey: "4UCYqRJivQQ9chYdyxgUeTOiHQiRYq8O",
    network: Network.ETH_MAINNET,
  };
  const alchemy = new Alchemy(config);


export default async function handler(req: any, res: any) {


   // Contract address
  const bayc = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
  const address = "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270";

  // Flag to omit metadata
  const omitMetadata = false;

  // Get all NFTs
  const response = await alchemy.nft.getNftsForContract(address, {
    pageSize: 10,
    omitMetadata: omitMetadata,
  });

  // Generate random number between 0 and 9
  const rand = Math.floor(Math.random() * 10);

    //Return with image object
    const url = response.nfts[rand].media[0]["raw"];
    console.log('url',url);

    // Fetch image and convert to base64
    const image = await fetch(url);
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");

    // Return image object
    res.writeHead(200, {'Content-Type': 'image/png'})
    res.end(base64, 'Base64');

      

    
    
    }

