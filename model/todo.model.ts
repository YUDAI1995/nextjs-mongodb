export class Todo {
  constructor(public id: string, public title: string) {}
}

/**
 * ランダム値
 * @param {number?} myStrong
 * @return {string}
 */
export const getRandomID = (myStrong?: number) => {
  let strong: number;
  myStrong ? (strong = myStrong) : (strong = 1000);
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  );
};
