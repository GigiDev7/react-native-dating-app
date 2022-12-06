"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePushToken = exports.getUsers = exports.patchLocation = exports.login = exports.register = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../services/user");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield (0, user_1.registerUser)(req.body);
        const _a = newUser._doc, { password, __v } = _a, user = __rest(_a, ["password", "__v"]);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, token } = yield (0, user_1.loginUser)(req.body.email, req.body.password);
        const { password, __v } = user, userData = __rest(user, ["password", "__v"]);
        userData.token = token;
        res.status(200).json(userData);
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const patchLocation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const updatedLocation = yield (0, user_1.updateLocation)(userId, req.body);
        res.status(201).json(updatedLocation);
    }
    catch (error) {
        next(error);
    }
});
exports.patchLocation = patchLocation;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userGender = req.user.gender;
        const userId = req.user._id;
        const coords = req.user.location.coordinates;
        const likes = req.user.likes;
        const dislikes = req.user.dislikes;
        const matches = req.user.matches;
        const filterObject = {
            _id: { $nin: [userId, ...likes, ...dislikes, ...matches] },
        };
        const { minAge, maxAge, maxDistance, gender } = req.query;
        if (gender) {
            const genders = gender.toString().split(",");
            if (genders.length === 1)
                filterObject.gender = genders[0];
        }
        else {
            filterObject.gender = userGender === "male" ? "female" : "male";
        }
        if (minAge)
            filterObject.age = { $gte: +minAge };
        if (maxAge)
            filterObject.age = Object.assign(Object.assign({}, filterObject === null || filterObject === void 0 ? void 0 : filterObject.age), { $lte: +maxAge });
        let distance = 50;
        if (maxDistance)
            distance = +maxDistance;
        const users = yield (0, user_1.findUsers)(filterObject, distance, coords);
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getUsers = getUsers;
const updatePushToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = new mongoose_1.default.Types.ObjectId(req.body.userId);
        const user = yield (0, user_1.handlePushToken)(req.body.pushToken, userId);
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.updatePushToken = updatePushToken;
