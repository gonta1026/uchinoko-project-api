import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAttractiveFeatureToPets1612648263549
    implements MigrationInterface {
    name = "AddAttractiveFeatureToPets1612648263549";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `pet` ADD `attractiveFeature` varchar(255) NOT NULL"
        );
        await queryRunner.query(
            "ALTER TABLE `pet` CHANGE `birthday` `birthday` datetime NULL DEFAULT NULL"
        );
        await queryRunner.query(
            "ALTER TABLE `pet` CHANGE `pickupDate` `pickupDate` datetime NULL DEFAULT NULL"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `pet` CHANGE `pickupDate` `pickupDate` datetime NULL"
        );
        await queryRunner.query(
            "ALTER TABLE `pet` CHANGE `birthday` `birthday` datetime NULL"
        );
        await queryRunner.query(
            "ALTER TABLE `pet` DROP COLUMN `attractiveFeature`"
        );
    }
}
