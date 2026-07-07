import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const usersData = [
  {
    email: "admin@neuratechltd.com",
    password: "Password@123",
    fullName: "Neuratech Admin",
    designation: "Administrator",
    joiningDate: new Date("2021-01-15"),
    employeeId: "EMP-1001",
  },
];

const categoriesData = [
  { name: "Laptop", description: "Portable computers for employees" },
  { name: "Desktop", description: "Workstation systems for office use" },
  { name: "Monitor", description: "Display units and screens" },
  { name: "Printer", description: "Printing and scanning devices" },
  { name: "Networking", description: "Routers, switches, and network gear" },
  { name: "Mobile", description: "Smartphones and tablets" },
  { name: "Audio", description: "Headsets, speakers, and microphones" },
  { name: "Storage", description: "External drives and storage devices" },
  { name: "Accessories", description: "Mice, keyboards, docks, and adapters" },
  {
    name: "Security",
    description: "CCTV, access control, and security hardware",
  },
];

const vendorsData = [
  { name: "TechNova Supplies", contactInfo: "contact@technova.com" },
  { name: "PrimeIT Distributors", contactInfo: "sales@primeit.com" },
  { name: "NextGen Hardware", contactInfo: "hello@nextgenhw.com" },
  { name: "OfficeGear Hub", contactInfo: "support@officegearhub.com" },
  { name: "City Electronics", contactInfo: "orders@cityelectronics.com" },
  { name: "Reliable Devices Ltd", contactInfo: "info@reliabledevices.com" },
  { name: "Enterprise Systems Co", contactInfo: "enterprise@sysco.com" },
  { name: "BlueWire Networks", contactInfo: "service@bluewire.net" },
  { name: "SecureTech Vendors", contactInfo: "connect@securetech.com" },
  { name: "Digital Depot", contactInfo: "team@digitaldepot.com" },
];

function buildAssetsData(
  userIds: number[],
  categoryIds: number[],
  vendorIds: number[],
) {
  return Array.from({ length: 10 }, (_, index) => {
    const i = index + 1;
    return {
      name: `Asset-${i.toString().padStart(3, "0")}`,
      description: `Sample asset record number ${i}`,
      type: i % 2 === 0 ? "Hardware" : "Peripheral",
      price: 500 + i * 125,
      purchaseDate: new Date(
        `2025-${String((i % 12) + 1).padStart(2, "0")}-10`,
      ),
      modelNumber: `MDL-${2000 + i}`,
      specifications: `Config level ${i}, warranty 2 years`,
      imageUrl: `https://example.com/assets/asset-${i}.png`,
      assignedToId: userIds[index % userIds.length],
      categoryId: categoryIds[index % categoryIds.length],
      vendorId: vendorIds[index % vendorIds.length],
    };
  });
}

async function main() {
  console.log("Starting seed...");

  // Delete child records first to satisfy foreign key constraints.
  await prisma.asset.deleteMany();
  await prisma.user.deleteMany();
  await prisma.assetCategory.deleteMany();
  await prisma.vendor.deleteMany();

  const hashedUsersData = await Promise.all(
    usersData.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    })),
  );

  await prisma.user.createMany({ data: hashedUsersData });
  await prisma.assetCategory.createMany({ data: categoriesData });
  await prisma.vendor.createMany({ data: vendorsData });

  const users = await prisma.user.findMany({
    select: { id: true },
    orderBy: { id: "asc" },
  });
  const categories = await prisma.assetCategory.findMany({
    select: { id: true },
    orderBy: { id: "asc" },
  });
  const vendors = await prisma.vendor.findMany({
    select: { id: true },
    orderBy: { id: "asc" },
  });

  const assetsData = buildAssetsData(
    users.map((u) => u.id),
    categories.map((c) => c.id),
    vendors.map((v) => v.id),
  );

  await prisma.asset.createMany({ data: assetsData });

  console.log("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
