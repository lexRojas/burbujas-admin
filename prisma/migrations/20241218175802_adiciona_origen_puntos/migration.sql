-- AlterTable
ALTER TABLE `Cliente` MODIFY `direccion` VARCHAR(191) NULL,
    MODIFY `correo` VARCHAR(191) NULL,
    MODIFY `telefono` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ComprasCliente` ADD COLUMN `origen_puntos` VARCHAR(191) NULL;
