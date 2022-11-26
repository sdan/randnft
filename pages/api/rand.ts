import { Alchemy, Network } from "alchemy-sdk";

export const config = {
  api: {
      responseLimit: false,
  },
}

const alchemyConfig = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
  const alchemy = new Alchemy(alchemyConfig);


export default async function handler(req: any, res: any) {


  // Contract address
   const addressPool = ['0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D','0x059edd72cd353df5106d2b9cc5ab83a52287ac3a','0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270','0xd10e3dee203579fcee90ed7d0bdd8086f7e53beb','0x28f2d3805652fb5d359486dffb7d08320d403240','0xbdde08bd57e5c9fd563ee7ac61618cb2ecdc0ce0','0x13aae6f9599880edbb7d144bb13f1212cee99533','0x0a1bbd57033f57e7b6743621b79fcb9eb2ce3676','0xa319c382a702682129fcbf55d514e61a16f97f9c','0x62e37f664b5945629b6549a87f8e10ed0b6d923b']

  // Pick random contract from pool
  const randomContract = addressPool[Math.floor(Math.random() * addressPool.length)];


  // Flag to omit metadata
  const omitMetadata = false;

  // Get all NFTs
  const response = await alchemy.nft.getNftsForContract(randomContract, {
    pageSize: 50,
    omitMetadata: omitMetadata,
  });

  // Generate random number between 0 and 9
  const rand = Math.floor(Math.random() * 10);

    //Return with image object
    const imgdata = response.nfts[rand].media[0]["raw"];

    console.log('imgdata',imgdata);


// detect what file type url is
if(imgdata.includes("ipfs://")){
  const ipfsUrl = imgdata.replace("ipfs://", "https://ipfs.io/ipfs/");
  const ipfsdata = await fetch(ipfsUrl);
  const arrayBuffer = await ipfsdata.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");
  res.writeHead(200, {'Content-Type': 'image/png'})
  res.end(base64, 'Base64');
} else {
  const imageData = await fetch(imgdata);
  // console.log('imageData',imageData);


    const arrayBuffer = await imageData.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");

    // console.log('base64',base64);

    // Return image object
    res.writeHead(200, {'Content-Type': 'image/png'})
    res.end(base64, 'Base64');
}

    }

