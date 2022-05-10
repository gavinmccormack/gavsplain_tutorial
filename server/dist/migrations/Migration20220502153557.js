"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220502153557 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220502153557 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "verse_content" ("id" serial primary key);');
    }
    async down() {
        this.addSql('drop table if exists "verse_content" cascade;');
    }
}
exports.Migration20220502153557 = Migration20220502153557;
//# sourceMappingURL=Migration20220502153557.js.map