import { Alchemy, Network } from "alchemy-sdk";
import { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";

const config = {
    apiKey: "4UCYqRJivQQ9chYdyxgUeTOiHQiRYq8O",
    network: Network.ETH_MAINNET,
  };
  const alchemy = new Alchemy(config);


export default async function handler(req: any, res: any) {


   // Contract address
  const bayc = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";
  const wizards = "0xc23b12eba3af92dc3ec94744c0c260cad0eed0e5";
  const address = "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270";

  // Flag to omit metadata
  const omitMetadata = false;

  // Get all NFTs
  const response = await alchemy.nft.getNftsForContract(wizards, {
    pageSize: 10,
    omitMetadata: omitMetadata,
  });

  // Generate random number between 0 and 9
  const rand = Math.floor(Math.random() * 10);

    //Return with image object
    const imgdata = response.nfts[rand].media[0]["raw"];

    console.log('imgdata',imgdata);


// detect what file type url is

if(imgdata.includes("data:image")){
  // Retrun svg image as base64
  sharp(Buffer.from(imgdata.replace(/^data:image\/\w+;base64,/, ""), 'base64'))
  .png()
  .toBuffer()
  .then(data => {
    res.status(200).json({ img: data.toString('base64') })
  })
  .catch(err => {
    console.log(err);
  });


} else if(imgdata.includes("ipfs://")){
  const ipfsUrl = imgdata.replace("ipfs://", "https://ipfs.io/ipfs/");
  const ipfsdata = await fetch(ipfsUrl);
  const arrayBuffer = await ipfsdata.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");
  res.writeHead(200, {'Content-Type': 'image/png'})
  res.end(base64, 'Base64');
} else {
  const imageData = await fetch(imgdata);
  console.log('imageData',imageData);


    const arrayBuffer = await imageData.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");

    console.log('base64',base64);

    // Return image object
    res.writeHead(200, {'Content-Type': 'image/png'})
    res.end(base64, 'Base64');
}

res.status(500).json({ error: "Something went wrong" });
    }

