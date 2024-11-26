-- CreateTable
CREATE TABLE `Cliente` (
    `cedula` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Cliente_cedula_key`(`cedula`),
    PRIMARY KEY (`cedula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ComprasCliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cedula` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `montoCompra` DOUBLE NOT NULL,
    `puntos` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PuntosUsadosCliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cedula` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `montoCompra` DOUBLE NOT NULL,
    `puntosUsados` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NULL,
    `login` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `perfil` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ComprasCliente` ADD CONSTRAINT `ComprasCliente_cedula_fkey` FOREIGN KEY (`cedula`) REFERENCES `Cliente`(`cedula`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PuntosUsadosCliente` ADD CONSTRAINT `PuntosUsadosCliente_cedula_fkey` FOREIGN KEY (`cedula`) REFERENCES `Cliente`(`cedula`) ON DELETE CASCADE ON UPDATE CASCADE;
