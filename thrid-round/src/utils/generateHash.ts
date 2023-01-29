const HASH_LENGTH = 8;

export const generateHash = (text: string): string => {
  const buffer = Buffer.from(text);
  const nums: number[] = [];

  buffer.forEach((value, i) => {
    nums[i % HASH_LENGTH] = (nums[i % HASH_LENGTH] || 0) + value;
  });

  const hashBuffer = Buffer.from(nums.map(
    (value) => value % 256
  ));

  return hashBuffer.toString('hex');
};
