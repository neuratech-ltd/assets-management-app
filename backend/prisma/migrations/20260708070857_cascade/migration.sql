-- DropForeignKey
ALTER TABLE "AssetAssignment" DROP CONSTRAINT "AssetAssignment_assetId_fkey";

-- AddForeignKey
ALTER TABLE "AssetAssignment" ADD CONSTRAINT "AssetAssignment_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;
