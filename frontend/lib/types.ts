// Mirrors prisma/schema.prisma — keep these in sync when the schema changes

export interface User {
  id: number
  email: string
  fullName: string
  designation: string
  joiningDate: Date | null
  employeeId: string
  password?: string // Optional because we don't want to expose it in API responses
  createdAt: string
  updatedAt: string
}

export interface AssetCategory {
  id: number
  name: string
  description?: string | null
  createdAt: string
  updatedAt: string
}

export interface Vendor {
  id: number
  name: string
  contactInfo?: string | null
  createdAt: string
  updatedAt: string
}

export interface Asset {
  id: number
  name: string
  description?: string | null
  type?: string | null
  price?: number | null
  purchaseDate?: Date | null
  modelNumber?: string | null
  specifications?: string | null
  imageUrl?: string | null
  assignedToId?: number | null
  categoryId: number
  vendorId: number
  createdAt: string
  updatedAt: string
  vendor?: Vendor
  category?: AssetCategory
  assignedTo?: User | null

  // // Populated when the API includes relations (e.g. ?include=vendor,category,assignedTo)
  // vendor?: Vendor
  // category?: AssetCategory
  // assignedTo?: User | null
}
