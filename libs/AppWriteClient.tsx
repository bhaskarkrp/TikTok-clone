import { Client, Account, Databases, Storage, ID, Query } from "appwrite";

const client = new Client();
client.setProject(String(process.env.NEXT_PUBLIC_ENDPOINT));

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export { client, account, database, storage, Query, ID };
