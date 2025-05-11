# 0xdb

**0xdb** is a lightweight MongoDB key-value database wrapper built with Mongoose. Designed for simplicity and quick integration, it lets you store, retrieve, update, and delete key-value pairs in a MongoDB collection effortlessly.

---

## 🚀 Installation

```bash
npm install 0xdb
```

---

## 📦️ Usage

```javascript
const { Schema, Database } = require("0xdb");

const mySchema = new Schema({
    username: String,
    balance: Number
});

const db = new Database({
    url: "mongodb://localhost/mydb",
    schema: mySchema,
    table: "users"
});

(async () => {
    await db.set("username", "ShadyMoon");
    await db.set("balance", 998204294765477899);

    console.log(await db.get("username")); // ShadyMoon
    console.log(await db.itemize()); // { username: "ShadyMoon", balance: 998204294765477899 }

    await db.update("balance", 1);
    console.log(await db.get("balance")); // 1

    await db.delete("username");
})();
```

---

## 📘 API

### `new Database(config)`
Initialize the database with a config object:
- `url` (String): MongoDB connection URI.
- `schema` (Mongoose.Schema): Your Mongoose Schema.
- `table` (String): Collection name.


### `set(key, value)`
Sets or updates a key-value pair.

### `get(key)`
Gets the value of a key.

### `delete(key)`
Deletes a key-value pair. Returns `true` or `false`.

### `update(key, value)`
Alias for `set`.

### `itemize()`
Returns all stored values as a plain object.

### `keys()`
Returns an array of all keys defined in the schema.

---

## 📄 License

[MIT](LICENSE) © [ShadyMoon](https://github.com/ShadyM00n)
