export default (f, ...args) => (...moreArgs) => f(...args, ...moreArgs)
