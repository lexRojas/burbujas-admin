-- CreateTable
CREATE TABLE `Bonos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,
    `fecha_inicio` DATETIME(3) NOT NULL,
    `fecha_final` DATETIME(3) NOT NULL,
    `bono_puntos` INTEGER NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
