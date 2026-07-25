const Product = require("../models/product.model");

const getPaginatedProducts = async ({ limit = 8, page = 1, sort, query }) => {
  limit = parseInt(limit);
  page = parseInt(page);

  const filter = {};

  if (query) {
    filter.category = query;
  }

  let mongooseQuery = Product.find(filter);

  if (sort === "asc") {
    mongooseQuery = mongooseQuery.sort({ price: 1 });
  }

  if (sort === "desc") {
    mongooseQuery = mongooseQuery.sort({ price: -1 });
  }

  const totalProducts = await Product.countDocuments(filter);

  const totalPages = Math.ceil(totalProducts / limit);

  const products = await mongooseQuery
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return {
    products,
    totalPages,
    page,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
    limit,
    sort,
    query,
  };
};

module.exports = {
  getPaginatedProducts,
};
