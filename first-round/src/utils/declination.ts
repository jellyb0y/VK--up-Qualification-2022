export const declination = (value: number, words: [string, string, string]): string => {
  const normalizedValue = Math.abs(value);

	return (
    normalizedValue % 10 == 1 && normalizedValue % 100 != 11
      ? words[0]
      : (
        normalizedValue % 10 >= 2 && normalizedValue % 10 <= 4 && (
          normalizedValue % 100 < 10 || normalizedValue % 100 >= 20
        )
          ? words[1]
          : words[2]
      )
    );
};
