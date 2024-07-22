import { formatDistanceToNow } from 'date-fns';

// Function to convert timestampz to relative time
const timeAgo = (timestampz) => {
  const date = new Date(timestampz);
  return formatDistanceToNow(date, { addSuffix: true });
};

export default timeAgo;
