import sqlite3 from "sqlite3";

// ファイルに対応した、ただ１つのインスタンス
let database;

export class DBCommon {
  static init() {
    database = new sqlite3.Database("./app/user.sqlite3");
  }
  static get() {
    return database;
  }
}

export class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

const userTableName = "users";

export default class UserTable {
  static async createTableIfNotExists() {
    const db = DBCommon.get();
    return new Promise((resolve, reject) => {
      try {
        db.serialize(() => {
          db.run(
            `create table if not exists ${userTableName} (
            id text primary key,
            name text,
            email text
          )`,
            () => {
              resolve();
            }
          );
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  static async save(user) {
    const db = DBCommon.get();
    return new Promise((resolve, reject) => {
      try {
        db.run(
          `insert or replace into ${userTableName} 
        (id, name, email) 
        values ($id, $name, $email)`,
          user.id,
          user.name,
          user.email,
          () => {
            resolve();
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  static async count() {
    const db = DBCommon.get();
    return new Promise((resolve, reject) => {
      db.get(`select count(*) from ${userTableName}`, (err, row) => {
        if (err) reject(err);
        resolve(row["count(*)"]);
      });
    });
  }

  static async list(offset, limit) {
    const db = DBCommon.get();
    const result = [];
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.all(
          `select id, name, email from ${userTableName}
        order by id limit ${limit} offset ${offset}`,
          (err, rows) => {
            if (err) reject(err);
            rows = rows || [];
            rows.forEach(row => {
              result.push(new User(row["id"], row["name"], row["email"]));
            });
            resolve(result);
          }
        );
      });
    });
  }

  static async delete(user) {
    const db = DBCommon.get();
    return new Promise((resolve, reject) => {
      try {
        db.run(`delete from ${userTableName} where id = $id`, user.id, () => {
          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}
