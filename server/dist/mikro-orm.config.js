"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = require("./entities/Post");
const path_1 = __importDefault(require("path"));
const User_1 = require("./entities/User");
const VerseContent_1 = require("./entities/VerseContent");
exports.default = {
    dbName: "gavsplain_1",
    clientUrl: 'http://localhost:5432',
    debug: true,
    type: 'postgresql',
    entities: [Post_1.Post, User_1.User, VerseContent_1.VerseContent],
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        glob: '!(*.d).{js,ts}',
    },
    user: 'gavin',
    password: 'devpass',
    allowGlobalContext: true,
};
//# sourceMappingURL=mikro-orm.config.js.map