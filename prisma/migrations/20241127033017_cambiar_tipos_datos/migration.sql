/*
  Warnings:

  - You are about to alter the column `fecha` on the `ComprasCliente` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `fecha` on the `PuntosUsadosCliente` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `ComprasCliente` MODIFY `fecha` DATETIME(3) NOT NULL,
    MODIFY `montoCompra` DECIMAL(65, 30) NOT NULL,
    MODIFY `puntos` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `PuntosUsadosCliente` MODIFY `fecha` DATETIME(3) NOT NULL,
    MODIFY `montoCompra` DECIMAL(65, 30) NOT NULL,
    MODIFY `puntosUsados` DECIMAL(65, 30) NOT NULL;
