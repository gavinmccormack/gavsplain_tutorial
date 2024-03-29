import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core"
import {Request, Response} from 'express'
import session from 'express-session'


export type MyContext = {
    em: EntityManager<IDatabaseDriver<Connection>>
    req: Request & { session: session.Session },
    res: Response,
}

