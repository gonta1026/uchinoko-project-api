import { MigrationInterface, QueryRunner } from "typeorm";

export class addPost1607827575237 implements MigrationInterface {
    name = "addPost1607827575237";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "CREATE TABLE `post` (`id` int NOT NULL AUTO_INCREMENT, `imagePath` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `isPublished` tinyint NOT NULL, `userId` int NOT NULL, `petId` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
        );
        await queryRunner.query(
            "ALTER TABLE `pet` CHANGE `birthday` `birthday` datetime NULL DEFAULT NULL"
        );
        await queryRunner.query(
            "ALTER TABLE `pet` CHANGE `pickupDate` `pickupDate` datetime NULL DEFAULT NULL"
        );
        await queryRunner.query(
            "ALTER TABLE `post` ADD CONSTRAINT `FK_5c1cf55c308037b5aca1038a131` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
        );
        await queryRunner.query(
            "ALTER TABLE `post` ADD CONSTRAINT `FK_e9ef19c423550d1fb5d19916846` FOREIGN KEY (`petId`) REFERENCES `pet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `post` DROP FOREIGN KEY `FK_e9ef19c423550d1fb5d19916846`"
        );
        await queryRunner.query(
            "ALTER TABLE `post` DROP FOREIGN KEY `FK_5c1cf55c308037b5aca1038a131`"
        );
        await queryRunner.query(
            "ALTER TABLE `pet` CHANGE `pickupDate` `pickupDate` datetime NULL"
        );
        await queryRunner.query(
            "ALTER TABLE `pet` CHANGE `birthday` `birthday` datetime NULL"
        );
        await queryRunner.query("DROP TABLE `post`");
    }
}
