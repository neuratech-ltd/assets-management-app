export const endpoints = {
  getAssets: '/assets',
  createAsset: '/assets',
  getAssetById: (id: number) => `/assets/${id}`,
  updateAsset: (id: number) => `/assets/${id}`,
  deleteAsset: (id: number) => `/assets/${id}`,

  getCategories: '/categories',
  createCategory: '/categories',
  updateCategory: (id: string) => `/categories/${id}`,
  deleteCategory: (id: string) => `/categories/${id}`,

  getUsers: '/users',
  createUser: '/users',
  updateUser: (id: string) => `/users/${id}`,
  deleteUser: (id: string) => `/users/${id}`,

  getVendors: '/vendors',
  createVendor: '/vendors',
  updateVendor: (id: string) => `/vendors/${id}`,
  deleteVendor: (id: string) => `/vendors/${id}`,
}
