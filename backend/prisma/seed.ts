import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const usersData = [
	{
		email: "alice.johnson@company.com",
		password: "Password@123",
		fullName: "Alice Johnson",
		designation: "IT Manager",
		joiningDate: new Date("2021-01-15"),
		employeeId: "EMP-1001",
	},
	{
		email: "bob.smith@company.com",
		password: "Password@123",
		fullName: "Bob Smith",
		designation: "Software Engineer",
		joiningDate: new Date("2021-04-11"),
		employeeId: "EMP-1002",
	},
	{
		email: "carol.davis@company.com",
		password: "Password@123",
		fullName: "Carol Davis",
		designation: "HR Executive",
		joiningDate: new Date("2020-11-03"),
		employeeId: "EMP-1003",
	},
	{
		email: "daniel.wilson@company.com",
		password: "Password@123",
		fullName: "Daniel Wilson",
		designation: "Network Admin",
		joiningDate: new Date("2019-08-21"),
		employeeId: "EMP-1004",
	},
	{
		email: "emma.miller@company.com",
		password: "Password@123",
		fullName: "Emma Miller",
		designation: "Accountant",
		joiningDate: new Date("2022-02-14"),
		employeeId: "EMP-1005",
	},
	{
		email: "frank.moore@company.com",
		password: "Password@123",
		fullName: "Frank Moore",
		designation: "Procurement Officer",
		joiningDate: new Date("2021-09-05"),
		employeeId: "EMP-1006",
	},
	{
		email: "grace.taylor@company.com",
		password: "Password@123",
		fullName: "Grace Taylor",
		designation: "Operations Lead",
		joiningDate: new Date("2020-06-17"),
		employeeId: "EMP-1007",
	},
	{
		email: "henry.anderson@company.com",
		password: "Password@123",
		fullName: "Henry Anderson",
		designation: "Business Analyst",
		joiningDate: new Date("2023-01-09"),
		employeeId: "EMP-1008",
	},
	{
		email: "isabella.thomas@company.com",
		password: "Password@123",
		fullName: "Isabella Thomas",
		designation: "Support Engineer",
		joiningDate: new Date("2022-07-28"),
		employeeId: "EMP-1009",
	},
	{
		email: "jack.martin@company.com",
		password: "Password@123",
		fullName: "Jack Martin",
		designation: "QA Engineer",
		joiningDate: new Date("2021-12-01"),
		employeeId: "EMP-1010",
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
	{ name: "Security", description: "CCTV, access control, and security hardware" },
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
	vendorIds: number[]
) {
	return Array.from({ length: 10 }, (_, index) => {
		const i = index + 1;
		return {
			name: `Asset-${i.toString().padStart(3, "0")}`,
			description: `Sample asset record number ${i}`,
			type: i % 2 === 0 ? "Hardware" : "Peripheral",
			price: 500 + i * 125,
			purchaseDate: new Date(`2025-${String((i % 12) + 1).padStart(2, "0")}-10`),
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

	await prisma.user.createMany({ data: usersData });
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
		vendors.map((v) => v.id)
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
