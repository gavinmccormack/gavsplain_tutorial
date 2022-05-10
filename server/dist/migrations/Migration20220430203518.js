"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220430203518 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220430203518 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "post" ("id" serial primary key, "created_on" timestamptz(0) not null, "updated_on" timestamptz(0) not null, "title" varchar(255) not null);');
    }
}
exports.Migration20220430203518 = Migration20220430203518;
//# sourceMappingURL=Migration20220430203518.js.map