export const { args: [version] } = Deno;
export const packageDefaults = {
    version,
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/gorda0/dandavm.git",
    },
    bugs: {
      url: "https://github.com/gorda0/dandavm/issues",
    },
}