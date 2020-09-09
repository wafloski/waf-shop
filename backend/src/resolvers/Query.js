const { forwardTo } = require('prisma-binding');

const Query = {
  // this is used for quick and simply get of data
  items: forwardTo('db')

  // async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items();
  //   return items;
  // }
};

module.exports = Query;
