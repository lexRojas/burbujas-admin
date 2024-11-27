/*
  Warnings:

  - You are about to alter the column `montoCompra` on the `ComprasCliente` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to alter the column `puntos` on the `ComprasCliente` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to alter the column `montoCompra` on the `PuntosUsadosCliente` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to alter the column `puntosUsados` on the `PuntosUsadosCliente` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.

*/
-- AlterTable
ALTER TABLE `ComprasCliente` MODIFY `montoCompra` INTEGER NOT NULL,
    MODIFY `puntos` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PuntosUsadosCliente` MODIFY `montoCompra` INTEGER NOT NULL,
    MODIFY `puntosUsados` INTEGER NOT NULL;
