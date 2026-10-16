const fs = require("node:fs");
const path = require("node:path");

const css = fs.readFileSync(
    path.join(__dirname, "style.css"),
    "utf8"
);

const encode = text => [...text]
    .map(char =>
        "\\" + char.codePointAt(0).toString(16).padStart(6, "0")
    )
    .join("");

const tokens = css.match(
    /\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|#[\da-fA-F]+|[+-]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?(?:[a-zA-Z]+|%)?|[-_a-zA-Z][-_a-zA-Z0-9]*|\s+|./g
) || [];

const result = tokens.map(token => {
    if (token.startsWith("/*") || /^\s+$/.test(token)) {
        return " ";
    }

    if (/^["']/.test(token) && !token.includes("\\")) {
        return token[0] + encode(token.slice(1, -1)) + token[0];
    }

    if (/^(?:--|-?[_a-zA-Z])/.test(token)) {
        return encode(token);
    }

    return token;
}).join("").trim();

fs.writeFileSync(
    path.join(__dirname, "style.obfuscated.css"),
    result,
    "utf8"
);

console.log("Created style.obfuscated.css");