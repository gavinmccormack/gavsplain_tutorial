import { Migration } from '@mikro-orm/migrations';

export class Migration20220502161344 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "verse_content" add column "body_content" varchar(255) not null, add column "title" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "verse_content" drop column "body_content";');
    this.addSql('alter table "verse_content" drop column "title";');
  }

}
