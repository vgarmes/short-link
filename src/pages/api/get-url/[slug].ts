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

  return res.redirect(data.url);
};

export default handler;
