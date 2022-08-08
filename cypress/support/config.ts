export const config = {
  sampleBaseDir: '/path/to/sample/folder', // should not have ending /, don't forget to \\ on windows
};

export const runId = new Date().getTime().toString().slice(5, -3);
