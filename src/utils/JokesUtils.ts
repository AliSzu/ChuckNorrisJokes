export const prettifyJokesJSON = (jokes: string[]) => {
  const correction = {
    ",": "\n",
    "]": "",
    "[": "",
  };

  const jokesJSON = JSON.stringify(jokes).replaceAll(
    /\[|\]|,/g,
    (matched) => correction[matched as keyof typeof correction]
  );

  return jokesJSON
};
