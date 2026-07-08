// Mirrors prisma/schema.prisma — keep these in sync when the schema changes

export interface User {
  id: number
  email: string
  fullName: string
  designation: string
  joiningDate: Date | null
  employeeId: string
  password?: string
  createdAt: string
  updatedAt: string
  assetAssignments?: AssetAssignment[]
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
  assets?: Asset[]
}

export interface Asset {
  id: number
  name: string
  description?: string | null
  type?: string | null
  price?: number | null
  quantity?: number | null
  purchaseDate?: Date | null
  modelNumber?: string | null
  specifications?: string | null
  imageUrl?: string | null
  categoryId: number
  vendorId: number
  createdAt: string
  updatedAt: string

  vendor?: Vendor
  category?: AssetCategory
  assignments?: AssetAssignment[]
}

export interface AssetAssignment {
  id: number
  assetId: number
  userId: number
  assignedAt: string
  returnedAt?: string | null
  createdAt: string
  updatedAt: string

  asset?: Asset
  user?: User
}

export interface AssetInput extends Omit<
  Asset,
  'id' | 'createdAt' | 'updatedAt' | 'vendor' | 'category' | 'assignments'
> {
  assignedUserIds?: number[]
}
