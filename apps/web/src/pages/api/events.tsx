import type { NextApiRequest, NextApiResponse } from 'next';
import { EVENTDATA } from 'modules';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(EVENTDATA);
};
