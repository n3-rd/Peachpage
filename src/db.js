import Dexie from "dexie";

export const db = new Dexie("myDatabase");
db.version(1).stores({
  articles: "++id, author, image, title, source, date, url, content, ttr", // Primary key and indexed props
  currentArticle: "++id, author, image, title, source, date, url, content, ttr",
});
