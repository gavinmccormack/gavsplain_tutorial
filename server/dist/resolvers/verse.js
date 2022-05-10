"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerseResolver = void 0;
const VerseContent_1 = require("../entities/VerseContent");
const type_graphql_1 = require("type-graphql");
let VerseResolver = class VerseResolver {
    getAllVerses({ em }) {
        return em.find(VerseContent_1.VerseContent, {});
    }
    getVerseContent(id, { em }) {
        return em.findOne(VerseContent_1.VerseContent, { id });
    }
    async createVerseContent(title, bodyContent, { em }) {
        const verse = em.create(VerseContent_1.VerseContent, { title, bodyContent });
        await em.persistAndFlush(verse);
        return verse;
    }
    async deleteVerseContent(id, { em }) {
        await em.nativeDelete(VerseContent_1.VerseContent, { id });
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [VerseContent_1.VerseContent]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VerseResolver.prototype, "getAllVerses", null);
__decorate([
    (0, type_graphql_1.Query)(() => VerseContent_1.VerseContent, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], VerseResolver.prototype, "getVerseContent", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => VerseContent_1.VerseContent, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("title", () => String)),
    __param(1, (0, type_graphql_1.Arg)("bodyContent", () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], VerseResolver.prototype, "createVerseContent", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], VerseResolver.prototype, "deleteVerseContent", null);
VerseResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], VerseResolver);
exports.VerseResolver = VerseResolver;
//# sourceMappingURL=verse.js.map