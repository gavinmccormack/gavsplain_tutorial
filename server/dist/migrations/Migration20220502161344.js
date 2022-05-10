"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220502161344 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220502161344 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "verse_content" add column "body_content" varchar(255) not null, add column "title" varchar(255) not null;');
    }
    async down() {
        this.addSql('alter table "verse_content" drop column "body_content";');
        this.addSql('alter table "verse_content" drop column "title";');
    }
}
exports.Migration20220502161344 = Migration20220502161344;
//# sourceMappingURL=Migration20220502161344.js.map