"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desc = describe;
exports.is = (a, b) => b !== undefined ? expect(a).toBe(b) : expect(a).toBeDefined();
exports.not = (a, b) => b !== undefined ?
    expect(a).not.toBe(b) :
    expect(a).not.toBeDefined();
exports.isNull = (a) => expect(a).toBeNull();
exports.str = (a) => expect(typeof a).toBe("string");
exports.num = (a) => expect(typeof a).toBe("number");
exports.bool = (a) => expect(typeof a).toBe("boolean");
exports.func = (a) => expect(typeof a).toBe("function");
exports.obj = (a) => expect(typeof a).toBe("object");
exports.arr = (a) => expect(Array.isArray(a)).toBe(true);
exports.instance = (a, b) => expect(a).toBeInstanceOf(b);
exports.error = (o) => expect(o).toBeInstanceOf(Error);
exports.noterror = (o) => expect(o).not.toBeInstanceOf(Error);
exports.throws = (o) => expect(o()).toThrow();
exports.doesNotThrow = (o) => expect(o()).not.toThrow();
exports.eq = (a, b, c) => expect(a).toBeCloseTo(b, c || 2);
exports.ne = (a, b, c) => expect(a).not.toBeCloseTo(b, c || 2);
exports.gt = (a, b) => expect(a).toBeGreaterThan(b);
exports.lt = (a, b) => expect(a).toBeLessThan(b);
exports.match = (a, b) => expect(a).toMatch(b);
exports.has = (a, b) => expect(a).toContain(b);
exports.hasArr = (a, b) => expect(a).toContain(b);
exports.includes = (a, b) => expect(a.includes(b)).toBe(true);
exports.includesArr = (a, b) => expect(b.every(o => a.includes(o))).toBe(true);
exports.prop = (a, b) => expect(a).toHaveProperty(b);
exports.truey = (o) => expect(o).toBeTruthy();
exports.falsy = (o) => expect(o).toBeFalsy();
exports.parseCookie = (cookieStr) => {
    const cookieObj = { name: "", cookie: {} };
    cookieStr
        .split(",")
        .map((p, i, a) => /Expires/.test(p) ? (p = p.concat(",", a[i + 1])) : p)
        .filter((p, i) => !(i % 2))
        .forEach((p, i) => {
        const o = {};
        let name = "_unknown_";
        p.split("; ").forEach((s, j) => {
            const k = s.split("=");
            if (!j) {
                name = k[0];
                o["value"] = k[1];
            }
            else if (!k[1]) {
                o[k[0].toLocaleLowerCase()] = true;
            }
            else {
                o[k[0].toLocaleLowerCase()] = k[1];
            }
        });
        cookieObj.name = name;
        cookieObj.cookie = o;
    });
    return cookieObj;
};
exports.parseCookieArray = (data, arr) => {
    try {
        const cookieNames = [];
        if (!(arr && arr.length)) {
            return data;
        }
        else {
            for (let i = 0; i < arr.length; i++) {
                const { name, cookie } = exports.parseCookie(arr[i]);
                cookie.index = i;
                cookieNames.push(name);
                data.cookies = Object.assign({}, data.cookies, { [name]: cookie });
            }
            if (!data.cookieArr.length)
                data.cookieArr = arr;
            else {
                cookieNames.forEach((c, i) => {
                    let didMatch = false, isMatch = false;
                    const cookie = arr[i];
                    data.cookieArr = data.cookieArr.map(k => {
                        isMatch = new RegExp(c).test(k);
                        didMatch = isMatch || didMatch;
                        return isMatch ? cookie : k;
                    });
                    !didMatch ? data.cookieArr.push(cookie) : null;
                });
            }
        }
        return data;
    }
    catch (e) {
        console.error(e);
        throw e;
    }
};
exports.handleResponse = (data, res) => {
    exports.parseCookieArray(data, res.header["set-cookie"]);
    data.csrfToken = data.cookies["XSRF-TOKEN"] ? data.cookies["XSRF-TOKEN"].value : "";
    data.body = res.body;
    return data;
};
exports.sleep = (n) => new Promise(done => setTimeout(done, n));
//# sourceMappingURL=index.js.map