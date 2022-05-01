import { Migration } from '@mikro-orm/migrations';

export class Migration20220430203518 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "post" ("id" serial primary key, "created_on" timestamptz(0) not null, "updated_on" timestamptz(0) not null, "title" varchar(255) not null);');
  }

}
