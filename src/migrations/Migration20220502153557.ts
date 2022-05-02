import { Migration } from '@mikro-orm/migrations';

export class Migration20220502153557 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "verse_content" ("id" serial primary key);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "verse_content" cascade;');
  }

}
