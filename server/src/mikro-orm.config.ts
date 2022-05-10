import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core"
import path from "path";
import { User } from "./entities/User";
import { VerseContent } from "./entities/VerseContent";

export default {
    dbName: "gavsplain_1",
    clientUrl: 'http://localhost:5432',
    debug: true, //!__prod__, // NB: Env deploy
    type: 'postgresql',
    entities: [Post, User, VerseContent],
    migrations: {
        path: path.join(__dirname, './migrations'), 
        glob: '!(*.d).{js,ts}',
    },
    user: 'gavin',
    password: 'devpass',
    allowGlobalContext: true, 
} as Parameters<typeof MikroORM.init>[0];
