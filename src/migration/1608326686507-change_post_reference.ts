import { MigrationInterface, QueryRunner } from "typeorm";

export class changePostReference1608326686507 implements MigrationInterface {
    name = "changePostReference1608326686507";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `like` DROP FOREIGN KEY `FK_a09edead80f81163914f8402ee1`"
        );
        await queryRunner.query(
            "ALTER TABLE `like` CHANGE `petId` `postId` int NOT NULL"
        );
        await queryRunner.query(
            "ALTER TABLE `pet` CHANGE `birthday` `birthday` datetime NULL DEFAULT NULL"
        );
        await queryRunner.query(
            "ALTER TABLE `pet` CHANGE `pickupDate` `pickupDate` datetime NULL DEFAULT NULL"
        );
        await queryRunner.query(
            "ALTER TABLE `like` ADD CONSTRAINT `FK_3acf7c55c319c4000e8056c1279` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `like` DROP FOREIGN KEY `FK_3acf7c55c319c4000e8056c1279`"
        );
        await queryRunner.query(
            "ALTER TABLE `pet` CHANGE `pickupDate` `pickupDate` datetime NULL"
        );
        await queryRunner.query(
            "ALTER TABLE `pet` CHANGE `birthday` `birthday` datetime NULL"
        );
        await queryRunner.query(
            "ALTER TABLE `like` CHANGE `postId` `petId` int NOT NULL"
        );
        await queryRunner.query(
            "ALTER TABLE `like` ADD CONSTRAINT `FK_a09edead80f81163914f8402ee1` FOREIGN KEY (`petId`) REFERENCES `pet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
        );
    }
}
