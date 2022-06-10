import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../server/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query['slug'];

  if (!slug || typeof slug !== 'string') {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: 'slug is required' }));
    return;
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: 'slug not found' }));
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Vercel caching headers (https://vercel.com/docs/concepts/edge-network/caching)
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  return res.json(data);
};

export default handler;
